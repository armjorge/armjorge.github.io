---
title: 'Projet : Système d’Intelligence Opérationnelle et Automatisation du Cycle Order-to-Cash'
description: 'Analyse de données évolutive pour les marchés publics avec Snowflake et Snowsight Dashboards'
publishDate: 'Jan 5 2026'
tags:
  - Python
  - Selenium
  - Amazon S3
  - Snowflake
  - Snowpipe
  - SQL
  - Storytelling
  - Snowsight Dashboards
lang: fr
seo:
  image:
    src: '../../../assets/images/SnowFlakeWorkspace.png'
    alt: snowflake Workspace
---


## Le Défi : Silos d'Information et Systèmes Hérités (Legacy)

L'activité se concentrait sur la vente aux institutions publiques via des contrats cadres (accords annuels ou biennaux générant des commandes quotidiennes). Cependant, le cycle **Order-to-Cash** était fragmenté par l'absence d'une « Source Unique de Vérité ». Les données critiques sur les commandes, les livraisons et les encaissements résidaient dans des systèmes étatiques obsolètes, avec des restrictions de consultation strictes et sans API disponible.

**Impact Négatif :**

- **Risque Financier :** Plus de 2 000 transactions quotidiennes dépendaient de rapprochements manuels.
- **Inefficacité Opérationnelle :** Les équipes passaient plus de temps à concilier des données sur Excel qu'à effectuer leurs missions principales.
- **Friction Interdépartementale :** Des réunions de réconciliation constantes étaient nécessaires pour déterminer le solde des contrats ou l'état des livraisons.

### La Solution : Architecture de Données de Bout en Bout (E2E)

J'ai conçu et mis en œuvre une solution complète pour automatiser l'acquisition, le traitement et la visualisation des données :

1. **Acquisition (Python & Selenium) :** Développement d'un moteur de *web scraping* émulant le comportement humain pour extraire des rapports des systèmes hérités, transformant des portails inaccessibles en flux de données (*datastreams*) constants et reproductibles. [Disponible sur GitHub](https://github.com/armjorge/IMSS_SAI_PREI)
2. **Infrastructure (AWS S3 & Snowflake) :** Mise en place d'un flux de chargement automatisé vers Amazon S3. Grâce à **Snowpipe**, Snowflake traite les fichiers immédiatement via une architecture *serverless* à faible coût.
3. **Intégrité et Qualité (SQL & Jinja) :** Création de vues dynamiques et de processus de nettoyage pour éliminer les doublons et lier automatiquement les bons de commande aux factures et aux statuts de trésorerie.

### Impact et Résultats : De la Réaction à la Stratégie

Cette mise en œuvre a transformé la culture opérationnelle de l'entreprise :

* **Conversion de Trésorerie à 100 % :** Visibilité totale sur les factures en cours et les systèmes d'affacturage, garantissant qu'aucun revenu ne soit perdu.
* **Élimination des Frictions :** Suppression des réunions de rapprochement manuel ; tous les départements consultent désormais la même donnée en temps réel.
* **Prévisibilité Financière :** Le département financier dispose désormais de flux de trésorerie projetés avec une précision totale.
* **Contrôle Logistique :** Capacité de superviser et d'auditer deux prestataires logistiques en parallèle via des KPIs automatisés de conformité de livraison.
* **Efficacité des Coûts :** Traitement de plus de 3 000 enregistrements avec un coût d'exploitation cloud inférieur à **10 USD par mois**.

![Workspace Snowflake](../../../assets/images/SnowFlakeWorkspace.png)

### Ce que ce projet démontre de mon profil :

- **Capacité de Résolution :** Je ne m'arrête pas à l'absence d'API ; je construis le pont nécessaire.
- **Vision Business :** Je comprends que les données servent à encaisser plus rapidement et à travailler avec moins de friction.
- **Optimisation des Ressources :** Je conçois des architectures cloud puissantes mais extrêmement économiques.

![Snowflake dashboard](../../../assets/images/SnowFlakeDashboard.png)
