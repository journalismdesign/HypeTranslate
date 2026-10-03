<!--
  CONTENU ÉDITORIAL — « Littératie du hype » (version Synth, français)

  Ce fichier contient TOUS les textes affichés par le site. Le code (index.html,
  css/, js/) n'en contient aucun : modifiez ici, rechargez la page.

  Syntaxe :
  - Un commentaire HTML de la forme  « module: identifiant | Titre court du menu »
    ouvre un nouveau module (voir plus bas).
    Le premier module (« accueil ») sert de page d'ouverture.
  - Markdown standard pour le reste (titres, listes, citations, liens).
  - Blocs interactifs (blocs de code avec un nom de langage) :
      ```cartes      une carte par ligne : Recto :: Verso
      ```quiz        Q: question / - [ ] mauvaise réponse / - [x] bonne réponse / > explication
                     (plusieurs questions séparées par une ligne vide)
      ```hypemetre   un titre par ligne : Titre :: note de 0 à 3 :: commentaire
  - Une liste de cases « - [ ] » devient une check-list cochable,
    mémorisée dans le navigateur du lecteur.

  Avertissement : ce texte est une adaptation libre en français, rédigée d'après
  la présentation publique du cours « Hype Literacy » de la DW Akademie et du
  collectif Hype Studies. Ce n'est PAS une traduction du texte original, qui
  n'était pas accessible lors de la rédaction. À relire et confronter à la source.
-->

<!-- module: accueil | Accueil -->

# Littératie du hype

## Couvrir l'intelligence artificielle sans amplifier le bruit

« Révolution », « percée », « menace existentielle » : l'actualité de l'IA se raconte souvent avec des mots qui en disent plus long sur les attentes du moment que sur les machines elles-mêmes. Ce parcours propose des outils pour repérer les promesses gonflées, les présupposés invisibles et les récits trompeurs, et pour les remettre en contexte.

Il s'adresse d'abord aux journalistes et aux professionnels des médias. Étudiants, designers, chercheurs ou simples lecteurs curieux y trouveront aussi une porte d'entrée vers un objet d'étude à part entière : le hype.

**Format :** six modules courts, des exercices, une check-list à garder sous la main. Comptez environ une heure. Votre progression reste enregistrée dans votre navigateur.

> Le hype n'est pas un simple excès d'enthousiasme. C'est une force qui oriente les investissements, les politiques publiques et les rédactions. Apprendre à le lire, c'est demander qui négocie l'avenir, et au profit de qui.

<!-- module: comprendre | 1. Comprendre le hype -->

# Module 1 — Qu'est-ce que le hype ?

## Plus qu'une mode passagère

Dans le langage courant, le hype désigne l'emballement autour d'un produit ou d'une idée. Les chercheurs qui l'étudient en donnent une définition plus exigeante : le hype est une **mise en circulation d'attentes** sur l'avenir, assez puissante pour modifier le présent.

Une promesse technologique n'a pas besoin d'être tenue pour produire des effets. Elle peut lever des fonds, justifier un plan de licenciements, réorienter un budget de recherche, faire voter une loi ou en retarder une autre. La sociologie des attentes (*sociology of expectations*) a décrit ce mécanisme dès le milieu des années 2000 : les annonces sur le futur sont **performatives**, elles fabriquent une partie de la réalité qu'elles prétendent décrire.

## Le cycle, et ses limites

Le cabinet Gartner popularise depuis 1995 une courbe devenue célèbre, le *hype cycle* : déclencheur technologique, pic des attentes exagérées, creux de la désillusion, pente de l'éveil, plateau de productivité. Elle est pratique pour situer une technologie dans le débat. Elle a aussi ses angles morts :

- elle présente l'emballement comme une étape naturelle, presque inévitable ;
- elle suppose que toute technologie finit par trouver son « plateau », ce que l'histoire dément souvent ;
- elle efface les acteurs : qui gonfle les attentes, et qui paie quand elles retombent ?

## Pourquoi c'est l'affaire des journalistes

Les médias ne sont pas de simples témoins. Un titre qui reprend « l'IA qui pense comme un humain » donne de la crédibilité à une affirmation commerciale. Une rédaction qui couvre chaque lancement comme un tournant historique installe l'idée que le progrès est linéaire et inéluctable.

L'inverse existe aussi : le catastrophisme spectaculaire est une autre forme de hype. Annoncer que l'IA va « détruire l'humanité » prête aux systèmes actuels des capacités qu'ils n'ont pas, et détourne l'attention de dommages déjà mesurables.

```cartes
Hype :: Mise en circulation d'attentes sur l'avenir, assez puissante pour orienter des décisions dans le présent : financement, régulation, organisation du travail.
Performativité :: Une promesse produit des effets réels qu'elle soit tenue ou non. Annoncer une technologie peut suffire à déplacer des capitaux.
Criti-hype :: Terme proposé par l'historien Lee Vinsel (2021) : une critique qui reprend à son compte les capacités exagérées d'une technologie pour mieux s'en alarmer.
Hype cycle :: Modèle de Gartner (1995). Utile pour situer un débat, trompeur s'il fait passer l'emballement pour un phénomène naturel et sans responsables.
```

```quiz
Q: Une start-up annonce un outil qui « remplacera les médecins radiologues d'ici cinq ans ». Quelle est la première question à poser ?
- [ ] Combien de radiologues travaillent aujourd'hui en France ?
- [x] Sur quelles données et dans quelles conditions l'outil a-t-il été évalué, et par qui ?
- [ ] Quel est le nom du modèle utilisé ?
> L'échéance et l'ampleur de la promesse ne valent que ce que valent les preuves. Une évaluation indépendante, en conditions réelles, pèse plus lourd que n'importe quelle projection.

