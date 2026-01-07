---
title: 'Análisis de la demanda de medicamentos e insumos farmacéuticos del mercado gubernamental 2023-2028'
description: 'Análisis escalable de datos de compras públicas con BigQuery y Looker Studio'
publishDate: 'Jan 2 2023'
tags:
  - Databricks
  - SPARK
  - Insights
  - Storytelling
  - Looker Studio
  - BigQuery
lang: es
seo:
  image:
    src: '../../../assets/images/Looker_market_analysis.png'
    alt: Vista previa del proyecto
---


## El desafío de los proveedores farmacéuticos en las compras gubernamentales

Los proveedores de medicamentos e insumos farmacéuticos que buscan vender a instituciones gubernamentales mexicanas enfrentan un reto constante: obtener visibilidad clara sobre la demanda real del sector público.

Las preguntas clave que necesitan responder son:
- ¿Qué productos se compran?
- ¿Qué instituciones adquieren cada producto?
- ¿Cuántas piezas se compran de cada uno?
- ¿Cómo ha evolucionado la demanda en el tiempo? ¿El producto está creciendo, disminuyendo o incluso siendo excluido?

En diciembre de 2025 se publicó la [información de la compra consolidada para el periodo 2027-2028](https://discusion.salud.gob.mx/), lo que representa una oportunidad única para planificar recursos, ajustar estrategias comerciales y priorizar el lanzamiento o registro de productos.

Esto nos lleva a la pregunta central:  
**¿A qué productos debemos dar prioridad para la próxima compra consolidada?**

Para responderla de forma informada, es esencial comparar el nuevo procedimiento con otros anteriores que cubran el mismo periodo de 2 años:
1. CC 2023-2024: Compra consolidada 2023-2024
2. CC 2025-2026: Compra consolidada 2025-2026
3. CC 2027-2028: Compra consolidada 2027-2028

## El origen del problema

La base de datos reúne información de estos tres procedimientos bianuales, abarcando **4,798 productos únicos** distribuidos entre **11 instituciones**, con un volumen total de **12,685,508,417 piezas** adquiridas. Esto genera más de **38,000 filas** de datos detallados. Analizar esta cantidad de información de manera manual o con herramientas tradicionales es impráctico y lento.

## Nuestra solución: un análisis estructurado y escalable

Cada producto cuenta con un identificador único llamado **Clave de cuadro básico**, que permite rastrearlo consistentemente a través de los diferentes procedimientos.

### Paso 1: Tabla maestra de productos
Creamos una tabla que incluye todas las claves únicas presentes en cualquiera de los tres procedimientos, garantizando que los filtros posteriores funcionen correctamente.

| clave           | descripcion                                                |
| --------------- | ---------------------------------------------------------- |
| 010.000.4301.00 | ERTAPENEM. SOLUCIÓN INYECTABLE. Cada frasco contiene…      |
| 010.000.6357.00 | BUDESONIDA-FORMOTEROL. AEROSOL. Cada gramo contiene…       |
| 010.000.4225.00 | IMATINIB. COMPRIMIDO. Cada comprimido recubierto contiene… |

Esta tabla puede enriquecerse con descripciones en otros idiomas para facilitar la presentación a interesados internacionales.

### Paso 2: Tabla analítica cruzada por institución y procedimiento
Transformamos los datos en una estructura pivoteada ideal para visualización:

| clave           | compra       | institucion | totales_max    | totales_institucion |
| --------------- | ------------ | ----------- | -------------- | ------------------- |
| 010.000.0104.00 | CC 2027-2028 | IMSS        | 226,092,211.00 | 166,856,793.00      |
| 010.000.0104.00 | CC 2023-2024 | IMSS        | 145,202,987.00 | 116,783,741.00      |

### Paso 3: Tabla de rangos de fechas por procedimiento
| comprac      | date_st    | date_end   |
| ------------ | ---------- | ---------- |
| CC 2023-2024 | 2023-01-01 | 2024-12-31 |
| CC 2025-2026 | 2025-01-01 | 2026-12-31 |
| CC 2027-2028 | 2027-01-01 | 2028-12-31 |

### Paso 4: Integración con BigQuery y Looker Studio
#LookerStudio ofrece visualización interactiva inmediata, mientras que #BigQuery proporciona el motor analítico rápido y escalable.

El pipeline de procesamiento y limpieza de datos en Databricks se detalla aquí: [Diseño y limpieza de los datos](../medallion).

### Paso 5: Vista enriquecida en BigQuery
Creamos una vista que combina toda la información necesaria:

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
### Paso 6: Construcción del tablero interactivo
El tablero permite a todos los involucrados en la generación de oferta:

- Detectar tendencias de crecimiento o decrecimiento por producto
- Segmentar por institución y procedimiento de compra
- Tomar decisiones informadas sobre prioridades para 2027-2028

Incluimos campos calculados clave, como el crecimiento general entre la primera y la última compra:

Campos calculados para calcular crecimiento entre la primera compra y la última: 
```
(SUM(CASE WHEN comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- 
SUM(CASE WHEN comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/
SUM(CASE WHEN comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```

Y crecimientos específicos para las instituciones de mayor volumen (IMSS e IMSS Bienestar):

```
(SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- 
SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/
SUM(CASE WHEN institucion = "imss_bienestar" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)

```

```
(SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2027-2028" THEN totales_institucion ELSE 0 END) 
- 
SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END))
/
SUM(CASE WHEN institucion = "imss" AND comprac = "CC 2023-2024" THEN totales_institucion ELSE 0 END)
```

## Resultado 

Accede al tablero interactivo aquí:

> [Tablero en Looker](https://lookerstudio.google.com/reporting/c0f3b5c5-c208-4a5a-b81e-9f136d65251e)


![Tablero de análisis](../../../assets/images/Looker_market_analysis.png)
