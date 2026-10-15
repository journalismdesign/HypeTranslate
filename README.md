# Littératie de la hype, version Synth

Traduction française, aux couleurs de Synth, du cours en ligne
[*The Hype Literacy Toolkit for Journalists*](https://akademie.dw.de/hype-literacy/)
(DW Akademie et Hype Studies, mars 2026).

> **Licence de l'original : Creative Commons BY-NC-ND.** Crédit obligatoire
> (« DW Akademie with support from the German Federal Ministry of Economic Cooperation
> and Development »), usage non commercial, et **aucune modification — traduction comprise —
> sans l'autorisation de la DW Akademie**. Ne pas diffuser cette version sans cet accord.

## Structure

```
index.html                    squelette de la page (aucun texte éditorial)
css/style.css                 habillage, construit sur les jetons du design system Synth.
css/synth/                    jetons copiés du design system « Synth. » (Claude Design) + @font-face
js/markdown.js                mini-convertisseur Markdown, sans dépendance
js/app.js                     découpage en modules, navigation, quiz en conversation, progression
js/atelier.js                 dispositifs animés : vue d'ensemble, paquet de cartes, carnet de questions,
                              registre des promesses
js/vendor/                    GSAP 3 et Draggable (licence GSAP gratuite)
js/synth-header.js, css/synth-header.css   header Synth (modèle Zéro Clics)
contenu/hype-literacy.fr.md   textes du parcours DW Akademie (traduction française)
contenu/parcours-synth.fr.md  parcours Synth (5 modules originaux) et boîte à outils
source/hype-literacy.en.md    texte original anglais, extrait automatiquement, même format
outils/rise2md.py             extraction du cours Articulate Rise -> Markdown + médias
assets/cours/                 images du cours original (20 fichiers)
assets/                       logos Synth., œil, motif diamant, polices (Coolvetica, IBM Plex Mono)
```

## Modifier les textes

Tout se passe dans `contenu/hype-literacy.fr.md` (traduction) et `contenu/parcours-synth.fr.md`
(contenu original de Synth). Un commentaire `<!-- groupe: … -->` range les modules qui le suivent
dans une rubrique du sommaire ; chaque rubrique a sa propre numérotation. La syntaxe des chapitres et des blocs
(vue d'ensemble, images, galeries, carrousel, vidéos, encadrés, citations, cartes,
accordéon, tri, paquet de cartes, questions à se poser, quiz, image annotée, tableaux) est décrite en tête du fichier.

Les quiz de fin de chapitre et la « Boîte à outils Synth » (hype-o-mètre, check-list) sont
des ajouts de Synth, signalés comme tels dans le parcours : ils ne figurent ni dans le
cours en ligne ni dans son export PDF.

## Parcours Synth

Cinq modules originaux complètent le cours de la DW Akademie, à partir des travaux de Hype Studies :
la critique qui nourrit la hype (« criti-hype »), la hype profonde et les fictions sociotechniques,
la hype à la française, la hype dans les rédactions, enquêter sur la hype. Le dernier module
propose un registre des promesses, conservé dans le navigateur du lecteur et exportable en CSV.
Ce contenu, propre à Synth, ne dépend pas de la licence de la DW Akademie.

## Mettre à jour depuis le cours original

Le cours de la DW Akademie est un export Articulate Rise : tout son contenu est dans
`runtime-data.js`. Pour régénérer le texte anglais et retélécharger les médias :

```
curl -O https://akademie.dw.de/hype-literacy/runtime-data.js
python3 outils/rise2md.py runtime-data.js source/hype-literacy.en.md --medias assets/cours
```

Comparer ensuite `source/hype-literacy.en.md` avec sa version précédente (`git diff`) pour
repérer ce qui a changé et reporter les modifications dans la traduction.

Les vidéos YouTube ne sont chargées qu'au clic du lecteur (domaine youtube-nocookie.com).

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
- **Autorisation de la DW Akademie** : indispensable avant toute diffusion (clause ND).
- **Relecture de la traduction** : traduction intégrale du texte original, à relire.
  Les citations (Frankfurt, Stilgoe, Thiel, McLuhan, Winner, Mutiso) sont des traductions
  libres ; *On Bullshit* de Frankfurt existe en français (*De l'art de dire des conneries*,
  10/18, 2006) : remplacer par la traduction publiée si les droits le permettent.
- **Corrections par rapport à l'original** : coquilles corrigées en traduisant
  (« unclock » → « unlock », « Elon Muks » → « Elon Musk », « Gil Durand » → « Gil Duran »),
  doublons de titres supprimés, liens mal formés des références nettoyés.
