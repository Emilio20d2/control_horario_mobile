# Control Horario Mobile

Aplicación móvil nativa para iOS y Android del sistema de gestión de horarios y turnos de empleados. Permite registrar horas, gestionar ausencias, consultar balances y comunicarse con la administración desde dispositivos móviles.

## 📱 Características

### Para Empleados

**Dashboard Personalizado**
- Resumen semanal de horas trabajadas y pendientes
- Balance actual de horas
- Notificaciones importantes
- Accesos rápidos a funciones principales

**Gestión de Horarios**
- Vista semanal de horas trabajadas
- Registro de horas diarias
- Consulta de horas teóricas vs reales
- Estado de confirmación de semanas
- Balance acumulado

**Gestión de Ausencias**
- Solicitud de vacaciones, asuntos propios, enfermedad
- Consulta de días disponibles
- Historial de ausencias (aprobadas, pendientes, rechazadas)
- Visualización de próximas ausencias

**Perfil de Usuario**
- Información personal completa
- Balances detallados (ordinarias, festivos, libranza)
- Estado de vacaciones (usados/disponibles)
- Configuración de notificaciones y tema
- Gestión de sesión

### Para Administradores

**Gestión de Empleados**
- Lista completa de empleados
- Búsqueda y filtros
- Consulta de balances individuales
- Acceso a detalles completos

**Registro Horario**
- Vista semanal de todos los empleados
- Confirmación masiva de semanas
- Edición de horas
- Gestión de ausencias

## 🎨 Diseño

La aplicación sigue las **Apple Human Interface Guidelines (HIG)** para proporcionar una experiencia nativa en iOS, con soporte completo para Android utilizando Material Design.

### Paleta de Colores

- **Primario:** `#007AFF` (Azul iOS)
- **Éxito:** `#34C759` (Verde)
- **Advertencia:** `#FF9500` (Naranja)
- **Error:** `#FF3B30` (Rojo)

### Características de UI/UX

- Diseño optimizado para uso con una mano
- Orientación portrait (9:16)
- Navegación por pestañas en la parte inferior
- Soporte completo para modo claro y oscuro
- Animaciones suaves y haptic feedback
- Safe area handling para dispositivos con notch

## 🛠️ Tecnologías

- **React Native** 0.81
- **Expo SDK** 54
- **TypeScript** 5.9
- **Expo Router** 6 (navegación basada en archivos)
- **React Native Reanimated** 4.x (animaciones)
- **AsyncStorage** (almacenamiento local)
- **tRPC** (comunicación con backend)

## 📦 Instalación

### Requisitos Previos

- Node.js 18 o superior
- pnpm, npm o yarn
- Expo Go app (para desarrollo en dispositivo físico)
- iOS Simulator o Android Emulator (para desarrollo en emulador)

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Emilio20d2/control_horario_mobile.git
cd control_horario_mobile
```

2. **Instalar dependencias:**
```bash
pnpm install
# o
npm install
# o
yarn install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
# Backend API URL
EXPO_PUBLIC_API_URL=http://localhost:3000

# OAuth Configuration (si aplica)
EXPO_PUBLIC_OAUTH_CLIENT_ID=your_client_id
EXPO_PUBLIC_OAUTH_REDIRECT_URI=your_redirect_uri
```

4. **Iniciar el servidor de desarrollo:**
```bash
pnpm start
# o
npm start
# o
yarn start
```

5. **Ejecutar en dispositivo/emulador:**

- **iOS:** Presiona `i` en la terminal o escanea el código QR con la app Expo Go
- **Android:** Presiona `a` en la terminal o escanea el código QR con la app Expo Go
- **Web:** Presiona `w` en la terminal

## 🚀 Desarrollo

### Estructura del Proyecto

```
control-horario-mobile/
├── app/                      # Rutas de la aplicación (Expo Router)
│   ├── (tabs)/              # Navegación por pestañas
│   │   ├── index.tsx        # Pantalla de Inicio (Dashboard)
│   │   ├── schedule.tsx     # Mi Horario
│   │   ├── absences.tsx     # Ausencias
│   │   └── profile.tsx      # Perfil
│   ├── modal.tsx            # Pantalla modal de ejemplo
│   └── oauth/               # Callbacks de autenticación
├── components/              # Componentes reutilizables
│   ├── themed-text.tsx      # Texto con soporte de tema
│   ├── themed-view.tsx      # Vista con soporte de tema
│   └── ui/                  # Componentes UI
├── constants/               # Constantes y configuración
│   └── theme.ts             # Colores y fuentes
├── hooks/                   # Custom hooks
│   ├── use-auth.ts          # Hook de autenticación
│   └── use-theme-color.ts   # Hook de colores del tema
├── lib/                     # Utilidades y servicios
│   └── trpc.ts              # Cliente API
├── assets/                  # Recursos estáticos
│   └── images/              # Imágenes e iconos
├── app.config.ts            # Configuración de Expo
├── design.md                # Documentación de diseño
└── todo.md                  # Lista de tareas
```

### Agregar una Nueva Pantalla

1. **Crear el archivo de la pantalla:**
```tsx
// app/(tabs)/nueva-pantalla.tsx
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function NuevaPantallaScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Nueva Pantalla</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

2. **Agregar icono al mapeo** (si es una pestaña):
```tsx
// components/ui/icon-symbol.tsx
const MAPPING = {
  // ... iconos existentes
  "tu.icono.fill": "tu-icono-material",
};
```

3. **Configurar la pestaña:**
```tsx
// app/(tabs)/_layout.tsx
<Tabs.Screen
  name="nueva-pantalla"
  options={{
    title: "Nueva",
    tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="tu.icono.fill" color={color} />
    ),
  }}
/>
```

### Personalizar el Tema

Edita `constants/theme.ts` para cambiar los colores:

```tsx
export const Colors = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: "#007AFF",  // Color primario
    // ... más colores
  },
  dark: {
    // ... colores para modo oscuro
  },
};
```

## 📱 Compilación para Producción

### iOS

1. **Configurar credenciales:**
```bash
eas build:configure
```

2. **Compilar:**
```bash
eas build --platform ios
```

### Android

1. **Compilar:**
```bash
eas build --platform android
```

### Ambas Plataformas

```bash
eas build --platform all
```

## 🔐 Autenticación

La aplicación utiliza OAuth para autenticación. El flujo es:

1. Usuario toca "Iniciar Sesión"
2. Se abre el navegador con la URL de OAuth
3. Usuario ingresa credenciales en el servidor
4. El servidor redirige a la app con un código
5. La app intercambia el código por un token
6. El token se guarda en AsyncStorage

## 💾 Almacenamiento de Datos

### Local (AsyncStorage)

- Credenciales de sesión
- Preferencias de usuario
- Cache de datos recientes

### Backend (API)

- Datos de empleados
- Registros de horas
- Ausencias
- Balances
- Configuración global

## 🧪 Testing

```bash
# Ejecutar tests
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch

# Generar reporte de cobertura
pnpm test:coverage
```

## 📄 Licencia

Este proyecto es privado y pertenece a [Tu Organización].

## 🤝 Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Haz commit de tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📞 Soporte

Para preguntas o problemas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo

---

**Versión:** 1.0.0  
**Última actualización:** Diciembre 2024  
**Desarrollado con** ❤️ **usando React Native y Expo**