Q: Le catastrophisme sur l'IA est-il une forme de hype ?
- [x] Oui, quand il attribue aux systèmes des capacités qu'ils n'ont pas
- [ ] Non, le hype est toujours optimiste
> Optimiste ou alarmiste, le récit reste hypé s'il surestime ce que la technologie sait faire. C'est ce que recouvre la notion de « criti-hype ».
```

<!-- module: acteurs | 2. Qui fabrique le hype ? -->

# Module 2 — Qui fabrique le hype ?

## Une chaîne d'intérêts

Le hype n'apparaît pas spontanément. Il circule entre des acteurs qui ont chacun de bonnes raisons de l'entretenir.

- **Les entreprises** ont besoin d'attirer clients, talents et capitaux. Leurs annonces sont d'abord des actes de communication.
- **Les investisseurs** misent sur des valorisations futures. Plus la promesse est grande, plus la mise se justifie.
- **Les chercheurs** dépendent de financements sur projet ; présenter un résultat comme une percée aide à décrocher le suivant.
- **Les États** se disputent le leadership technologique et peuvent surjouer les capacités nationales comme les menaces étrangères.
- **Les consultants et les influenceurs** vendent de l'accompagnement à une transformation qu'ils ont intérêt à décrire comme urgente.
- **Les médias** cherchent l'audience. Le superlatif se clique mieux que la nuance.

## Suivre l'argent, suivre la parole

Devant une affirmation sur l'IA, deux réflexes simples permettent de remonter la chaîne :

1. **Qui parle, et que gagne-t-il si on le croit ?** Une source n'est pas disqualifiée parce qu'elle est intéressée, mais son intérêt doit apparaître dans l'article.
2. **Qui ne parle pas ?** Travailleurs du clic qui annotent les données, utilisateurs concernés, chercheurs indépendants, régulateurs : leur absence dit souvent quelque chose.

## L'expert n'est pas neutre par défaut

Un scientifique de renom peut être cofondateur d'une entreprise du secteur, conseiller d'un fonds ou auteur d'un livre à succès sur les dangers de l'IA. Vérifier les affiliations d'un expert fait partie du travail, au même titre que vérifier un chiffre.

```quiz
Q: Le PDG d'une entreprise d'IA déclare que l'intelligence artificielle générale arrivera « dans deux ou trois ans ». Comment traiter la citation ?
- [ ] La reprendre en titre, c'est une information
- [ ] La supprimer, c'est de la communication
- [x] La citer en précisant l'intérêt de l'entreprise et en la confrontant à d'autres voix
> La déclaration est un fait (il l'a dite), pas une information sur l'avenir. Elle se contextualise : intérêt commercial, levées de fonds en cours, avis de chercheurs sans lien avec l'entreprise.

Q: Un rapport sur « l'impact de l'IA sur l'emploi » est publié par un cabinet de conseil. Que vérifier en priorité ?
- [x] La méthode, les hypothèses retenues et les offres commerciales du cabinet sur le sujet
- [ ] Le nombre de pages du rapport
- [ ] Si d'autres médias l'ont déjà repris
> Un rapport de cabinet est souvent aussi un document d'appel d'offres. Les hypothèses (taux d'adoption, horizon) déterminent l'essentiel des résultats.
```

<!-- module: langage | 3. Les mots du hype -->

# Module 3 — Les mots du hype

## Le vocabulaire fait le récit

L'IA est un domaine saturé de métaphores. Elles sont parfois inévitables : il faut bien nommer ce qu'on décrit. Mais chacune transporte une idée de ce que sont ces systèmes, et cette idée est rarement neutre.

```cartes
« L'IA comprend » :: Un modèle de langage calcule des probabilités de suite de mots à partir de ses données d'entraînement. Préférer : « le système produit une réponse plausible ».
« L'IA hallucine » :: Le terme suggère une perception déréglée, donc une perception normale le reste du temps. Préférer : « le système génère des informations fausses ».
« Cerveau artificiel » :: Les réseaux de neurones s'inspirent de très loin du cerveau. La métaphore laisse croire à une équivalence qui n'existe pas.
« L'IA a décidé » :: Un système n'a ni intention ni responsabilité. Quelqu'un l'a conçu, entraîné, déployé. Nommer ces acteurs.
« Révolution » :: Le mot présuppose une rupture totale et brutale. La plupart des usages de l'IA s'insèrent dans des outils et des métiers existants.
« Course à l'IA » :: L'image impose l'idée qu'il faut aller vite et qu'il y a un vainqueur. Elle sert souvent à disqualifier la régulation.
```

## L'IA comme sujet grammatical

Comparez :

> « L'IA va supprimer 300 000 emplois. »

> « Des directions d'entreprise prévoient de supprimer 300 000 emplois en s'appuyant sur des outils d'automatisation. »

La première phrase fait de la technologie un acteur autonome. La seconde rend aux humains leurs décisions. Ce glissement, que les chercheurs appellent **déterminisme technologique**, est l'un des ressorts les plus fréquents du hype. Il rend l'avenir inévitable, et donc indiscutable.

## Les images aussi

Robots humanoïdes, cerveaux bleus lumineux, mains qui se tendent vers un écran : l'illustration de l'IA recycle un répertoire de science-fiction qui ne correspond à aucun système réel. Des banques d'images alternatives existent (par exemple le projet *Better Images of AI*). Montrer des serveurs, des personnes qui annotent des données ou une interface réelle informe davantage.

```quiz
Q: Quelle formulation évite le mieux l'anthropomorphisme ?
- [ ] « ChatGPT a menti à l'utilisateur »
- [ ] « ChatGPT a halluciné une source »
- [x] « ChatGPT a généré une référence bibliographique qui n'existe pas »
> « Mentir » suppose une intention, « halluciner » une perception. La troisième formulation décrit ce qui s'est passé, sans prêter au système une vie intérieure.

Q: « La course mondiale à l'IA impose à l'Europe d'alléger ses règles. » Qu'est-ce qui pose problème ?
- [x] La métaphore de la course présente la dérégulation comme une nécessité
- [ ] Rien, c'est un constat
> La phrase transforme un choix politique en contrainte extérieure. Le travail journalistique consiste à rendre le choix visible : qui le défend, avec quels arguments, et qui s'y oppose.
```

<!-- module: chiffres | 4. Chiffres et benchmarks -->

# Module 4 — Chiffres, benchmarks et valorisations

## Le benchmark, un récit chiffré

Chaque nouveau modèle arrive avec son tableau de scores : tel pourcentage à un examen de droit, tel rang sur un classement de programmation. Ces **benchmarks** ont l'air d'instruments de mesure neutres. Ce sont aussi des dispositifs narratifs : ils construisent une histoire de progrès continu, où chaque point gagné rapproche d'une ligne d'arrivée.

Avant de reprendre un score, quelques questions :

- **Que mesure réellement le test ?** Réussir un QCM de médecine n'est pas soigner un patient.
- **Le modèle a-t-il vu les réponses ?** Quand les questions d'un test circulent en ligne, elles peuvent se retrouver dans les données d'entraînement. On parle de contamination.
- **Qui a fait la mesure ?** Les chiffres publiés par l'entreprise elle-même ne valent pas une évaluation indépendante.
- **Par rapport à quoi ?** « Meilleur que l'humain » : quel humain, dans quelles conditions, avec combien de temps ?
- **Le résultat est-il reproductible ?** Les conditions de test (formulation des consignes, nombre d'essais) peuvent changer fortement le score.

## Les valorisations ne sont pas des faits

Une entreprise « valorisée à 100 milliards » ne vaut pas 100 milliards : c'est le prix qu'un investisseur a accepté de payer une part de son capital, sur la base de ce qu'il espère qu'elle vaudra demain. La valorisation mesure une attente, pas une performance.

Questions utiles :

- Quel est le chiffre d'affaires réel, et quelles sont les pertes ?
- Qui sont les investisseurs, et sont-ils aussi fournisseurs ou clients de l'entreprise ?
- Quelle part des revenus vient de contrats signés, et quelle part de projections ?

## Les pourcentages qui impressionnent

« Gain de productivité de 40 % » : sur quelle tâche, mesuré comment, pendant combien de temps, sur combien de personnes ? Une étude sur quelques dizaines de volontaires effectuant une tâche de rédaction en laboratoire ne dit rien de l'économie d'un pays.

```hypemetre
Un nouveau modèle d'IA réussit l'examen du barreau américain :: 2 :: Fait vérifiable, mais l'examen ne mesure pas la pratique du droit. À contextualiser : qui a mesuré, avec quelle méthode ?
L'entreprise X, valorisée à 80 milliards, devient la start-up la plus chère d'Europe :: 2 :: La valorisation est une attente d'investisseurs. Indiquer chiffre d'affaires et pertes.
Une étude sur 50 consultants montre un gain de temps de 25 % sur la rédaction de notes :: 1 :: Résultat précis et borné. Le hype commencerait si l'on en tirait une conclusion sur toute l'économie.
L'IA surpasse désormais les humains dans toutes les tâches cognitives :: 3 :: Affirmation totale, sans mesure identifiable. Aucun benchmark ne couvre « toutes les tâches cognitives ».
```

```quiz
Q: Un communiqué affirme qu'un modèle « surpasse les médecins » sur un test de diagnostic. Que demander en premier ?
- [ ] Le nom des médecins comparés
- [x] Le protocole : quel test, quelles conditions pour les médecins, évaluation indépendante ou non
- [ ] La date de sortie du modèle
> Les comparaisons homme-machine dépendent entièrement des conditions : temps limité, absence d'examen clinique, cas sélectionnés. Le protocole décide du résultat.
```

<!-- module: futurs | 5. Futurs et prédictions -->

# Module 5 — Raconter l'avenir

## Les prédictions sont des actes

« D'ici 2030… » : la prédiction est le genre favori du hype. Elle échappe par construction à la vérification, et personne ne revient en 2030 vérifier qui avait raison. Pourtant, elle produit ses effets tout de suite : on investit, on forme, on légifère en fonction d'elle.

Quelques réflexes :

- **Archiver les promesses.** Les voitures entièrement autonomes ont été annoncées « pour l'année prochaine » à de nombreuses reprises depuis le milieu des années 2010. Rappeler l'historique d'un acteur est une information.
- **Distinguer le possible, le probable et le souhaité.** Un scénario n'est pas une prévision, et une prévision n'est pas un plan.
- **Ouvrir l'éventail.** Si un seul futur est présenté, d'autres ont été écartés. Lesquels, et par qui ?

## L'histoire longue de l'IA

L'intelligence artificielle a connu plusieurs vagues d'enthousiasme suivies de périodes de reflux, souvent appelées « hivers de l'IA », dans les années 1970 puis à la fin des années 1980. Rappeler cette histoire ne revient pas à nier les progrès récents. Cela permet de mesurer combien de promesses passées ressemblent à celles d'aujourd'hui.

## Les risques réels, ici et maintenant

Le débat sur des risques lointains et spéculatifs peut éclipser des dommages documentés : discriminations par des systèmes de tri automatique, surveillance, consommation d'eau et d'électricité des centres de données, conditions de travail des annotateurs, atteintes au droit d'auteur, désinformation synthétique. Couvrir ces sujets, c'est aussi une façon de résister au hype.

```quiz
Q: Un dirigeant affirme que son entreprise atteindra une « superintelligence » d'ici trois ans. Quel élément de contexte est le plus utile au lecteur ?
- [ ] La définition de la superintelligence selon l'entreprise, sans autre commentaire
- [x] Les promesses passées de l'entreprise et de son dirigeant, et ce qu'il en est advenu
- [ ] Le nombre d'abonnés du dirigeant sur les réseaux sociaux
> Le bilan des annonces précédentes est un critère de crédibilité concret, vérifiable, et souvent absent des articles.
```

<!-- module: outils | 6. Boîte à outils -->

# Module 6 — La boîte à outils

## Check-list avant publication

Cochez au fil de votre relecture. Vos cases restent enregistrées dans ce navigateur.

- [ ] J'ai identifié qui fait l'affirmation, et ce que cette source gagne si on la croit.
- [ ] J'ai cherché au moins une voix indépendante de l'entreprise ou de l'institution concernée.
- [ ] J'ai décrit ce que le système fait concrètement, pas ce qu'il « comprend » ou « pense ».
- [ ] Les décisions sont attribuées à des personnes ou à des organisations, pas à « l'IA ».
- [ ] Chaque chiffre a une source, une méthode et un périmètre indiqués.
- [ ] Les scores de benchmark sont présentés avec ce qu'ils mesurent et ce qu'ils ne mesurent pas.
- [ ] Les valorisations sont présentées comme des attentes d'investisseurs, avec les revenus réels quand ils sont connus.
- [ ] Les prédictions sont signalées comme telles, avec l'historique des promesses de leur auteur.
- [ ] Le titre et le chapô ne promettent pas plus que l'article ne démontre.
- [ ] L'illustration montre quelque chose de réel, pas un robot de science-fiction.
- [ ] J'ai mentionné les coûts et les risques déjà documentés, pas seulement les bénéfices annoncés.

## Cinq questions à garder en tête

1. **Quoi ?** Que fait réellement la technologie, aujourd'hui, en dehors de la démonstration ?
2. **Qui ?** Qui l'a conçue, qui la finance, qui en profite, qui en subit les effets ?
3. **Comment le sait-on ?** Quelles preuves, produites par qui, vérifiables comment ?
4. **Par rapport à quoi ?** Quelle référence, quelle alternative, quel coût ?
5. **Quel futur ?** Quel avenir le récit rend-il inévitable, et lequel efface-t-il ?

## Exercice final : le hype-o-mètre

Évaluez chaque titre de 0 (factuel) à 3 (hype pur), puis comparez avec notre lecture. Les titres de cet exercice sont fictifs, construits pour l'entraînement.

```hypemetre
Une IA écrit un roman en une nuit : les écrivains sont-ils condamnés ? :: 3 :: Question rhétorique catastrophiste et généralisation à toute une profession à partir d'un cas.
Le gouvernement annonce un plan de 2 milliards d'euros pour l'intelligence artificielle :: 1 :: Fait vérifiable. À compléter : répartition, calendrier, montants réellement nouveaux.
ChatGPT comprend désormais vos émotions :: 3 :: Anthropomorphisme : le système classe des textes, il ne ressent ni ne comprend.
Des modérateurs kényans témoignent de leurs conditions de travail pour entraîner des IA :: 0 :: Récit documenté, centré sur les personnes, qui montre la fabrique de la technologie.
L'IA va révolutionner l'éducation :: 3 :: Sujet grammatical « l'IA », verbe au futur, promesse totale : trois marqueurs de hype réunis.
Un outil de tri des CV écarte davantage les candidates, selon un audit indépendant :: 0 :: Dommage concret, source indépendante, périmètre précis.
```

<!-- module: credits | Sources et crédits -->

# Sources et crédits

## D'après

Ce parcours est une **adaptation libre en français** du cours en ligne *Hype Literacy*, conçu par la **DW Akademie** (Deutsche Welle) en collaboration avec le collectif de recherche **Hype Studies**. Le cours original, gratuit, est disponible sur [akademie.dw.de/hype-literacy](https://akademie.dw.de/hype-literacy/).

Les textes de cette version ont été rédigés à partir de la présentation publique du cours. Ils ne constituent pas une traduction du texte original et n'engagent ni la DW Akademie ni Hype Studies.

## Pour aller plus loin

- Hype Studies — [hypestudies.org](https://hypestudies.org)
- Better Images of AI — [betterimagesofai.org](https://betterimagesofai.org)
- Lee Vinsel, « You're Doing It Wrong: Notes on Criticism and Technology Hype », 2021
- Borup, Brown, Konrad, Van Lente, « The sociology of expectations in science and technology », *Technology Analysis & Strategic Management*, 2006

## Édition

Version française proposée par **Synth**, média indépendant sur la technologie et l'intelligence artificielle.
