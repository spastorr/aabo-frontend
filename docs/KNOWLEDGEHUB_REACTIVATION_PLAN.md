# Plan de Re-activación del Knowledge Hub - Paso a Paso

## ✅ PASO 1: Verificar que la app funciona sin KnowledgeHub
**Estado: COMPLETADO**
- KnowledgeHub deshabilitado en App.jsx
- Servidor iniciado: http://localhost:5173
- **PRUEBA:** La aplicación debería cargar sin errores

---

## 📝 PASO 2: Habilitar solo la página principal (Overview)

### 2.1 Verificar que KnowledgeHubPage.jsx no tenga problemas
```bash
# Esta página solo usa componentes básicos: Card, Button
```

### 2.2 Re-habilitar en App.jsx
```javascript
import { KnowledgeHubPage } from './features/knowledgeHub';

// En las rutas:
<Route path="knowledge-hub">
  <Route index element={<KnowledgeHubPage />} />
</Route>
```

### 2.3 Probar
- Navegar a http://localhost:5173/knowledge-hub
- Debería mostrar la página Overview sin errores

---

## 📝 PASO 3: Habilitar Historical Projects

### 3.1 Verificar componentes necesarios
- **Problema conocido:** ArchiveLMD.jsx tiene error con StatusBadge y Table
- **Solución:** Comentar temporalmente ArchiveLMD dentro de ProjectArchiveDetail

### 3.2 Re-habilitar en App.jsx
```javascript
import { 
  KnowledgeHubPage, 
  HistoricalProjectsPage 
} from './features/knowledgeHub';

<Route path="historical-projects" element={<HistoricalProjectsPage />} />
```

### 3.3 Probar
- Navegar a http://localhost:5173/knowledge-hub/historical-projects
- Lista de proyectos debería funcionar
- Evitar hacer clic en un proyecto hasta resolver ArchiveLMD

---

## 📝 PASO 4: Habilitar Search

### 4.1 Re-habilitar en App.jsx
```javascript
import { 
  KnowledgeHubPage, 
  HistoricalProjectsPage,
  UnifiedSearchPage 
} from './features/knowledgeHub';

<Route path="search" element={<UnifiedSearchPage />} />
```

### 4.2 Probar
- Navegar a http://localhost:5173/knowledge-hub/search

---

## 📝 PASO 5: Habilitar Standards

### 5.1 Re-habilitar en App.jsx
```javascript
import { 
  KnowledgeHubPage, 
  HistoricalProjectsPage,
  UnifiedSearchPage,
  StandardsPage 
} from './features/knowledgeHub';

<Route path="standards" element={<StandardsPage />} />
```

### 5.2 Probar
- Navegar a http://localhost:5173/knowledge-hub/standards

---

## 🔧 PASO 6: Resolver problemas identificados

### 6.1 Arreglar ArchiveLMD - StatusBadge
**Problema:** Ruta incorrecta para StatusBadge

**Solución:**
```javascript
// En ArchiveLMD.jsx, cambiar:
import StatusBadge from '../../../../../projects/lmd/components/StatusBadge';
// A:
// Crear un StatusBadge local simple o usar Badge del sistema
```

### 6.2 Arreglar Table import
**Problema:** "No matching export in 'src/components/shared/Table/index.js' for import 'default'"

**Verificar:** 
```javascript
// src/components/shared/Table/index.js debería tener:
export { default } from './Table';
```

---

## 📊 Diagnóstico de Errores por Sección

### Historical Projects - Componentes:
- ✅ ProjectArchiveList - OK
- ✅ ProjectArchiveCard - OK  
- ✅ ArchiveFilters - OK
- ⚠️ ArchiveLMD - PROBLEMA: StatusBadge + Table
- ✅ ArchiveMetrics - OK
- ✅ TagManager - OK

### Search - Componentes:
- ✅ SearchInput - OK
- ✅ SearchFilters - OK
- ✅ ContextualResults - OK
- ✅ ResultsByCategory - OK

### Standards - Componentes:
- ✅ ClientStandards - OK
- ✅ ClientProfile - OK
- ✅ InternalGuides - OK
- ✅ GuideList - OK
- ✅ ExternalNorms - OK
- ✅ NormsList - OK
- ✅ UploadStandardModal - OK (FileUpload ya reemplazado con input)
- ✅ VersionControl - OK

---

## 🚀 Siguiente Paso AHORA

**Verificar que el servidor esté funcionando sin errores:**
1. Abrir http://localhost:5173 en el navegador
2. La aplicación debería cargar normalmente
3. El menú de Knowledge Hub aún aparecerá pero los links no funcionarán (esperado)

**Si funciona correctamente, proceder con PASO 2**

