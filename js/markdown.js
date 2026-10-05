/*
 * Mini-convertisseur Markdown → HTML, sans dépendance.
 * Couvre ce qu'utilise contenu/*.md : titres, paragraphes, listes (puces,
 * numérotées, cases à cocher), citations, tableaux, gras, italique, liens,
 * retours à la ligne <br>, blocs de code.
 * Les blocs de code nommés (```quiz, ```cartes…) sont confiés à `blockHandlers`.
 */
(function (global) {
  'use strict';

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inline(text) {
    var out = escapeHtml(text);
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, href) {
      var external = /^https?:\/\//.test(href);
      return '<a href="' + href + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
    });
    out = out.replace(/&lt;br\s*\/?&gt;/g, '<br>');
    out = out.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1<em>$2</em>');
    return out;
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function splitRow(line) {
    return line.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(function (c) {
      return c.trim().replace(/\\\|/g, '|');
    });
  }

  function render(src, blockHandlers) {
    blockHandlers = blockHandlers || {};
    var api = {
      inline: inline,
      escape: escapeHtml,
      render: function (text) { return render(text, blockHandlers); }
    };
    var lines = src.replace(/\r\n?/g, '\n').split('\n');
    var html = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      // Bloc de code (éventuellement interactif)
      var fence = line.match(/^```\s*([\w-]*)\s*$/);
      if (fence) {
        var lang = fence[1];
        var body = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
        i++;
        if (lang && blockHandlers[lang]) {
          html.push(blockHandlers[lang](body.join('\n'), api));
        } else {
          html.push('<pre><code>' + escapeHtml(body.join('\n')) + '</code></pre>');
        }
        continue;
      }

      if (/^\s*$/.test(line)) { i++; continue; }

      // Commentaire HTML : ignoré
      if (/^\s*<!--/.test(line)) {
        while (i < lines.length && lines[i].indexOf('-->') === -1) i++;
        i++;
        continue;
      }

      var heading = line.match(/^(#{1,4})\s+(.*)$/);
      if (heading) {
        var level = heading[1].length;
        html.push('<h' + level + ' id="' + slugify(heading[2]) + '">' + inline(heading[2]) + '</h' + level + '>');
        i++;
        continue;
      }

      // Tableau : ligne d'en-tête, ligne de séparation |---|, puis les lignes
      if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
        var head = splitRow(line);
        var rows = [];
        i += 2;
        while (i < lines.length && /^\|/.test(lines[i])) rows.push(splitRow(lines[i++]));
        html.push('<div class="table-wrap"><table><thead><tr>' +
          head.map(function (c) { return '<th scope="col">' + inline(c) + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          rows.map(function (r) {
            var empty = r.slice(1).every(function (c) { return !c; });
            if (empty) return '<tr class="row-group"><th colspan="' + head.length + '" scope="colgroup">' + inline(r[0]) + '</th></tr>';
            return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
          }).join('') +
          '</tbody></table></div>');
        continue;
      }

      if (/^>\s?/.test(line)) {
        var quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''));
        html.push('<blockquote>' + render(quote.join('\n'), blockHandlers) + '</blockquote>');
        continue;
      }

      var listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+/);
      if (listMatch) {
        var ordered = /\d/.test(listMatch[2]);
        var items = [];
        while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
          i++;
        }
        var isTasks = items.every(function (it) { return /^\[[ xX]\]\s/.test(it); });
        if (isTasks) {
          html.push('<ul class="checklist">' + items.map(function (it) {
            var checked = /^\[[xX]\]/.test(it);
            var label = it.replace(/^\[[ xX]\]\s/, '');
            return '<li><label><input type="checkbox"' + (checked ? ' checked' : '') + '><span>' + inline(label) + '</span></label></li>';
          }).join('') + '</ul>');
        } else {
          var tag = ordered ? 'ol' : 'ul';
          html.push('<' + tag + '>' + items.map(function (it) { return '<li>' + inline(it) + '</li>'; }).join('') + '</' + tag + '>');
        }
        continue;
      }

      // Paragraphe
      var para = [];
      while (
        i < lines.length &&
        !/^\s*$/.test(lines[i]) &&
        !/^(#{1,4}\s|>|```|\||\s*([-*]|\d+\.)\s+|\s*<!--)/.test(lines[i])
      ) para.push(lines[i++]);
      html.push('<p>' + inline(para.join(' ')) + '</p>');
    }

    return html.join('\n');
  }

  global.MiniMarkdown = { render: render, inline: inline, escape: escapeHtml, slugify: slugify };
})(window);
