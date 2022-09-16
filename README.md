# Plant2
## Adatar una plantilla de Bootstrap a Angular
- https://www.youtube.com/watch?v=TPWHBLHYIi0 (minuto 35)

1.- Descargar plantilla bootstrap y añadir carpeta de la descarga en el área de trabajo.

- Crear módulo/s según los apartados (formulario)
- Crear los componentes del módulo (cabecera, form, footer)
- En cada módulo creado, hacer los exports de componentes (formulario.module)
- Desde el app.module, hacer el import del módulo formulario

2.- css
- En styles.css, hacer el import de los .css en el mismo orden que está en la plantilla
- Copiar en assest/css/ los .css de la plantilla

3.- Adaptar index.html, añadiendo los .js remotos y la etiqueta <body> según esté en plantilla, modificando el index.html
    p.Ej:<body id="page-top">

4.- Copiar cada sección del index.html de la plantilla en el componenete que le corresponda (p.ej header.component.html)

## Instalaciones de librerias externas, JQuery

- npm i jquery
- The best way to include an external, plain javascript, library is to install it using npm install ... and then add all the .js and .css files (from the node_modules folder) in your angular.json file respectively in the scripts and styles properties. Those scripts and styles will be bundled with your application and in every component you can access the global variables they define.

For example you can npm install jQuery, add it in the angular.json file in the script property like this:

"scripts": ["../node_modules/jquery/dist/jquery.min.js"]
declare it on top like this:

import * as $ from 'jquery';
and then you can use it as you would normally