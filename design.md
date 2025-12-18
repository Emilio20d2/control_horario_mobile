# Diseño de Control Horario Mobile

## Descripción General

Aplicación móvil nativa para iOS y Android que permite a empleados y administradores gestionar horarios, registrar horas trabajadas, consultar balances y gestionar ausencias desde dispositivos móviles.

## Orientación y Uso

- **Orientación:** Portrait (9:16)
- **Uso:** Una mano (one-handed usage)
- **Estilo:** iOS Human Interface Guidelines (HIG)

## Paleta de Colores

### Colores Principales
- **Primario (Accent):** `#007AFF` - Azul iOS estándar
- **Secundario:** `#34C759` - Verde para confirmaciones/éxito
- **Alerta:** `#FF3B30` - Rojo para errores/alertas
- **Advertencia:** `#FF9500` - Naranja para advertencias

### Colores de Texto
- **Primario:** `#11181C` (light) / `#ECEDEE` (dark)
- **Secundario:** `#687076` (light) / `#9BA1A6` (dark)
- **Deshabilitado:** `#9BA1A6` (light) / `#687076` (dark)

### Colores de Superficie
- **Background:** `#FFFFFF` (light) / `#151718` (dark)
- **Card:** `#F8F9FA` (light) / `#1E1F20` (dark)
- **Elevated:** `#FFFFFF` (light) / `#252627` (dark)

## Tipografía

- **Title (32pt):** Títulos principales de pantalla
- **Subtitle (20pt):** Subtítulos y secciones
- **Body (16pt):** Texto principal
- **Caption (14pt):** Texto secundario y etiquetas
- **Small (12pt):** Metadatos y notas

**Line Height:** Mínimo 1.3× del fontSize

## Espaciado

Sistema de 8pt grid:
- **XS:** 4pt
- **S:** 8pt
- **M:** 12pt
- **L:** 16pt
- **XL:** 24pt
- **XXL:** 32pt

## Navegación

### Estructura Principal (Bottom Tabs)

1. **Inicio** (`house.fill`)
   - Dashboard con resumen
   - Notificaciones pendientes
   - Accesos rápidos

2. **Mi Horario** (`calendar`)
   - Vista semanal/mensual
   - Registro de horas
   - Balances

3. **Ausencias** (`person.fill.badge.minus`)
   - Solicitar ausencias
   - Historial
   - Días disponibles

4. **Perfil** (`person.fill`)
   - Datos personales
   - Configuración
   - Cerrar sesión

### Navegación Secundaria

- **Stack Navigation:** Para flujos detallados (ver empleado, editar ausencia)
- **Modal:** Para acciones rápidas (confirmar, agregar)
- **Sheet:** Para opciones y filtros

## Pantallas Principales

### 1. Pantalla de Inicio (Home)

**Contenido:**
- Saludo personalizado con nombre del usuario
- Resumen de la semana actual:
  - Horas trabajadas esta semana
  - Horas pendientes
  - Balance actual
- Notificaciones importantes:
  - Semanas sin confirmar
  - Mensajes sin leer
  - Próximas ausencias
- Accesos rápidos:
  - Registrar horas hoy
  - Ver mi horario
  - Solicitar ausencia

**Layout:**
- Header con avatar y notificaciones
- Cards con información resumida
- Lista de notificaciones
- Grid de accesos rápidos (2x2)

### 2. Mi Horario

**Contenido:**
- Selector de semana (navegación horizontal)
- Vista semanal con días:
  - Horas teóricas vs trabajadas
  - Tipo de día (laboral, festivo, ausencia)
  - Estado (confirmado, pendiente)
- Resumen semanal:
  - Total de horas
  - Balance acumulado
- Botón para registrar horas del día actual

**Funcionalidad:**
- Swipe horizontal para cambiar de semana
- Tap en día para ver detalle
- Pull-to-refresh para actualizar

### 3. Registro de Horas (Modal)

**Contenido:**
- Fecha seleccionada
- Input de horas trabajadas (stepper)
- Selector de tipo de ausencia (si aplica)
- Horas complementarias
- Horas de libranza
- Preview de impacto en balance
- Botones: Cancelar / Guardar

**Layout:**
- Modal desde bottom
- Inputs grandes para fácil toque
- Preview en tiempo real
- Confirmación con haptic feedback

### 4. Ausencias

**Contenido:**
- Tabs: Solicitar / Historial
- **Solicitar:**
  - Tipo de ausencia (lista)
  - Fecha inicio/fin (date picker)
  - Días afectados (calculado)
  - Motivo (opcional, textarea)
  - Botón: Solicitar
- **Historial:**
  - Lista de ausencias pasadas y futuras
  - Estado (aprobada, pendiente, rechazada)
  - Filtros por tipo y estado

**Funcionalidad:**
- Date picker nativo
- Cálculo automático de días
- Validación de días disponibles

### 5. Perfil

**Contenido:**
- Avatar y nombre
- Información personal:
  - Email
  - DNI
  - Teléfono
  - Tipo de contrato
  - Jornada semanal
- Balances actuales:
  - Horas ordinarias
  - Horas festivos
  - Horas libranza
  - Total
- Vacaciones:
  - Días usados / disponibles
- Configuración:
  - Notificaciones
  - Tema (claro/oscuro/auto)
  - Idioma
- Cerrar sesión

**Layout:**
- Header con avatar grande
- Secciones con cards
- Lista de configuración
- Botón de logout en rojo

### 6. Login

**Contenido:**
- Logo de la app
- Título: "Control Horario"
- Input de email
- Input de contraseña
- Botón: Iniciar sesión
- Link: ¿Olvidaste tu contraseña?

**Layout:**
- Centrado verticalmente
- Inputs con padding generoso
- Botón destacado
- Safe area respetada

