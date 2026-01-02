---
title: 'Pharmaceutical and Medical Supply Demand Analysis for the Government Market 2023-2028'
description: 'Scalable analysis of public procurement data using BigQuery and Looker Studio'
publishDate: 'Jan 2 2023'
skills:
  - Databricks
  - SPARK
  - Insights
  - Storytelling
lang: en
seo:
  image:
    src: '../../../../public/assets/images/Looker_market_analysis.png'
    alt: Vista previa del proyecto
---

## Problem

Pharmaceutical and medical supply vendors seeking to sell to government institutions face the challenge of identifying:
- Which products are purchased?
- Which institutions purchase each product?
- How many units are acquired of each one?
- How has demand changed over time? Is it growing, declining, or is the product being excluded?

In December 2025, [procurement information for the 2027-2028 period](https://discusion.salud.gob.mx/) was made public, providing a unique opportunity to plan resources and prioritize product launches. This raises a crucial question:

**Which products should we prioritize?**

## Where does the problem originate?

The database contains information from 3 biannual procurement procedures with 4,798 unique products distributed across 11 institutions, totaling 12,685,508,417 units purchased. With over 38,000 rows of data, answering these questions requires appropriate technology.

## Solution

Each product has a unique identifier called **'Basic Catalog Code'** (Clave de cuadro básico) that allows tracking it across procurement procedures.

### Step 1: Create a master product table

Since not all procedures include the same codes, we need a table containing all products so the dashboard filters work correctly:

| code            | description                                         |
| --------------- | --------------------------------------------------- |
| 010.000.4301.00 | ERTAPENEM. INJECTABLE SOLUTION. Each vial contains… |
| 010.000.6357.00 | BUDESONIDE-FORMOTEROL. AEROSOL. Each gram contains… |
| 010.000.4225.00 | IMATINIB. TABLET. Each coated tablet contains…      |

### Step 2: Integrate with BigQuery and Looker Studio

#Looker Studio provides an immediate option for visualization, while BigQuery delivers the engine to make analysis fast and scalable.

The Databricks pipeline construction that generates the database can be found here: [Data Design and Cleaning](../medallion).

### Step 3: Analytical table by institution and procedure

| code            | purchase     | institution | max_totals     | institution_totals | description                                  |
| --------------- | ------------ | ----------- | -------------- | ------------------ | -------------------------------------------- |
| 010.000.0104.00 | CC 2027-2028 | IMSS        | 226,092,211.00 | 166,856,793.00     | PARACETAMOL. TABLET. Each tablet contains... |
| 010.000.0104.00 | CC 2023-2024 | IMSS        | 145,202,987.00 | 116,783,741.00     | PARACETAMOL. TABLET. Each tablet contains... |

### Step 4: Pivot table with temporal evolution

A consolidated view summarizing quantities by code across the three procurement procedures:

| code            | description                                  | max_2023_2024 | max_2025_2026 | max_2027_2028 |
| --------------- | -------------------------------------------- | ------------- | ------------- | ------------- |
| 010.000.0246.00 | PROPOFOL. INJECTABLE EMULSION. Each ampoule… | 1,881,146.00  | 2,863,790.00  | 4,345,683.00  |

## Results

![Analysis Dashboard](../../../../public/assets/images/Looker_market_analysis.png|60)

An interactive dashboard that allows manufacturers to:
- Identify growth or decline trends by product
- Segment information by institution and procurement procedure
- Make informed decisions about which products to prioritize for 2027-2028

Access the dashboard:
> [Dashboard on Looker](https://lookerstudio.google.com/reporting/c0f3b5c5-c208-4a5a-b81e-9f136d65251e)


