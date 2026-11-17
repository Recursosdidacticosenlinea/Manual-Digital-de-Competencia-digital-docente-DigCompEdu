# Competencia digital docente · LELI mixta

Curso autogestivo en una sola página, basado en el *Manual de competencia digital docente para la LELI mixta (DigCompEdu)*.
El docente responde el diagnóstico de 22 ítems, ve su nivel global y por área, elige de una a tres competencias,
sigue los retos de las fichas y arma su plan personal, que puede descargar en Word o PDF.

Autora: Angélica Méndez Luna · LELI modalidad mixta, BUAP.

Es un sitio estático: no necesita instalación ni servidor. Para verlo basta con abrir `index.html` en el navegador.

## Archivos

- `index.html`: la página.
- `assets/fichas.js`: los 22 ítems del diagnóstico y las 22 fichas (texto del manual).
- `assets/contenido.js`: presentación, marco, niveles, rangos, rutas sugeridas, guía de recursos, plan, glosario y referencias.
- `assets/app.js`: el funcionamiento (puntajes, niveles, avance, descargas).
- `assets/app.css`: el diseño, con tema claro y oscuro.

Para corregir una redacción se edita el texto en `fichas.js` o `contenido.js`; no hay que tocar `app.js`.

## Dónde se guarda el avance

En el navegador de cada docente (`localStorage`). No se envía nada a ningún servidor. Desde «Mi plan» se puede
guardar una copia en archivo para continuar en otro equipo.

## Publicar en GitHub Pages

1. Crear un repositorio en GitHub y subir el contenido de esta carpeta (con `index.html` en la raíz).
2. En el repositorio: Settings → Pages → Source: «Deploy from a branch», rama `main`, carpeta `/ (root)`.
3. La dirección queda como `https://USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.
