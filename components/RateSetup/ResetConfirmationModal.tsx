import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GOLD = "#D4AF37";

interface ResetConfirmationModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({
    visible,
    onClose,
    onConfirm,
}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Reset Defaults</Text>
                    <Text style={styles.modalMessage}>
                        Are you sure you want to reset all configuration to defaults? This cannot be undone.
                    </Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.modalButtonCancel]}
                            onPress={onClose}
                        >
                            <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.modalButtonConfirm]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.modalButtonTextConfirm}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Faded background
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        maxWidth: 400,
        backgroundColor: "#1A1A1A",
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: "#333",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: GOLD,
        marginBottom: 12,
    },
    modalMessage: {
        fontSize: 15,
        color: "#CCC",
        textAlign: "center",
        marginBottom: 24,
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    modalButtonCancel: {
        backgroundColor: "#333",
    },
    modalButtonConfirm: {
        backgroundColor: "#D32F2F", // Destructive red
    },
    modalButtonTextCancel: {
        color: "#FFF",
        fontWeight: "600",
    },
    modalButtonTextConfirm: {
        color: "#FFF",
        fontWeight: "600",
    },
});
