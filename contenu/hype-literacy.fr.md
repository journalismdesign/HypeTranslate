<!--
  CONTENU ÉDITORIAL — « Littératie du hype »
  Traduction française du cours « The Hype Literacy Toolkit for Journalists »
  (DW Akademie et Hype Studies, mars 2026), texte original : source/hype-literacy.en.md

  Ce fichier contient TOUS les textes affichés par le site. Le code n'en contient aucun.

  LICENCE DE L'ORIGINAL : Creative Commons BY-NC-ND. Toute diffusion de cette traduction
  suppose l'autorisation préalable de la DW Akademie (clause ND, « pas de modification »).

  Syntaxe :
  - Un commentaire HTML de la forme « module: identifiant | Titre du menu » ouvre un chapitre.
  - Markdown standard : titres, paragraphes, listes, liens, tableaux (| a | b |).
  - Blocs spéciaux (blocs de code nommés) :
      section        numéro de section (séparateur numéroté)
      vue-ensemble   texte d'introduction (markdown), puis « objectifs: phrase » et une liste « - objectif »
      image          chemin :: légende
      galerie        une image par ligne : chemin :: légende (grille)
      carrousel      même syntaxe que galerie, une image à la fois
      video          youtube: identifiant / titre: … / source: URL
      note           encadré (markdown libre)
      citation       auteur: … / portrait: chemin / ligne vide / texte de la citation
      cartes         une carte par ligne : Recto :: Verso
      accordeon      « + Titre » puis le contenu (markdown) jusqu'au titre suivant
      tri            une catégorie par ligne : Catégorie :: élément | élément | …
      paquet         « + Tas :: carte | carte | … », puis la parade (markdown) et « ? question » à poser
      questions      « source: titre », puis une question par ligne (ajoutables au carnet)
      quiz           titre: … (bandeau de la messagerie), puis
                     Q: question / - [ ] mauvaise réponse / - [x] bonne réponse / > explication
                     (plusieurs questions séparées par une ligne vide)
      hypemetre      un titre par ligne : Titre :: note de 0 à 3 :: commentaire
  - Une liste de cases « - [ ] » devient une check-list cochable, mémorisée dans le navigateur.
  - Les quiz, le hype-o-mètre et la check-list sont des ajouts de Synth, absents du cours original.
      image-annotee  image: chemin, puis une ligne par repère : x, y :: titre :: description
  - Dans les légendes, « <br> » force un retour à la ligne.
-->

<!-- module: accueil | Accueil -->

# Littératie du hype

## Boîte à outils pour journalistes

```image
assets/cours/ai4media-banner.jpg ::
```

Ce cours présente l'étude du hype comme une force pressante, qui façonne le développement technologique, l'économie, la politique et le journalisme. Il s'adresse aux professionnels du journalisme et des médias, mais il peut aussi servir d'introduction au hype à toute personne intéressée : étudiants, designers, universitaires ou auteurs.

Les informations qui circulent autour des technologies émergentes, comme l'IA, le quantique ou les nouveaux voyages spatiaux, promettent une transformation radicale. Le problème, c'est que ces récits répètent les promesses de l'industrie et les visions apocalyptiques au lieu de les interroger. Aujourd'hui, par exemple, les titres promettent que « l'IA va tout changer » : l'IA y est présentée comme une « force révolutionnaire », une « menace mortelle », voire traitée comme une entité quasi divine. Une grande partie du paysage médiatique actuel est devenue un amplificateur du hype dépourvu d'esprit critique. Or le hype n'est pas neutre.

Les modules du cours expliquent comment le hype façonne la perception du public, génère de l'attention, de la richesse et de l'innovation, tout en faussant les priorités, en réduisant les alternatives au silence et en creusant les inégalités mondiales.

C'est pourquoi les journalistes ont besoin d'une littératie du hype. Dans ce cours approfondi, à suivre à son rythme, ils apprendront à reconnaître ces dynamiques, à démasquer les méthodes du hype et à traiter l'IA avec nuance.