## Pantallas Administrativas (Solo Admin)

### 7. Empleados (Admin)

**Contenido:**
- Lista de empleados activos
- Búsqueda
- Filtros (activos/inactivos, tipo contrato)
- Card por empleado:
  - Nombre y avatar
  - Tipo de contrato
  - Balance actual
  - Botón: Ver detalle

**Funcionalidad:**
- Búsqueda en tiempo real
- Tap para ver detalle
- Pull-to-refresh

### 8. Detalle Empleado (Admin)

**Contenido:**
- Información personal completa
- Balances y vacaciones
- Historial de horas (últimas semanas)
- Ausencias programadas
- Botones de acción:
  - Editar empleado
  - Ver horario completo
  - Gestionar ausencias

### 9. Registro Horario Semanal (Admin)

**Contenido:**
- Selector de semana
- Lista de todos los empleados
- Por empleado:
  - Nombre
  - Horas trabajadas
  - Estado (confirmado/pendiente)
  - Botón: Editar
- Botón: Confirmar semana

**Funcionalidad:**
- Edición rápida de horas
- Confirmación masiva
- Filtros por estado

## Componentes UI Reutilizables

### Cards
- **BalanceCard:** Muestra un balance con icono y valor
- **EmployeeCard:** Card de empleado en lista
- **WeekDayCard:** Día de la semana con horas
- **NotificationCard:** Notificación con icono y acción

### Inputs
- **HourStepper:** Stepper para horas (+ / - buttons)
- **DatePicker:** Selector de fecha nativo
- **AbsenceTypePicker:** Selector de tipo de ausencia

### Buttons
- **PrimaryButton:** Botón principal (azul)
- **SecondaryButton:** Botón secundario (outline)
- **DangerButton:** Botón de acción destructiva (rojo)

### Lists
- **EmployeeList:** Lista de empleados con búsqueda
- **AbsenceList:** Lista de ausencias con filtros
- **WeekList:** Lista de semanas con navegación

## Flujos de Usuario Principales

### Flujo 1: Empleado Registra Horas
1. Login → Inicio
2. Tap "Registrar horas hoy"
3. Modal: Ingresar horas
4. Ver preview de balance
5. Guardar
6. Confirmación con haptic
7. Volver a Inicio (actualizado)

### Flujo 2: Empleado Solicita Ausencia
1. Inicio → Tab "Ausencias"
2. Tab "Solicitar"
3. Seleccionar tipo
4. Seleccionar fechas
5. Ver días calculados
6. Ingresar motivo (opcional)
7. Solicitar
8. Confirmación
9. Ver en Historial

### Flujo 3: Admin Confirma Semana
1. Login (admin) → Inicio
2. Ver "Semanas pendientes"
3. Tap para ir a Registro Horario
4. Revisar empleados pendientes
5. Editar horas si necesario
6. Confirmar semana
7. Confirmación masiva
8. Volver a Inicio

### Flujo 4: Consultar Balance
1. Cualquier pantalla → Tab "Perfil"
2. Ver sección "Balances"
3. Ver desglose:
   - Horas ordinarias
   - Horas festivos
   - Horas libranza
   - Total
4. Ver vacaciones disponibles

## Interacciones y Animaciones

### Gestos
- **Swipe horizontal:** Cambiar semana en Mi Horario
- **Pull-to-refresh:** Actualizar listas
- **Tap:** Seleccionar, abrir detalle
- **Long press:** Opciones adicionales (futuro)

### Animaciones
- **Fade in:** Al cargar contenido
- **Slide from bottom:** Modals y sheets
- **Spring:** Botones al presionar
- **Smooth scroll:** Listas y navegación

### Haptic Feedback
- **Light:** Tap en botones secundarios
- **Medium:** Confirmaciones
- **Success:** Guardado exitoso
- **Error:** Validación fallida

## Iconografía

### SF Symbols (iOS) / Material Icons (Android)

- **house.fill** → home (Inicio)
- **calendar** → calendar-today (Horario)
- **person.fill.badge.minus** → person-remove (Ausencias)
- **person.fill** → person (Perfil)
- **clock.fill** → access-time (Horas)
- **checkmark.circle.fill** → check-circle (Confirmado)
- **exclamationmark.triangle.fill** → warning (Advertencia)
- **bell.fill** → notifications (Notificaciones)
- **gearshape.fill** → settings (Configuración)
- **arrow.right.circle.fill** → arrow-forward (Acción)

## Datos Locales vs Backend

### Almacenamiento Local (AsyncStorage)
- Credenciales de sesión
- Preferencias de usuario (tema, idioma)
- Cache de datos recientes
- Modo offline (futuro)

### Backend (API)
- Datos de empleados
- Registros de horas
- Ausencias
- Balances
- Configuración global
- Mensajes

## Consideraciones de Rendimiento

- **FlatList** para todas las listas largas
- **Memoización** de componentes pesados
- **Lazy loading** de imágenes
- **Cache** de datos frecuentes
- **Optimistic updates** para mejor UX

## Accesibilidad

- **Touch targets:** Mínimo 44pt
- **Contraste:** WCAG AA mínimo
- **Labels:** Todos los elementos interactivos
- **VoiceOver/TalkBack:** Soporte completo
- **Dynamic Type:** Soporte para tamaños de fuente

## Notas de Implementación

1. **Prioridad:** Funcionalidad de empleado primero (registro, consulta)
2. **Segundo:** Funcionalidad administrativa
3. **Tercero:** Notificaciones push
4. **Cuarto:** Modo offline

---

**Versión:** 1.0.0  
**Fecha:** Diciembre 2024  
**Plataformas:** iOS 14+, Android 10+
