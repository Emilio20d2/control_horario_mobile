# Repositorio GitHub - Control Horario Mobile

## 📦 Repositorio Creado

El proyecto **Control Horario Mobile** ha sido publicado exitosamente en GitHub:

**URL:** https://github.com/Emilio20d2/control_horario_mobile

## 📋 Información del Repositorio

- **Nombre:** control_horario_mobile
- **Propietario:** Emilio20d2
- **Visibilidad:** Público
- **Descripción:** Aplicación móvil nativa para iOS y Android del sistema Control Horario - Gestión de horarios, ausencias y balances de empleados

## 🚀 Contenido Publicado

El repositorio incluye:

### Código Fuente
- ✅ Aplicación React Native completa con Expo
- ✅ 4 pantallas principales (Dashboard, Horario, Ausencias, Perfil)
- ✅ Sistema de navegación por pestañas
- ✅ Autenticación OAuth
- ✅ Tema personalizado con modo claro/oscuro
- ✅ Componentes UI reutilizables

### Recursos
- ✅ Logo personalizado generado con IA
- ✅ Iconos para iOS y Android
- ✅ Splash screen
- ✅ Assets de imágenes

### Documentación
- ✅ README.md completo con instrucciones
- ✅ design.md con especificaciones de diseño
- ✅ todo.md con lista de tareas
- ✅ Comentarios en código

### Configuración
- ✅ app.config.ts configurado
- ✅ package.json con dependencias
- ✅ TypeScript configurado
- ✅ .gitignore apropiado

## 🔄 Clonar el Repositorio

Para trabajar con el repositorio:

```bash
# Clonar
git clone https://github.com/Emilio20d2/control_horario_mobile.git
cd control_horario_mobile

# Instalar dependencias
pnpm install

# Iniciar desarrollo
pnpm start
```

## 📱 Probar la Aplicación

### Opción 1: Expo Go (Recomendado para desarrollo)

1. Instala Expo Go en tu dispositivo:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Ejecuta el proyecto:
```bash
pnpm start
```

3. Escanea el código QR con:
   - iOS: App de Cámara
   - Android: App Expo Go

### Opción 2: Emuladores

**iOS Simulator (requiere macOS):**
```bash
pnpm start
# Presiona 'i' en la terminal
```

**Android Emulator:**
```bash
pnpm start
# Presiona 'a' en la terminal
```

### Opción 3: Web (para pruebas rápidas)
```bash
pnpm start
# Presiona 'w' en la terminal
```

## 🏗️ Compilar para Producción

### Configurar EAS (Expo Application Services)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login en Expo
eas login

# Configurar el proyecto
eas build:configure
```

### Compilar para iOS

```bash
eas build --platform ios
```

### Compilar para Android

```bash
eas build --platform android
```

### Compilar para ambas plataformas

```bash
eas build --platform all
```

## 📝 Estructura del Repositorio

```
control_horario_mobile/
├── app/                      # Pantallas de la aplicación
│   ├── (tabs)/              # Navegación principal
│   │   ├── index.tsx        # Dashboard
│   │   ├── schedule.tsx     # Mi Horario
│   │   ├── absences.tsx     # Ausencias
│   │   └── profile.tsx      # Perfil
│   └── oauth/               # Autenticación
├── components/              # Componentes reutilizables
├── constants/               # Tema y configuración
├── hooks/                   # Custom hooks
├── lib/                     # Utilidades
├── assets/                  # Recursos estáticos
├── app.config.ts            # Configuración Expo
├── package.json             # Dependencias
├── README.md                # Documentación principal
├── design.md                # Especificaciones de diseño
└── todo.md                  # Tareas pendientes
```

## 🔐 Variables de Entorno

Crea un archivo `.env.local` con:

```env
# Backend API
EXPO_PUBLIC_API_URL=http://localhost:3000

# OAuth (si aplica)
EXPO_PUBLIC_OAUTH_CLIENT_ID=your_client_id
EXPO_PUBLIC_OAUTH_REDIRECT_URI=your_redirect_uri
```

**Nota:** El archivo `.env.local` NO está en el repositorio por seguridad.

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📊 Estado del Proyecto

### Completado ✅
- Configuración inicial y branding
- Navegación por pestañas
- Pantalla Dashboard
- Pantalla Mi Horario
- Pantalla Ausencias
- Pantalla Perfil
- Autenticación OAuth
- Tema claro/oscuro

### Pendiente 🚧
- Modal de registro de horas
- Integración con backend real
- Pantallas administrativas
- Notificaciones push
- Modo offline
- Tests automatizados

## 🔗 Enlaces Relacionados

- **Repositorio Web Original:** https://github.com/Emilio20d2/control_horario
- **Repositorio Mobile:** https://github.com/Emilio20d2/control_horario_mobile
- **Expo Documentation:** https://docs.expo.dev/
- **React Native Documentation:** https://reactnative.dev/

## 📞 Soporte

Para preguntas o problemas:
- Crear un issue en GitHub
- Revisar la documentación en README.md
- Consultar design.md para especificaciones

---

**Repositorio creado:** Diciembre 2024  
**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0
