---
title: 'Proyecto: Sistema de Inteligencia Operativa y Automatización del Ciclo Order-to-Cash'
description: 'Análisis escalable de datos de compras públicas con Snowflake y Snowsight Dashboards'
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
lang: es
seo:
  image:
    src: '../../../assets/images/SnowFlakeWorkspace.png'
    alt: Workspace de snowflake
---


## El Desafío: Silos de Información y Sistemas Legacy

La línea de negocio se enfocaba en vender a instituciones públicas a través de contratos abiertos, es decir con una cantidad máxima anual o bianual de la que día a día se generaban órdenes, el ciclo **Order-to-Cash** estaba fracturado por la falta de una "Única Fuente de Verdad". Datos críticos de órdenes, entregas y cobranza se encontraban en sistemas legacy gubernamentales con fuertes restricciones de consulta y sin APIs disponibles.

**Impacto Negativo:**

- **Riesgo Financiero:** Más de 2,000 transacciones diarias dependían de conciliaciones manuales.
- **Ineficiencia Operativa:** Los equipos invertían más tiempo conciliando datos en Excel que ejecutando sus tareas primarias.
- **Fricción Departamental:** Juntas de conciliación constantes para determinar el saldo de contratos o estatus de entregas.

### La Solución: Arquitectura de Datos de Extremo a Extremo (E2E)

Diseñé e implementé una solución integral que automatiza la adquisición, procesamiento y visualización de datos:

1. **Adquisición (Python & Selenium):** Desarrollé un motor de *web scraping* que emula el comportamiento humano para extraer reportes de sistemas legacy, transformando portales inaccesibles en *datastreams* constantes y reproducibles. [Disponible en github](https://github.com/armjorge/IMSS_SAI_PREI)
2. **Infraestructura (AWS S3 & Snowflake):** Implementé un flujo de carga automatizado hacia Amazon S3. Utilizando **Snowpipe**, logré que Snowflake procesara los archivos de forma inmediata mediante una arquitectura *serverless* de bajo costo.
3. **Integridad y Calidad (SQL & Jinja):** Creé vistas dinámicas y procesos de limpieza que eliminan duplicados y vinculan automáticamente Órdenes de Compra con Facturas y Estatus de Tesorería.

### Impacto y Resultados: De la Reacción a la Estrategia

La implementación transformó la cultura operativa de la empresa:

* **100% Conversión a Cash:** Visibilidad total de las facturas en trámite y sistemas de factoraje, asegurando que ningún peso se quede en el camino.
* **Eliminación de la Fricción:** Se suprimieron las juntas de conciliación manual; ahora todos los departamentos consultan el mismo dato en tiempo real.
* **Predecibilidad Financiera:** El área de finanzas ahora cuenta con flujos de caja proyectados con precisión total.
* **Control Logístico:** Capacidad para supervisar y auditar a dos proveedores logísticos en paralelo mediante KPIs de cumplimiento de entrega automáticos.
* **Eficiencia de Costos:** Procesamiento de más de 3,000 registros con un costo operativo de nube inferior a **$10 USD mensuales**.

![Workspace Snowflake](../../../assets/images/SnowFlakeWorkspace.png)


### Lo que este proyecto demuestra de mi perfil:

- **Capacidad de Resolución:** No me detengo ante la falta de una API; construyo el puente necesario.
- **Visión de Negocio:** Entiendo que los datos sirven para cobrar más rápido y trabajar con menos fricción.
- **Optimización de Recursos:** Diseño arquitecturas en la nube que son potentes pero extremadamente económicas.


![Snowflake dashboard](../../../assets/images/SnowFlakeDashboard.png)
