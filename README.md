# Exploración espacial · A-Frame

Ejercicio del Taller de Diseño de Interfaces de la Universidad Adolfo Ibáñez. Recorre una representación 3D del sistema solar con el Sol, ocho planetas, órbitas en movimiento y un fondo de estrellas.

[Explorar el sistema solar](https://ambrosiovaldesbw.github.io/Modulo-03-AFrame/)

## Cómo controlar la escena

- Muévete con **WASD** y arrastra dentro de la escena para mirar alrededor. En una pantalla táctil, arrastra para cambiar la orientación.
- Haz clic en un astro de la escena o elígelo en **Elegir astro** para leer su ficha.
- Los botones del encabezado activan el sonido ambiental o la pantalla completa.
- En un navegador y visor con WebXR compatible, el botón **Entrar en VR** abre una sesión inmersiva. Apunta a un astro y usa la acción de selección del mando para cambiar la ficha.

**Las dimensiones, distancias y velocidades orbitales son representaciones visuales y no están a escala.**

## Ejecutar en local

Sirve la carpeta con un servidor estático. Si tienes Python, ejecuta `python -m http.server 8000` y abre `http://localhost:8000/`. Para GitHub Pages, selecciona `main` y `/ (root)`. A-Frame 1.7.1 se carga por HTTPS. Las texturas, órbitas, estrellas y sonido se generan con código.

[A-Frame y WebXR](https://aframe.io/docs/1.7.0/introduction/vr-headsets-and-webxr-browsers.html) · [Planetario de la NASA](https://science.nasa.gov/solar-system/planets/)
