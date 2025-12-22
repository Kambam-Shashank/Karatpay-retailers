import { RateConfig } from "@/contexts/RateConfigContext";
import { useRateSetupNotifications } from "@/customHooks/useRateSetupNotifications";
import { NotificationConfig } from "@/types/type";
import React, { memo } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const GOLD = "#D4AF37";
const TEXT_MUTED = "#A1A1A1";

interface NotificationsCardProps {
    config: RateConfig;
    onUpdate: (updates: Partial<RateConfig>) => void;
}

// ====== Notification Component ======
interface NotificationItemProps {
    notification: NotificationConfig;
    onToggle: () => void;
    onMessageChange: (text: string) => void;
}

const NotificationItem = memo<NotificationItemProps>(
    ({ notification, onToggle, onMessageChange }) => (
        <View style={styles.notificationBlock}>
            <View style={styles.notificationHeaderRow}>
                <TouchableOpacity
                    style={[
                        styles.switchTrackSmall,
                        notification.enabled && styles.switchTrackOn,
                    ]}
                    onPress={onToggle}
                    activeOpacity={0.8}
                >
                    <View
                        style={[
                            styles.switchThumbSmall,
                            notification.enabled && styles.switchThumbOn,
                        ]}
                    />
                </TouchableOpacity>
                <Text style={styles.notificationLabel}>
                    Notification {notification.id}
                </Text>
            </View>

            <View style={styles.notificationInputWrapper}>
                <TextInput
                    style={styles.notificationInput}
                    placeholder="Enter notification message..."
                    placeholderTextColor="#6B6B6B"
                    multiline
                    maxLength={100}
                    value={notification.message}
                    onChangeText={onMessageChange}
                />
                <Text style={styles.charCount}>{notification.message.length}/100</Text>
            </View>
        </View>
    )
);

export const NotificationsCard: React.FC<NotificationsCardProps> = ({ config, onUpdate }) => {
    const {
        notifications,
        toggleNotificationEnabled,
        updateNotificationMessage,
    } = useRateSetupNotifications(config, onUpdate);

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Notifications</Text>
            <Text style={styles.cardSubtitle}>
                Add up to 3 announcements for your customers
            </Text>

            {notifications.map((n) => (
                <NotificationItem
                    key={n.id}
                    notification={n}
                    onToggle={() => toggleNotificationEnabled(n.id)}
                    onMessageChange={(text) => updateNotificationMessage(n.id, text)}
                />
            ))}
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
    notificationBlock: {
        marginBottom: 16,
    },
    notificationHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    notificationLabel: {
        marginLeft: 8,
        fontSize: 14,
        color: "#fff",
    },
    switchTrackSmall: {
        width: 40,
        height: 22,
        borderRadius: 14,
        backgroundColor: "#333",
        padding: 3,
        justifyContent: "center",
    },
    switchTrackOn: {
        backgroundColor: GOLD,
    },
    switchThumbSmall: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#111",
        alignSelf: "flex-start",
    },
    switchThumbOn: {
        alignSelf: "flex-end",
        backgroundColor: "#000",
    },
    notificationInputWrapper: {
        borderRadius: 12,
        backgroundColor: "#181818",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#333",
        position: "relative",
    },
    notificationInput: {
        color: "#fff",
        fontSize: 15,
        minHeight: 40,
        lineHeight: 20,
    },
    charCount: {
        position: "absolute",
        right: 10,
        bottom: 6,
        fontSize: 11,
        color: TEXT_MUTED,
    },
});
