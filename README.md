# Atlas del origen · Formación del sistema solar

Experiencia de divulgación para el Taller de Diseño de Interfaces de la Universidad Adolfo Ibáñez. El módulo de A-Frame recorre la formación del sistema solar mediante siete escenas interactivas. La última recupera el explorador del Sol y los ocho planetas, e incorpora la Luna.

## Cómo usar

- Abre la carpeta con un servidor estático. Si tienes Python, ejecuta `python -m http.server 8000` desde el directorio y abre `http://localhost:8000/`. A-Frame y las fuentes web se cargan por HTTPS.
- **Recorrido guiado** reproduce las etapas en orden. También puedes usar **Anterior**, **Siguiente etapa** o elegir una etapa en la línea de tiempo.
- Usa **Pausar**, **Reiniciar etapa** y el deslizador para inspeccionar un momento. El deslizador pausa la animación para que puedas examinarla.
- Arrastra dentro de la escena para mirar y usa **WASD** para desplazarte. **Centrar la vista** recupera el encuadre de la etapa. Elige un objeto de la escena o del panel para ver su detalle.
- **Sonido** activa o silencia el ambiente y los efectos. **Narración** usa las voces del navegador cuando están disponibles. Las siete etapas tienen subtítulos.
- **Pantalla completa** amplía la experiencia. **Entrar en VR** aparece con un visor WebXR compatible. El mando permite seleccionar objetos y cambiar de etapa desde el panel inmersivo.

## Las siete etapas

1. **Nebulosa inicial.** El gas y el polvo se concentran por la gravedad.
2. **Formación del Sol.** La protoestrella se calienta y empieza la fusión del hidrógeno.
3. **Disco protoplanetario.** El material en rotación se aplana alrededor del Sol joven.
4. **Formación de planetas.** Fragmentos, planetesimales y protoplanetas crecen por acreción.
5. **Tierra primitiva.** Un acercamiento a la formación de un planeta rocoso sometido a impactos.
6. **Gran impacto y origen de la Luna.** Un escenario de la hipótesis principal muestra fragmentos expulsados que quedan en órbita y se acumulan.
7. **Sistema solar estructurado.** Se aclara el disco y aparece el explorador del Sol, los ocho planetas y la Luna.

## Alcance científico

Es una **representación simplificada y no a escala**. Tamaños, distancias, trayectorias, colores y duraciones se ajustaron para mostrar los procesos. Los capítulos separan eventos que se superpusieron, especialmente la formación del Sol y del disco. La trayectoria de Theia y los detalles del origen lunar siguen en estudio. El sonido es un recurso narrativo.

[NASA · Formación del sistema solar](https://science.nasa.gov/solar-system/solar-system-facts/) · [NASA · Acreción y disco protoplanetario](https://science.nasa.gov/astrobiology/learning-resources/alp/how-did-our-solar-system-form/) · [NASA · Hipótesis sobre el origen de la Luna](https://science.nasa.gov/moon/formation/)

## Código y GitHub Pages

`index.html` y `styles.css` contienen la interfaz. `formation-scenes.js` genera la niebla, partículas, discos y cuerpos. `experience.js` conecta la línea de tiempo, los controles, el audio y el explorador de planetas. El proyecto usa A-Frame 1.7.1 y Three.js. Los efectos se generan en el navegador.

La raíz del proyecto es la carpeta de publicación. GitHub Pages puede servir los cinco archivos desde `main` y `/ (root)`. [Repositorio de Modulo-03-AFrame](https://github.com/ambrosiovaldesbw/Modulo-03-AFrame)
