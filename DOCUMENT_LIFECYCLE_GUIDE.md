# Guía del Ciclo de Vida de Documentos - AABO Services

## 📋 Sistema de Codificación PETROECUADOR

Basado en el manual "Elaboración y Codificación de Documentos" de PETROECUADOR.

---

## 🔢 Estructura del Código

### Formato General:
```
PROYECTO - [CONTRATISTA] - LOCACIÓN - DISCIPLINA - TIPO DOC - SECUENCIAL - REVISIÓN
```

### Ejemplo Real:
```
B43ITT298 - TPT - 70 - 315 - C
```

### Componentes:

#### 1. **PROYECTO** (ej: `B43ITT298`)
- **B** = Bloque
- **43** = Número del bloque
- **ITT** = Activo (Ishpingo-Tiputini-Tambococha)
- **298** = Secuencial del proyecto

Otros activos:
- **EY**: Edén Yuturi
- **ITT**: Ishpingo-Tiputini-Tambococha
- **SHY**: Shushufindi

#### 2. **CONTRATISTA** (ej: `SHY`) - OPCIONAL
- Solo en proyectos de Soluciones Energéticas
- 3 letras que identifican a la empresa externa
- Se omite en Gerencia de Proyectos

#### 3. **LOCACIÓN** (ej: `TPT`)
- Identifica el lugar geográfico exacto
- Ejemplos:
  - **TPT**: Central de Procesos Tiputini
  - **ZPF**: Zona de Facilidades de Producción

#### 4. **DISCIPLINA** (ej: `70`)
- Código numérico de 2 dígitos:
  - **10**: Procesos
  - **30**: Civil
  - **50**: Tubería
  - **60**: Instrumentación
  - **70**: Eléctrico
  - **80**: Mecánica

#### 5. **TIPO DE DOCUMENTO** (ej: `LDC`)
- **SE OMITE** para dibujos/planos
- Acrónimos:
  - **LDC**: Lista de Documentos
  - **RFI**: Requerimiento de Información
  - **MR**: Requisición de Materiales
  - **ET**: Especificación Técnica
  - **DS**: Datasheet
  - **CALC**: Cálculo
  - **PFD**: Diagrama de Flujo

#### 6. **SECUENCIAL** (ej: `001`)
- Número de 3 dígitos (001, 002, 003...)
- Para planos de múltiples hojas: extensiones (-SH1, -SH2)

#### 7. **REVISIÓN** (ej: `C`)
- Ver sección de "Ciclo de Revisiones" abajo

---

## 🔄 Ciclo de Revisiones

### Etapa 1: Revisiones Internas
**Rev. A, B**
- ✅ Revisiones internas de la Contratista
- ❌ NO se envían a PETROECUADOR
- 📝 Control de calidad interno
- 🎯 Objetivo: Asegurar calidad antes del envío oficial

### Etapa 2: Primera Entrega
**Rev. C**
- 📤 Primera versión enviada a PETROECUADOR
- 📋 Debe incluir Transmittal formal
- ⏱️ Plazo de revisión: **5 días laborables**
- 🎯 Objetivo: Obtener retroalimentación del cliente

### Etapa 3: Ciclo de Comentarios
**Rev. D, E, F...**
- 🔄 Versiones que incorporan comentarios de PETROECUADOR
- Posibles resultados:
  - **CMN** (Comentado): Requiere cambios, enviar siguiente revisión
  - **ACC** (Aprobado con Comentarios): Puede pasar a Rev. 0 con ajustes menores
  - **RCH** (Rechazado): Errores fundamentales, reelaborar
  - **APR** (Aprobado): Listo para Rev. 0

### Etapa 4: Para Construcción
**Rev. 0** 🏗️
- ✅ Versión APROBADA oficialmente
- 🏷️ Sello: **"APROBADO PARA CONSTRUCCIÓN"**
- 📌 Se convierte en el documento oficial para ejecutar el trabajo
- ⚠️ Hito crítico en el proyecto

### Etapa 5: Cambios en Campo
**Red Line (RL)**
- 📝 Marcas de cambios realizados durante la construcción
- 🔴 Se marcan sobre copia de la Rev. 0
- 📍 Código: Se agrega **-RL-** después de disciplina
  - Ejemplo: `B43ITT298-ZPF-30-RL-085-0`
- 👷 Lo genera: Fiscalizador o Contratista en campo
- 📸 Se escanea y envía a CDD para registro

### Etapa 6: As Built (Como se Construyó)
**Rev. 1, 2, 3...**
- 🎯 Documento FINAL del proyecto
- ✅ Incorpora TODOS los cambios del Red Line
- 🏷️ Sello: **"AS BUILT - COMO SE CONSTRUYÓ"**
- 📚 Se convierte en el registro maestro permanente
- 🔧 Base para: operaciones, mantenimiento, futuros proyectos

---

