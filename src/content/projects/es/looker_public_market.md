---
title: 'Análisis de la demanda de medicamentos e insumos farmacéuticos del mercado gubernamental 2023-2028'
description: 'Análisis escalable de datos de compras públicas con BigQuery y Looker Studio'
publishDate: 'Jan 2 2023'
tags:
  - Databricks
  - SPARK
  - Insights
  - Storytelling
lang: es
seo:
  image:
    src: '../../../assets/images/Looker_market_analysis.png'
    alt: Vista previa del proyecto
---


## Problema

Los proveedores de medicamentos e insumos farmacéuticos que desean venderle a las instituciones de gobierno enfrentan el desafío de identificar:
- ¿Qué productos se compran? 
- ¿Qué instituciones compran cada producto?
- ¿Cuántas piezas se adquieren de cada uno?
- ¿Cómo ha cambiado la demanda a lo largo del tiempo? ¿Crece, decrece o se excluye el producto?

En diciembre de 2025 se hizo pública la [información de la compra para el periodo 2027-2028](https://discusion.salud.gob.mx/), brindando una oportunidad única para planificar recursos y priorizar el lanzamiento de productos. Esto plantea una pregunta crucial: 

**¿A qué productos debemos dar prioridad?**

## ¿Dónde surge el problema?

La base de datos contiene información de 3 procedimientos bianuales con 4,798 productos únicos distribuidos entre 11 instituciones, sumando un total de 12,685,508,417 piezas adquiridas. Con más de 38,000 filas de datos, responder estas preguntas requiere tecnología adecuada.

## Solución

Cada producto tiene asociado un identificador único llamado **'Clave de cuadro básico'** que permite rastrearlo a lo largo de los procedimientos de compra. 

### Paso 1: Crear una tabla maestra de productos

Como no todos los procedimientos incluyen las mismas claves, necesitamos una tabla que contenga todos los productos para que los filtros del tablero funcionen correctamente:

| clave           | descripcion                                                |
| --------------- | ---------------------------------------------------------- |
| 010.000.4301.00 | ERTAPENEM. SOLUCIÓN INYECTABLE. Cada frasco contiene…      |
| 010.000.6357.00 | BUDESONIDA-FORMOTEROL. AEROSOL. Cada gramo contiene…       |
| 010.000.4225.00 | IMATINIB. COMPRIMIDO. Cada comprimido recubierto contiene… |

### Paso 2: Integrar con BigQuery y Looker Studio

#LookerStudio nos brinda una opción inmediata para visualización, mientras que #BigQuery proporciona el motor para que el análisis sea rápido y escalable.

La construcción del pipeline en Databricks que genera la base de datos puede consultarse aquí: [Diseño y limpieza de los datos](../medallion).

### Paso 3: Tabla analítica por institución y procedimiento

| clave           | compra       | institucion | totales_max    | totales_institucion | descripcion                                    |
| --------------- | ------------ | ----------- | -------------- | ------------------- | ---------------------------------------------- |
| 010.000.0104.00 | CC 2027-2028 | IMSS        | 226,092,211.00 | 166,856,793.00      | PARACETAMOL. TABLETA. Cada tableta contiene... |
| 010.000.0104.00 | CC 2023-2024 | IMSS        | 145,202,987.00 | 116,783,741.00      | PARACETAMOL. TABLETA. Cada tableta contiene... |

### Paso 4: Tabla pivote con evolución temporal

Una vista consolidada que resume las cantidades por clave en los tres procedimientos de compra:

| clave           | descripcion                                    | max_2023_2024 | max_2025_2026 | max_2027_2028 |
| --------------- | ---------------------------------------------- | ------------- | ------------- | ------------- |
| 010.000.0246.00 | PROPOFOL. EMULSIÓN INYECTABLE. Cada ampolleta… | 1,881,146.00  | 2,863,790.00  | 4,345,683.00  |

## Resultado

![Tablero de análisis](../../../assets/images/Looker_market_analysis.png)


Un tablero interactivo que permite a los fabricantes:
- Identificar tendencias de crecimiento o decrecimiento por producto
- Segmentar información por institución y procedimiento de compra
- Tomar decisiones informadas sobre qué productos priorizar para 2027-2028

Ingresa para visualizar el tablero:
> [Tablero en Looker](https://lookerstudio.google.com/reporting/c0f3b5c5-c208-4a5a-b81e-9f136d65251e)


