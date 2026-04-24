# Satoritech Webapp - Multi-Brand Form

Esta es una aplicación de Angular diseñada para ser una plataforma de formularios multi-marca (White-Label). La interfaz se adapta dinámicamente según la configuración proporcionada a través de un archivo JSON.

## 🚀 Demo
Puedes ver la aplicación en funcionamiento aquí: [https://satoritech-form.web.app](https://satoritech-form.web.app)

## 🛠 Decisiones de Diseño

Para lograr un sistema de personalización robusto y escalable, se tomaron las siguientes decisiones técnicas:

1.  **Desacoplamiento de Configuración**: La lógica de visualización está separada de los datos de marca. La aplicación consume un archivo de configuración (`config.json`) que define colores, imágenes y textos.
2.  **Componentes "Dumb" (Presentacionales)**: Se utilizó el patrón de componentes presentacionales para que los elementos visuales reciban su configuración mediante `@Input()`, facilitando la reutilización y el testing.
3.  **Inyección Dinámica de Estilos**: Se implementó una lógica para actualizar variables de CSS (CSS Custom Properties) en tiempo de ejecución, permitiendo que el cambio de colores primarios y fondos sea instantáneo y global.
4.  **Gestión de Assets Locales**: Las imágenes y logos se manejan como assets locales para garantizar la disponibilidad y reducir la dependencia de servicios externos durante la fase de personalización.
5.  **Estado de Carga Global**: Se integró un loader global para asegurar que la interfaz no se muestre hasta que la configuración de marca haya sido cargada y aplicada correctamente.

## 🎨 Personalización

Para probar diferentes marcas, puedes modificar el archivo de configuración con la siguiente estructura:

### JSON de prueba para personalización:
```json
{
	"logo": "/assets/logo2.png",
	"image": "/assets/image2.png",
	"primaryColor": "#D6B2FF",
	"backgroundColor": "#1C1C1C",
	"welcomeText": "¡Te damos la bienvenida a shopinbaz"
}
```

## 💻 Desarrollo

### Servidor de Desarrollo
Para iniciar el servidor local, ejecuta:
```bash
ng serve
```
Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al detectar cambios.

### Construcción (Build)
Para generar el bundle de producción:
```bash
ng build
```
Los archivos se guardarán en el directorio `dist/`.

### Pruebas Unitarias
Ejecuta las pruebas con Vitest:
```bash
ng test
```

## 📚 Recursos Adicionales
Para más información sobre Angular CLI, visita [Angular CLI Overview](https://angular.dev/tools/cli).
