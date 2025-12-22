import { RateConfig } from "@/contexts/RateConfigContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GOLD = "#D4AF37";
const TEXT_MUTED = "#A1A1A1";

interface CardStyleCardProps {
    cardBorderRadius?: number;
    cardBorderColor?: string;
    onUpdate: (updates: Partial<RateConfig>) => void;
}

export const CardStyleCard: React.FC<CardStyleCardProps> = ({
    cardBorderRadius,
    cardBorderColor,
    onUpdate,
}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Card Background & Border</Text>
            <Text style={styles.cardSubtitle}>
                Fine-tune the look of your rate card
            </Text>

            {/* Border Radius Control */}
            <View style={styles.sectionRow}>
                <Text style={styles.label}>Corner Roundness</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    {[0, 16, 24, 32].map((radius) => (
                        <TouchableOpacity
                            key={radius}
                            onPress={() => onUpdate({ cardBorderRadius: radius })}
                            style={[
                                styles.radioOption,
                                { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#333", borderRadius: 8 },
                                cardBorderRadius === radius && { backgroundColor: "#D4AF37", borderColor: "#D4AF37" }
                            ]}
                        >
                            <Text style={{ color: cardBorderRadius === radius ? "#000" : "#FFF", fontWeight: "600" }}>
                                {radius === 0 ? "Square" : `${radius}px`}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Border Color Control */}
            <View style={[styles.sectionRow, { marginTop: 20 }]}>
                <Text style={styles.label}>Border Color</Text>
                <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                    {["#333333", "#FFFFFF", "#D4AF37", "transparent"].map((color) => (
                        <TouchableOpacity
                            key={color}
                            onPress={() => onUpdate({ cardBorderColor: color })}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                backgroundColor: color === "transparent" ? "#000" : color,
                                borderWidth: 2,
                                borderColor: cardBorderColor === color ? "#4CAF50" : "#555",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            {color === "transparent" && (
                                <View style={{ width: 30, height: 2, backgroundColor: "red", transform: [{ rotate: "45deg" }] }} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#0F0F0F",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(212, 175, 55, 0.15)",
        marginHorizontal: 16,
        marginTop: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: GOLD,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: TEXT_MUTED,
        marginBottom: 18,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 8,
    },
    radioOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 8,
    },
});
