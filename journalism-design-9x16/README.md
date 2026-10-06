# journalism.design en 9:16

Animation de présentation verticale (1080 × 1920), en HTML, CSS et JS, animée avec GSAP 3.
Direction artistique : design system « Synth. » (fond noir et losanges, Coolvetica,
IBM Plex Mono, un seul accent cyan `#00FFE0`, accolades, angles droits, mouvements secs).

## Structure narrative (environ 25 s)

| Temps | Séquence | Intention | Ce qu'on voit |
|---|---|---|---|
| 0–3,9 s | **Ouverture** | Accrocher | Le motif de losanges s'allume. « Une information. » se tape, curseur cyan. « Mille façons de la raconter. » |
| 3,9–7,7 s | **Formats** | Poser le problème | Dix formats s'impriment ligne à ligne, comme dans un terminal. « Laquelle sert vraiment votre public ? » |
| 7,7–13 s | **Marque** | Apporter la réponse | Le point cyan clignote seul, puis « journalism.design » se tape autour. `{ Innovation éditoriale }` |
| 13–20 s | **Services** | Montrer l'offre | Quatre cartes Synth. ; chacune est sélectionnée à son tour (filet cyan). |
| 20–25,5 s | **Contact** | Faire agir | La marque revient. « Parlons de votre projet. » et l'adresse. |

## Fichiers

```
index.html   cadre 9:16 et contrôles de lecture
style.css    direction artistique (jetons du design system Synth.)
main.js      CONTENT (tous les textes) puis la timeline GSAP
assets/      polices Coolvetica et IBM Plex Mono (copiées du design system)
```

## Modifier les textes

Tout est dans l'objet `CONTENT`, en tête de `main.js`. **Les formulations des
services sont à valider** : elles n'ont pas pu être vérifiées sur jd.snth.ch, inaccessible
lors de la rédaction.

**Licence** : vérifier que la licence de Coolvetica (Typodermic) couvre l'intégration web.

## Lecture et export

- Ouvrir `index.html` dans un navigateur (connexion requise pour charger GSAP ; les polices sont locales).
- Contrôles : lecture/pause (barre d'espace), rejouer, curseur de position, saut par chapitre.
- `index.html#export` affiche la scène seule, plein cadre, sans boucle. Dans une fenêtre
  de 1080 × 1920, c'est prêt pour une capture vidéo.
- `window.seekTo(secondes)` positionne l'animation sur une image précise, ce qui permet un
  export image par image avec Playwright ou Puppeteer, puis un assemblage avec ffmpeg.