Le cours a été conçu par des auteurs issus de l'écosystème [hypestudies.org](https://hypestudies.org/). En septembre 2025, un collectif transnational de chercheurs, de journalistes et de praticiens, à la fois préoccupés et intrigués par le phénomène du hype dans les sciences et les technologies, s'est réuni à Barcelone pour la première conférence mondiale d'études sur le hype, [« Don't Believe the Hype!? »](https://hypestudies.org/news/hype-studies-conference-don-t-believe-the-hype-was-this-real).

Ce cours modulaire a été créé par trois membres de ce collectif.

**Jascha Bareis**, docteur en science politique et chercheur en études des médias, écrit sur la politique de l'IA, l'oligarchie technologique, la démocratie et la communication politique. Il est chercheur senior à l'université de Fribourg, en Suisse, et cofondateur du réseau hypestudies.org.

**Andreu Belsunces Gonçalves**, sociologue des technologies et du design, étudie la manière dont le futur, la fiction et l'économie façonnent le pouvoir et la gouvernance. Son travail prend la forme de textes, d'installations, de vidéos et de jeux. Il est cofondateur du réseau hypestudies.org et chercheur au sein du groupe Communication Networks and Social Change de l'Université ouverte de Catalogne.

**Johannes Klingebiel**, designer et chercheur, travaille au Media Lab Bayern, à Munich, où il explore les croisements entre technologie, design, journalisme et futurs possibles des médias d'information. Il a auparavant passé cinq ans comme designer et chercheur dans l'équipe innovation de la *Süddeutsche Zeitung*, l'un des principaux quotidiens allemands.

```note
**Note sur cette version.** Traduction française du cours *The Hype Literacy Toolkit for Journalists*, publié en mars 2026 par la [DW Akademie](https://akademie.dw.de/hype-literacy/) en collaboration avec le groupe Hype Studies, avec le soutien du ministère fédéral allemand de la Coopération économique et du Développement. Les citations d'ouvrages en langue étrangère sont des traductions libres, sauf mention contraire. Les titres et slogans visibles sur les images sont laissés dans leur langue d'origine.
```

<!-- module: chapitre-1 | Comprendre ce qu'est le hype (et ce qu'il n'est pas) -->

# Chapitre 1 : Comprendre ce qu'est le hype (et ce qu'il n'est pas)

```section
1
```

## Le hype, qu'est-ce que c'est ?

Le hype se caractérise par une fascination pour l'avenir : des promesses exagérées et irréalistes de création de valeur vont de pair avec un optimisme tapageur qui capte l'attention des investisseurs, des technologues, des responsables politiques, des journalistes et du grand public.

Bien qu'on le considère généralement comme un processus naturel, le hype n'est jamais accidentel : il est stratégiquement fabriqué par les entreprises technologiques, les agences de relations publiques et leurs dirigeants, pour surestimer les effets positifs d'une technologie tout en minimisant ses effets négatifs.

Les médias et le journalisme jouent un rôle essentiel dans ce processus. Ils amplifient le hype et le font circuler dans la société. Prenons pour exemple quelques couvertures récentes de grands titres de presse, aux manchettes spectaculaires sur l'IA :

```image
assets/cours/bildschirmfoto-2025-12-17-um-10-29-34.jpg :: Couvertures 2025 de grandes publications comme le *Daily Mail*, *DER SPIEGEL*, *TIME* et *The Times*.
```

Ces titres montrent que le hype exploite l'incertitude et des émotions comme l'espoir et la peur, en les associant à de fortes attentes. Les formules et les images de couverture transforment l'IA en menace capable de dominer l'humanité, ou en promesse de libérer l'humanité des tâches fastidieuses.

Ces affirmations fortes appellent l'attention. Elles mettent en avant le pouvoir de transformation de l'IA et, ce faisant, légitiment certains points de vue et certains scénarios, ou offrent une tribune à certaines figures et à leur prétendue expertise.

Les journalistes sont confrontés au hype lorsqu'ils rédigent un article ou évaluent la valeur informative d'événements qui se disputent les clics. Les pressions économiques exercées par les moteurs de recherche et les réseaux sociaux orientent souvent leur travail de cadrage, de titraille et de choix des sujets, avec pour objectif d'attirer le plus grand nombre de lecteurs possible.

Les sciences de la communication étudient depuis longtemps les fluctuations de l'attention médiatique, dans l'univers de l'information, des réseaux sociaux ou du marketing. Le pic de cette attention est aussi décrit comme du « sensationnalisme » ou une « frénésie ». Le hype est étroitement lié à ces phénomènes d'attention médiatique accrue, mais il mobilise bien plus d'acteurs et d'aspects, comme nous allons le voir.

### Il faut toute une société pour faire un hype

Le hype est une dynamique qui repose sur la *circulation* de la promotion. Autrement dit, on ne peut pas « hyper » seul. Il y a des acteurs qui déclenchent et mènent le hype, et des acteurs qui l'amplifient et le font circuler dans toute la société.

Si l'on observe les attentes et les affirmations formulées autour d'une nouvelle technologie, on retrouve par exemple des acteurs comme ceux-ci :

| **ACTEUR VISIBLE** | **RÔLE** |
|---|---|
| **MENEURS** (producteurs du hype) | |
| **Géants de la tech** | Créent des visions technologiques, contrôlent les infrastructures, orchestrent les récits. |
| **Start-up et fondateurs** | Promeuvent des futurs radicaux pour gagner en visibilité, attirer des investissements et des partenariats. |
| **Laboratoires de recherche privés** | Apportent une légitimité scientifique et des prévisions qui font autorité. |
| **Scientifiques et ingénieurs** | Font office d'autorités du savoir ; leurs déclarations sont souvent prises pour des faits. |
| **Think tanks, analystes et instituts de politiques publiques** | Lisent et évaluent les marchés, produisent rapports, feuilles de route et scénarios qui formalisent le hype. |
| **Organisations internationales (OCDE, Banque mondiale, FMI)** | Présentent la numérisation et l'innovation comme des nécessités du développement. |
| **Acteurs financiers (gestionnaires d'actifs, analystes boursiers)** | Font bouger les marchés au gré des récits ; encouragent des valorisations portées par le hype. |
| **SUIVEURS** (amplificateurs du hype) | |
| **Journalistes et rédacteurs en chef** | Sélectionnent, cadrent et font circuler les récits du hype, souvent sous la pression de livrer de la nouveauté, vite. |
| **Ministères** | Se servent du hype pour justifier des programmes d'innovation, attirer des investissements et financer la création d'industries nationales. |
| **Agences de sécurité nationale** | Mobilisent le hype (IA, quantique) pour augmenter leurs budgets et justifier le secret. |
| **Influenceurs, youtubeurs, podcasteurs** | Monétisent le hype, produisent des contenus promotionnels accessibles. |
| **Agences de RP et communication d'entreprise** | Fabriquent de la visibilité, mettent en scène les lancements de produits, créent l'urgence. |
| **Utilisateurs précoces et passionnés de technologie** | Fournissent une preuve sociale et étendent le hype à leurs communautés. |
| **Salons et conférences du secteur** | Organisent des spectacles qui concentrent les récits promotionnels. |

Ces acteurs sont reliés par des intermédiaires : les marchés, les pages d'actualité, les fils des réseaux sociaux, les rapports ou les communiqués officiels. Ce sont les arènes où le hype se joue. C'est là que tout se passe :

## *Déclarations FRACASSANTES de gourous de la tech fanfarons, fils d'influenceurs qui débordent, analystes en direct, actions qui s'envolent, investisseurs paniqués, toute une frénésie médiatique…*

Tous ces acteurs ont un rôle dans la dynamique qui se crée autour de certaines attentes et de certaines déclarations.

```note
Les hypes ne se contentent pas de décrire : ils *agissent*. Ils attribuent des rôles, rendent possible, alimentent. Ils font des leaders, produisent des contenus, attirent des investisseurs et orientent l'innovation.
```

## Petite histoire du hype

```carrousel
assets/cours/bildschirmfoto-2025-12-02-um-12-33-49.png ::
assets/cours/folie2.jpg :: Images issues de Wikimedia Commons : <br> [Billie Holiday](https://upload.wikimedia.org/wikipedia/commons/1/13/Billie_Holiday_5.jpg) <br> [Enseigne de pharmacie pour l'héroïne et l'aspirine, avant l'interdiction de l'héroïne aux États-Unis en 1924](https://de.wikipedia.org/wiki/Heroin#/media/Datei:Drug_store_sign_for_products_Heroin_and_Aspirin_before_US_Heroin_ban_1924.jpg)
assets/cours/folie3.jpg :: Images issues de Wikipédia et du wiki Cyberpunk : <br> [Jaquette de *Cyberpunk 2077*](https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg) <br> [Article « Hype » du wiki Cyberpunk](https://cyberpunk.fandom.com/wiki/Hype)
assets/cours/folie4.jpg :: Image issue de Wikimedia Commons : [*Don't Believe the Hype*](https://en.wikipedia.org/wiki/Don't_Believe_the_Hype#/media/File:PE-dontbelieve.jpg)
assets/cours/folie5.jpg :: Image issue de Wikimedia Commons : [affiche du film *Hype!*](https://en.wikipedia.org/wiki/Hype!#/media/File:Hype!_FilmPoster.jpeg)
assets/cours/folie6.jpg :: Image issue de Wikimedia Commons : [*Hyper Hyper*](https://en.wikipedia.org/wiki/Hyper_Hyper#/media/File:Hyper_hyper.jpg)
assets/cours/folie7.png :: Images issues de Wikimedia Commons : logos [AOL](https://de.wikipedia.org/wiki/AOL#/media/Datei:AOL-Logo.svg), [eBay](https://de.wikipedia.org/wiki/EBay#/media/Datei:EBay_former_logo.svg), [Napster](https://fr.wikipedia.org/wiki/Napster#/media/Fichier:Napster_logo.svg), [ICQ](https://de.wikipedia.org/wiki/ICQ#/media/Datei:Logo_ICQ.svg), [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web#/media/File:WWW-LetShare.svg)
assets/cours/folie8.jpg :: Image adaptée de Wikipédia : [bulle Internet](https://en.wikipedia.org/wiki/Dot-com_bubble)
```

```section
2
```

## Le rôle du temps et de l'attention

L'illustration du hype la plus répandue dans les médias, les agences et les start-up est le graphique suivant :

```image
assets/cours/bildschirmfoto-2025-12-05-um-09-10-47.png :: Le *hype cycle* de Gartner est une représentation graphique conçue par l'entreprise Gartner Inc. pour figurer la maturité, l'adoption et l'application sociale de technologies données. <br> *Wikimedia Commons*. [Accès](https://en.wikipedia.org/wiki/Gartner_hype_cycle)
```

Cette représentation du déroulement du hype dans le temps ne vient pas du monde universitaire, mais de [Gartner Inc.](https://www.gartner.com/en), un cabinet américain d'analyse économique.

La réalité est plus complexe. Des chercheurs ont qualifié le cycle du hype de Gartner de « théorie populaire » (*folk theory*). Comment mesure-t-on concrètement l'attention et la visibilité ? Quels sont les intervalles de temps ? Autrement dit, le cycle du hype ressemble à un outil heuristique commode, mais beaucoup de scientifiques l'ont critiqué, à juste titre, comme une illustration de faible valeur analytique. Il ne rend tout simplement pas compte de la complexité du réel. Il suffit d'étirer le graphique ou de zoomer suffisamment pour toujours trouver des hauts et des bas, puis, à terme, des phases plus stables : les marchés sont dynamiques, et la capacité d'attention aussi.

En fait, quand on observe la couverture médiatique des technologies émergentes, les choses sont un peu plus désordonnées :

```image
assets/cours/bildschirmfoto-2025-12-05-um-09-30-48.png :: *Max Roßmann* (2023). Graphique allemand adapté en anglais. Tiré de TA Focus 32/3, *Journal for Technology Assessment in Theory and Practice*. [Accès](https://www.tatup.de/index.php/tatup/article/view/7076)
```

```section
3
```

## L'économie émotionnelle du hype : *tout est dans le spectacle !*

Comme on l'a vu plus haut, un « hypeur » seul ne peut pas provoquer un hype : il lui faut un public pour qu'il prenne de l'ampleur et se propage. Ce public n'est pas un spectateur passif, mais un complice qui agit comme un catalyseur. Comme l'écrit le chercheur Jack Stilgoe : *« Le hype technologique n'est ni une simple exagération, ni une spéculation gratuite ; c'est un acte de persuasion. »*

Le répertoire de la mise en scène du hype recourt à un langage imagé, capable de susciter des émotions pour fédérer une communauté. Cela peut prendre la forme de déclarations fracassantes et d'affirmations exagérées qui célèbrent des bénéfices futurs, des potentiels fabuleux et des perspectives brillantes qu'il faudrait mobiliser. Les hypes évoluent souvent dans des oppositions binaires : espoir contre peur, opportunité contre fenêtre qui se referme, rédemption contre catastrophe. Ce sont des éléments narratifs, comme dans les contes qui ont besoin de suspense. Le problème, c'est qu'ils simplifient aussi fortement la réalité.

Contrairement aux bulles économiques, les hypes renvoient à une dynamique sociale dotée d'une dimension identitaire. Un hype décrit un moment d'extase émotionnelle qui rassemble des gens derrière lui, en « suiveurs ». L'invitation prometteuse à conquérir ce qui semble inaccessible, innocent ou inédit fait naître un sentiment d'appartenance. Ces dynamiques montrent l'attrait psychologique que peut exercer le hype. Les suiveurs ont le sentiment de participer à une mission particulière, persuadés de partager une intuition que d'autres ne voient pas. On fait partie d'un groupe choisi de personnes qui « savent mieux » et qui ont « compris ».

Le hype répond aussi à la complexité de la vie quotidienne, qui peut être stressante et déroutante. Il y a dans les hypes un profond désir d'échapper (ne serait-ce qu'un instant) à tout ce qui entrave et complique l'annonce naïve d'une promesse audacieuse ou d'un avenir doré à l'horizon. En résumé : le hype est un spectacle, qui emprunte au théâtre le jeu, la mise en scène et le récit pour emmener un public en voyage.

```section
4
```

## Le hype ne relève ni de la vérité ni du mensonge : il s'agit de s'en tirer !

Le bon journalisme repose sur la vérification des faits et la confirmation de ce qui se passe réellement avant de le porter à la connaissance du public. Avec le hype, cette pratique est souvent renversée.

Les hypeurs sont passés maîtres dans l'art de convertir l'incertitude et le flou sur l'avenir en un récit d'opportunité excessivement optimiste, au risque d'induire en erreur les décideurs ou d'éclipser d'autres futurs possibles. Ce n'est pas que les hypeurs mentent : c'est plutôt qu'ils se soucient peu des catégories du vrai et du faux, de la différence entre le fait et la croyance. Les hypes exploitent l'incertitude de l'avenir au lieu de donner des repères en la structurant et en l'organisant, comme le font par exemple les scénarios. Les hypothèses débridées sur une croissance qui s'accélère, la transformation de secteurs entiers par l'informatique quantique ou des machines qui accéderaient à la conscience ne sont que quelques exemples parmi beaucoup d'autres.

Les hypes s'apparentent plutôt à ce que le philosophe Harry Frankfurt analyse sous le nom de « *bullshit* » (traduit en français par « baratin » ou « foutaise »). Il conçoit ainsi la relation entre la vérité et le *bullshit* :

```citation
auteur: Harry Frankfurt, 2005, p. 55 (traduction libre)
portrait: assets/cours/harry-frankfurt-at-2017-acls-annual-meeting-1.jpg

*Ce que le baratineur dissimule à son propre sujet […], c'est que la valeur de vérité de ses énoncés ne l'intéresse pas au premier chef […]. Cela ne signifie pas que son discours soit anarchiquement impulsif, mais que le motif qui le guide et le contrôle est indifférent à ce que sont réellement les choses dont il parle.*
```

Tous les hypeurs ne sont pas des baratineurs, mais ils entretiennent un rapport ambivalent à la vérité. Comme le hype relève de la persuasion, de la promotion et de l'improvisation, il use de couleurs et de jeux d'imagination. Plus une promesse technologique est audacieuse, plus les perspectives de croissance et d'investissement esquissées à l'horizon sont grandes, plus on s'éloigne de la vérité pour entrer en territoire hautement spéculatif.

Les présentations de produits de Tesla illustrent parfaitement à quel point le hype a peu à voir avec la vérité et la validité, et beaucoup avec le baratin. Regardez la vidéo où Elon Musk vante le verre blindé indestructible du Cybertruck, une démonstration qui tourne au fiasco.

```video
youtube: udxR5rBq_Vg
titre: Les vitres en « verre blindé » du nouveau Cybertruck de Tesla volent en éclats pendant la démonstration (en anglais)
source: https://www.youtube.com/watch?v=udxR5rBq_Vg
```

Mais au bout du compte, est-ce important que Musk ne tienne pas ses promesses ? Non, car dans une ambiance frénétique, il divertit quand même son public. Et les journalistes, dans les rédactions, continuent d'en parler.

```note
*Les hypes se moquent de ce qui est vrai ou faux.* Ce qui compte en définitive dans un hype : *toute* publicité est bonne à prendre, tant qu'on en parle et qu'on écrit dessus.
```

## Conclusion du chapitre 1

Plusieurs des aspects évoqués ici seront approfondis dans les chapitres suivants : ne vous inquiétez pas si tout n'est pas encore parfaitement clair. Il s'agit simplement de vous donner une vue d'ensemble et de vous sensibiliser aux différentes facettes du hype. Pourquoi le hype est si étroitement lié à la technologie, en quoi il peut être réellement nuisible pour la société, et comment la couverture médiatique peut tomber dans son piège, et l'éviter : ce sera l'objet des prochains chapitres.

La meilleure façon de comprendre le hype, c'est de voir qu'il produit des effets :

1. **Il fait passer l'incertain pour certain.** Il transforme des suppositions sur l'avenir en issues « inévitables ».
2. **Il accélère tout.** Il crée de l'urgence et de la pression, pour que les gens agissent vite, sans aller au bout de leur réflexion.
3. **Il tord les faits.** Il conduit à des affirmations exagérées, des prédictions fragiles et des preuves de piètre qualité.
4. **Il joue avec les émotions.** Il suscite d'abord l'enthousiasme et l'espoir, puis la frustration ou la peur quand les promesses ne sont pas tenues.
5. **Il vend des histoires, pas la réalité.** Il s'appuie sur de grandes promesses, des mots à la mode accrocheurs et des cadrages sélectifs pour capter l'attention.
6. **Il déplace l'argent et les ressources.** Il oriente les financements, les talents et l'attention politique vers ce qui fait l'objet du hype.
7. **Il aligne les acteurs sur un même récit.** Il amène des acteurs différents (entreprises, médias, décideurs) à répéter les mêmes éléments de langage.
8. **Il fait taire la critique.** Il présente un futur possible comme le seul raisonnable ou souhaitable.
9. **Il enferme dans des engagements prématurés.** Il pousse gouvernements et organisations à adopter des outils ou à bâtir des infrastructures avant de savoir s'ils fonctionnent.
10. **Il laisse les entreprises privées fixer les règles.** Il permet à des sociétés de façonner le débat public et les politiques comme si elles étaient des expertes neutres.
11. **Il concentre le pouvoir.** Il profite aux entreprises et aux investisseurs qui maîtrisent le récit, et met tous les autres sur la touche.
12. **Il fausse les agendas politiques.** Il pousse les décideurs à donner la priorité à ce que veut l'industrie du hype, et non à ce qu'indiquent les preuves.
13. **Il alimente les cycles d'emballement et d'effondrement.** Il crée des frénésies de marché suivies de krachs soudains.
14. **Il contribue à faire advenir le futur qu'il vend.** À force de répéter partout le même récit, le hype peut effectivement faire advenir une partie de ce futur.

En ce sens, le hype recoupe en partie des notions que nous avons déjà employées ou que nous rencontrerons dans ce parcours, tout en s'en distinguant. Voici un tableau pour y voir clair parmi les (faux) amis du hype :

| **Notion** | **Description du phénomène** | **Exemples** |
|---|---|---|
| **Hype** | Une dynamique sociale. Produite par la mise en scène émotionnelle et la circulation d'un futur particulier et louable, mais en réalité exploité de façon opportuniste.<br>Qualifier quelque chose de « hype » suggère un statut exagéré et une projection de valeur qui exige l'attention. Les hypes n'apportent aucune littératie du futur. | Intelligence artificielle générale / voitures autonomes / voyages et colonisation spatiale. |
| **Attente** | Une croyance ou un engagement en situation d'incertitude. Une attente crée une obligation d'agir. Elle peut être comblée ou déçue, et fait intervenir la confiance, les émotions (la déception, par exemple), la réciprocité, les sanctions. Une attente est tournée vers l'avenir ; elle peut être plausible et réaliste, ou non. | Interactions humaines fondées sur l'échange de services ou de biens. Croyances sur l'évolution future des marchés, des biens ou des technologies. |
| **Bulle** | Une période où l'évaluation du prix d'un actif dépasse largement sa valeur intrinsèque et de long terme. Une bulle n'est souvent identifiable qu'après coup, une fois qu'elle a « éclaté » et que les prix se sont effondrés. | Tulipomanie / marché des cryptomonnaies / bulle Internet / crédits *subprimes*. |
| **Tendance** | Un phénomène d'attention porté par le goût et le style. Les tendances misent sur les suiveurs, la culture fan, pour mobiliser l'attention, moins sur un acteur central. Le changement observé suggère une progression régulière dans le temps. | Culture fan comme la K-pop / culture de consommation comme la mode / publicité et RP. |
| **Sensationnalisme** | Une tactique, un moyen. Les événements et les sujets sont choisis et formulés pour exciter le plus grand nombre de lecteurs et de spectateurs. Le style peut favoriser des impressions biaisées ou chargées d'émotion plutôt que la neutralité. Manipulation possible des faits, notamment relayée par des « influenceurs », des « leaders d'opinion » ou les RP. | Pièges à clics / *buzzfeeding* / *doomscrolling*. |
| **Alarmisme** | Désigne des tentatives de mise en scène émotionnelle visant à attiser les peurs ou à avertir d'un grand danger de manière amplifiée, surjouée. L'alarmisme recourt à des moyens excessifs ou exagérés pour attirer l'attention sur une menace ou un problème, réel ou imaginaire. Peut apporter une littératie du futur en signalant une situation négligée (le changement climatique, par exemple). | Extinction Rebellion et Fridays for Future / Club de Rome. |

## Réflexion et mise en pratique

Appliquez ce que vous avez appris !

Voici le site de l'écosystème quantique national des Pays-Bas, *Quantum Delta*. Le réseau est [financé à hauteur de 26,4 millions d'euros sur dix ans](https://www.nwo.nl/en/researchprogrammes/national-growth-fund/quantum-delta-nl) par le fonds européen NextGenerationEU.

Testez votre capacité à détecter le hype en cliquant sur les numéros interactifs de l'image. Vous y trouverez des citations de la page web, les éléments de hype, et la description de l'effet recherché.

Mais avant de cliquer, réfléchissez par vous-même : pourquoi les auteurs de cette page utilisent-ils ces éléments en particulier ? Quel rapport avec le hype ?

Entrez maintenant dans le monde des promesses quantiques, et trouvez le hype !

```image-annotee
image: assets/cours/1.jpg
33.4, 32.9 :: « Together, we unlock… » (Ensemble, nous libérons…) :: Créer l'illusion de faire partie d'une communauté choisie, d'élus.
65.0, 51.2 :: « unlike any other in history » (sans équivalent dans l'histoire) :: Éveiller la curiosité et le mystère en insistant sur le caractère unique. Nier tout passé et toute continuité pour faire croire que ce moment précis est le plus important de l'histoire. Susciter un sentiment de grandeur et de sens, sans mentionner aucune réalisation concrète.
53.9, 87.7 :: « Join us in this historic adventure » (Rejoignez-nous dans cette aventure historique) :: Inviter à rejoindre un groupe d'initiés qui va saisir une occasion importante. Créer un sentiment d'unité choisie, d'air du temps, d'appartenance.
77.6, 58.5 :: « Disruptive power », « Quantum revolution », « understanding the universe » (puissance disruptive, révolution quantique, comprendre l'univers) :: Employer toute métaphore évoquant une transformation, un mouvement, un bouleversement et une nouveauté maximum, saupoudrée d'un peu de mystère par la référence à l'inconnu (l'univers).
65.3, 64.3 :: « successful ; improved ; rich ; sustainable ; healthier ; deeper » (réussi, amélioré, riche, durable, plus sain, plus profond) :: Accumuler des adjectifs positifs et des mots à la mode pour susciter l'adhésion et l'image d'un futur désirable, sans jamais rien préciser.
50.4, 78.8 :: « Realise quantum's profound benefits », « possibilities that lie ahead of us », « if we are successful », « historic opportunity », « unlock potential » (concrétiser les profonds bienfaits du quantique, les possibilités qui s'ouvrent devant nous, si nous réussissons, occasion historique, libérer le potentiel) :: Ouvrir une fenêtre d'incertitude sur l'avenir, avec de grands obstacles à surmonter. Esquisser à l'horizon des gains et des potentiels maximum si ce « défi » est relevé. Le schéma typique d'une épopée héroïque.
```

*Page d'accueil de Quantum Delta*. Capture d'écran du site officiel réalisée en janvier 2025, [quantumdelta.nl](https://quantumdelta.nl/).

Pour finir, la vidéo officielle de *Quantum Delta*, présente sur la page d'accueil. Ce film promotionnel affirme : « Everything connects to everything connects to everything » (tout est relié à tout, qui est relié à tout).

La vidéo est très belle et la bande-son grandiloquente, mais que dit réellement ce film qui enchaîne les aphorismes ? Il n'est là que pour créer une émotion. Les dadaïstes seraient fiers !

```video
youtube: dE9Sp41_Fbg?start=24
titre: Building the Netherlands' National Quantum Ecosystem animation: « Everything Connects to Everything » (en anglais)
source: https://www.youtube.com/watch?v=dE9Sp41_Fbg&t=24s
```

```quiz
titre: Quiz : testez vos acquis

Q: Selon le cours, le hype est-il un processus naturel ?
- [ ] Oui : il suit les étapes du cycle de Gartner
- [x] Non : il est fabriqué stratégiquement par les entreprises technologiques, les agences de RP et leurs dirigeants
- [ ] Non : il est uniquement le fait des médias
> Le hype « n'est jamais accidentel ». Les médias l'amplifient et le font circuler, mais ils ne sont qu'un maillon d'une chaîne qui compte des meneurs (géants de la tech, start-up, laboratoires, acteurs financiers) et des suiveurs.

Q: Pourquoi des chercheurs qualifient-ils le cycle du hype de Gartner de « théorie populaire » ?
- [ ] Parce qu'il a été inventé par des journalistes
- [x] Parce qu'il est commode mais de faible valeur analytique : il ne dit ni comment mesurer l'attention, ni sur quelles durées
- [ ] Parce qu'il ne s'applique qu'à l'intelligence artificielle
> La courbe vient d'un cabinet de conseil, pas de la recherche. Les données réelles de couverture médiatique, comme celles de Max Roßmann sur le *New York Times*, dessinent un tracé bien plus désordonné qu'un cycle.

Q: Quelle notion de Harry Frankfurt le cours mobilise-t-il pour décrire le rapport du hype à la vérité ?
- [ ] Le mensonge
- [x] Le *bullshit* (le baratin)
- [ ] La propagande
> Le menteur connaît la vérité et la cache. Le baratineur, lui, est indifférent à la vérité de ce qu'il dit. Les hypeurs ne mentent pas forcément : ils se soucient peu de la différence entre fait et croyance.

Q: Laquelle de ces notions désigne une période où le prix d'un actif dépasse largement sa valeur intrinsèque et de long terme ?
- [ ] Le hype
- [ ] La tendance
- [x] La bulle
> Une bulle n'est souvent identifiable qu'après coup, une fois qu'elle a éclaté. Le hype, lui, est une dynamique sociale plus large : il peut alimenter une bulle sans s'y réduire.
```

<!-- module: chapitre-2 | Le hype des technologies prometteuses -->

# Chapitre 2 : Le hype des technologies prometteuses

```vue-ensemble
La couverture des technologies présente souvent l'innovation comme un progrès inéluctable, mais le hype opère par des mécanismes culturels et politiques plus profonds. Les journalistes doivent comprendre comment et pourquoi les récits de promesse qui entourent les nouvelles technologies façonnent l'imaginaire collectif et transforment la spéculation en obligation. Ce chapitre vous donne des cadres d'analyse pour reconnaître l'enchantement technologique, décoder la rhétorique de la promesse et vous demander quels futurs on est en train de vendre.

objectifs: À la fin de ce chapitre, vous serez capable de :
- comprendre comment les promesses créent une dynamique sociale autour de technologies incertaines
- reconnaître les schémas de l'enchantement technologique et les récits de « saut technologique » (*leapfrogging*)
- identifier le cycle promesse-exigence qui transforme la spéculation en obligation
```

```section
1
```

## Pourquoi le hype et la technologie ?

Jusqu'ici, nous avons tenu une chose pour acquise sans le dire : le hype et la technologie sont liés. Mais un aspirateur peut-il faire l'objet d'un hype au même titre que l'IA ?

La réponse : tout dépend du potentiel de transformation que l'on projette sur une technologie. Car c'est bien de cela qu'il s'agit avec la technologie : de changement social. Le hype fonctionne si bien dans ce domaine parce qu'il puise dans un récit culturel familier, que l'on entend chaque jour : la croyance selon laquelle les nouvelles technologies apportent naturellement le progrès et rendent obsolètes les vérités anciennes et les modes de vie établis.

```section
2
```

## Le hype et la modernité vont de pair

Quand on observe le hype dans ce contexte, on pense inévitablement au capitalisme et à son mantra de l'efficacité, des nouveaux marchés et de la transformation sociale.

Mais le hype existe et a existé dans d'autres formes de sociétés. Au XXe siècle, les régimes communistes d'Union soviétique ont façonné la figure du bolchevik soviétique comme « homme nouveau », à la tête de « l'avant-garde ». Des dictateurs comme Mao ou Staline ont enfermé les êtres humains dans un discours de modernisation. Ils ont assigné à toute une classe (le prolétariat) une nécessité permanente de changement et d'ingénierie sociale pilotée d'en haut par l'État.

```image
assets/cours/pc-1958-024.jpg :: Affiche de propagande montrant une société entièrement tournée vers le progrès : le petit livre rouge de Mao traçait la voie. Dans le maoïsme, la modernisation par la technologie était vue comme un levier essentiel de la libération de l'humanité. <br> ***Bravant le vent et les vagues, chacun révèle ses remarquables capacités*** (1958). Collection IISH, PC-1958-024, [chineseposters.net](http://chineseposters.net)
```

La technologie et le hype jouent ici un rôle clé dans la réalisation de ce potentiel anthropologique et dans le bond vers l'automatisation et la modernisation économique. Le *cosmisme russe* et les conquêtes spatiales en sont un excellent exemple, avec le lancement de « Spoutnik 1 » le 4 octobre 1957, puis l'envoi dans l'espace de Youri Gagarine en 1961, premier humain à y parvenir, qui ont alimenté la course à l'espace avec les États-Unis.

À l'époque, responsables publics et gouvernementaux s'étaient emparés du hype spatial pour influencer la perception du public, en véhiculant nouveauté, progrès et leadership. Le hype d'État s'appuyait souvent sur des représentations artistiques et des images pour faire passer ses messages. Envoyer un humain vers les étoiles relevait de l'impossible. Les images étaient saisissantes et pleines d'imagination, portées par la joie d'un optimisme sans limites et la promesse d'un avenir à venir.

```galerie
assets/cours/bildschirmfoto-2025-12-06-um-14-47-07.jpg :: **Affiche diffusée entre 1958 et 1963** <br> ***« Homme soviétique, sois fier : depuis la Terre, tu as ouvert la route des étoiles ! »*** <br> Reproduction, [Business Insider](https://www.businessinsider.com/here-are-the-soviets-extremely-intense-space-race-propaganda-posters-from-1958-1963-2012-4?op=1#the-posters-were-made-between-1958-and-1963-see-translations-under-each-image-1)
assets/cours/bildschirmfoto-2025-12-04-um-12-55-37.jpg :: **Affiche diffusée entre 1958 et 1963** <br> Imaginaire soviétique d'une base spatiale, issu de la pensée cosmiste. <br> Capture d'écran, [MIT Press, *Russian Cosmism*](https://mitpress.mit.edu/9780262552882/russian-cosmism/)
assets/cours/bildschirmfoto-2025-12-08-um-09-52-41.jpg :: **Représentation de la colonie martienne par SpaceX, 2026** <br> L'illustration ressemble étonnamment aux paysages rêvés soviétiques. On voit forcément des parallèles avec le mouvement actuel du « New Space », mené par des milliardaires de la tech. <br> Capture d'écran réalisée en janvier 2026, [spacex.com](https://www.spacex.com/humanspaceflight/mars)
```

```section
3
```

## Enchantement technologique et verrouillage

Face aux merveilles de la transformation technologique, beaucoup se laissent emporter par l'image enthousiaste d'un avenir qui ne s'est pas encore réalisé. Le hype amplifie alors ces promesses. Il les rend plus bruyantes, plus urgentes et plus difficiles à remettre en question, en mettant en avant les bénéfices potentiels et en laissant hors champ les risques et les externalités. Les sociétés sont aveuglées par l'enchantement technologique.

```note
L'enchantement technologique peut se décrire comme une rencontre surprenante avec quelque chose que l'on n'attendait pas et à quoi l'on n'est pas tout à fait préparé. Il désigne le sentiment d'émerveillement, de fascination, voire d'attrait magique que l'on éprouve au contact de technologies avancées ou innovantes. Le terme associe l'idée de « technologie », l'application pratique de connaissances scientifiques, à celle d'« enchantement », un sentiment de ravissement, de mystère ou d'envoûtement.
```

Cet enchantement a aussi des conséquences politiques. En présentant l'innovation comme irrésistible et positive par nature, le hype masque les rapports de pouvoir qui sous-tendent le développement technologique. Il peut faire passer le lobbying pour une expertise neutre, ou l'intérêt d'une entreprise pour l'intérêt général. Restons sur l'exemple des voyages spatiaux. Quand la NASA traversait une crise en 2010, c'est le gouvernement Obama qui a permis la privatisation des vols spatiaux, [en finançant SpaceX, l'entreprise d'Elon Musk, avec de l'argent public](https://fee.org/articles/does-obama-deserve-credit-for-elon-musk-s-spacex-triumph-yes-and-no/). La commercialisation de l'espace va de pair avec la défense de l'influence mondiale américaine et la sécurisation de nouveaux marchés. Cela crée de très fortes dépendances entre public et privé. Aujourd'hui, Elon Musk peut se présenter comme le défenseur de l'intérêt public américain, des constellations Starlink à SpaceX.

Le *leapfrogging*, ou « saut technologique », est une forme particulière d'enchantement technologique. C'est l'idée prometteuse selon laquelle les pays du Sud global pourraient sauter les étapes les plus lentes du développement en adoptant directement les technologies les plus récentes. En pratique, ce saut a rarement lieu : les technologies avancées dépendent toujours d'infrastructures fiables, d'institutions stables et de capacités locales que l'on ne peut pas simplement « enjamber ».

Comme l'[écrit](https://www.science.org/doi/10.1126/science.adz9028) Rose M. Mutiso, directrice de l'[African Tech Futures Lab](https://www.africantechfutures.org/) (2025) :

```citation
auteur: Rose M. Mutiso (traduction libre)
portrait: assets/cours/bildschirmfoto-2026-01-08-um-17-40-39.jpg

*« Le concept de saut technologique, selon lequel les pays en développement pourraient sauter des étapes traditionnelles du développement ou certaines technologies en place pour adopter des approches plus récentes, domine depuis des décennies le discours sur le développement de l'Afrique. Le téléphone mobile en est le [succès emblématique](https://www.sciencedirect.com/science/article/abs/pii/S0040162508001753) : son adoption rapide en Afrique, du milieu des années 1990 aux années 2000, a nourri l'espoir de reproduire ce phénomène dans d'autres secteurs. Pourtant, malgré son omniprésence dans les discours politiques et les stratégies de développement, le saut technologique reste un concept flou et idéalisé, une forme de [techno-optimisme radical](https://rosemutiso.substack.com/p/afrofuturism-for-policy-wonks) qui traite l'Afrique comme une toile vierge pour de grandes expériences, affranchies des réalités du terrain. »*
```

Comprendre le fonctionnement des promesses et de l'enchantement aide les journalistes à distinguer l'aspiration de la preuve, et à révéler quels futurs sont promus et quelles réalités sont laissées hors du cadre.

Le problème, c'est qu'à mesure que les promesses de progrès technologique et de saut technologique circulent, elles deviennent vite des attentes, puis des exigences. Des institutions, des entreprises ou des États peuvent facilement se sentir obligés d'investir dans une technologie ou de l'adopter, simplement parce que le futur promis a pris de l'élan dans la société, même quand les preuves sont minces (c'est ce qu'on appelle l'effet de *verrouillage*, ou *lock-in*).

Les journalistes ont ici un rôle particulier : ils peuvent accroître ou réduire la pression sur les institutions publiques et les responsables politiques, en amplifiant sans recul les visions toutes faites des entreprises technologiques, ou en éclairant le public sur les coûts et les risques qui se cachent derrière des perspectives brillantes.

Comme on l'a vu au chapitre précédent, le hype accélère ce processus en y ajoutant urgence et inéluctabilité, et en transformant des visions spéculatives en obligations qui orientent les décisions bien avant que la technologie n'ait fait ses preuves.

```section
4
```

## Conclusion du chapitre 2

Dans ce chapitre, nous avons éclairé le lien entre le hype et la technologie, unis par les promesses de la modernité.

Les découvertes technologiques et scientifiques sont régulièrement rattachées à des récits modernistes du progrès, en particulier dans les systèmes capitalistes libéraux et dans les États communistes, qui comptent sur la technologie comme levier d'innovation marchande et d'ingénierie sociale. À l'inverse, examiner les récits technologiques permet d'observer les futurs désirés, et nous renseigne sur les ambitions et les aspirations nationales.

La technologie se voit conférer le statut d'un rédempteur sublime qu'il faut encourager et exploiter. Quand ce positionnement réussit, la technologie s'entoure d'une « aura de nécessité pratique indélébile », comme l'observe [Winner (1978)](https://archive.org/details/don00lang/page/n7/mode/2up), et « ignorer ces exigences, ou ne pas les satisfaire suffisamment, revient à attaquer les fondements mêmes sur lesquels repose l'ordre social moderne » (p. 259, traduction libre).

Tout cela renvoie à la dimension politique du hype, que nous aborderons au chapitre suivant.

```quiz
titre: Quiz : testez vos acquis

Q: Qu'appelle-t-on le *leapfrogging*, ou « saut technologique » ?
- [ ] Le passage rapide d'une technologie du laboratoire au marché
- [x] L'idée que les pays du Sud global pourraient sauter des étapes du développement en adoptant directement les technologies les plus récentes
- [ ] Une technique de financement par étapes des start-up
> En pratique, ce saut a rarement lieu : les technologies avancées dépendent d'infrastructures fiables, d'institutions stables et de capacités locales qu'on ne peut pas « enjamber ». Rose M. Mutiso y voit une forme de techno-optimisme radical.

Q: Le hype est-il propre aux sociétés capitalistes ?
- [ ] Oui : il naît de la recherche du profit
- [x] Non : la course à l'espace soviétique ou la modernisation maoïste en sont aussi des exemples
- [ ] Non : il est apparu avec Internet et les réseaux sociaux
> Le cours montre que le hype accompagne les promesses de la modernité, dans les systèmes capitalistes libéraux comme dans les États communistes, qui comptaient sur la technologie pour l'innovation marchande ou l'ingénierie sociale.

Q: Que décrit l'effet de verrouillage (*lock-in*) dans ce chapitre ?
- [ ] Une entreprise qui empêche ses clients de changer de fournisseur
- [x] Des institutions qui se sentent obligées d'investir dans une technologie parce que le futur promis a pris de l'élan, même quand les preuves sont minces
- [ ] Un gouvernement qui interdit une technologie étrangère
> Les promesses deviennent des attentes, puis des exigences. Les journalistes peuvent accroître ou réduire cette pression, selon qu'ils relaient sans recul ou qu'ils éclairent les coûts et les risques.
```

<!-- module: chapitre-3 | La politique du hype -->

# Chapitre 3 : La politique du hype

```vue-ensemble
Le hype n'est jamais neutre : il concentre le pouvoir, façonne les agendas et marginalise les futurs alternatifs. Comprendre le hype comme une force politique, c'est voir comment il fonctionne comme mode de gouvernance, détermine quelles voix comptent, et quel rôle il joue dans une économie fondée sur le risque et la dette.

Ce chapitre propose des cadres pour analyser les rapports de pouvoir derrière les récits technologiques et identifier les intérêts servis.

objectifs: À la fin de ce chapitre, vous serez capable de :
- reconnaître le hype comme un mécanisme de pouvoir et de gouvernance
- identifier les acteurs qui produisent le hype, l'amplifient et en profitent
- vous demander quels futurs sont rendus visibles et lesquels restent cachés
```

```section
1
```

## Pourquoi le hype est une question de pouvoir

Le hype est une forme de pouvoir parce qu'il contribue à définir ce à quoi l'avenir devrait ressembler, qui le façonnera et comment on y parviendra. Il ne se contente pas de communiquer des idées : il oriente l'attention, fixe des priorités et limite ce que les gens jugent possible. Ce faisant, il sert les intérêts et la vision du monde de ceux qui détiennent déjà un avantage structurel : entreprises, gouvernements, institutions de recherche d'élite et experts bien introduits.

Le hype fonctionne aussi comme une forme d'anticipation. En projetant des promesses ou des avertissements assurés sur l'avenir, des acteurs puissants peuvent orienter l'action présente : mobiliser des ressources, influencer la réglementation et s'assurer un soutien politique bien avant que les technologies ne fonctionnent réellement.

### Le hype, instrument de fixation de l'agenda

En pratique, le hype sert à fixer l'agenda : il détermine quelles questions technologiques deviennent urgentes, quelles histoires dominent le débat public et quelles préoccupations sont reléguées au second plan. Quand une technologie fait l'objet d'un hype, il devient difficile pour les journalistes, les décideurs et les institutions de l'ignorer, quels que soient sa maturité réelle et l'état des preuves.

En conséquence, les agendas publics et institutionnels se réorganisent souvent autour du hype. Les ressources affluent vers ce qui est présenté comme « la prochaine grande révolution » et se détournent des secteurs qui n'ont pas la même force narrative.

```note
La place prise récemment par l'IA dans le débat public en est un exemple clair : en Europe comme aux États-Unis, des investissements publics et privés massifs se sont dirigés vers l'IA ces dernières années, tandis que le financement de la lutte contre le changement climatique, pourtant important, peine souvent à conserver son élan politique malgré des alertes scientifiques de plus en plus pressantes.
```

Ce qui est présenté comme urgent, transformateur ou économiquement prometteur détermine où vont les talents, les capitaux et la volonté politique. Avec, souvent, des conséquences bien réelles sur les problèmes que l'on résout et ceux que l'on laisse en suspens.

### Le hype, mécanisme de gouvernance

Le hype ne façonne pas seulement la conversation publique : il gouverne aussi la manière dont les institutions prennent leurs décisions. Quand des acteurs puissants présentent des futurs technologiques à la fois désirables et inévitables, ils poussent gouvernements, régulateurs et institutions publiques dans une posture réactive, déterminée davantage par l'anticipation et la peur d'être distancé que par les preuves ou la délibération démocratique.

Les géants de la tech et les laboratoires de recherche d'élite se servent du hype pour se poser en gardiens naturels des futurs technologiques. Par des récits de crise, l'expertise technique et des promesses de sécurité, ces acteurs revendiquent une autorité privilégiée sur ce qu'il faut construire, protéger ou réglementer.

```note
Les débats sur l'intelligence artificielle générale (IAG) illustrent clairement cette dynamique. Des entreprises et des personnalités en vue, influencées par le long-termisme, affirment souvent que l'IAG présente des risques existentiels sans précédent, des risques eux-mêmes spéculatifs puisqu'ils pourraient se produire à l'avenir. Elles en concluent que les décisions sur la manière de construire ou de réglementer ces systèmes devraient revenir avant tout à des experts techniques, au sein d'un petit groupe de laboratoires spécialisés. Le contrôle public, la délibération démocratique et une participation plus large de la société sont présentés comme trop lents, trop mal informés ou trop dangereux au vu des « enjeux ». Résultat : des futurs spéculatifs servent à justifier la concentration du pouvoir dans des institutions privées, ce qui revient à transférer les décisions sur notre avenir commun des espaces démocratiques vers des élites techniques.
```

Le hype légitime aussi la gouvernance par anticipation : des politiques justifiées non par la réalité présente, mais par des risques spéculatifs et des percées imaginées, comme celles que mettent en avant les récits du risque existentiel. Dans cette situation, les attentes sur des futurs incertains peuvent être mobilisées pour réorienter des ressources, redéfinir des priorités politiques ou justifier des mesures d'exception. Ces attentes deviennent des instruments politiques.

Le hype réorganise ainsi les agendas des États autour d'impératifs technologiques. Au lieu de gouverner les technologies dans l'intérêt général, les gouvernements gouvernent de plus en plus *en fonction* d'elles, en alignant leurs politiques, leurs investissements et leurs discours publics sur les visions promues par les faiseurs de hype les plus influents. Il en résulte un déplacement du pouvoir : le contrôle démocratique s'affaiblit, tandis que des acteurs privés acquièrent une influence disproportionnée sur l'orientation du développement technologique et social.

```note
L'investisseur en capital-risque Peter Thiel a [déclaré](https://slate.com/news-and-politics/2012/02/investor-peter-thiel-is-the-billionaire-behind-ron-pauls-presidential-campaign.html) : « Ce qui me plaît dans la technologie, c'est que lorsqu'elle n'est pas réglementée, on peut changer le monde sans demander l'autorisation des autres. Dans le meilleur des cas, elle n'est pas soumise au contrôle démocratique, ni à la majorité, qui est souvent hostile au changement, selon moi. » (traduction libre)
```

### Le hype, menace pour la démocratie

La décision démocratique demande de la délibération, du temps et l'inclusion de perspectives diverses. Le hype va dans la direction opposée : il comprime le temps en créant un sentiment d'urgence qui décourage l'examen critique et présente les processus démocratiques comme des obstacles au progrès.

Cette accélération légitime des acteurs privés comme gouverneurs de fait d'infrastructures technologiques clés, en écartant le contrôle public. Les récits de promesses excessives supplantent l'élaboration de politiques fondées sur les preuves, tandis que le hype médiatique rétrécit le débat et affaiblit le pluralisme des savoirs en n'amplifiant qu'un petit nombre de voix et de visions. Ces dynamiques favorisent la capture de l'agenda, la distorsion des politiques publiques et la dépossession des citoyens, et permettent à des futurs spéculatifs de dicter les priorités politiques sans réel contrôle démocratique.

### La légitimité

Pour qu'une promesse technologique façonne le débat public, attire des ressources ou influence les politiques, elle doit être perçue comme légitime. Les attentes ne deviennent puissantes que lorsqu'elles sont validées par des institutions, des communautés d'experts et des récits culturels qui les présentent comme crédibles et souhaitables. Sans légitimité, le hype reste du bruit ; avec elle, il devient une force politique.

Or la légitimité est profondément inégale. Seuls certains acteurs disposent de l'autorité structurelle nécessaire pour définir des futurs plausibles : les géants de la tech, les laboratoires de recherche d'élite, les think tanks influents, les gouvernements bien connectés et les experts qui occupent déjà des positions privilégiées dans la production du savoir. Parce que ces acteurs sont insérés dans des institutions qui inspirent confiance, leurs déclarations sur l'avenir, qu'elles soient prudentes ou exagérées, utopiques ou catastrophistes, portent loin. Ils peuvent mobiliser l'urgence, façonner les agendas et influencer les décisions bien avant que des preuves n'existent.

Les journalistes jouent un rôle essentiel dans ce processus. En raison des habitudes de recherche de sources, de la pression du temps et du besoin d'avis d'experts fiables, les rédactions ont tendance à amplifier les voix déjà dotées d'une légitimité institutionnelle. Ce sont donc toujours les mêmes acteurs qui apparaissent comme interprètes autorisés des futurs technologiques, ce qui renforce la hiérarchie entre ceux qui ont le droit de spéculer et ceux dont les points de vue sont exclus.

Cette concentration de la légitimité a des conséquences politiques. Les acteurs très légitimes peuvent faire circuler des promesses ou des avertissements radicaux sur l'avenir, souvent sans grand examen immédiat. Les horizons lointains, les affirmations spectaculaires et les visions ambitieuses sont plus facilement acceptés quand ils émanent d'institutions de confiance. Cette dynamique donne aux acteurs puissants la capacité de suspendre la critique, de créer l'urgence et de cadrer l'avenir selon leurs propres intérêts.

```note
En pratique, la légitimité détermine quels futurs comptent. Elle décide qui peut s'exprimer sur le développement technologique, qui est cru, et quelles visions sont prises au sérieux dans l'espace public.
```

### L'incertitude

L'industrie technologique projette sans cesse des futurs possibles, mais le hype ne lève pas l'incertitude qui les entoure : il l'organise. En affichant assurance et inéluctabilité, le hype crée l'illusion de la certitude tout en s'appuyant sur le flou, l'ambiguïté et des horizons lointains qui protègent les acteurs de toute obligation de rendre des comptes.

Dans les récits de haute technologie, l'incertitude devient productive : des futurs indéterminés permettent à des acteurs puissants d'imaginer des scénarios audacieux et d'y consacrer des ressources. L'incertitude devient ainsi exploitable : moins l'avenir est clair et prévisible, plus il est facile de justifier un investissement, de repousser l'examen et d'écarter la critique. L'incertitude elle-même devient une source de pouvoir.

Les rédactions et les plateformes médiatiques peuvent prendre part à cette dynamique lorsque le hype leur apporte de l'attention, de la visibilité ou une autorité professionnelle. Chacun de ces acteurs contribue à façonner des récits favorables à ses propres intérêts, à ses ressources et à son agenda institutionnel.

```note
« Il n'y a absolument aucune fatalité, tant qu'on accepte de réfléchir à ce qui se passe », disait le théoricien des médias Marshall McLuhan. Le but du hype n'est donc pas de transmettre une connaissance de l'avenir, mais uniquement de générer de l'attention, de l'élan, et d'accumuler du capital.
```

## L'économie politique du hype

Le hype est tissé dans nos structures économiques et institutionnelles. En plus d'orienter les flux d'investissement, d'attirer des partenariats et d'enflammer le public, il renforce la dépendance des institutions aux infrastructures des géants de la tech, des services de cloud aux outils de données.

Il renforce aussi des dynamiques coloniales : les meneurs et les suiveurs du hype tirent profit d'acteurs rendus invisibles, en les exploitant, eux et leurs ressources, sur le plan du travail, de l'environnement et de l'énergie.

| **ACTEURS INVISIBILISÉS DU HYPE** (concernés mais largement invisibles) | |
|---|---|
| **Personnel et exploitants des centres de données** | Entretiennent les infrastructures qui rendent possibles les technologies en vogue ; apparaissent rarement dans les récits publics. |
| **Travailleurs des mines et de l'extraction** | Fournissent la base matérielle (lithium, coltan, cuivre) des futurs technologiques. |
| **Annotateurs de données et travailleurs fantômes** | Fournissent le travail humain qui se cache derrière l'automatisation apparente de l'IA. |
| **Modérateurs de contenus** | Encaissent les coûts sociaux et psychologiques des écosystèmes de plateformes. |
| **Travailleurs des plateformes** | Assurent les tests, le passage à l'échelle et le fonctionnement des systèmes « plateformisés ». |
| **Populations riveraines des infrastructures** | Subissent les externalités matérielles (consommation d'eau, pollution, accaparement des terres). |
| **Organisations de la société civile, militants** | Dénoncent les externalités, résistent aux dynamiques technocoloniales, contrent le hype. |
| **Groupes marginalisés** | Les plus touchés par le déploiement des technologies, les moins visibles dans les cycles du hype. |

```note
Il a été maintes fois rapporté que les récits d'inéluctabilité technologique associés aux promesses de progrès reproduisent des dynamiques coloniales. Les [centres de données](https://www.youtube.com/watch?v=YKGZ73gzLsw) puisent l'eau et l'énergie des populations locales tout en bénéficiant d'aides publiques ; des systèmes d'IA vendus comme autonomes reposent sur un [travail humain précaire](https://ia.acs.org.au/article/2025/the-company-whose--ai--was-actually-700-humans-in-india.html) ; et des données biométriques sont [collectées auprès de populations pauvres](https://www.technologyreview.com/2022/04/06/1048981/worldcoin-cryptocurrency-biometrics-web3/) pour bâtir des infrastructures d'allure futuriste, censées protéger l'humanité des dangers que l'IA est elle-même supposée créer.
```

Parce qu'il crée des cadres de futurs désirables et des figures héroïques, le hype agit comme un moteur de transformation culturelle, qui renforce des figures comme « l'utilisateur précoce », « l'entrepreneur » ou le « crypto-bro ».

```note
Le capital-risque et la culture entrepreneuriale dépendent fortement du hype. Les start-up évoluent dans une incertitude extrême, où l'attention et les investissements sont rares : les promesses exagérées deviennent une nécessité stratégique. Comme la valeur d'une start-up est liée à l'ampleur et à l'impact qu'elle prétend atteindre un jour, les fondateurs sont encouragés à projeter des futurs audacieux et transformateurs qui les distinguent.

Les sociétés de capital-risque, dont le modèle économique repose sur quelques succès hors norme (*moonshots*), renforcent activement cette dynamique : les grandes promesses attirent les investisseurs, font grimper les valorisations et donnent l'impression d'un élan qui fait tourner l'écosystème. Dans cet environnement, le hype est l'un des principaux moteurs économiques de la culture start-up.

→ Article : [Why Tech Hype is Rising and what Venture Capital has to do with it](https://www.techpolicy.press/why-tech-hype-is-rising-and-what-venture-capital-has-to-do-with-it/) (Pourquoi le hype technologique progresse, et ce que le capital-risque y est pour quelque chose), par Andreu Belsunces pour Tech Policy Press (en anglais)

→ Podcast : [Gil Duran (The Nerd Reich) interroge Catherine Bracy](https://www.thenerdreich.com/techs-psychotic-break-fentanyl-capitalism-bets-on-trump/), autrice de *World Eaters: How Venture Capital is Cannibalizing the Economy* (en anglais)
```

```section
2
```

### À vous

Face à une affirmation technologique fracassante, posez une question simple : *que gagnent-ils si on les croit ?*

```cartes
L'argent :: Levées de fonds, valorisations plus élevées, hausse du cours de l'action, parts de marché, nouveaux clients.
L'influence :: Pouvoir de fixer l'agenda, visibilité dans les débats publics, place centrale dans les discussions politiques.
La pertinence :: Rester sous les projecteurs quand la concurrence est forte et l'attention rare.
La légitimité publique :: Être perçu comme digne de confiance, visionnaire ou indispensable.
L'avantage géopolitique :: Positionner une entreprise, un secteur ou un pays comme leader stratégique.
```

## Conclusion du chapitre 3

Les motivations du hype sont stratégiques. Pour certains acteurs, il est une voie d'accès au capital et à l'avantage commercial. Pour d'autres, il offre un positionnement géopolitique, en cadrant l'avenir national autour du leadership technologique. Beaucoup comptent sur le hype pour leur légitimité publique, en s'appuyant sur des visions ambitieuses pour paraître innovants ou tournés vers l'avenir. D'autres cherchent des financements institutionnels en présentant les technologies émergentes comme essentielles à la croissance économique ou à la sécurité nationale. Dans tout cet écosystème, le hype sert à s'assurer pertinence, influence et ressources dans des contextes incertains : les futurs audacieux ne sont pas de simples choix de communication, mais des stratégies politiques et économiques.

Comprendre ces motivations, et voir qui produit, qui amplifie et ce que le hype dissimule, aide les journalistes à saisir que le hype n'est pas un simple enthousiasme : il est à la fois un enjeu et un instrument de pouvoir.

```quiz
titre: Quiz : testez vos acquis

Q: Face à une affirmation technologique fracassante, quelle question le cours recommande-t-il de poser ?
- [ ] Est-ce techniquement possible ?
- [x] Que gagnent-ils si on les croit ?
- [ ] Les autres médias en ont-ils parlé ?
> Argent, influence, pertinence, légitimité publique, avantage géopolitique : identifier ce que l'émetteur gagne à être cru permet de replacer l'affirmation dans son contexte d'intérêts.

Q: Quel effet le hype a-t-il sur la manière dont les institutions décident ?
- [ ] Il favorise une délibération démocratique plus approfondie
- [x] Il les pousse dans une posture réactive, guidée par l'anticipation et la peur d'être distancées plutôt que par les preuves
- [ ] Il n'a pas d'effet sur les politiques publiques
> Au lieu de gouverner les technologies dans l'intérêt général, les gouvernements finissent par gouverner *en fonction* d'elles, en s'alignant sur les visions des faiseurs de hype les plus influents.

Q: Qui sont les « acteurs invisibilisés » du hype ?
- [ ] Les investisseurs qui préfèrent rester anonymes
- [x] Les annotateurs de données, les travailleurs des mines, les modérateurs, les populations riveraines des infrastructures…
- [ ] Les journalistes indépendants
> Ils sont concernés au premier chef par les technologies en vogue, mais presque absents des récits. Le cours y voit la reproduction de dynamiques coloniales.
```

<!-- module: chapitre-4 | Quand les journalistes amplifient le hype -->

# Chapitre 4 : Quand les journalistes amplifient le hype

```vue-ensemble
Le journalisme n'existe pas en vase clos : il fonctionne au sein de systèmes qui peuvent, sans le vouloir, amplifier le hype au lieu de l'examiner. La pression du temps, le manque de moyens et les incitations institutionnelles créent des vulnérabilités prévisibles, que des acteurs rodés savent exploiter. Ce chapitre examine comment les réalités des rédactions, les stratégies de relations publiques et la nature même de la production de l'information peuvent transformer les journalistes en porte-voix d'affirmations exagérées.

objectifs: À la fin de ce chapitre, vous serez capable de :
- reconnaître les pressions structurelles qui rendent les journalistes vulnérables au hype
- identifier comment les RP et le lobbying fabriquent des récits « dignes d'intérêt »
- comprendre pourquoi l'incertitude scientifique se déforme en passant dans les médias
- repérer les spirales d'amplification avant d'y être entraîné
```

```section
1
```

## La nature de la production de l'information

### La pression du temps et l'information en continu

Dans un environnement d'information permanente, on travaille souvent avec des informations incomplètes. Les premières sources, qu'il s'agisse de porte-parole d'entreprises, de chercheurs en quête d'attention ou de responsables gérant une crise, ont souvent de fortes raisons de façonner le récit avant que le tableau complet n'apparaisse. Même avec les meilleures intentions, la première version publiée d'une histoire est rarement la plus complète.

```note
Prenons la couverture du lancement de GPT-4 par OpenAI, en mars 2023. Les premiers articles, nourris par une communication soigneusement orchestrée et des points presse sous embargo, insistaient sur les capacités et les applications potentielles. Dans la course à l'information, de nombreux médias ont publié des articles mettant en avant des usages spectaculaires et un potentiel révolutionnaire avant que des experts aient pu replacer la technologie dans son contexte : ses limites, les systèmes comparables qui existaient déjà, ou les sérieuses questions sur les données d'entraînement et la fiabilité.
```

### La prime à la nouveauté, au conflit et à la simplicité

Les histoires présentées comme des percées ou des bouleversements fonctionnent tout simplement mieux : elles suscitent plus d'intérêt et touchent plus de monde. Mais cela crée des distorsions prévisibles :

- des évolutions complexes et progressives sont reconditionnées en révolutions soudaines ;
- des résultats nuancés sont aplatis en affirmations binaires (« bon » ou « mauvais », « sain » ou « malsain », « innovant » ou « dépassé ») ;
- les éléments les plus spectaculaires éclipsent des faits plus représentatifs, mais plus discrets.

```note
La couverture médiatique de Theranos l'illustre parfaitement. Le récit de sa fondatrice, Elizabeth Holmes, qui prétendait révolutionner les analyses sanguines avec une seule goutte de sang, était spectaculaire par nature : une jeune femme ayant quitté Stanford s'attaquait à toute une industrie. De grands médias ont amplifié ce récit, avec des couvertures et des portraits célébrant la « percée », avant que des journalistes spécialisés comme John Carreyrou, du *Wall Street Journal*, [puissent enquêter pour savoir si la technologie fonctionnait vraiment](https://www.wsj.com/articles/theranos-has-struggled-with-blood-tests-1444881901). L'angle de la nouveauté faisait passer le scepticisme des débuts pour une incapacité à saisir l'histoire.
```

### La peur de passer à côté

Le hype prend véritablement son élan en désignant de vastes opportunités à venir, qui exigent d'agir au bon moment si l'on ne veut pas laisser filer un grand potentiel. La temporalité est donc une dimension essentielle pour comprendre et négocier les attentes technologiques. Les récits technologiques populaires jouent souvent avec l'histoire pour susciter un sentiment de grandeur, dans le seul but de dire aux suiveurs et aux investisseurs que c'est maintenant qu'il faut investir.

Pour produire un maximum d'élan et un sentiment d'urgence, le hype peut se décrire par le mot grec ancien *kairos*, « le moment opportun » ou « le moment décisif », aussi connu comme la « fenêtre d'opportunité qui se referme ». Les acteurs présentent les technologies émergentes comme le reflet de « révolutions » passées, ou comme des transformations inouïes.

```image
assets/cours/bildschirmfoto-2025-12-08-um-11-24-38.jpg :: Vous souvenez-vous de la frénésie médiatique autour de ChatGPT, juste après son lancement en novembre 2022 ? L'espace public a été inondé d'articles sur la puissance étrange et irrésistible d'une nouvelle technologie, oscillant pour l'essentiel entre l'éloge et la catastrophe. Une grande partie de la couverture médiatique a nourri le spectacle autour de ChatGPT au lieu d'examiner ses promesses de façon critique. <br> Source : Bareis (2026), *Ask Me Anything! ◕‿◕ How ChatGPT Got Hyped Into Being*, [International Journal of Communication](https://ijoc.org/index.php/ijoc/article/view/23922)
```

« Investissez maintenant ! », avant qu'il ne soit trop tard pour participer à quelque chose de grand. « Agissez maintenant et devenez un utilisateur précoce ! », avant que d'autres, plus rapides, ne saisissent la fortune ! L'occasion manquée, ou l'avenir sombre si l'on n'agit pas tout de suite, est un ressort rhétorique courant pour pousser à l'action. Insister sur le coût d'opportunité est donc un trait distinctif des hypeurs, qui pressent leurs suiveurs d'agir immédiatement, de prendre des risques et de voir grand. Dans le hype, l'avenir est à conquérir !

La crainte d'arriver « en retard dans la conversation » peut aussi pousser les rédactions à publier des analyses préliminaires. Une fois qu'une histoire prend de l'élan, attendre la vérification peut ressembler à une prise de risque professionnelle.

```note
Quand un [article de *Nature*, depuis rétracté](https://www.science.org/content/article/short-spectacular-life-viral-room-temperature-superconductivity-claim), a affirmé en 2020 que la supraconductivité à température ambiante avait été obtenue, la course à la couverture d'une possible percée en physique a conduit de nombreux médias à publier des articles enthousiastes avant que la communauté scientifique ait pu examiner sérieusement les travaux. Le scepticisme qui a suivi, puis la rétractation, ont été bien moins couverts.
```

### Des budgets en baisse : faire plus avec moins

C'est la vérité inconfortable avec laquelle nous vivons tous : les rédactions sont contraintes de faire plus avec moins. Résultat, la vérification devient souvent réactive (on corrige les erreurs après publication) au lieu d'être proactive (on vérifie avant de publier).

Ce « [*churnalism*](https://www.tandfonline.com/doi/full/10.1080/21670811.2017.1355026) », la pratique qui consiste à republier des communiqués de presse avec un minimum de travail journalistique supplémentaire, est particulièrement visible dans la couverture des technologies et de la santé. Quand un laboratoire pharmaceutique annonce des premiers résultats d'essais prometteurs, de nombreux médias publient des articles fondés pour l'essentiel sur ses documents de presse, parfois en quelques heures, sans attendre l'avis d'experts indépendants ni consulter les données sous-jacentes. C'est souvent arrivé avec des médicaments contre le cancer, des traitements de la maladie d'Alzheimer et des médicaments amaigrissants.

```section
2
```

## Le rôle des RP, du lobbying et du hype de la recherche

### Comment fabriquer de l'« information »

Comme on l'a vu au chapitre 3, le hype a le pouvoir de fixer l'agenda, et les professionnels de la communication connaissent les vulnérabilités du journalisme et conçoivent leurs supports en conséquence :

- les communiqués de presse mettent en avant des affirmations fortes et des messages simples ;
- les rapports sous embargo et les points presse exclusifs donnent aux journalistes le sentiment d'un accès privilégié ;
- les démonstrations publiques présentent des prototypes comme s'il s'agissait de solutions prêtes à être commercialisées.

```note
Les annonces de « voitures volantes » ou de systèmes « Hyperloop » suivent souvent ce schéma : dévoilement spectaculaire, images de concept impressionnantes, calendriers annoncés juste assez lointains (cinq à dix ans) pour échapper à toute vérification immédiate, entreprises qui se citent souvent les unes les autres, et couverture de suivi qui s'estompe avant l'arrivée des échéances. Chaque nouvelle entreprise du secteur relance un cycle de hype, malgré des décennies de promesses semblables non tenues.
```

Le hype génère souvent des spirales d'amplification : les premiers articles attirent davantage d'attention, ce qui justifie de nouveaux articles, dans un cycle qui s'auto-entretient. Une fois ce cycle lancé, les technologies en vogue deviennent rapidement des priorités culturelles et politiques. Cette dynamique ne reflète pas simplement la réalité technologique : elle la construit activement.

La situation est aggravée par le fait que les critiques de ces concepts disposent rarement des moyens des entreprises qui les vendent. Les histoires positives sur les bouleversements et transformations à venir arrivent dans les rédactions joliment emballées ; les contre-arguments importants, eux, les journalistes doivent aller les chercher activement.

```note
Le cycle de hype du « métavers », en 2021 et 2022, le montre parfaitement. Quand Facebook est devenu Meta, les investissements massifs de l'entreprise et ses déclarations fracassantes sur l'avenir des interactions en ligne ont donné lieu à des milliers d'articles. La plupart ont repris le cadrage de Meta sur une transformation imminente de nos façons de travailler, de nous retrouver et de jouer, tandis qu'une foule d'autres start-up et entreprises reprenaient publiquement l'idée. En 2023, quand l'adoption est restée minime et que les dirigeants de Meta eux-mêmes ont revu le calendrier à la baisse, le sujet avait largement disparu des médias, au lieu de donner lieu à un examen proportionné des raisons pour lesquelles les prédictions ne s'étaient pas réalisées. En mars 2026, Meta a signalé un net recul de ses ambitions dans le métavers, en se retirant de sa plateforme sociale en réalité virtuelle, après que sa filiale de réalité virtuelle a [perdu 19,2 milliards de dollars](https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Fourth-Quarter-and-Full-Year-2025-Results/default.aspx) en 2025.
```

Les journalistes deviennent ainsi des acteurs centraux de ce processus. Même lorsqu'ils s'efforcent d'être critiques, ils travaillent dans des environnements portés par le hype, qui privilégient la nouveauté, la vitesse et la légitimité déjà acquise. Leur couverture contribue à définir ce dont les sociétés parlent et, surtout, ce qu'elles négligent.

### Une incertitude scientifique mal communiquée

La science manie en général des probabilités, des intervalles de confiance et des conclusions soigneusement nuancées. L'information, elle, tend souvent vers des cadrages plus binaires :

- « Une étude montre que X fonctionne » au lieu de « Une étude relève une faible corrélation entre X et Y dans une population donnée » ;
- « Des scientifiques alertent sur un risque catastrophique » au lieu de « Des modèles envisagent un éventail de scénarios selon les choix politiques ».

Point important : la partie consacrée aux limites des études, que les chercheurs incluent pour de bonnes raisons, disparaît souvent des communiqués de presse.

```note
La couverture des sciences de la nutrition incarne ce problème. Des études montrant des associations entre alimentation et santé (souvent dans des populations précises, avec des effets limités) sont traduites en conseils simples : « Le café prévient le cancer » ou « Le vin fait vivre plus longtemps ». Quand des études ultérieures aboutissent à des résultats contradictoires, le public y voit de la confusion plutôt que le fonctionnement normal de la science, qui affine sa compréhension à mesure que les preuves s'accumulent.
```

```section
3
```

## Conclusion du chapitre 4

La vulnérabilité au hype ne tient que pour une part aux mauvais choix de tel ou tel journaliste. Elle est inscrite dans la façon dont la production de l'information fonctionne dans les conditions actuelles. Reconnaître ces schémas est la première étape pour adopter des pratiques qui y résistent :

- **Les incitations institutionnelles comptent** : quand les sources ont quelque chose à gagner, un surcroît de scepticisme s'impose.
- **La structure façonne les résultats** : la pression du temps et le manque de moyens rendent certaines erreurs prévisibles.
- **Le hype s'auto-alimente** : une fois qu'un récit a pris de l'élan, le contredire donne l'impression d'aller contre l'histoire plutôt que de faire du bon journalisme.

L'objectif n'est pas de supprimer l'urgence ni de cesser de couvrir les évolutions émergentes, mais de savoir repérer les moments où ces pressions structurelles risquent le plus d'égarer les journalistes, et de se doter de stratégies (que nous verrons au chapitre suivant) pour garder une distance critique, même sous la pression du bouclage.

```quiz
titre: Quiz : testez vos acquis

Q: Qu'est-ce que le *churnalism* ?
- [ ] Le journalisme de données appliqué aux marchés financiers
- [x] La pratique qui consiste à republier des communiqués de presse avec un minimum de travail journalistique supplémentaire
- [ ] La couverture en continu d'un même sujet pendant plusieurs jours
> Il est particulièrement visible dans la couverture des technologies et de la santé, par exemple quand des résultats d'essais cliniques préliminaires sont repris en quelques heures, sans avis d'experts indépendants.

Q: Dans la rhétorique du hype, que désigne le mot grec *kairos* ?
- [ ] La crise qui suit l'éclatement d'une bulle
- [x] Le moment opportun, la « fenêtre d'opportunité qui se referme »
- [ ] Le discours d'un dirigeant charismatique
> « Investissez maintenant », « agissez avant qu'il ne soit trop tard » : le hype insiste sur le coût de l'occasion manquée pour pousser à agir vite. Les rédactions y sont aussi exposées, par crainte d'arriver en retard.

Q: Quelle partie des articles scientifiques disparaît souvent des communiqués de presse ?
- [ ] Le résumé
- [ ] La bibliographie
- [x] La partie consacrée aux limites de l'étude
> Les chercheurs y précisent la population étudiée, la taille des effets et les incertitudes. Sans elle, une faible corrélation devient « une étude montre que… ».
```

<!-- module: chapitre-5 | Comment couvrir le hype -->

# Chapitre 5 : Comment couvrir le hype

```vue-ensemble
Le journalisme technologique est souvent façonné autant par la persuasion que par les faits. Les journalistes doivent composer avec des affirmations qui exagèrent l'impact, gomment l'incertitude ou promettent un changement inéluctable. Ce chapitre vous donne des outils pratiques pour repérer le hype, vérifier les affirmations spéculatives et apporter du contexte.

objectifs: À la fin de ce chapitre, vous serez capable de :
- identifier les pièges rhétoriques de la couverture des technologies
- dépasser le hype dans votre travail
- poser de meilleures questions tout au long du processus
```

```section
1
```

## Les pièges rhétoriques

Malgré l'aura de froide rationalité de la technologie, le hype est *explicitement émotionnel*. Les histoires racontées doivent toucher les gens pour être crues et suivies d'effet. Pour y parvenir, le hype recourt à un certain nombre de procédés et d'outils rhétoriques.

Distribuez le paquet : retournez chaque carte et posez-la sur l'un des quatre tas. Un tas complet se retourne et révèle la parade, avec les questions à poser, que vous pouvez glisser dans votre carnet.

```paquet
+ Mots à la mode :: 5G | Métavers | Intelligence artificielle | Futur du travail
Les mots à la mode (*buzzwords*) sont des raccourcis pour désigner des domaines technologiques complexes, qu'ils simplifient sous un nom accrocheur. Ils peuvent naître de termes au sens précis dans un jargon spécialisé, puis devenir à la mode chez les non-spécialistes, en perdant au passage leur sens précis.

Les mots à la mode ont une fonction promotionnelle : ils condensent l'incertitude dans une étiquette assurée, qui sous-entend progrès et inéluctabilité. Leur flou permet à de nombreux acteurs (entreprises, investisseurs, décideurs) de projeter leurs propres espoirs ou intérêts sur un même mot. Cette élasticité en fait de puissants outils de persuasion et de hype.
? Que veut dire concrètement la personne qui emploie ce terme, en termes opérationnels ? En cas de doute, demandez-lui de préciser.
? Le terme a-t-il le même sens dans les documents de politique publique, la recherche universitaire et les communiqués de presse ? Sinon, qu'est-ce qui pourrait expliquer ces différences ?

+ Fausse urgence et peur de passer à côté :: « agissez maintenant » | « avant qu'il ne soit trop tard » | « ne prenez pas le risque d'être laissé de côté »
Le délai pour adopter une nouveauté technologique ou y réagir est explicitement présenté comme court, et le temps comme compté. Ce cadrage fait passer l'hésitation pour un risque et l'adhésion pour un choix intelligent ou visionnaire.

Dans certains cas, comme l'IA ou l'exploration spatiale, le développement technologique est présenté comme une course entre nations, alors même que l'objectif concret reste souvent insaisissable.
? Qui définit cette « fenêtre d'opportunité », et qui gagne à ce que les autres se précipitent ?
? Que se passe-t-il si l'on attend ? Quelles preuves montrent que l'urgence est justifiée ?
? Comment l'histoire change-t-elle si l'on traite la même évolution comme un processus de long terme plutôt que comme une occasion fugace ?

+ Prédictions grandiloquentes :: « révolutionnaire » | « qui change la donne » | « disruptif » | « changement de paradigme »
Le journalisme technologique amplifie souvent l'idée qu'un nouveau produit, algorithme ou plateforme va transformer des industries entières, voire la vie humaine elle-même. Ces affirmations donnent le sentiment que nous sommes au bord d'une transformation inéluctable.

Ce langage réduit la complexité à un spectacle. Il passe sous silence les progrès graduels, l'incertitude et la continuité avec les évolutions antérieures. Les grands récits du progrès ont aussi tendance à placer au centre les inventeurs et les investisseurs, en effaçant les contextes sociaux, humains et environnementaux qui rendent le changement technologique possible.
? Qu'est-ce qui rend exactement cette technologie « révolutionnaire » ? Par rapport à quelle référence ?
? Qui en profite, qui en supporte les coûts, et qui est exclu du « jeu » dont on change la donne ?
? Des prédictions semblables ont-elles déjà été faites ? Que s'est-il réellement passé ?

+ Valorisations et hype de l'investissement :: « start-up licorne » | « marché à un milliard de dollars » | « croissance explosive »
Les annonces d'investissement, les levées de fonds et les projections de marché sont présentées comme la preuve de la valeur ou du caractère inéluctable d'une technologie. Les valorisations élevées et l'intérêt du capital-risque deviennent des signaux qui s'auto-renforcent : la couverture médiatique attire les investisseurs, l'investissement attire davantage de couverture, et les deux suscitent dans le public un enthousiasme qui peut entraîner de nouveaux investissements.

Le capital-risque est une catégorie d'investissement à haut risque. Autrement dit, même si les grosses levées de fonds sont présentées comme des réussites, elles sont surtout une obligation : cet argent devra un jour rapporter.

En outre, ce qui est financé n'est pas toujours ce qui fonctionne le mieux, mais ce qui correspond aux récits d'investissement du moment.
? Comment la valorisation annoncée se compare-t-elle au chiffre d'affaires, au nombre d'utilisateurs ou à l'impact démontré ? Que faudrait-il pour que cette valorisation soit justifiée ?
? Les projections financières reposent-elles sur des modèles économiques éprouvés, ou supposent-elles des changements de comportement, des autorisations réglementaires ou des percées technologiques qui n'ont pas encore eu lieu ?
? Combien d'entreprises de ce secteur, présentées avant elle comme « révolutionnaires », n'ont pas tenu des promesses semblables ?
```

```section
2
```

## Bonnes pratiques pour couvrir les sujets propices au hype

### Diversifier les sources

Les fondateurs, les investisseurs, les développeurs ou les chercheurs sont souvent les premières voix citées dans le journalisme technologique. S'ils peuvent éclairer l'innovation et ses intentions, ils ne représentent pas toutes les personnes concernées par une technologie. Leurs points de vue sont généralement promotionnels, tournés vers l'avenir et influencés par des intérêts financiers ou de réputation.

Allez chercher les personnes qui vivent les technologies en pratique, pas seulement celles qui les conçoivent ou les financent : des travailleurs, des utilisateurs finaux, des populations transformées par le déploiement de la technologie. Par exemple, pour un sujet sur une start-up de VTC, interrogez non seulement les fondateurs ou les investisseurs, mais aussi les chauffeurs, les syndicats de taxis locaux et des passagers de milieux socio-économiques différents.

```questions
source: Diversifier les sources
Ma liste de sources surreprésente-t-elle des personnes qui ont à gagner au succès de la technologie ?
Qui est absent de cette histoire ? Le travail ou la vie de qui rendent cette technologie possible tout en restant invisibles ?
Qui en dépend le plus, et qui est le plus exposé à ses défaillances ?
```

### Aller au-delà de l'expérience à la première personne

Le reportage à la première personne peut faire comprendre ce que l'on ressent en utilisant une technologie. Mais il reflète souvent l'expérience des utilisateurs visés ou idéaux de ces technologies : en général, des personnes qui y ont accès, qui savent s'en servir et à qui le produit convient. Pour équilibrer, allez chercher celles dont le point de vue révèle les limites ou les exclusions de la conception.

```questions
source: Aller au-delà de l'expérience à la première personne
Mon expérience personnelle reflète-t-elle celle de l'utilisateur moyen ?
Qui ne peut pas accéder à cette technologie ou se l'offrir, tout en pouvant en subir les effets ?
Qui entretient ou fait fonctionner l'infrastructure qui rend possible ma propre expérience ?
```

### Suivre l'argent

Les journalistes devraient regarder au-delà de l'entreprise à la une ou du fondateur charismatique, et examiner l'écosystème économique qui rend une technologie viable : qui en tire profit aux différentes étapes, qui en absorbe les risques, et qui fournit le travail, souvent négligé, qui fait tenir le système. Dans le cas de l'IA, cela peut vouloir dire s'intéresser à l'annotation des données, à la consommation d'énergie, aux chaînes d'approvisionnement en matériel, aux infrastructures de surveillance ou aux contrats publics.

```questions
source: Suivre l'argent
Qui finance cette technologie, et quel retour en attend-il ?
Quelles entreprises, quels sous-traitants ou quels travailleurs sont indispensables à son fonctionnement, sans être jamais mentionnés ?
Comment l'argent circule-t-il réellement dans ce système : abonnements, licences, extraction de données, marchés publics ?
Qui supporte les coûts (économiques, environnementaux, sociaux) si la technologie échoue ou se déploie de façon inégale ?
```

### Se méfier de l'opposition entre « critiques » et « experts »

Dans les médias, les promoteurs sont souvent présentés comme des « experts », tandis que les voix discordantes sont étiquetées « critiques », comme si elles ne parlaient que par opposition et non par expertise. Ce cadrage fait subtilement pencher la crédibilité du côté de ceux qui promeuvent la nouveauté.

Gardez à l'esprit que les analystes critiques, les éthiciens, les syndicalistes et les chercheurs en sciences sociales ont souvent une connaissance approfondie du domaine, qui révèle des contextes et des compromis plus larges. Ils sont « experts » au même titre que les promoteurs, sinon davantage. Élargissez plutôt le vocabulaire pour refléter l'expertise réelle (chercheur, analyste, universitaire, praticien, etc.).

```questions
source: Se méfier de l'opposition entre « critiques » et « experts »
Est-ce que je présente l'expertise comme seulement technique, ou aussi sociale et éthique ?
Comment équilibrer le récit pour que l'examen critique et l'enthousiasme pèsent autant l'un que l'autre ?
```

### Mettre en avant les incertitudes et se méfier des prédictions

L'un des traits majeurs du hype technologique est sa tendance à lisser les incertitudes et à présenter des futurs spéculatifs comme des certitudes. La rhétorique de l'inéluctabilité (vue dans les chapitres précédents), selon laquelle une technologie va tout changer, remplacer des travailleurs ou résoudre des problèmes mondiaux, remplace des processus complexes et en cours par un récit unique et linéaire du progrès.

Dans le discours technologique, les prédictions se font souvent passer pour des preuves. Des prévisions sont formulées dans le langage des probabilités ou de la pseudo-science (« il y a 70 % de chances d'atteindre l'IAG d'ici 2030 », « l'informatique quantique sera grand public d'ici cinq ans »), ce qui donne l'impression que l'avenir peut être modélisé et mesuré. En réalité, ces affirmations reposent sur des hypothèses, des intérêts économiques et un optimisme sélectif.

Dans le même esprit, les journalistes eux-mêmes devraient être prudents avec les spéculations dans leurs articles. Un bon travail journalistique cherche au contraire à mettre au jour les incertitudes et à montrer des points de vue concurrents. Reconnaître ce que nous ne savons pas renforce la crédibilité journalistique et aide les lecteurs à réfléchir de façon critique aux futurs technologiques.

```questions
source: Mettre en avant les incertitudes et se méfier des prédictions
Qui fait cette prédiction, et qu'a-t-il à gagner à ce qu'elle soit acceptée ?
Quelles données ou quelles recherches étayent l'affirmation ? Sont-elles indépendantes, évaluées par des pairs, ou anecdotiques ?
Quelles conditions sociales, politiques ou économiques devraient changer pour que cette prévision se réalise ?
```

### S'intéresser aux technologies qui font moins de bruit

Le hype est *sélectif*. Il se concentre sur certaines technologies, certaines entreprises et certains récits, et en laisse d'autres dans l'ombre : non parce qu'ils seraient moins importants, mais parce qu'ils sont moins spectaculaires, moins en phase avec les tendances d'investissement du moment, ou moins propices aux grands récits et aux intérêts du capital-risque (voir le chapitre 2).

Les technologies délaissées par le hype sont souvent celles qui ont déjà fait leurs preuves en pratique, mais qui n'ont pas l'élan narratif d'alternatives plus brillantes (voir le décalage d'attention entre l'énergie solaire et l'énergie nucléaire, par exemple). Il peut s'agir d'outils open source, de solutions low-tech ou d'améliorations progressives de systèmes existants. Elles peuvent répondre à des besoins du Sud global, servir des populations marginalisées, ou privilégier l'entretien et la réparation plutôt que le remplacement et la croissance. Il en va de même des technologies développées hors des grands pôles technologiques, par des chercheurs sans soutien du capital-risque, ou dans des domaines dépourvus de porte-parole charismatiques. Il en résulte une carte déformée de l'innovation, qui surreprésente ce qui fait le plus de bruit, pas forcément ce qui est le plus utile ou le plus transformateur.

En couvrant ces technologies, les journalistes peuvent proposer d'autres récits de ce que pourrait aussi être le progrès. Il ne s'agit pas d'abandonner la couverture des technologies émergentes, mais de l'équilibrer en s'intéressant à ce qui fonctionne, à ce qui dure et à ce qui sert les gens plutôt que les investisseurs.

```questions
source: S'intéresser aux technologies qui font moins de bruit
Existe-t-il des alternatives low-tech, open source ou portées par des communautés à la solution très médiatisée qui fait l'objet du hype ?
Quelles innovations voient le jour hors de la Silicon Valley, hors du discours anglophone ou hors des écosystèmes financés par le capital-risque ?
Qui construit des technologies pour répondre aux besoins présents plutôt qu'à des futurs spéculatifs, et pourquoi n'est-ce pas jugé digne d'intérêt ?
```

### Cultiver une conscience historique

Le hype technologique surgit rarement de nulle part. Les nouveaux outils sont souvent présentés comme une rupture explicite avec l'histoire, une révolution ou une disruption. C'est évidemment loin d'être vrai. Les technologies ont toujours une histoire, et ce qui est présenté comme une percée soudaine n'est souvent que la somme de mille petits pas accomplis au fil des dernières décennies.

Les technologies du passé, du chemin de fer et de l'électricité à l'ordinateur personnel, à Internet, aux réseaux sociaux et au big data, ont toutes été entourées de prévisions assurées qui ne se sont pas entièrement réalisées, ou se sont réalisées de façon inattendue. Relire la couverture de l'époque, y compris dans les archives de votre propre média, peut montrer comment des affirmations semblables étaient présentées, quels acteurs en ont profité et quels risques ont été négligés. L'histoire ne se répète pas à l'identique, mais elle rime souvent.

```questions
source: Cultiver une conscience historique
Des affirmations semblables ont-elles été faites à propos de technologies plus anciennes ? Que s'est-il réellement passé ?
Comment cette technologie (ou une technologie comparable) était-elle traitée il y a cinq, dix ou vingt ans ?
Quelles voix ont été amplifiées ou ignorées dans la couverture passée, et comment cela a-t-il façonné la compréhension du public ?
```

```quiz
titre: Quiz : testez vos acquis

Q: Une start-up annonce une levée de fonds record. Qu'est-ce que cela prouve ?
- [ ] Que sa technologie fonctionne
- [ ] Que son marché est assuré
- [x] Surtout que des investisseurs attendent un rendement : la levée est une obligation autant qu'une réussite
> Le capital-risque est un investissement à haut risque. Ce qui est financé correspond aux récits d'investissement du moment, pas forcément à ce qui fonctionne le mieux. Comparez la valorisation au chiffre d'affaires, aux utilisateurs ou à l'impact démontré.

Q: Comment présenter une chercheuse qui conteste les promesses d'une entreprise ?
- [ ] Comme « une critique », pour la distinguer des experts
- [x] Par son expertise réelle : chercheuse, analyste, universitaire, praticienne
- [ ] Sans mentionner sa fonction, pour rester neutre
> Opposer « experts » et « critiques » fait pencher la crédibilité du côté de ceux qui promeuvent la nouveauté. Les voix critiques ont souvent une connaissance du domaine au moins aussi solide.

Q: Pour un sujet sur une start-up de VTC, quelles sources le cours recommande-t-il ?
- [ ] Les fondateurs et les investisseurs, qui connaissent le mieux le projet
- [x] Les fondateurs, mais aussi les chauffeurs, les syndicats de taxis et des passagers de milieux différents
- [ ] Uniquement des utilisateurs de l'application
> Diversifier les sources, c'est aller chercher celles et ceux qui vivent la technologie en pratique, et qui dépendent le plus de ses défaillances.
```

<!-- module: conclusion | Conclusion -->

# Conclusion

## Vers une littératie du hype

Le hype donne souvent l'impression d'être une force naturelle qui accompagne le développement technologique. Ce n'en est pas une. Le hype se fabrique. Il naît d'une combinaison particulière d'affirmations audacieuses, de communication stratégique, de mise en scène émotionnelle et d'autorité institutionnelle. Quand ces éléments circulent dans les rédactions, les arènes politiques et les réseaux d'investisseurs, ils donnent l'impression que certains futurs sont non seulement souhaitables, mais déjà en marche. En reconnaissant le hype comme une dynamique construite et non comme un signal objectif, les journalistes peuvent commencer à voir d'où viennent ces récits et quels intérêts ils servent.

Comprendre le hype, c'est être attentif à la manière dont se fabriquent les attentes, l'urgence et le sentiment d'inéluctable. Des acteurs puissants produisent des promesses pour attirer des ressources, façonner les agendas et se poser en gardiens des futurs technologiques. Ces affirmations circulent facilement parce qu'elles s'appuient sur des croyances culturelles plus larges sur l'innovation et le progrès. Mais sous la surface, le hype dissimule toujours des réalités matérielles : le travail, les infrastructures, les dépendances, et la répartition inégale des risques et des bénéfices. Quand les journalistes apprennent à repérer ces omissions, ils voient plus clairement ce qui est amplifié et ce qui est laissé de côté.

Les journalistes jouent un rôle central pour décider quelles histoires prennent de l'ampleur, quelles voix paraissent faire autorité et quelles visions de l'avenir deviennent plausibles aux yeux du public. Quand le journalisme reproduit l'urgence, la nouveauté et la spéculation sans les examiner, le hype gagne en force et devient plus difficile à contester. Mais quand les journalistes ralentissent, diversifient leurs sources, mettent en avant l'incertitude et présentent les affirmations comme des affirmations et non comme des faits, la dynamique du hype change.

L'espace de la réflexion critique s'élargit dès lors que les journalistes, aussi simple que cela paraisse, font ce qu'ils savent faire de mieux : demander pourquoi. Demander pourquoi, c'est regarder derrière le rideau des déclarations fracassantes, interroger la position d'où parlent les personnalités brillantes, révéler les intérêts de pouvoir, de vitesse et d'argent, et montrer ce qui se passe quand l'attention éclaire certains aspects et en laisse d'autres dans l'ombre.

Au bout du compte, développer une littératie du hype, c'est renforcer la responsabilité démocratique. Elle aide les sociétés à comprendre comment se négocient les futurs technologiques, et quels intérêts dominent cette négociation. En rendant visibles les mécanismes du hype, les journalistes peuvent favoriser des façons d'imaginer l'avenir plus inclusives, plus plurielles et mieux fondées sur les preuves. Le hype ne disparaîtra pas, mais il peut être contextualisé, interrogé et soumis à l'obligation de rendre des comptes. Et cela change profondément la manière dont les sociétés choisissent les voies technologiques qui façonnent leurs réalités sociales.

<!-- module: boite-a-outils | Boîte à outils Synth -->

# Boîte à outils Synth

*Exercices ajoutés par Synth, absents du cours original de la DW Akademie. Ils mettent en pratique les notions des cinq chapitres.*

## Le hype-o-mètre

Évaluez chaque titre de 0 (factuel) à 3 (hype pur), puis comparez avec notre lecture, fondée sur les notions du cours. Les titres sont fictifs, construits pour l'entraînement.

```hypemetre
Une IA écrit un roman en une nuit : les écrivains sont-ils condamnés ? :: 3 :: Prédiction grandiloquente et alarmisme : un cas isolé est généralisé à toute une profession, sur le mode de la catastrophe.
Le gouvernement annonce un plan de 2 milliards d'euros pour l'intelligence artificielle :: 1 :: Fait vérifiable. À compléter en suivant l'argent : répartition, calendrier, montants réellement nouveaux, bénéficiaires.
ChatGPT comprend désormais vos émotions :: 3 :: Anthropomorphisme et mot à la mode : le système classe des textes, il ne ressent ni ne comprend. Quelle définition opérationnelle de « comprendre » ?
Des modérateurs kényans témoignent de leurs conditions de travail pour entraîner des IA :: 0 :: Récit documenté qui donne la parole aux acteurs invisibilisés du hype.
L'IA va révolutionner l'éducation : les écoles qui n'agissent pas maintenant seront dépassées :: 3 :: Inéluctabilité, prédiction grandiloquente et fausse urgence (*kairos*) réunies.
Une start-up quantique valorisée à 3 milliards sans chiffre d'affaires :: 2 :: Le titre donne un élément de contexte utile (pas de revenus), mais la valorisation reste une attente d'investisseurs, pas une preuve de valeur.
Un outil de tri des CV écarte davantage les candidates, selon un audit indépendant :: 0 :: Dommage concret, source indépendante, périmètre précis.
```

## Check-list avant publication

Cochez au fil de votre relecture. Vos cases restent enregistrées dans ce navigateur.

- [ ] J'ai identifié qui fait l'affirmation, et ce que cette source gagne si on la croit.
- [ ] Ma liste de sources ne surreprésente pas les personnes qui ont à gagner au succès de la technologie.
- [ ] J'ai donné la parole à celles et ceux qui vivent la technologie en pratique, ou en subissent les effets.
- [ ] J'ai suivi l'argent : qui finance, qui en profite, qui supporte les coûts si cela échoue.
- [ ] Les voix critiques sont présentées par leur expertise réelle, pas comme de simples « critiques ».
- [ ] Les mots à la mode sont définis en termes concrets et opérationnels.
- [ ] L'urgence affichée est justifiée par des preuves, pas seulement par la peur de passer à côté.
- [ ] Les prédictions sont signalées comme telles, avec ce qu'elles supposent pour se réaliser.
- [ ] Les valorisations et levées de fonds sont comparées aux revenus et à l'impact démontré.
- [ ] Les limites des études citées figurent dans l'article, pas seulement leurs conclusions.
- [ ] J'ai vérifié comment des promesses semblables ont été couvertes par le passé, et ce qu'il en est advenu.
- [ ] Le titre et le chapô ne promettent pas plus que l'article ne démontre.

<!-- module: references | Références et ressources -->

# Références et pour aller plus loin

La bibliographie la plus complète sur le hype est tenue par le groupe hypestudies.org : [hypestudies.org/resources](https://hypestudies.org/resources). Les sources de chaque chapitre sont listées ci-dessous, dans leur langue d'origine.

## Chapitre 1

### Définition du hype

Bareis, J., Roßmann, M., & Bordignon, F. (2023). Technology hype: Dealing with bold expectations and overpromising. *TATuP-Zeitschrift für Technikfolgenabschätzung in Theorie und Praxis*, *32*(3), 10-71. [https://enpc.hal.science/hal-04348493/document](https://enpc.hal.science/hal-04348493/document)

Galanos, V., Belsunces Gonçalves, A., Alvial-Palavicino, C., Bareis, J., Blackwell, B., Charette, M., Cheng, M. Y., Dorofeeva, O., Gloerich, I., Klingebiel, J., Lammar, D., Mehnert, W., Michalec, O., Milne, G., Ravn, L., Roßmann, M., Shanley, D., Shen, J., Soto-Sanfiel, M. T., … Vidmar, M. (2026). Towards Mapping and Defining Critical Hype Studies: Multidisciplinary Insights and Future Directions. Hype Studies. [https://doi.org/10.5281/zenodo.18764034](https://doi.org/10.5281/zenodo.18764034)

Vasterman, P. L. M. (2005). Media-Hype: Self-Reinforcing News Waves, Journalistic Standards and the Construction of Social Problems: Self-Reinforcing News Waves, Journalistic Standards and the Construction of Social Problems. *European Journal of Communication*, *20*(4), 508-530. [https://doi.org/10.1177/0267323105058254](https://doi.org/10.1177/0267323105058254) (Original work published 2005)

Palavicino, C. A., & Konrad, K. (2015). How technology consultants assess the graphene and 3D printing hype. Retrieved from [https://www.academia.edu/download/69160155/download.pdf](https://www.academia.edu/download/69160155/download.pdf)

Powers, D. (2012). Notes on hype. *International Journal of Communication*, *6*, 17. [https://ijoc.org/index.php/ijoc/article/view/1441](https://ijoc.org/index.php/ijoc/article/view/1441)

Ramiller, N. C. (2006). Hype! Toward a theory of exaggeration in information technology innovation. *Academy of Management Proceedings*, *2006*(1), A1–A6. [https://doi.org/10.5465/ambpp.2006.27169062](https://doi.org/10.5465/ambpp.2006.27169062)

### Histoire du hype

Belsunces, A., & Bareis, J. (2025, August 21). *Expanding hype literacy to protect democracy*. Techpolicy.press. Retrieved from [https://www.techpolicy.press/expanding-hype-literacy-to-protect-democracy/](https://www.techpolicy.press/expanding-hype-literacy-to-protect-democracy/)

Galanos, V. (2023). To have done with the metaphor of summers and winters: Can AI and internet history cure hype?. *SSRN 4640305*. Retrieved from [https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4640305](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4640305)

Geiger, S. (2020). Silicon Valley, disruption, and the end of uncertainty. *Journal of cultural economy*, *13*(2), 169-184. [https://www.tandfonline.com/doi/full/10.1080/17530350.2019.1684337](https://www.tandfonline.com/doi/full/10.1080/17530350.2019.1684337)

Vasterman, P. L. M. (2005). Media-Hype: Self-Reinforcing News Waves, Journalistic Standards and the Construction of Social Problems: Self-Reinforcing News Waves, Journalistic Standards and the Construction of Social Problems. *European Journal of Communication*, *20*(4), 508-530. [https://doi.org/10.1177/0267323105058254](https://doi.org/10.1177/0267323105058254) (Original work published 2005)

Wadhwani, R. D., & Lubinski, C. (2025). Hype: Marker and maker of entrepreneurial culture. *Journal of Business Venturing*, *40*(2), 106455. [https://www.sciencedirect.com/science/article/pii/S0883902624000776](https://www.sciencedirect.com/science/article/pii/S0883902624000776)

### Le rôle du temps et de l'attention

Belsunces, A. (2022, November 22).* Chronopolitics, or the Politics of Time Between Finance and Computing.* CCCB Lab. Retrieved from: [https://lab.cccb.org/en/chronopolitics-or-the-politics-of-time-between-finance-and-computing/](https://lab.cccb.org/en/chronopolitics-or-the-politics-of-time-between-finance-and-computing/)

Bareis, J. (2026). ‘Ask Me Anything! ◕‿◕ - How ChatGPT Got Hyped Into Being’. International Journal of Communication 20 (January): 27–27. [https://doi.org/10.65476/gm817j57](https://doi.org/10.65476/gm817j57).

Bareis, J., Roßmann, M., & Bordignon, F. (2023). Technology hype: Dealing with bold expectations and overpromising. *TATuP-Zeitschrift für Technikfolgenabschätzung in Theorie und Praxis*, *32*(3), 10-71.[https://enpc.hal.science/hal-04348493/document](https://enpc.hal.science/hal-04348493/document)

Borup, M., Brown, N., Konrad, K., & Van Lente, H. (2006). The sociology of expectations in science and technology. *Technology analysis & strategic management*, *18*(3-4), 285-298. [https://doi.org/10.1080/09537320600777002](https://doi.org/10.1080/09537320600777002)

Rip, A. (2006). Folk theories of nanotechnologists. *Science as Culture, 15*(4),349–365. [https://doi.org/10.1080/09505430601022676](https://doi.org/10.1080/09505430601022676)

### L'économie émotionnelle du hype : tout est dans le spectacle !

Davis, A. (2013). *Promotional cultures: The rise and spread of advertising, public relations, marketing and branding*. London, UK: Polity.

Debord, G. (1967). *Society of the spectacle*. Marxists.org. Retrieved from [https://www.marxists.org/reference/archive/debord/society.htm](https://www.marxists.org/reference/archive/debord/society.htm)

Goffman, E. (1959). *The presentation of self in everyday life*. London, UK: Penguin. Free access under: [https://archive.org/details/presentationofs00goff](https://archive.org/details/presentationofs00goff)

Stilgoe, J. (2020). *Who’s driving innovation? New technologies and the collaborative state. *Cham, Switzerland: Palgrave Macmillan. [https://link.springer.com/book/10.1007/978-3-030-32320-2](https://link.springer.com/book/10.1007/978-3-030-32320-2)

Oomen, J., Hoffman, J., & Hajer, M. A. (2022). Techniques of futuring: On how imagined futures become socially performative*. European Journal of Social Theory, 25*(2),252–270. [https://journals.sagepub.com/doi/full/10.1177/1368431020988826](https://journals.sagepub.com/doi/full/10.1177/1368431020988826)

Wernick, A. (1991). *Promotional culture: Advertising, ideology, and symbolic expression. *London, UK: SAGE Publications. Free access under: [https://archive.org/details/promotionalcultu0000wern](https://archive.org/details/promotionalcultu0000wern)

### Le hype ne relève ni de la vérité ni du mensonge : il s'agit de s'en tirer !

Belsunces, A. (2025). Sociotechnical Fictions: The Performative Agencies of Fiction in Technological Development. *Science & Technology Studies*. [https://doi.org/10.23987/sts.131333](https://doi.org/10.23987/sts.131333)

Bourne, C. (2024). AI hype, promotional culture, and affective capitalism. *AI and Ethics*, *4*(3), 757–769. [https://doi.org/10.1007/s43681-024-00483-w](https://doi.org/10.1007/s43681-024-00483-w)

Frankfurt, H. G. (2005). *On bullshit*. Princeton, NJ: Princeton University Press. Free access under: [https://vultureofcritique.wordpress.com/wp-content/uploads/2016/10/harry-g-frankfurt-on-bullshit-princeton-university-press-2005.pdf](https://vultureofcritique.wordpress.com/wp-content/uploads/2016/10/harry-g-frankfurt-on-bullshit-princeton-university-press-2005.pdf)

Kotliar, D. M. (2025). Can’t stop the hype: Scrutinizing AI’s realities. *Information, Communication & Society*, 1–22. Advance online publication.[https://doi.org/10.1080/1369118X.2025.2531165](https://doi.org/10.1080/1369118X.2025.2531165)

Leaver, T., & Srdarov, S. (2023). ChatGPT isn’t magic: The hype and hypocrisy of generative Artificial Intelligence (AI) rhetoric. *M/C Journal*, *26*(5). [https://doi.org/10.5204/mcj.3004](https://doi.org/10.5204/mcj.3004)

## Chapitre 2

### Le hype et la modernité vont de pair

Bareis, J., & Katzenbach, C. (2021). Talking AI into Being: The Narratives and Imaginaries of National AI Strategies and Their Performative Politics. *Science, Technology, & Human Values*, *47*(5), 855-881. [https://doi.org/10.1177/01622439211030007](https://doi.org/10.1177/01622439211030007) (Original work published 2022)

Beckert, J. (2016). *Imagined futures. Fictional expectations and capitalist dynamics. *Cambridge, MA: Harvard University Press.

Cohen, M. L. (1993). Cultural and political inventions in modern China: the case of the Chinese "peasant."*Daedalus*, 151-170.

Funk, J. (2019). What’s behind technological hype?. *Issues in Science and Technology*, *36*(1), 36-42. [http://tankona.free.fr/funk19b.pdf](http://tankona.free.fr/funk19b.pdf)

Harrison, M. (2012). Communism and economic modernization. *Available at SSRN 2099517*. [https://papers.ssrn.com/sol3/Delivery.cfm?abstractid=2099517](https://papers.ssrn.com/sol3/Delivery.cfm?abstractid=2099517)

Juma, C. (2022). Leapfrogging Progress The Misplaced Promise of Africa's Mobile Revolution. The Breakthrough Institute. [https://thebreakthrough.org/journal/issue-7/leapfrogging-progress](https://thebreakthrough.org/journal/issue-7/leapfrogging-progress)

Mutiso, M.R. (2025). Five rules for technology leapfrogging in Africa. *Science*389,eadz90. DOI:[10.1126/science.adz9028](https://doi.org/10.1126/science.adz9028)

Westad, O. A. (2000). The new international history of the Cold War: three (possible) paradigms. *Diplomatic History*, *24*(4), 551-565. [https://de.scribd.com/document/785685232/westad-three-paradigms-new-international-history-cold-war](https://de.scribd.com/document/785685232/westad-three-paradigms-new-international-history-cold-war)

### Enchantement technologique et verrouillage

Bennett, J. (2001). *The enchantment of modern life: Attachments, crossings, and ethics*. Princeton University Press.

Belsunces Gonçalves, A., & Forlano, L. (2026). World(coin) in the AI future: how sociotechnical fictions are instrumental to the cyberlibertarian transition. AI & SOCIETY, 1-15. [https://link.springer.com/article/10.1007/s00146-026-02913-1 ](https://link.springer.com/article/10.1007/s00146-026-02913-1)

Binder, W. (2024). Technology as (dis-) enchantment. AlphaGo and the meaning-making of artificial intelligence. *Cultural Sociology*, *18*(1), 24–47. [https://doi.org/10.1177/1749975522113872](https://doi.org/10.1177/1749975522113872)

Marx, L. (2000). *The machine in the garden: Technology and the pastoral ideal in America*. Oxford University Press. Free access under: [https://archive.org/details/machineingardent0035edmarx](https://archive.org/details/machineingardent0035edmarx)

Mosco, V. (2005). *The digital sublime: Myth, power, and cyberspace*. Cambridge, MA: MIT Press. [https://direct.mit.edu/books/book/2679/The-Digital-SublimeMyth-Power-and-Cyberspace](https://direct.mit.edu/books/book/2679/The-Digital-SublimeMyth-Power-and-Cyberspace)

Borup, M., Brown, N., Konrad, K., & Van Lente, H. (2006). The sociology of expectations in science and technology*. Technology Analysis & Strategic Management, 18*(3–4), 285–298. [https://www.tandfonline.com/doi/full/10.1080/09537320600777002](https://www.tandfonline.com/doi/full/10.1080/09537320600777002)

Brown, N., Rip, A., & Van Lente, H. (2003,). Expectations in & about science and technology. In *A background paper for the ‘expectations’ workshop of june* (Vol. 177, pp. 371-380). [https://www.researchgate.net/profile/Harro-Van-Lente/publication/46671758_Expectations_in_About_Science_and_Technology/links/0c960527b59d75b7b6000000/Expectations-in-About-Science-and-Technology.pdf](https://www.researchgate.net/profile/Harro-Van-Lente/publication/46671758_Expectations_in_About_Science_and_Technology/links/0c960527b59d75b7b6000000/Expectations-in-About-Science-and-Technology.pdf)

Geiger, S., & Gross, N. (2017). Does hype create irreversibilities? Affective circulation and market investments in digital health. *Marketing Theory*, *17*(4), 435–454. [https://doi.org/10.1177/147059311769202](https://doi.org/10.1177/147059311769202)

van Lente, H., & Bakker, S. (2010). Competing expectations: the case of hydrogen storage technologies. *Technology Analysis & Strategic Management*, *22*(6), 693–709. [https://doi.org/10.1080/09537325.2010.496283](https://doi.org/10.1080/09537325.2010.496283)

Nordmann, A. (2007). If and then. A critique of speculative NanoEthics. *NanoEthics, 1*(1), 31–46. [https://doi.org/10.1007/s11569-007-0007-6](https://doi.org/10.1007/s11569-007-0007-6)

## Chapitre 3

### Pourquoi le hype est une question de pouvoir

Belsunces Gonçalves, A.. (2025). Deep Hype in Artificial General Intelligence: Uncertainty, Sociotechnical Fictions and the Governance of AI Futures. *arXiv preprint *[*arXiv:2508.19749*](https://arxiv.org/pdf/2508.19749).

Funk, J. (2019). [What’s behind technological hype?.](https://issues.org/behind-technological-hype/) *Issues in Science and Technology*, *36*(1), 36-42.

Galanos, V., Belsunces Gonçalves, A., Alvial-Palavicino, C., Bareis, J., Blackwell, B., Charette, M., Cheng, M. Y., Dorofeeva, O., Gloerich, I., Klingebiel, J., Lammar, D., Mehnert, W., Michalec, O., Milne, G., Ravn, L., Roßmann, M., Shanley, D., Shen, J., Soto-Sanfiel, M. T., … Vidmar, M. (2026). Towards Mapping and Defining Critical Hype Studies: Multidisciplinary Insights and Future Directions. Hype Studies. [https://doi.org/10.5281/zenodo.18764034](https://doi.org/10.5281/zenodo.18764034)

Geiger, S. (2020). Silicon Valley, disruption, and the end of uncertainty. *Journal of cultural economy*, *13*(2), 169-184. [https://doi.org/10.1080/17530350.2019.1684337](https://doi.org/10.1080/17530350.2019.1684337)

Wadhwani, R. D., & Lubinski, C. (2025). Hype: Marker and maker of entrepreneurial culture. *Journal of Business Venturing*, *40*(2), 106455. [https://doi.org/10.1016/j.jbusvent.2024.106455](https://doi.org/10.1016/j.jbusvent.2024.106455)

### Le hype, menace pour la démocratie

Belsunces, A., & Bareis, J. (2025, August 21). *Expanding hype literacy to protect democracy*. Techpolicy.press. Retrieved from [https://www.techpolicy.press/expanding-hype-literacy-to-protect-democracy/](https://www.techpolicy.press/expanding-hype-literacy-to-protect-democracy/)

Belsunces, A. (2025, December 2). *Why Tech Hype Is Rising and What Venture Capital Has to Do with It.* TechPolicy.Press. Retrieved from: [https://www.techpolicy.press/why-tech-hype-is-rising-and-what-venture-capital-has-to-do-with-it/](https://www.techpolicy.press/why-tech-hype-is-rising-and-what-venture-capital-has-to-do-with-it/)

Bracy, C. (2025). *World Eaters: How Venture Capital Is Cannibalizing the Economy*. Dutton / Penguin Random House. [https://www.penguinrandomhouse.com/books/723091/world-eaters-by-catherine-bracy/](https://www.penguinrandomhouse.com/books/723091/world-eaters-by-catherine-bracy/)

Nowotny, H. (2015). *The cunning of uncertainty*. John Wiley & Sons. [https://www.wiley.com/en-us/The+Cunning+of+Uncertainty-p-9780745687612](https://www.wiley.com/en-us/The+Cunning+of+Uncertainty-p-9780745687612)

Meyer, J. W., & Rowan, B. (1977). Institutionalized Organizations: Formal Structure as Myth and Ceremony. *American Journal of Sociology*, 83(2), 340–363. [https://www.jstor.org/stable/2778293.](http://www.iot.ntnu.no/innovation/norsi-pims-courses/harrison/Meyer%20&%20Rowan%20(1977%29.PDF)

Selin, C. (2007). Expectations and the Emergence of Nanotechnology. *Science, Technology, & Human Values*, 32(2), 196–220. [https://doi.org/10.1177/0162243906296918](https://doi.org/10.1177/0162243906296918)

## Chapitre 4

### La nature de la production de l'information

Bareis, J. (2026). ‘Ask Me Anything! ◕‿◕ - How ChatGPT Got Hyped Into Being’. International Journal of Communication 20 (January): 27–27. [https://doi.org/10.65476/gm817j57](https://doi.org/10.65476/gm817j57).

Harnett, Sam, Words Matter: How Tech Media Helped Write Gig Companies into Existence (August 7, 2020). Available at SSRN:[ ](http://dx.doi.org/10.2139/ssrn.3668606) [http://dx.doi.org/10.2139/ssrn.3668606](http://dx.doi.org/10.2139/ssrn.3668606)

King, A. Polluted at the faucet. EMBO Rep 20, EMBR201949600 (2019). [https://doi.org/10.15252/embr.201949600](https://doi.org/10.15252/embr.201949600)

Rinaldi, A. To hype, or not to(o) hype. EMBO Rep 13, 303–307 (2012). [https://doi.org/10.1038/embor.2012.39](https://doi.org/10.1038/embor.2012.39)

### Le rôle des RP, du lobbying et du hype de la recherche

Caulfield, T., Condit, C.; Science and the Sources of Hype. Public Health Genomics 1 April 2012; 15 (3-4): 209–217. [https://doi.org/10.1159/000336533](https://doi.org/10.1159/000336533)

Trinh, A., Turner, L. Challenging Reward Structures and Organizational Cultures that Propagate Stem Cell Hyperbole. Stem Cell Rev and Rep 21, 2810–2819 (2025). https://doi.org/10.1007/s12015-025-10955-z

Vasterman, P. L. (2005). Media-hype: Self-reinforcing news waves, journalistic standards and the construction of social problems. European Journal of Communication, 20(4), 508-530. https://doi.org/10.1177/0267323105058254

## Chapitre 5

### Bonnes pratiques pour couvrir les sujets propices au hype

Caulfield, T., Condit, C.; Science and the Sources of Hype. Public Health Genomics 1 April 2012; 15 (3-4): 209–217. [https://doi.org/10.1159/000336533](https://doi.org/10.1159/000336533)

Harnett, Sam, Words Matter: How Tech Media Helped Write Gig Companies into Existence (August 7, 2020). Available at SSRN: [http://dx.doi.org/10.2139/ssrn.3668606](http://dx.doi.org/10.2139/ssrn.3668606)

King, A. Polluted at the faucet. EMBO Rep 20, EMBR201949600 (2019). [https://doi.org/10.15252/embr.201949600](https://doi.org/10.15252/embr.201949600)

Jackson, D., & Moloney, K. (2016). Inside Churnalism: PR, journalism and power relationships in flux. Journalism Studies, 17(6), 763–780. [https://doi.org/10.1080/1461670X.2015.1017597](https://doi.org/10.1080/1461670X.2015.1017597)

Trinh, A., Turner, L. Challenging Reward Structures and Organizational Cultures that Propagate Stem Cell Hyperbole. Stem Cell Rev and Rep 21, 2810–2819 (2025). [https://doi.org/10.1007/s12015-025-10955-z](https://doi.org/10.1007/s12015-025-10955-z)

<!-- module: mentions | Mentions légales -->

# Mentions légales

## Cours original

**Éditeur :** Deutsche Welle, 53110 Bonn, Allemagne

**Publication :** mars 2026, DW Akademie

**Responsable de la publication :** Carsten von Nahmen

**Conception et idée :** Jascha Bareis, Andreu Belsunces Gonçalves, Johannes Klingebiel, Steffen Leidel

**Édition :** Loveday Wright

**Auteurs :** Jascha Bareis, Andreu Belsunces Gonçalves, Johannes Klingebiel

*Ce cours a été conçu dans le cadre d'une collaboration entre la DW Akademie et le groupe Hype Studies. Les points de vue et opinions exprimés dans cette contribution sont ceux de leurs auteurs et ne reflètent pas nécessairement ceux des responsables du cours à la DW Akademie.*

*Le cours Hype Literacy est placé sous licence Creative Commons. Il ne peut être utilisé qu'en créditant « DW Akademie with support from the German Federal Ministry of Economic Cooperation and Development » (BY), et uniquement à des fins non commerciales (NC). Le cours en ligne ne peut être modifié sans l'autorisation de la DW Akademie (ND).*

[dw-akademie.com](http://dw-akademie.com/) · [hypestudies.org](https://hypestudies.org/)

## Version française

Traduction et adaptation graphique : Synth. Cours original : *The Hype Literacy Toolkit for Journalists*, DW Akademie with support from the German Federal Ministry of Economic Cooperation and Development, [akademie.dw.de/hype-literacy](https://akademie.dw.de/hype-literacy/).

Les fonds photographiques décoratifs de la version originale (images génériques fournies par l'outil de création) ne sont pas repris. Toutes les images de contenu, leurs légendes et leurs crédits le sont.

Les quiz de fin de chapitre, le hype-o-mètre et la check-list avant publication sont des ajouts de Synth, rédigés à partir du contenu du cours. Ils ne figurent pas dans la version originale et n'engagent ni la DW Akademie ni les auteurs du cours.
