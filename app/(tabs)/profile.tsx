import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/use-auth";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const errorColor = useThemeColor({}, "error");
  const successColor = useThemeColor({}, "success");
  const { user, logout } = useAuth();

  // Datos de ejemplo - en producción vendrían del backend
  const userProfile = {
    name: user?.name || "Usuario Demo",
    email: user?.email || "usuario@ejemplo.com",
    dni: "12345678A",
    phone: "+34 600 123 456",
    contractType: "Jornada Completa",
    weeklyHours: 40,
    balances: {
      ordinary: 12.5,
      holidays: 8,
      timeOff: -4,
      total: 16.5,
    },
    vacations: {
      used: 10,
      available: 22,
      total: 32,
    },
  };

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
        {/* Header con avatar */}
        <ThemedView style={styles.profileHeader}>
          <ThemedView style={[styles.avatar, { backgroundColor: tintColor }]}>
            <ThemedText style={styles.avatarText}>
              {userProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </ThemedText>
          </ThemedView>
          <ThemedText type="title" style={styles.userName}>
            {userProfile.name}
          </ThemedText>
          <ThemedText style={styles.userEmail}>{userProfile.email}</ThemedText>
        </ThemedView>

        {/* Información Personal */}
        <ThemedView style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Información Personal
          </ThemedText>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>DNI</ThemedText>
            <ThemedText type="defaultSemiBold">{userProfile.dni}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Teléfono</ThemedText>
            <ThemedText type="defaultSemiBold">{userProfile.phone}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Tipo de Contrato</ThemedText>
            <ThemedText type="defaultSemiBold">{userProfile.contractType}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Jornada Semanal</ThemedText>
            <ThemedText type="defaultSemiBold">{userProfile.weeklyHours}h</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Balances */}
        <ThemedView style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Balances de Horas
          </ThemedText>
          <ThemedView style={styles.balanceRow}>
            <ThemedText>Horas Ordinarias</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{ color: userProfile.balances.ordinary >= 0 ? successColor : errorColor }}
            >
              {userProfile.balances.ordinary >= 0 ? "+" : ""}
              {userProfile.balances.ordinary}h
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.balanceRow}>
            <ThemedText>Horas Festivos</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{ color: userProfile.balances.holidays >= 0 ? successColor : errorColor }}
            >
              {userProfile.balances.holidays >= 0 ? "+" : ""}
              {userProfile.balances.holidays}h
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.balanceRow}>
            <ThemedText>Horas Libranza</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{ color: userProfile.balances.timeOff >= 0 ? successColor : errorColor }}
            >
              {userProfile.balances.timeOff >= 0 ? "+" : ""}
              {userProfile.balances.timeOff}h
            </ThemedText>
          </ThemedView>
          <ThemedView style={[styles.balanceRow, styles.totalRow]}>
            <ThemedText type="defaultSemiBold">Balance Total</ThemedText>
            <ThemedText
              type="subtitle"
              style={{ color: userProfile.balances.total >= 0 ? successColor : errorColor }}
            >
              {userProfile.balances.total >= 0 ? "+" : ""}
              {userProfile.balances.total}h
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Vacaciones */}
        <ThemedView style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Vacaciones
          </ThemedText>
          <ThemedView style={styles.vacationBar}>
            <ThemedView
              style={[
                styles.vacationProgress,
                {
                  backgroundColor: tintColor,
                  width: `${(userProfile.vacations.used / userProfile.vacations.total) * 100}%`,
                },
              ]}
            />
          </ThemedView>
          <ThemedView style={styles.vacationInfo}>
            <ThemedView style={styles.vacationStat}>
              <ThemedText style={styles.vacationNumber}>{userProfile.vacations.used}</ThemedText>
              <ThemedText style={styles.vacationLabel}>Usados</ThemedText>
            </ThemedView>
            <ThemedView style={styles.vacationStat}>
              <ThemedText style={[styles.vacationNumber, { color: successColor }]}>
                {userProfile.vacations.available}
              </ThemedText>
              <ThemedText style={styles.vacationLabel}>Disponibles</ThemedText>
            </ThemedView>
            <ThemedView style={styles.vacationStat}>
              <ThemedText style={styles.vacationNumber}>{userProfile.vacations.total}</ThemedText>
              <ThemedText style={styles.vacationLabel}>Total</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Configuración */}
        <ThemedView style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Configuración
          </ThemedText>
          <Pressable style={styles.settingRow}>
            <ThemedText>Notificaciones</ThemedText>
            <ThemedText style={{ color: tintColor }}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.settingRow}>
            <ThemedText>Tema</ThemedText>
            <ThemedText style={{ color: tintColor }}>Automático →</ThemedText>
          </Pressable>
          <Pressable style={styles.settingRow}>
            <ThemedText>Idioma</ThemedText>
            <ThemedText style={{ color: tintColor }}>Español →</ThemedText>
          </Pressable>
        </ThemedView>

        {/* Botón de Cerrar Sesión */}
        <Pressable
          style={[styles.logoutButton, { backgroundColor: errorColor }]}
          onPress={logout}
        >
          <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
  },
  profileHeader: {
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  userName: {
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.6,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.6,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  vacationBar: {
    height: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  vacationProgress: {
    height: "100%",
    borderRadius: 4,
  },
  vacationInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  vacationStat: {
    alignItems: "center",
    gap: 4,
  },
  vacationNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  vacationLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  logoutButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
