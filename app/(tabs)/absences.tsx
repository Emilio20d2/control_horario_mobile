import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

type Tab = "request" | "history";

export default function AbsencesScreen() {
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const successColor = useThemeColor({}, "success");
  const warningColor = useThemeColor({}, "warning");
  const errorColor = useThemeColor({}, "error");

  const [activeTab, setActiveTab] = useState<Tab>("request");

  // Datos de ejemplo
  const absenceTypes = [
    { id: 1, name: "Vacaciones", available: 15 },
    { id: 2, name: "Asuntos Propios", available: 6 },
    { id: 3, name: "Enfermedad", available: null },
  ];

  const absenceHistory = [
    {
      id: 1,
      type: "Vacaciones",
      startDate: "2024-12-23",
      endDate: "2024-12-27",
      days: 5,
      status: "approved",
    },
    {
      id: 2,
      type: "Asuntos Propios",
      startDate: "2024-12-20",
      endDate: "2024-12-20",
      days: 1,
      status: "pending",
    },
    {
      id: 3,
      type: "Enfermedad",
      startDate: "2024-11-15",
      endDate: "2024-11-16",
      days: 2,
      status: "approved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return successColor;
      case "pending":
        return warningColor;
      case "rejected":
        return errorColor;
      default:
        return borderColor;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprobada";
      case "pending":
        return "Pendiente";
      case "rejected":
        return "Rechazada";
      default:
        return status;
    }
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
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title">Ausencias</ThemedText>
        </ThemedView>

        {/* Tabs */}
        <ThemedView style={[styles.tabsContainer, { backgroundColor: cardBg, borderColor }]}>
          <Pressable
            style={[styles.tab, activeTab === "request" && { backgroundColor: tintColor }]}
            onPress={() => setActiveTab("request")}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.tabText, activeTab === "request" && styles.tabTextActive]}
            >
              Solicitar
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "history" && { backgroundColor: tintColor }]}
            onPress={() => setActiveTab("history")}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.tabText, activeTab === "history" && styles.tabTextActive]}
            >
              Historial
            </ThemedText>
          </Pressable>
        </ThemedView>

        {/* Contenido de Solicitar */}
        {activeTab === "request" && (
          <ThemedView style={styles.tabContent}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Tipos de Ausencia Disponibles
            </ThemedText>

            {absenceTypes.map((type) => (
              <Pressable
                key={type.id}
                style={[styles.absenceTypeCard, { backgroundColor: cardBg, borderColor }]}
              >
                <ThemedView style={styles.absenceTypeInfo}>
                  <ThemedText type="defaultSemiBold">{type.name}</ThemedText>
                  {type.available !== null && (
                    <ThemedText style={styles.availableDays}>
                      {type.available} días disponibles
                    </ThemedText>
                  )}
                </ThemedView>
                <ThemedText style={{ color: tintColor }}>Solicitar →</ThemedText>
              </Pressable>
            ))}

            <ThemedView style={[styles.infoBox, { backgroundColor: cardBg, borderColor }]}>
              <ThemedText style={styles.infoText}>
                💡 Selecciona un tipo de ausencia para iniciar la solicitud. Podrás elegir las
                fechas y agregar un motivo en el siguiente paso.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}

        {/* Contenido de Historial */}
        {activeTab === "history" && (
          <ThemedView style={styles.tabContent}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Ausencias Solicitadas
            </ThemedText>

            {absenceHistory.map((absence) => (
              <ThemedView
                key={absence.id}
                style={[styles.historyCard, { backgroundColor: cardBg, borderColor }]}
              >
                <ThemedView style={styles.historyHeader}>
                  <ThemedText type="defaultSemiBold">{absence.type}</ThemedText>
                  <ThemedView
                    style={[styles.statusBadge, { backgroundColor: getStatusColor(absence.status) }]}
                  >
                    <ThemedText style={styles.statusText}>
                      {getStatusText(absence.status)}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                <ThemedView style={styles.historyDates}>
                  <ThemedText style={styles.dateText}>
                    {new Date(absence.startDate).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    -{" "}
                    {new Date(absence.endDate).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </ThemedText>
                  <ThemedText style={styles.daysText}>
                    {absence.days} {absence.days === 1 ? "día" : "días"}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        )}
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
  header: {
    marginBottom: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
  },
  tabContent: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  absenceTypeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  absenceTypeInfo: {
    gap: 4,
  },
  availableDays: {
    fontSize: 14,
    opacity: 0.6,
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  historyCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  historyDates: {
    gap: 4,
  },
  dateText: {
    fontSize: 14,
  },
  daysText: {
    fontSize: 14,
    opacity: 0.6,
  },
});
