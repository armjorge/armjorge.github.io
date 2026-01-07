---
title: 'Analyse de la demande de médicaments et consommables pharmaceutiques dans les marchés publics mexicains 2023-2028'
description: 'Analyse scalable des données d’achats publics avec BigQuery et Looker Studio'
publishDate: 'Jan 2 2023'
tags:
  - Databricks
  - SPARK
  - Insights
  - Storytelling
  - Looker Studio
  - BigQuery
lang: fr
seo:
  image:
    src: '../../../assets/images/Looker_market_analysis.png'
    alt: 'Aperçu du projet'
---

## Le défi des fournisseurs pharmaceutiques dans les achats publics

Les fournisseurs de médicaments et de consommables pharmaceutiques qui souhaitent vendre aux institutions publiques mexicaines sont confrontés à un défi permanent : obtenir une visibilité claire sur la demande réelle du secteur public.

Les questions clés auxquelles ils doivent répondre sont :
- Quels produits sont achetés ?
- Quelles institutions achètent chaque produit ?
- Combien d’unités de chaque produit sont acquises ?
- Comment la demande a-t-elle évolué dans le temps ? Le produit est-il en croissance, en déclin ou même en voie d’exclusion ?

En décembre 2025, les [données de l’achat consolidé pour la période 2027-2028](https://discusion.salud.gob.mx/) ont été publiées, offrant une opportunité unique pour planifier les ressources, ajuster les stratégies commerciales et prioriser le lancement ou l’enregistrement de produits.

Cela nous amène à la question centrale :  
**Quels produits devons-nous prioriser pour le prochain appel d’offres consolidé ?**

Pour y répondre de manière éclairée, il est essentiel de comparer le nouveau cycle avec les procédures précédentes couvrant la même période de deux ans :
1. CC 2023-2024 : Achat consolidé 2023-2024
2. CC 2025-2026 : Achat consolidé 2025-2026
3. CC 2027-2028 : Achat consolidé 2027-2028

## Origine du problème

La base de données regroupe les informations de ces trois procédures biennales, couvrant **4 798 produits uniques** répartis entre **11 institutions**, pour un volume total de **12 685 508 417 unités** acquises. Cela génère plus de **38 000 lignes** de données détaillées. Analyser ce volume manuellement ou avec des outils traditionnels est impraticable et chronophage.

## Notre solution : une analyse structurée et scalable

Chaque produit possède un identifiant unique appelé **Clave de cuadro básico**, permettant un suivi cohérent à travers les différents cycles d’achat.

### Étape 1 : Table maître des produits
Nous avons créé une table contenant toutes les clés uniques présentes dans l’un des trois cycles, garantissant le bon fonctionnement des filtres ultérieurs.

| clave           | descripcion                                             |
| --------------- | ------------------------------------------------------- |
| 010.000.4301.00 | ERTAPÉNEM. SOLUTION INJECTABLE. Chaque flacon contient… |
| 010.000.6357.00 | BUDÉSONIDE-FORMOTÉROL. AÉROSOL. Chaque gramme contient… |
| 010.000.4225.00 | IMATINIB. COMPRIMÉ PELLICULÉ. Chaque comprimé contient… |

Cette table peut être enrichie avec des descriptions dans d’autres langues pour faciliter la présentation à des parties prenantes internationales.

### Étape 2 : Table analytique croisée par institution et cycle d’achat
Les données sont transformées en une structure pivot idéale pour la visualisation :

| clave           | comprac      | institucion | totales_max    | totales_institucion |
| --------------- | ------------ | ----------- | -------------- | ------------------- |
| 010.000.0104.00 | CC 2027-2028 | IMSS        | 226,092,211.00 | 166,856,793.00      |
| 010.000.0104.00 | CC 2023-2024 | IMSS        | 145,202,987.00 | 116,783,741.00      |

### Étape 3 : Table des plages de dates par cycle d’achat

| comprac      | date_st    | date_end   |
| ------------ | ---------- | ---------- |
| CC 2023-2024 | 2023-01-01 | 2024-12-31 |
| CC 2025-2026 | 2025-01-01 | 2026-12-31 |
| CC 2027-2028 | 2027-01-01 | 2028-12-31 |

### Étape 4 : Intégration avec BigQuery et Looker Studio
#LookerStudio offre une visualisation interactive immédiate, tandis que #BigQuery fournit le moteur analytique rapide et scalable.

Le pipeline de traitement et de nettoyage des données sur Databricks est détaillé ici : [Conception et nettoyage des données](../medallion).

### Étape 5 : Vue enrichie dans BigQuery
Nous avons créé une vue combinant toutes les informations nécessaires :

```sql
CREATE OR REPLACE VIEW `project.business_analysis.gold_contribucion_enriched` AS
SELECT
  c.*,
  p.descripcion,
  d.date_st,
  d.date_end
FROM `project.business_analysis.gold_contribucion_p_institucion` c
LEFT JOIN `project.business_analysis.gold_unique_products` p
  ON c.clave = p.clave
LEFT JOIN `project.business_analysis.purchases_date_range` d
  ON c.comprac = d.comprac;
  ```

### Étape 6 : Construction du tableau de bord interactif

Le tableau de bord permet à tous les acteurs de la génération d’offres de :

- Détecter les tendances de croissance ou de décroissance par produit
- Segmenter par institution et cycle d’achat
- Prendre des décisions éclairées sur les priorités 2027-2028

Des champs calculés clés ont été ajoutés, notamment la croissance globale entre le premier et le dernier cycle :

```
(SUM(CASE WHEN comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- SUM(CASE WHEN comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/ SUM(CASE WHEN comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```

Et les croissances spécifiques pour les institutions à plus fort volume (IMSS et IMSS Bienestar) :

```
-- Croissance IMSS Bienestar
(SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/ SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```

```
-- Croissance IMSS
(SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/ SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```

## Résultats
Accédez au tableau de bord interactif ici :
> [Tableau de bord sur Looker](https://lookerstudio.google.com/reporting/c0f3b5c5-c208-4a5a-b81e-9f136d65251e)

![Tableau de bord d'analyse](../../../assets/images/Looker_market_analysis.png)
