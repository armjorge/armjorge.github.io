---
title: 'Pipeline de données pharmaceutiques : Architecture médaillon'
description: 'Intégration de sources hétérogènes pour l''analyse des approvisionnements publics'
publishDate: 'Jan 2 2023'
skills:
  - Databrick
  - Data Analysis
  - Medallion Architecture
lang: fr
seo:
  image:
    src: '../../../assets/images/databricks_pipeline.png'
    alt: Vista previa del proyecto
---
![Pipeline Databricks](../../../assets/images/databricks_pipeline.png)

## Problema
Los proveedores de medicamentos y dispositivos Médicos que deseen venderle a Gobierno, deben decidir si presentan una oferta o no. 

## De dónde surgió el problema 

El Gobierno de México compra sus medicamentos y dispositivos médicos a cientos de proveedores. Cada producto tiene un identificador único. 

En cada compra, decenas de instituciones comparten para cada identificador la cantidad que estiman que van a consumir en periodos de tiempo de 2 años, posteriormente las juntan y esta relación de piezas por cada identificador la llamanda 'demanda agregada'.

![Ejemplo compra 2027](../../../../assets/images/raw_data2027.png|60)

Los proveedores pueden consultar la demanda agregada de cada compra. No pueden ofertar fracciones de la misma, y en caso de ganar un producto y no poder entregar, son sujetos a sanciones o inhabilitaciones.

El conjunto de datos de 'demanda agregada' cambia compra contra compra en estructura y detalle, por lo que para elegir qué 

