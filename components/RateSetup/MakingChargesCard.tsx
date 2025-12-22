import { RateConfig } from "@/contexts/RateConfigContext";
import { useRateSetupMakingCharges } from "@/customHooks/useRateSetupMakingCharges";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const GOLD = "#D4AF37";
const TEXT_MUTED = "#A1A1A1";

interface MakingChargesCardProps {
    config: RateConfig;
    onUpdate: (updates: Partial<RateConfig>) => void;
}

export const MakingChargesCard: React.FC<MakingChargesCardProps> = ({ config, onUpdate }) => {
    const {
        makingChargesEnabled,
        makingChargesGoldType,
        makingChargesGoldValue,
        makingChargesSilverType,
        makingChargesSilverValue,
        handleToggleMakingCharges,
        handleChangeMakingType,
        handleMakingValueChange,
    } = useRateSetupMakingCharges(config, onUpdate);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Making Charges</Text>
            <Text style={styles.cardSubtitle}>
                Display making charges on the rate board
            </Text>

            <View style={styles.sectionRow}>
                <Text style={styles.label}>Enable Making Charges</Text>
                <TouchableOpacity
                    style={[
                        styles.switchTrack,
                        makingChargesEnabled && styles.switchTrackOn,
                    ]}
                    onPress={handleToggleMakingCharges}
                    activeOpacity={0.8}
                >
                    <View
                        style={[
                            styles.switchThumb,
                            makingChargesEnabled && styles.switchThumbOn,
                        ]}
                    />
                </TouchableOpacity>
            </View>

            {makingChargesEnabled && (
                <>
                    {/* Gold Section */}
                    <Text style={[styles.label, { color: GOLD, marginTop: 10, marginBottom: 10, fontWeight: "bold" }]}>Gold Making Charges</Text>
                    <View style={styles.radioRow}>
                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => handleChangeMakingType("gold", "percentage")}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    makingChargesGoldType === "percentage" &&
                                    styles.radioOuterActive,
                                ]}
                            >
                                {makingChargesGoldType === "percentage" && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.radioLabel,
                                    makingChargesGoldType === "percentage" &&
                                    styles.radioLabelActive,
                                ]}
                            >
                                Percentage (%)
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => handleChangeMakingType("gold", "perGram")}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    makingChargesGoldType === "perGram" &&
                                    styles.radioOuterActive,
                                ]}
                            >
                                {makingChargesGoldType === "perGram" && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.radioLabel,
                                    makingChargesGoldType === "perGram" &&
                                    styles.radioLabelActive,
                                ]}
                            >
                                Per Gram (₹/g)
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.makingValueRow}>
                        <View style={[styles.inputWrapper, styles.makingInputWrapper]}>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.textInput}
                                value={
                                    makingChargesGoldValue === 0 ? "" : String(makingChargesGoldValue)
                                }
                                onChangeText={(text) => handleMakingValueChange("gold", text)}
                                placeholder="0"
                                placeholderTextColor="#A3A3A3"
                            />
                        </View>
                        <Text style={styles.makingUnitText}>
                            {makingChargesGoldType === "percentage" ? "%" : "₹/g"}
                        </Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: "#333", marginVertical: 20 }} />

                    {/* Silver Section */}
                    <Text style={[styles.label, { color: "#C0C0C0", marginTop: 0, marginBottom: 10, fontWeight: "bold" }]}>Silver Making Charges</Text>
                    <View style={styles.radioRow}>
                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => handleChangeMakingType("silver", "percentage")}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    makingChargesSilverType === "percentage" &&
                                    styles.radioOuterActive,
                                ]}
                            >
                                {makingChargesSilverType === "percentage" && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.radioLabel,
                                    makingChargesSilverType === "percentage" &&
                                    styles.radioLabelActive,
                                ]}
                            >
                                Percentage (%)
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => handleChangeMakingType("silver", "perGram")}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    makingChargesSilverType === "perGram" &&
                                    styles.radioOuterActive,
                                ]}
                            >
                                {makingChargesSilverType === "perGram" && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.radioLabel,
                                    makingChargesSilverType === "perGram" &&
                                    styles.radioLabelActive,
                                ]}
                            >
                                Per Gram (₹/g)
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.makingValueRow}>
                        <View style={[styles.inputWrapper, styles.makingInputWrapper]}>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.textInput}
                                value={
                                    makingChargesSilverValue === 0 ? "" : String(makingChargesSilverValue)
                                }
                                onChangeText={(text) => handleMakingValueChange("silver", text)}
                                placeholder="0"
                                placeholderTextColor="#A3A3A3"
                            />
                        </View>
                        <Text style={styles.makingUnitText}>
                            {makingChargesSilverType === "percentage" ? "%" : "₹/g"}
                        </Text>
                    </View>
                </>
            )}
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
    label: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 8,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    switchTrack: {
        width: 50,
        height: 30,
        borderRadius: 999,
        backgroundColor: "#222",
        padding: 4,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#333",
    },
    switchTrackOn: {
        backgroundColor: GOLD,
    },
    switchThumb: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#111",
        alignSelf: "flex-start",
    },
    switchThumbOn: {
        alignSelf: "flex-end",
        backgroundColor: "#000",
    },
    radioRow: {
        flexDirection: "row",
        marginBottom: 14,
    },
    radioOption: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: "#555",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 6,
    },
    radioOuterActive: {
        borderColor: GOLD,
    },
    radioInner: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: GOLD,
    },
    radioLabel: {
        fontSize: 13,
        color: TEXT_MUTED,
    },
    radioLabelActive: {
        color: GOLD,
    },
    makingValueRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: "#161616",
        flexDirection: "row",
        alignItems: "center",
    },
    makingInputWrapper: {
        flex: 0.4,
    },
    textInput: {
        color: "#fff",
        fontSize: 14,
        paddingVertical: 8,
    },
    makingUnitText: {
        marginLeft: 10,
        fontSize: 15,
        color: TEXT_MUTED,
        fontWeight: "600",
    },
});
