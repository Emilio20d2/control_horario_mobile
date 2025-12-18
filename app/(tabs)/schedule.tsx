import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const successColor = useThemeColor({}, "success");

  // Estado de ejemplo - en producción vendría del backend
  const [currentWeek] = useState({
    weekNumber: 50,
    year: 2024,
    days: [
      { date: "Lun 16", hours: 8, theoretical: 8, type: "work", confirmed: true },
      { date: "Mar 17", hours: 8, theoretical: 8, type: "work", confirmed: true },
      { date: "Mié 18", hours: 7.5, theoretical: 8, type: "work", confirmed: false },
      { date: "Jue 19", hours: 0, theoretical: 8, type: "work", confirmed: false },
      { date: "Vie 20", hours: 0, theoretical: 8, type: "work", confirmed: false },
      { date: "Sáb 21", hours: 0, theoretical: 0, type: "weekend", confirmed: false },
      { date: "Dom 22", hours: 0, theoretical: 0, type: "weekend", confirmed: false },
    ],
  });

  const totalHours = currentWeek.days.reduce((sum, day) => sum + day.hours, 0);
  const totalTheoretical = currentWeek.days.reduce((sum, day) => sum + day.theoretical, 0);
  const balance = totalHours - totalTheoretical;

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
          <ThemedText type="title">Mi Horario</ThemedText>
        </ThemedView>

        {/* Navegador de semana */}
        <ThemedView style={[styles.weekNavigator, { backgroundColor: cardBg, borderColor }]}>
          <Pressable style={styles.navButton}>
            <ThemedText type="defaultSemiBold" style={{ color: tintColor }}>
              ← Anterior
            </ThemedText>
          </Pressable>
          <ThemedView style={styles.weekInfo}>
            <ThemedText type="subtitle">Semana {currentWeek.weekNumber}</ThemedText>
            <ThemedText style={styles.weekYear}>{currentWeek.year}</ThemedText>
          </ThemedView>
          <Pressable style={styles.navButton}>
            <ThemedText type="defaultSemiBold" style={{ color: tintColor }}>
              Siguiente →
            </ThemedText>
          </Pressable>
        </ThemedView>

        {/* Días de la semana */}
        <ThemedView style={styles.daysContainer}>
          {currentWeek.days.map((day, index) => (
            <Pressable
              key={index}
              style={[
                styles.dayCard,
                { backgroundColor: cardBg, borderColor },
                day.type === "weekend" && styles.weekendCard,
              ]}
            >
              <ThemedText type="defaultSemiBold" style={styles.dayDate}>
                {day.date}
              </ThemedText>
              <ThemedView style={styles.dayHours}>
                <ThemedText type="title" style={styles.hoursText}>
                  {day.hours}h
                </ThemedText>
                <ThemedText style={styles.theoreticalText}>de {day.theoretical}h</ThemedText>
              </ThemedView>
              {day.confirmed ? (
                <ThemedView style={[styles.statusBadge, { backgroundColor: successColor }]}>
                  <ThemedText style={styles.statusText}>✓ Confirmado</ThemedText>
                </ThemedView>
              ) : day.type !== "weekend" ? (
                <ThemedView style={[styles.statusBadge, { backgroundColor: "#FF9500" }]}>
                  <ThemedText style={styles.statusText}>Pendiente</ThemedText>
                </ThemedView>
              ) : null}
            </Pressable>
          ))}
        </ThemedView>

        {/* Resumen semanal */}
        <ThemedView style={[styles.summaryCard, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="subtitle" style={styles.summaryTitle}>
            Resumen Semanal
          </ThemedText>
          <ThemedView style={styles.summaryRow}>
            <ThemedText>Horas trabajadas:</ThemedText>
            <ThemedText type="defaultSemiBold">{totalHours}h</ThemedText>
          </ThemedView>
          <ThemedView style={styles.summaryRow}>
            <ThemedText>Horas teóricas:</ThemedText>
            <ThemedText type="defaultSemiBold">{totalTheoretical}h</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.summaryRow, styles.balanceRow]}>
            <ThemedText type="defaultSemiBold">Balance:</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{
                color: balance >= 0 ? successColor : "#FF3B30",
                fontSize: 18,
              }}
            >
              {balance >= 0 ? "+" : ""}
              {balance}h
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Botón de acción */}
        <Pressable style={[styles.actionButton, { backgroundColor: tintColor }]}>
          <ThemedText style={styles.actionButtonText}>Registrar Horas de Hoy</ThemedText>
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
  header: {
    marginBottom: 8,
  },
  weekNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  navButton: {
    padding: 8,
  },
  weekInfo: {
    alignItems: "center",
    gap: 4,
  },
  weekYear: {
    fontSize: 14,
    opacity: 0.6,
  },
  daysContainer: {
    gap: 12,
  },
  dayCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  weekendCard: {
    opacity: 0.5,
  },
  dayDate: {
    fontSize: 16,
  },
  dayHours: {
    gap: 4,
  },
  hoursText: {
    fontSize: 28,
  },
  theoreticalText: {
    fontSize: 14,
    opacity: 0.6,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  summaryTitle: {
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
