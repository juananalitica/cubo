# Cubo

Aplicación web offline para consulta de indicadores y creación de alertas locales.

## Uso

1. Abre `index.html` directamente en tu navegador (sin servidor). Toda la navegación
   funciona sin conexión.
2. Utiliza el menú lateral para cambiar de sección.
3. Los líderes pueden registrar alertas en la sección **Alertas** ingresando su
   nombre. Las alertas se guardan en `localStorage` del navegador.

## Actualización de datos

Los analistas pueden editar los archivos dentro de `app/data/js/` para
modificar las respuestas que ofrece cada sección. Cada archivo exporta un array
con pares `clave` y `respuesta`.

Las imágenes se encuentran en la carpeta `app/images/` y pueden reemplazarse
libremente manteniendo los mismos nombres.
