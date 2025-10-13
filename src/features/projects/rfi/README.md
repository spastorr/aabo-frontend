# Módulo RFI (Request for Information)

## Descripción General

El módulo RFI es el canal formal para la gestión de Solicitudes de Información dentro de los proyectos. Permite crear, seguir y responder RFIs con seguimiento centralizado y vinculación a documentos específicos de la LMD.

## Características Principales

### 1. **Gestión Completa del Ciclo de Vida**
- Creación de nuevas RFIs con formulario estructurado
- Seguimiento visual del estado (Abierta → Pendiente → Respondida → Cerrada)
- Historial completo de cada RFI

### 2. **Estados de RFI**
- **OPEN**: RFI creada y enviada
- **PENDING_RESPONSE**: Esperando respuesta del destinatario
- **ANSWERED**: Respuesta recibida
- **CLOSED**: RFI cerrada y archivada

### 3. **Prioridades**
- **HIGH**: Alta prioridad (requiere atención inmediata)
- **MEDIUM**: Prioridad media
- **LOW**: Baja prioridad

### 4. **Vinculación con Documentos**
- Cada RFI puede vincularse a uno o más documentos de la LMD
- Trazabilidad completa entre consultas y documentación

### 5. **Filtrado y Búsqueda**
- Filtrado por estado
- Búsqueda por código, asunto o descripción
- Estadísticas en tiempo real

## Estructura de Archivos

```
rfi/
├── RFIPage.jsx              # Página principal
├── RFIPage.module.css       # Estilos de la página
├── index.js                 # Exportaciones del módulo
├── hooks/
│   └── useRFI.js           # Hook para gestión de datos
└── components/
    ├── RFIList/            # Lista/tabla de RFIs
    ├── CreateRFIModal/     # Modal de creación
    ├── RFIDetailModal/     # Modal de detalles y respuesta
    └── RFIStatusTracker/   # Seguimiento visual de estados
```

## Uso

### Navegación
El módulo es accesible desde:
```
/projects/:projectId/rfi
```

### Crear una nueva RFI
1. Clic en el botón "+ Crear RFI"
2. Completar formulario:
   - Asunto (requerido)
   - Descripción (requerido)
   - Destinatario (requerido)
   - Prioridad
   - Fecha límite
   - Documentos relacionados
3. Enviar

### Responder a una RFI
1. Clic en cualquier RFI de la lista
2. Clic en botón "Responder"
3. Escribir respuesta
4. Enviar (cambia estado a ANSWERED)

### Cerrar una RFI
1. Abrir RFI respondida
2. Clic en "Cerrar RFI"
3. Confirmar (cambia estado a CLOSED)

## Integración

### Contextos Utilizados
- `ProjectContext`: Para obtener información del proyecto actual
- `AuthContext` (futuro): Para información del usuario

### Servicios/APIs
- `getRFIsByProject()`: Obtiene RFIs de un proyecto
- `createRFI()`: Crea nueva RFI
- `updateRFI()`: Actualiza estado o respuesta

## Datos de Ejemplo

El archivo `services/mocks/rfiMocks.js` contiene 5 RFIs de ejemplo con diferentes estados y prioridades para pruebas y desarrollo.

## Próximas Mejoras

- [ ] Sistema de comentarios internos por RFI
- [ ] Notificaciones automáticas al crear/responder RFIs
- [ ] Exportación de RFI a PDF
- [ ] Carga de archivos adjuntos
- [ ] Integración real con backend
- [ ] Historial de cambios de estado
- [ ] Asignación de responsables
- [ ] Recordatorios de fechas límite

## Notas Técnicas

- Todos los componentes utilizan CSS Modules para estilos encapsulados
- Los estados se manejan mediante el hook personalizado `useRFI`
- El tracker de estados es responsive y se adapta a dispositivos móviles
- Los formularios incluyen validación en cliente

## Cumplimiento con APP_Concept.txt

✅ **Gestión formal de Solicitudes de Información**: Canal estructurado para RFIs  
✅ **Seguimiento centralizado**: Vista única con todas las RFIs del proyecto  
✅ **Vinculación a documentos**: Conexión directa con la LMD  
✅ **Trazabilidad total**: Historial completo de cada RFI  
✅ **Interfaz intuitiva**: Diseño claro y fácil de usar

