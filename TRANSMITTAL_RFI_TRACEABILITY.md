# Sistema de Trazabilidad Transmittals ↔ RFI

## Descripción General

Se ha implementado un sistema completo de trazabilidad bidireccional entre Transmittals y RFI que permite:

1. **Ver qué RFI está incluido en un transmittal**
2. **Ver en qué transmittal fue enviado un RFI**
3. **Rastrear las respuestas entre transmittals**
4. **Visualizar la relación completa del ciclo de vida**

## Funcionalidades Implementadas

### 1. Trazabilidad en Transmittals

#### En TransmittalDetailModal:
- **Sección "RFIs Incluidos"**: Muestra todos los RFI que están incluidos en el transmittal
- **Sección "Transmittal de Respuesta"**: Muestra el transmittal de respuesta si existe
- **Indicadores visuales**: Badges que muestran el estado de los RFI relacionados

#### En TransmittalList:
- **Indicador visual**: Badge que muestra cuántos RFI están incluidos en cada transmittal
- **Código mejorado**: El código del transmittal se muestra junto con el indicador de RFI

### 2. Trazabilidad en RFI

#### En RFIDetailModal:
- **Sección "Transmittals Relacionados"**: Muestra todos los transmittals relacionados con el RFI
- **Información detallada**: Código, fecha, destinatario/remitente, estado
- **Diferenciación visual**: Distingue entre transmittals de envío y respuesta

#### En RFIList:
- **Indicador visual**: Badge que muestra si el RFI está incluido en un transmittal
- **Columna de transmittal**: Muestra el código y fecha del transmittal relacionado

### 3. Componentes de Trazabilidad

#### TraceabilityCard:
- Componente reutilizable para mostrar relaciones entre transmittals y RFI
- Soporte para ambos tipos (transmittal → RFI y RFI → transmittal)
- Información condensada con estado y fechas

#### TraceabilitySummary:
- Vista general de la trazabilidad del proyecto
- Estadísticas de relaciones
- Actividad reciente
- Resumen de pendientes

## Estructura de Datos

### Transmittal con Trazabilidad:
```javascript
{
  id: 'TRN-001',
  code: 'TRN-RLL-MOD-2024-0001',
  // ... otros campos
  relatedRFIs: ['RFI-001'], // RFI enviado en este transmittal
  responseTransmittalId: 'TRN-002', // Transmittal de respuesta
  originalTransmittalId: 'TRN-001' // Para transmittals de respuesta
}
```

### RFI con Trazabilidad:
```javascript
{
  id: 'RFI-001',
  code: 'RFI-RLL-MOD-0001',
  // ... otros campos
  transmittalId: 'TRN-001' // Transmittal donde se envió
}
```

## APIs Implementadas

### En transmittalMocks.js:
- `getTransmittalsByRFI(rfiId)`: Obtiene transmittals relacionados con un RFI
- `getResponseTransmittal(originalTransmittalId)`: Obtiene el transmittal de respuesta

### En rfiMocks.js:
- `getRFIsByTransmittal(transmittalId)`: Obtiene RFIs relacionados con un transmittal

## Flujo de Trabajo

1. **Creación de RFI**: Se crea un RFI que puede estar asociado a un transmittal
2. **Envío en Transmittal**: El RFI se incluye en un transmittal para envío al cliente
3. **Respuesta**: El cliente responde a través de un transmittal de respuesta
4. **Trazabilidad**: Se puede rastrear todo el ciclo completo

## Beneficios

- **Visibilidad completa**: Se puede ver toda la cadena de comunicación
- **Gestión eficiente**: Fácil identificación de pendientes y respuestas
- **Auditoría**: Registro completo de todas las interacciones
- **Colaboración**: Mejor coordinación entre equipos

## Uso en la Interfaz

### Para ver la trazabilidad de un Transmittal:
1. Ir a Transmittals → Seleccionar un transmittal
2. En el modal de detalles, ver las secciones:
   - "RFIs Incluidos"
   - "Transmittal de Respuesta"

### Para ver la trazabilidad de un RFI:
1. Ir a RFI → Seleccionar un RFI
2. En el modal de detalles, ver la sección:
   - "Transmittals Relacionados"

### Para vista general:
- Usar el componente TraceabilitySummary en el dashboard
- Ver estadísticas y actividad reciente

## Consideraciones Técnicas

- **Carga asíncrona**: Los datos relacionados se cargan dinámicamente
- **Indicadores de carga**: Estados de loading para mejor UX
- **Responsive**: Diseño adaptativo para diferentes pantallas
- **Performance**: Carga eficiente de datos relacionados
- **Extensible**: Fácil agregar más tipos de trazabilidad en el futuro
