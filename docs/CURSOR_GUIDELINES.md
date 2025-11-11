# Guías de Desarrollo para AABO Services

- **Lenguaje y Framework:** Estamos usando React con Vite y JavaScript.
- **Componentes:**
  - Todos los componentes deben ser funcionales (functional components).
  - Utiliza hooks de React (`useState`, `useEffect`, etc.). No uses componentes de clase.
  - La nomenclatura de los archivos y componentes debe ser `PascalCase`. (Ej: `ProjectCard.jsx`).
- **Estilos:**
  - La librería de componentes principal es Material-UI (MUI).
  - Para estilos personalizados, prefiere el prop `sx` de MUI en lugar de archivos CSS separados.
- **Manejo de Estado:**
  - Para estado local, usa `useState`.
  - Para estado global, usaremos React Context por ahora.
- **Llamadas a API:**
  - Usa `axios` para todas las peticiones a la API.
  - Centraliza las funciones de API en `src/services/apiClient.js`.
- **Comentarios:**
  - Añade comentarios JSDoc a cada componente para explicar qué props recibe.