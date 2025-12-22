import { RateConfig } from "@/contexts/RateConfigContext";
import { useRateSetupFreeze } from "@/customHooks/useRateSetupFreeze";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GOLD = "#D4AF37";
const TEXT_MUTED = "#A1A1A1";

interface RateStatusCardProps {
    config: RateConfig;
    onUpdate: (updates: Partial<RateConfig>) => void;
}

export const RateStatusCard: React.FC<RateStatusCardProps> = ({ config, onUpdate }) => {
    const { ratesFrozen, formattedFrozenAt, handleToggleFreeze } =
        useRateSetupFreeze(config, onUpdate);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Rate Status</Text>
            <Text style={styles.cardSubtitle}>
                {ratesFrozen
                    ? `Rates are frozen${formattedFrozenAt ? ` since ${formattedFrozenAt}` : ""}.`
                    : "Rates are live and updating every 10 seconds."}
            </Text>

            <View style={{ marginTop: 16 }}>
                <TouchableOpacity
                    style={[
                        styles.freezeButton,
                        ratesFrozen ? styles.freezeButtonUnfreeze : null,
                    ]}
                    onPress={handleToggleFreeze}
                >
                    <Text style={styles.freezeButtonText}>
                        {ratesFrozen ? "Unfreeze Rates" : "Freeze Rates"}
                    </Text>
                </TouchableOpacity>
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
    freezeButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 10,
        borderRadius: 999,
        alignItems: "center",
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    freezeButtonUnfreeze: {
        backgroundColor: "#16A34A",
    },
    freezeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});
