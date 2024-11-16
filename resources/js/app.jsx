import './bootstrap'; // Mantén esta línea para cargar las configuraciones de Laravel Breeze.
import '../css/app.css'; // Mantén esta línea para los estilos.
import 'bootstrap/dist/css/bootstrap.min.css'; // Añadir Bootstrap CSS aquí.

// Importar los componentes
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Nombre de la aplicación desde las variables de entorno o por defecto 'Laravel'
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    
    setup({ el, App, props }) {
        const root = createRoot(el);
        // Renderizamos la aplicación con Inertia
        root.render(<App {...props} />);
    },
    
    progress: {
        color: '#4B5563',
    },
});