# journalism.design en 9:16

Animation de présentation verticale (1080 × 1920), en HTML, CSS et JS, animée avec GSAP 3.

## Structure narrative (environ 29 s)

| Temps | Séquence | Intention | Ce qu'on voit |
|---|---|---|---|
| 0–4,6 s | **Ouverture** | Accrocher | Une page vide prend forme (colonnes, traits de coupe, repères CMJN). « Une information. » se tape, puis « Mille façons de la raconter. » |
| 4,6–8 s | **Formats** | Poser le problème | Les formats (article long, vidéo verticale, newsletter, IA…) surgissent en désordre. Question : « Laquelle sert vraiment votre public ? » |
| 8–13,3 s | **Marque** | Apporter la réponse | Le point magenta envahit l'écran puis se range dans « .design ». Signature : innovation éditoriale. |
| 13,3–23 s | **Services** | Montrer l'offre | Le logo devient en-tête. Quatre épreuves s'empilent : veille, formation, conseil, prototypage. |
| 23–29 s | **Contact** | Faire agir | La pile s'en va. « Parlons de votre projet. » et l'adresse soulignée. |

## Fichiers

```
index.html   cadre 9:16 et contrôles de lecture
style.css    direction artistique (épreuve d'imprimerie : encre, repères, magenta)
main.js      CONTENT (tous les textes) puis la timeline GSAP
```

## Modifier les textes

Tout est dans l'objet `CONTENT`, en tête de `main.js`. **Les formulations des
services sont à valider** : elles n'ont pas pu être vérifiées sur le site.

## Lecture et export

- Ouvrir `index.html` dans un navigateur (connexion requise pour GSAP et les polices Google).
- Contrôles : lecture/pause (barre d'espace), rejouer, curseur de position, saut par chapitre.
- `index.html#export` affiche la scène seule, plein cadre, sans boucle. Dans une fenêtre
  de 1080 × 1920, c'est prêt pour une capture vidéo.
- `window.seekTo(secondes)` positionne l'animation sur une image précise, ce qui permet un
  export image par image avec Playwright ou Puppeteer, puis un assemblage avec ffmpeg.
