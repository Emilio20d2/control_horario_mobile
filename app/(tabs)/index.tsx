import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getLoginUrl } from "@/constants/oauth";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function HomeScreen() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const successColor = useThemeColor({}, "success");
  const warningColor = useThemeColor({}, "warning");

  // Datos de ejemplo - en producción vendrían del backend
  const weekSummary = {
    worked: 23.5,
    pending: 16.5,
    balance: 7,
  };

  const notifications = [
    { id: 1, type: "warning", message: "Semana 49 sin confirmar", action: "Confirmar" },
    { id: 2, type: "info", message: "2 mensajes sin leer", action: "Ver" },
    { id: 3, type: "success", message: "Vacaciones aprobadas: 23-27 Dic", action: "" },
  ];

  const quickActions = [
    { id: 1, title: "Registrar Horas", icon: "⏱️", route: "/schedule" },
    { id: 2, title: "Mi Horario", icon: "📅", route: "/schedule" },
    { id: 3, title: "Solicitar Ausencia", icon: "🏖️", route: "/absences" },
    { id: 4, title: "Ver Balance", icon: "📊", route: "/profile" },
  ];

  useEffect(() => {
    console.log("[HomeScreen] Auth state:", {
      hasUser: !!user,
      loading,
      isAuthenticated,
      user: user ? { id: user.id, openId: user.openId, name: user.name, email: user.email } : null,
    });
  }, [user, loading, isAuthenticated]);

  const handleLogin = async () => {
    try {
      console.log("[Auth] Login button clicked");
      setIsLoggingIn(true);
      const loginUrl = getLoginUrl();
      console.log("[Auth] Generated login URL:", loginUrl);

      // On web, use direct redirect in same tab
      // On mobile, use WebBrowser to open OAuth in a separate context
      if (Platform.OS === "web") {
        console.log("[Auth] Web platform: redirecting to OAuth in same tab...");
        window.location.href = loginUrl;
        return;
      }

      // Mobile: Open OAuth URL in browser
      // The OAuth server will redirect to our deep link (manusapp://oauth/callback?code=...&state=...)
      console.log("[Auth] Opening OAuth URL in browser...");
      const result = await WebBrowser.openAuthSessionAsync(
        loginUrl,
        undefined, // Deep link is already configured in getLoginUrl, so no need to specify here
        {
          preferEphemeralSession: false,
          showInRecents: true,
        },
      );

      console.log("[Auth] WebBrowser result:", result);
      if (result.type === "cancel") {
        console.log("[Auth] OAuth cancelled by user");
      } else if (result.type === "dismiss") {
        console.log("[Auth] OAuth dismissed");
      } else if (result.type === "success" && result.url) {
        console.log("[Auth] OAuth session successful, navigating to callback:", result.url);
        // Extract code and state from the URL
        try {
          // Parse the URL - it might be exp:// or a regular URL
          let url: URL;
          if (result.url.startsWith("exp://") || result.url.startsWith("exps://")) {
            // For exp:// URLs, we need to parse them differently
            // Format: exp://192.168.31.156:8081/--/oauth/callback?code=...&state=...
            const urlStr = result.url.replace(/^exp(s)?:\/\//, "http://");
            url = new URL(urlStr);
          } else {
            url = new URL(result.url);
          }

          const code = url.searchParams.get("code");
          const state = url.searchParams.get("state");
          const error = url.searchParams.get("error");

          console.log("[Auth] Extracted params from callback URL:", {
            code: code?.substring(0, 20) + "...",
            state: state?.substring(0, 20) + "...",
            error,
          });

          if (error) {
            console.error("[Auth] OAuth error in callback:", error);
            return;
          }

          if (code && state) {
            // Navigate to callback route with params
            console.log("[Auth] Navigating to callback route with params...");
            router.push({
              pathname: "/oauth/callback" as any,
              params: { code, state },
            });
          } else {
            console.error("[Auth] Missing code or state in callback URL");
          }
        } catch (err) {
          console.error("[Auth] Failed to parse callback URL:", err, result.url);
          // Fallback: try parsing with regex
          const codeMatch = result.url.match(/[?&]code=([^&]+)/);
          const stateMatch = result.url.match(/[?&]state=([^&]+)/);

          if (codeMatch && stateMatch) {
            const code = decodeURIComponent(codeMatch[1]);
            const state = decodeURIComponent(stateMatch[1]);
            console.log("[Auth] Fallback: extracted params via regex, navigating...");
            router.push({
              pathname: "/oauth/callback" as any,
              params: { code, state },
            });
          } else {
            console.error("[Auth] Could not extract code/state from URL");
          }
        }
      }
    } catch (error) {
      console.error("[Auth] Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated || !user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.loginContainer, {
          paddingTop: Math.max(insets.top, 40),
          paddingBottom: Math.max(insets.bottom, 40),
          paddingLeft: Math.max(insets.left, 24),
          paddingRight: Math.max(insets.right, 24),
        }]}>
          <ThemedText type="title" style={styles.loginTitle}>Control Horario</ThemedText>
          <ThemedText style={styles.loginSubtitle}>Gestiona tu tiempo de trabajo</ThemedText>
          
          {loading ? (
            <ActivityIndicator size="large" color={tintColor} style={styles.loader} />
          ) : (
            <Pressable
              onPress={handleLogin}
              disabled={isLoggingIn}
              style={[styles.loginButton, { backgroundColor: tintColor }, isLoggingIn && styles.loginButtonDisabled]}
            >
              {isLoggingIn ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.loginButtonText}>Iniciar Sesión</ThemedText>
              )}
            </Pressable>
          )}
        </ThemedView>
      </ThemedView>
    );
  }

  // Dashboard para usuario autenticado
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 20),
            paddingBottom: Math.max(insets.bottom, 20),
            paddingLeft: Math.max(insets.left, 16),
            paddingRight: Math.max(insets.right, 16),
          },
        ]}
      >
        {/* Saludo */}
        <ThemedView style={styles.greeting}>
          <ThemedText type="title">¡Hola, {user.name?.split(" ")[0] || "Usuario"}!</ThemedText>
          <ThemedText style={styles.greetingSubtext}>Bienvenido a tu panel de control</ThemedText>
        </ThemedView>

        {/* Resumen Semanal */}
        <ThemedView style={[styles.summaryCard, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>Resumen de la Semana</ThemedText>
          <ThemedView style={styles.summaryGrid}>
            <ThemedView style={styles.summaryItem}>
              <ThemedText style={styles.summaryValue}>{weekSummary.worked}h</ThemedText>
              <ThemedText style={styles.summaryLabel}>Trabajadas</ThemedText>
            </ThemedView>
            <ThemedView style={styles.summaryItem}>
              <ThemedText style={styles.summaryValue}>{weekSummary.pending}h</ThemedText>
              <ThemedText style={styles.summaryLabel}>Pendientes</ThemedText>
            </ThemedView>
            <ThemedView style={styles.summaryItem}>
              <ThemedText style={[styles.summaryValue, { color: successColor }]}>+{weekSummary.balance}h</ThemedText>
              <ThemedText style={styles.summaryLabel}>Balance</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Notificaciones */}
        <ThemedView style={styles.notificationsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Notificaciones</ThemedText>
          {notifications.map((notif) => (
            <ThemedView key={notif.id} style={[styles.notificationCard, { backgroundColor: cardBg, borderColor }]}>
              <ThemedView style={styles.notificationContent}>
                <ThemedText style={styles.notificationIcon}>
                  {notif.type === "warning" ? "⚠️" : notif.type === "success" ? "✅" : "ℹ️"}
                </ThemedText>
                <ThemedText style={styles.notificationText}>{notif.message}</ThemedText>
              </ThemedView>
              {notif.action && (
                <ThemedText style={{ color: tintColor, fontWeight: "600" }}>{notif.action}</ThemedText>
              )}
            </ThemedView>
          ))}
        </ThemedView>

        {/* Accesos Rápidos */}
        <ThemedView style={styles.quickActionsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Accesos Rápidos</ThemedText>
          <ThemedView style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                style={[styles.quickActionCard, { backgroundColor: cardBg, borderColor }]}
                onPress={() => router.push(action.route as any)}
              >
                <ThemedText style={styles.quickActionIcon}>{action.icon}</ThemedText>
                <ThemedText style={styles.quickActionTitle}>{action.title}</ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  loginTitle: {
    textAlign: "center",
  },
  loginSubtitle: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: "center",
  },
  loader: {
    marginTop: 32,
  },
  loginButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    minWidth: 200,
    marginTop: 32,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 24,
  },
  greeting: {
    gap: 4,
  },
  greetingSubtext: {
    fontSize: 14,
    opacity: 0.6,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  cardTitle: {
    marginBottom: 8,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
    gap: 8,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: "bold",
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  notificationsSection: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  notificationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
  },
  quickActionsSection: {
    gap: 12,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickActionCard: {
    width: "48%",
    aspectRatio: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  quickActionIcon: {
    fontSize: 32,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
