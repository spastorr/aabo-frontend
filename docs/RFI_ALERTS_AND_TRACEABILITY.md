# Sistema de Alertas y Trazabilidad RFI Mejorado

## Descripción General

Se ha implementado un sistema completo de alertas y trazabilidad mejorada para RFI que incluye:

1. **Sistema de Alertas por Demora**: Alertas automáticas cuando el cliente se demora en responder
2. **Configuración de Fecha Estimada**: Default de 5 días con posibilidad de personalización
3. **Trazabilidad Completa**: Ver transmittal enviado y transmittal de respuesta
4. **Gestión de Tiempo**: Control de tiempos de respuesta y seguimiento

## Funcionalidades Implementadas

### 1. Sistema de Alertas por Demora

#### Componente RFIAlerts:
- **Alertas Automáticas**: Detecta RFI vencidas automáticamente
- **Estados de Alerta**: 
  - 🚨 **OVERDUE**: Vencido (días de retraso)
  - ⚠️ **APPROACHING_DUE**: Se acerca la fecha estimada
  - ✅ **RESPONDED**: Respondido
  - ⏰ **ON_TIME**: En tiempo
- **Información Detallada**: Días de retraso, fecha estimada, destinatario
- **Interfaz Intuitiva**: Cards expandibles con información completa

#### Funciones de Cálculo:
- `calculateAlertStatus()`: Calcula el estado de alerta basado en fechas
- `getOverdueRFIs()`: Obtiene RFI vencidas
- `getRFIsWithAlerts()`: Obtiene RFI con información de alertas

### 2. Configuración de Fecha Estimada de Respuesta

#### En CreateRFIModal:
- **Campo de Días**: Input numérico para configurar días estimados (default: 5)
- **Cálculo Automático**: Fecha estimada se calcula automáticamente
- **Vista Previa**: Muestra la fecha estimada calculada
- **Validación**: Rango de 1-30 días
- **Información Contextual**: Explicación del sistema de alertas

#### Funciones de Cálculo:
- `calculateEstimatedResponseDate()`: Calcula fecha estimada basada en días
- **Integración**: Se integra automáticamente en la creación de RFI

### 3. Trazabilidad Mejorada

#### En RFIDetailModal:
- **Sección "Trazabilidad de Transmittals"**:
  - 📤 **Transmittal Enviado**: Donde se envió el RFI
  - 📥 **Transmittal de Respuesta**: Respuesta del cliente
  - **Información Completa**: Código, fecha, destinatario/remitente, estado

#### En TransmittalDetailModal:
- **Sección "RFIs Incluidos"**: Muestra RFI enviados en el transmittal
- **Sección "Transmittal de Respuesta"**: Muestra respuesta si existe
- **Indicadores Visuales**: Badges de estado y tipo

### 4. Información de Tiempo

#### En RFIDetailModal:
- **Sección "Información de Tiempo"**:
  - Fecha estimada de respuesta
  - Estado de alerta actual
  - Días de retraso (si aplica)
- **Indicadores Visuales**: Badges de colores según el estado

## Estructura de Datos Actualizada

### RFI con Alertas:
```javascript
{
  id: 'RFI-001',
  code: 'RFI-RLL-MOD-0001',
  // ... campos existentes
  estimatedResponseDate: '2024-08-25', // Fecha estimada de respuesta
  responseTransmittalId: 'TRN-002', // Transmittal de respuesta
  alertStatus: 'OVERDUE', // Estado de alerta
  daysOverdue: 3, // Días de retraso
  alertMessage: '3 días de retraso' // Mensaje de alerta
}
```

### Transmittal con Trazabilidad:
```javascript
{
  id: 'TRN-001',
  code: 'TRN-RLL-MOD-2024-0001',
  // ... campos existentes
  relatedRFIs: ['RFI-001'], // RFI enviados en este transmittal
  responseTransmittalId: 'TRN-002', // Transmittal de respuesta
  originalTransmittalId: 'TRN-001' // Para transmittals de respuesta
}
```

## APIs Implementadas

### En rfiMocks.js:
- `calculateEstimatedResponseDate(createdDate, daysToAdd)`: Calcula fecha estimada
- `calculateAlertStatus(rfi)`: Calcula estado de alerta
- `getRFIsWithAlerts(projectId)`: Obtiene RFI con alertas
- `getOverdueRFIs(projectId)`: Obtiene RFI vencidas

### En transmittalMocks.js:
- `getTransmittalsByRFI(rfiId)`: Obtiene transmittals relacionados
- `getResponseTransmittal(originalTransmittalId)`: Obtiene transmittal de respuesta

## Flujo de Trabajo Mejorado

1. **Creación de RFI**:
   - Usuario configura días estimados (default: 5)
   - Sistema calcula fecha estimada automáticamente
   - RFI se crea con información de alertas

2. **Envío en Transmittal**:
   - RFI se incluye en transmittal
   - Se establece relación bidireccional
   - Se registra trazabilidad completa

3. **Seguimiento de Tiempo**:
   - Sistema monitorea fechas estimadas
   - Genera alertas automáticamente
   - Actualiza estados de alerta

4. **Respuesta del Cliente**:
   - Cliente responde a través de transmittal
   - Se registra transmittal de respuesta
   - Se actualiza estado de RFI

5. **Trazabilidad Completa**:
   - Se puede ver todo el ciclo de vida
   - Desde envío hasta respuesta
   - Información completa de tiempos

## Beneficios

- **Control de Tiempo**: Gestión eficiente de tiempos de respuesta
- **Alertas Proactivas**: Notificación automática de demoras
- **Trazabilidad Completa**: Visibilidad total del ciclo de vida
- **Configuración Flexible**: Personalización de tiempos estimados
- **Mejor Comunicación**: Seguimiento eficiente con clientes

## Uso en la Interfaz

### Para crear RFI con alertas:
1. Ir a RFI → "+ Crear RFI"
2. Configurar días estimados (default: 5)
3. Ver fecha estimada calculada automáticamente
4. Crear RFI con sistema de alertas activo

### Para ver alertas:
1. Usar componente RFIAlerts en dashboard
2. Ver RFI vencidas y próximas a vencer
3. Acceder a detalles para seguimiento

### Para ver trazabilidad completa:
1. Abrir cualquier RFI
2. Ver sección "Trazabilidad de Transmittals"
3. Ver transmittal enviado y respuesta
4. Información completa de tiempos

## Consideraciones Técnicas

- **Cálculo Automático**: Fechas y alertas se calculan dinámicamente
- **Estados Persistentes**: Información de alertas se mantiene
- **Performance**: Cálculos eficientes de fechas y estados
- **Escalabilidad**: Sistema preparado para múltiples proyectos
- **Extensibilidad**: Fácil agregar más tipos de alertas
