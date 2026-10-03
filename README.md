# Littératie du hype — version Synth

Adaptation en français, aux couleurs de Synth, du cours en ligne
[*Hype Literacy*](https://akademie.dw.de/hype-literacy/) de la DW Akademie et de Hype Studies.

## Structure

```
index.html                    squelette de la page (aucun texte éditorial)
css/style.css                 habillage, construit sur les jetons du design system Synth.
css/synth/                    jetons copiés du design system « Synth. » (Claude Design) + @font-face
js/markdown.js                mini-convertisseur Markdown, sans dépendance
js/app.js                     découpage en modules, navigation, exercices, progression
contenu/hype-literacy.fr.md   TOUS les textes du parcours
assets/                       logos Synth., œil, motif diamant, polices (Coolvetica, IBM Plex Mono)
```

## Modifier les textes

Tout se passe dans `contenu/hype-literacy.fr.md`. La syntaxe des modules et des
exercices (cartes, quiz, hype-o-mètre, check-list) est décrite en tête du fichier.

## Lancer en local

Le navigateur refuse de lire le fichier `.md` si `index.html` est ouvert directement
depuis le disque. Il faut un petit serveur :

```
python3 -m http.server
```

puis ouvrir <http://localhost:8000>. Le site peut aussi être publié tel quel
(GitHub Pages, Netlify, etc.).

## À faire avant publication

- **Charte** : logos, polices, couleurs (accent `#00FFE0`), espacements et effets viennent
  du design system « Synth. » de Claude Design. Thème sombre par défaut, thème clair
  au choix du lecteur. Pour suivre une évolution de la charte, recopier ses fichiers
  `project/tokens/*.css` dans `css/synth/`.
- **Licence des polices** : vérifier que la licence de Coolvetica (Typodermic) couvre
  l'intégration web avant de publier. IBM Plex Mono est sous licence libre (OFL).
- **Textes** : il s'agit d'une adaptation libre rédigée d'après la présentation
  publique du cours, pas d'une traduction du texte original (inaccessible lors de la
  rédaction). À relire et à confronter au cours de la DW Akademie, notamment pour
  les questions de droits et de crédits.
