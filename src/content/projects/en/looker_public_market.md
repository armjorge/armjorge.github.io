---
title: 'Analysis of Pharmaceutical Demand in Mexican Government Procurement 2023-2028'
description: 'Scalable analysis of public procurement data using BigQuery and Looker Studio'
publishDate: 'Jan 2 2023'
tags:
  - Databricks
  - SPARK
  - Insights
  - Storytelling
  - Looker Studio
  - BigQuery
lang: en
seo:
  image:
    src: '../../../assets/images/Looker_market_analysis.png'
    alt: Vista previa del proyecto
---

## The Challenge Facing Pharmaceutical Suppliers in Government Procurement

Pharmaceutical and medical supply providers seeking to sell to Mexican government institutions face a constant hurdle: gaining clear visibility into actual public-sector demand.

The key questions they need answered are:
- Which products are being purchased?
- Which institutions buy each product?
- How many units of each are acquired?
- How has demand evolved over time? Is the product growing, declining, or even being phased out?

In December 2025, the [consolidated procurement information for the 2027-2028 period](https://discusion.salud.gob.mx/) was made public, offering a unique opportunity to plan resources, adjust commercial strategies, and prioritize product launches or registrations.

This leads to the central question:  
**Which products should we prioritize for the next consolidated purchase?**

To answer this rigorously, the new procurement cycle must be compared with the previous two-year procedures:
1. CC 2023-2024: Consolidated purchase 2023-2024
2. CC 2025-2026: Consolidated purchase 2025-2026
3. CC 2027-2028: Consolidated purchase 2027-2028

## Where the Problem Arises

The database compiles information from these three biennial procedures, covering **4,798 unique products** across **11 institutions**, with a total volume of **12,685,508,417 units** acquired. This results in more than **38,000 rows** of detailed data. Analyzing this volume manually or with traditional tools is impractical and time-consuming.

## Our Solution: A Structured and Scalable Analysis

Each product has a unique identifier called **Clave de cuadro básico** (Basic Schedule Key), enabling consistent tracking across procurement cycles.

### Step 1: Master Product Table
We created a table containing all unique keys from any of the three procedures, ensuring subsequent filters work correctly.

| clave           | descripcion                                         |
| --------------- | --------------------------------------------------- |
| 010.000.4301.00 | ERTAPENEM. INJECTABLE SOLUTION. Each vial contains… |
| 010.000.6357.00 | BUDESONIDE-FORMOTEROL. AEROSOL. Each gram contains… |
| 010.000.4225.00 | IMATINIB. FILM-COATED TABLET. Each tablet contains… |

This table can be enriched with descriptions in other languages for easy presentation to international stakeholders.

### Step 2: Cross-tab Analytical Table by Institution and Procurement Cycle
Data is transformed into a pivoted structure ideal for visualization:

| clave           | comprac      | institucion | totales_max    | totales_institucion |
| --------------- | ------------ | ----------- | -------------- | ------------------- |
| 010.000.0104.00 | CC 2027-2028 | IMSS        | 226,092,211.00 | 166,856,793.00      |
| 010.000.0104.00 | CC 2023-2024 | IMSS        | 145,202,987.00 | 116,783,741.00      |

### Step 3: Date Range Table by Procurement Cycle
| comprac      | date_st    | date_end   |
| ------------ | ---------- | ---------- |
| CC 2023-2024 | 2023-01-01 | 2024-12-31 |
| CC 2025-2026 | 2025-01-01 | 2026-12-31 |
| CC 2027-2028 | 2027-01-01 | 2028-12-31 |

### Step 4: Integration with BigQuery and Looker Studio
#LookerStudio provides instant interactive visualization, while #BigQuery delivers a fast, scalable analytical engine.

The Databricks processing and data-cleansing pipeline is detailed here: [Data design and cleaning](../medallion).

### Step 5: Enriched View in BigQuery
We built a view that combines all required information:

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
### Step 6: Building the Interactive Dashboard

The dashboard enables everyone involved in supply generation to:

- Detect growth or decline trends by product
- Segment by institution and procurement cycle
- Make informed decisions on 2027-2028 priorities

Key calculated fields include overall growth between the first and last cycle:

```
(SUM(CASE WHEN comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- SUM(CASE WHEN comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/ SUM(CASE WHEN comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```
And specific growth for the highest-volume institutions (IMSS and IMSS Bienestar):

```
-- IMSS Bienestar growth
(SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/ SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```

```
-- IMSS growth
(SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/ SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```

## Results

Access the interactive dashboard here:
> [Dashboard on Looker](https://lookerstudio.google.com/reporting/c0f3b5c5-c208-4a5a-b81e-9f136d65251e)

![Analysis Dashboard](../../../assets/images/Looker_market_analysis.png)

