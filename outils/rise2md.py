#!/usr/bin/env python3
"""
Convertit l'export Articulate Rise du cours « The Hype Literacy Toolkit for Journalists »
(DW Akademie) en fichier Markdown au format du site, et télécharge les médias.

Usage :
    python3 outils/rise2md.py <runtime-data.js> <sortie.md> [--medias assets/cours]

Le fichier runtime-data.js se récupère sur https://akademie.dw.de/hype-literacy/runtime-data.js
"""
import base64
import json
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

BASE_ASSETS = 'https://akademie.dw.de/hype-literacy/assets/'


# ---------------------------------------------------------------------------
# HTML (éditeur Rise) -> Markdown
# ---------------------------------------------------------------------------

class Html2Md(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []          # blocs terminés
        self.buf = []          # texte du bloc courant
        self.lists = []        # pile de 'ul' / 'ol' avec compteur
        self.links = []
        self.big = False       # paragraphe en très gros caractères -> titre
        self.table = None
        self.row = None
        self.cell = None
        self.heading = None

    # -- utilitaires
    def emit(self, text):
        if self.cell is not None:
            self.cell.append(text)
        else:
            self.buf.append(text)

    def flush(self, prefix=''):
        text = re.sub(r'[ \t ]+', ' ', ''.join(self.buf)).strip()
        text = re.sub(r'\*\*\s*\*\*', '', text)
        text = re.sub(r'(?<!\*)\*\s*\*(?!\*)', '', text)
        self.buf = []
        if text:
            self.out.append(prefix + text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        style = a.get('style') or ''
        if tag == 'span':
            m = re.search(r'font-size:\s*([\d.]+)rem', style)
            if m and float(m.group(1)) >= 2.4:
                self.big = True
        elif tag in ('strong', 'b'):
            self.emit('**')
        elif tag in ('em', 'i'):
            self.emit('*')
        elif tag == 'a':
            self.links.append(a.get('href', ''))
            self.emit('[')
        elif tag == 'br':
            if self.cell is not None:
                self.cell.append(' ')
            elif self.buf and ''.join(self.buf).strip():
                self.emit('  \n')
        elif tag in ('ul', 'ol'):
            self.flush()
            self.lists.append([tag, 0])
        elif tag == 'li':
            self.flush()
        elif tag in ('h1', 'h2', 'h3', 'h4'):
            self.flush()
            self.heading = tag
        elif tag == 'table':
            self.flush()
            self.table = []
        elif tag == 'tr':
            self.row = []
        elif tag in ('td', 'th'):
            self.cell = []
        elif tag == 'p' and self.cell is not None and self.cell:
            self.cell.append('<br>')

    def handle_endtag(self, tag):
        if tag in ('strong', 'b'):
            self.emit('**')
        elif tag in ('em', 'i'):
            self.emit('*')
        elif tag == 'a':
            href = self.links.pop() if self.links else ''
            self.emit('](' + href.replace(' ', '%20').replace(')', '%29') + ')')
        elif tag == 'p' and self.cell is None:
            if self.lists:
                return
            if self.big:
                self.flush('## ')
                self.out[-1:] = [re.sub(r'^## \*\*(.*)\*\*$', r'## \1', self.out[-1])] if self.out else []
                self.big = False
            else:
                self.flush()
        elif tag == 'li':
            kind = self.lists[-1] if self.lists else ['ul', 0]
            kind[1] += 1
            indent = '  ' * (len(self.lists) - 1)
            self.flush(indent + ('%d. ' % kind[1] if kind[0] == 'ol' else '- '))
        elif tag in ('ul', 'ol'):
            if self.lists:
                self.lists.pop()
            self.out.append('')
        elif tag in ('h1', 'h2', 'h3', 'h4'):
            self.flush('### ')
            self.heading = None
        elif tag in ('td', 'th'):
            text = re.sub(r'\s+', ' ', ''.join(self.cell)).strip()
            text = re.sub(r'^(<br>)+|(<br>)+$', '', text).replace('|', '\\|')
            self.row.append(text)
            self.cell = None
        elif tag == 'tr':
            self.table.append(self.row)
            self.row = None
        elif tag == 'table':
            rows = self.table
            self.table = None
            if rows:
                width = max(len(r) for r in rows)
                rows = [r + [''] * (width - len(r)) for r in rows]
                lines = ['| ' + ' | '.join(rows[0]) + ' |', '|' + '---|' * width]
                lines += ['| ' + ' | '.join(r) + ' |' for r in rows[1:]]
                self.out.append('\n'.join(lines))

    def handle_data(self, data):
        self.emit(data)

    def result(self):
        self.flush()
        blocks, prev_list = [], False
        for b in self.out:
            is_list = bool(re.match(r'^\s*(- |\d+\. )', b))
            if blocks and is_list and prev_list:
                blocks[-1] += '\n' + b
            elif b == '':
                prev_list = False
                continue
            else:
                blocks.append(b)
            prev_list = is_list
        return '\n\n'.join(blocks).strip()


def md(html):
    if not html:
        return ''
    p = Html2Md()
    p.feed(html)
    return p.result()


def oneline(html):
    return re.sub(r'\s*\n+\s*', ' ', md(html)).strip()


# ---------------------------------------------------------------------------
# Médias
# ---------------------------------------------------------------------------

def slug(name):
    stem, _, ext = name.rpartition('.')
    stem = re.sub(r'[^A-Za-z0-9]+', '-', stem).strip('-').lower()
    return stem + '.' + ext.lower()


class Media:
    def __init__(self, folder):
        self.folder = Path(folder) if folder else None
        self.done = {}

    def image(self, media):
        img = (media or {}).get('image') or {}
        if img.get('sourcedFrom') == 'DEFAULT':
            return None  # fonds décoratifs par défaut de Rise : non repris
        name = img.get('crushedKey') if img.get('useCrushedKey') else img.get('key')
        if not name:
            return None
        if name in self.done:
            return self.done[name]
        local = slug(name.split('/')[-1])
        rel = 'assets/cours/' + local
        if self.folder:
            target = self.folder / local
            if not target.exists():
                url = BASE_ASSETS + urllib.parse.quote(name)
                try:
                    with urllib.request.urlopen(url, timeout=60) as r:
                        target.write_bytes(r.read())
                except Exception as e:  # signalé, sans bloquer la conversion
                    print('  ! média non récupéré :', name, e, file=sys.stderr)
        self.done[name] = rel
        return rel


def youtube_id(embed):
    for url in (embed.get('originalUrl', ''), urllib.parse.unquote(embed.get('src', ''))):
        m = re.search(r'(?:v=|embed/|youtu\.be/)([\w-]{11})', url)
        if m:
            start = re.search(r'(?:[?&]start=|[?&]t=)(\d+)', urllib.parse.unquote(url))
            return m.group(1), (start.group(1) if start else '')
    return None, ''


# ---------------------------------------------------------------------------
# Blocs Rise -> Markdown
# ---------------------------------------------------------------------------

def fence(name, body):
    return '```' + name + '\n' + body.strip('\n') + '\n```'


def block(b, media, counter):
    t, v = b.get('type'), b.get('variant')
    items = b.get('items') or []
    out = []

    if t == 'divider':
        if v == 'numbered divider':
            counter[0] += 1
            return '```section\n%d\n```' % counter[0]
        return None  # bouton « CONTINUE » : sans objet ici

    if t == 'text':
        for it in items:
            head = oneline(it.get('heading', '')).replace('**', '')
            if head:
                out.append(('## ' if v.startswith('heading') else '### ') + head)
            para = md(it.get('paragraph', ''))
            if para:
                out.append(fence('note', para) if v == 'note' else para)
        return '\n\n'.join(out)

    if t == 'image':
        rows = []
        for it in items:
            path = media.image(it.get('media'))
            if not path:
                continue
            caption = md(it.get('caption', '')).replace('\n\n', ' <br> ').replace('\n', ' ')
            rows.append(path + ' :: ' + caption)
            para = md(it.get('paragraph', ''))
            if para:
                rows.append('> ' + para.replace('\n', ' '))
        name = 'image' if v in ('hero', 'centered', 'full') and len(items) == 1 else 'galerie'
        return fence(name, '\n'.join(rows))

    if t == 'quote':
        for it in items:
            avatar = media.image((it.get('avatar') or {}).get('media'))
            lines = ['auteur: ' + oneline(it.get('name', ''))]
            if avatar:
                lines.append('portrait: ' + avatar)
            lines.append('')
            lines.append(md(it.get('paragraph', '')))
            out.append(fence('citation', '\n'.join(lines)))
        return '\n\n'.join(out)

    if t == 'multimedia':
        for it in items:
            emb = (it.get('media') or {}).get('embed') or {}
            vid, start = youtube_id(emb)
            if vid:
                out.append(fence('video', 'youtube: %s%s\ntitre: %s\nsource: %s' % (
                    vid, ('?start=' + start) if start else '', emb.get('title', ''), emb.get('originalUrl', ''))))
        return '\n\n'.join(out)

    if t == 'interactive' and v == 'flashcard':
        for it in items:
            front = oneline(it['front'].get('description', ''))
            back = oneline(it['back'].get('description', ''))
            out.append(front + ' :: ' + back)
        return fence('cartes', '\n'.join(out))

    if t == 'interactive' and v == 'accordion':
        for it in items:
            out.append('+ ' + it.get('title', '').strip())
            out.append(md(it.get('description', '')))
            out.append('')
        return fence('accordeon', '\n'.join(out))

    if t == 'interactive' and v == 'sorting':
        piles = {str(p['id']): p['title'].strip() for p in b.get('piles', [])}
        lines = []
        for pid, title in piles.items():
            words = [i['title'].strip() for i in items if str(i.get('pileId')) == pid]
            lines.append(title + ' :: ' + ' | '.join(words))
        return fence('tri', '\n'.join(lines))

    if t == 'interactive' and v == 'labeledgraphic':
        path = media.image((b.get('media') or {}))
        lines = ['image: ' + (path or '')]
        for it in items:
            lines.append('%.1f, %.1f :: %s :: %s' % (
                float(it['x']), float(it['y']), it.get('title', '').strip(),
                oneline(it.get('description', '')).replace('\n', ' ')))
        return fence('image-annotee', '\n'.join(lines))

    print('  ! bloc non géré :', t, v, file=sys.stderr)
    return None


def main():
    src, dest = sys.argv[1], sys.argv[2]
    folder = sys.argv[sys.argv.index('--medias') + 1] if '--medias' in sys.argv else None
    if folder:
        Path(folder).mkdir(parents=True, exist_ok=True)
    raw = Path(src).read_text()
    data = json.loads(base64.b64decode(re.search(r'"([A-Za-z0-9+/=]{100,})"', raw).group(1)))
    course = data['course']
    media = Media(folder)

    parts = ['<!-- module: accueil | ' + course['title'] + ' -->', '# ' + course['title']]
    cover = media.image(course.get('coverImage', {}).get('media'))
    if cover:
        parts.append(fence('image', cover + ' :: '))
    parts.append(md(course.get('description', '')))

    for i, lesson in enumerate(course['lessons'], 1):
        title = lesson['title'].strip()
        parts.append('<!-- module: chapitre-%d | %s -->' % (i, title))
        parts.append('# ' + title)
        counter = [0]
        for b in lesson.get('items') or []:
            out = block(b, media, counter)
            if out:
                parts.append(out)

    Path(dest).write_text('\n\n'.join(p for p in parts if p).rstrip() + '\n')
    print('écrit :', dest, '—', len(media.done), 'médias')


if __name__ == '__main__':
    main()