## 📊 Estados de Documento

### Estados en Elaboración:
- **ELB**: En Elaboración (Rev. A, B)
- **REV**: En Revisión (enviado al cliente)

### Estados de Retroalimentación del Cliente:
- **CMN**: Comentado (requiere cambios)
- **ACC**: Aprobado con Comentarios (cambios menores)
- **RCH**: Rechazado (errores graves)
- **APR**: Aprobado (listo para Rev. 0)

### Estados de Construcción:
- **IFC**: Para Construcción (Rev. 0)
- **RDL**: Red Line (cambios en campo)
- **ASB**: As Built (Rev. 1+)

---

## 📐 Ejemplos de Códigos Reales

### 1. Documento Tipo - Especificación Técnica
```
B43ITT298-TPT-10-ET-007-C
```
- Proyecto: B43ITT298
- Locación: TPT (Central Tiputini)
- Disciplina: 10 (Procesos)
- Tipo: ET (Especificación Técnica)
- Secuencial: 007
- Revisión: C (Primera entrega)

### 2. Plano/Dibujo (SIN tipo de documento)
```
B43ITT298-TPT-70-315-0
```
- Proyecto: B43ITT298
- Locación: TPT
- Disciplina: 70 (Eléctrico)
- **NO tiene tipo** (es un dibujo)
- Secuencial: 315
- Revisión: 0 (Para Construcción)

### 3. Red Line
```
B43ITT298-ZPF-30-RL-085-0
```
- Proyecto: B43ITT298
- Locación: ZPF
- Disciplina: 30 (Civil)
- **RL** = Red Line
- Secuencial: 085 (mismo que el original)
- Revisión: 0

### 4. As Built
```
B43ITT298-ZPF-30-085-1
```
- Proyecto: B43ITT298
- Locación: ZPF
- Disciplina: 30 (Civil)
- Secuencial: 085
- Revisión: 1 (As Built - incorpora cambios del RL)

---

## 🎯 Flujo de Trabajo en AABO Services

### 1. Portafolio → Seleccionar Proyecto
Usuario ve lista de proyectos activos

### 2. Dashboard → Ver Avance
KPIs, curvas S, presupuesto

### 3. LMD → Gestionar Documentos
Tabla con todos los documentos del proyecto

### 4. Click en Documento → Ver Detalles
**Tab Detalles**: Información actual
**Tab Historial**: 
- Timeline completo de revisiones
- Sellos (Para Construcción, As Built, Red Line)
- Comentarios de cada revisión
- Revisores y fechas
- Guía de revisiones

### 5. Transmittals → Envío Formal
Genera transmittals con documentos de la LMD

---

## 📌 Puntos Clave

### Control Centralizado:
✅ Todo pasa por CDD (Control de Documentos)
✅ No se permiten entregas directas a personal técnico
✅ Trazabilidad completa

### Plazos:
⏱️ **5 días laborables** para revisión estándar
⏱️ **2 días** para urgencias
⏱️ **10 días** para documentos complejos

### Calidad:
🎯 Revisiones internas (A, B) aseguran calidad
🎯 Rev. 0 es el documento aprobado oficial
🎯 As Built es el registro final y permanente

### Trazabilidad:
📊 Cada cambio queda registrado
📊 Historial completo de comentarios
📊 Identificación clara de revisores

---

## 🚀 Implementado en AABO Services

✅ **Códigos PETROECUADOR** - Estructura completa
✅ **Revisiones A-E, 0, 1+** - Todas las etapas
✅ **Estados del manual** - ELB, REV, CMN, ACC, RCH, APR, IFC, ASB, RDL
✅ **Sellos visuales** - Para Construcción, As Built, Red Line
✅ **Timeline visual** - Historial cronológico
✅ **Alertas de plazos** - Vencimientos de revisión
✅ **Referencias cruzadas** - Red Line ↔ Original ↔ As Built

---

## 📚 Documentos de Ejemplo

En la LMD del proyecto "Refinería La Libertad" encontrarás:

1. **PFD - Rev. 0** (IFC) - Aprobado para construcción ✅
2. **P&ID - Rev. D** (ACC) - Con comentarios pendientes
3. **Datasheet Bomba - Rev. B** (ELB) - En revisión interna
4. **SLD - Rev. C** (CMN) - Comentado por cliente
5. **Fundaciones - Rev. 1** (ASB) - As Built completo! 🎉
6. **Cálculos - Rev. C** (ACC) - Con comentarios menores
7. **ET Intercambiadores - Rev. C** (RCH) - Rechazado ❌
8. **Datasheet Compresor - Rev. A** (ELB) - Primera versión
9. **Red Line Fundaciones** (RDL) - Cambios en campo 📍

---

**Este sistema garantiza que cada documento tenga un ciclo de vida completo, trazable y auditable.**

*Última actualización: Octubre 12, 2025*

