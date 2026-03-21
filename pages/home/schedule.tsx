import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SCHEDULE_DATA = [
    {
        id: '1',
        serviceType: 'House Cleaning',
        provider: 'Marcus Richardson',
        amount: '$85.00',
        status: 'Confirmed',
        date: 'Oct 24, 2023',
        time: '10:30 AM',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKAvm2QCBlsLY_hKQL_-pQzLA_cQeedhyjeBlx1xwcSO8h5uCIL3qosbSeLk2b8FOxI-u3bcjkzt-cFVNwME_0g6m9Mx267AiQ1n6vfUmjHValTw3cfO1Jq-33CeNstA89IRKetyLF9x6sbnLsqEHT5N5MadiMaRKKJOIFyGbgrDUpaua2Ntzg-bm0h2XLuu1slHgoq7i12gk6xSLBjG5-8X5bHx2cNG6xvYlMCfrz3pYG8ocRrXl07N6aVRO_P7GG4n7Y02juobbF',
        completed: false
    },
    {
        id: '2',
        serviceType: 'Plumbing Repair',
        provider: 'Sarah Jenkins',
        amount: '$120.00',
        status: 'Pending',
        date: 'Oct 26, 2023',
        time: '02:00 PM',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoMQdkNaZBy_fUkhq_ThCwIMf0jMSpiTRC5m-DVBQpsWtj26JtNY6qFAXFD-tYUmZ55MsA3BeKdVn8a4dU3UzeZdgcyXZ_VUgkpSsY9TDQwIMu6MM0ugAxshXwRbt_jcp_Fsc6UcupYJ_w3Wh6he2j4kvQIlFPHuwMJAm4ECAbdjHtlJ3L2Y3FgAyVxpC9OvMDobXIlEMjw9ioC9_RuMyB09p3n7pnFKbeENXeu0O4nyibdBT67E678lRBV7bbw1y3zy4ubg4Uzdi1',
        completed: false
    },
    {
        id: '3',
        serviceType: 'Gardening',
        provider: 'Elena Rodriguez',
        amount: '$65.00',
        status: 'Completed',
        date: 'Oct 20, 2023',
        time: null,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC9yRh0cs7H0zqfEe2vVRghOs6C_xM27krYtEjyCU-gFCbMihsQ9GHNn1HtU3B9FhQUbBzi5n83JkOWSNM4fbzLPxZkklIiplSuSv9-PO7KJiSEyh5pe_mmqopZ8EBGnzwvWgMKVtrPiO2q6mkOj213q_xQCwtePCgSuMURlIP_mOO1LBaTEdOWh8NqJlDk1dtl_UUeUr-2fkTfJbLYrRDc7Hc4EoWAsb_tqSs7FGbN5CnbUUOFsQcXjbCaAik2dgGtPqwwJajJl2m',
        completed: true
    }
];

export default function ScheduleTab() {
    const [schedules, setSchedules] = useState(SCHEDULE_DATA);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <MaterialIcons name="calendar-today" size={24} color="#4338ca" />
                    <Text style={styles.headerTitle}>Schedule</Text>
                </View>
                <TouchableOpacity style={styles.bellButton}>
                    <MaterialIcons name="notifications" size={24} color="#64748b" />
                </TouchableOpacity>
            </View>

            {/* Section Headline */}
            <View style={styles.sectionHeadline}>
                <Text style={styles.sectionSubtitle}>ACTIVE BOOKINGS</Text>
                <Text style={styles.sectionTitle}>Your Services</Text>
            </View>

            {/* Schedule List */}
            <View style={styles.listContainer}>
                {schedules.map((item) => {
                    if (item.completed) {
                        return (
                            <View key={item.id}>
                                <View style={styles.dividerContainer}>
                                    <Text style={styles.dividerText}>RECENTLY COMPLETED</Text>
                                    <View style={styles.dividerLine} />
                                </View>
                                <View style={[styles.card, styles.cardCompleted]}>
                                    <View style={styles.cardTop}>
                                        <Image source={{ uri: item.avatar }} style={styles.avatarCompleted} />
                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                            <View style={styles.userInfo}>
                                                <View>
                                                    <Text style={styles.serviceTypeCompleted}>{item.serviceType}</Text>
                                                    <Text style={styles.providerName}>{item.provider}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.priceInfo, { alignItems: 'flex-start', marginTop: 4 }]}>
                                                <Text style={styles.amountCompleted}>{item.amount}</Text>
                                                <View style={[styles.statusBadge, styles.statusCompleted]}>
                                                    <Text style={styles.statusTextCompleted}>{item.status}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.cardBottomCompleted}>
                                        <Text style={styles.dateTextCompleted}>{item.date}</Text>
                                        <TouchableOpacity style={styles.receiptButton}>
                                            <Text style={styles.receiptText}>View Receipt</Text>
                                            <MaterialIcons name="arrow-forward" size={14} color="#0f49bd" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    }

                    return (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.cardTop}>
                                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <View style={styles.userInfo}>
                                        <View>
                                            <Text style={[styles.serviceType, item.status === 'Pending' && styles.serviceTypePending]}>
                                                {item.serviceType}
                                            </Text>
                                            <Text style={styles.providerName}>{item.provider}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.priceInfo, { alignItems: 'flex-start', marginTop: 4 }]}>
                                        <Text style={styles.amount}>{item.amount}</Text>
                                        <View style={[styles.statusBadge, item.status === 'Confirmed' ? styles.statusConfirmed : styles.statusPending]}>
                                            <Text style={[styles.statusText, item.status === 'Confirmed' ? styles.statusTextConfirmed : styles.statusTextPending]}>
                                                {item.status}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.cardBottom}>
                                <View style={styles.dateTimeWrap}>
                                    <MaterialIcons name="calendar-month" size={16} color="#475569" />
                                    <Text style={styles.dateTimeText}>{item.date}</Text>
                                </View>
                                {item.time && (
                                    <View style={styles.dateTimeWrap}>
                                        <MaterialIcons name="schedule" size={16} color="#475569" />
                                        <Text style={styles.dateTimeText}>{item.time}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
            <View style={{height: 100}} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f8',
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 24,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        letterSpacing: -0.5,
        marginLeft: 8,
    },
    bellButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        marginBottom: 32,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    tabActive: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    tabTextActive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f49bd',
    },
    tabTextInactive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
    },
    sectionHeadline: {
        marginBottom: 24,
    },
    sectionSubtitle: {
        fontSize: 10,
        fontWeight: '800',
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0f172a',
    },
    listContainer: {
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#cbd5e1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 5,
        marginBottom: 24,
    },
    cardCompleted: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowOpacity: 0,
        elevation: 0,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 12,
        marginRight: 16,
        backgroundColor: '#f1f5f9',
    },
    avatarCompleted: {
        width: 48,
        height: 48,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: '#f1f5f9',
    },
    serviceType: {
        fontSize: 10,
        fontWeight: '800',
        color: '#0f49bd',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 2,
    },
    serviceTypePending: {
        color: '#475569',
    },
    serviceTypeCompleted: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 2,
    },
    providerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    amountCompleted: {
        fontSize: 18,
        fontWeight: '700',
        color: '#475569',
        marginBottom: 4,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 12,
    },
    statusConfirmed: {
        backgroundColor: 'rgba(15, 73, 189, 0.1)',
    },
    statusPending: {
        backgroundColor: '#f1f5f9',
    },
    statusCompleted: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: 'transparent',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    statusTextConfirmed: {
        color: '#0f49bd',
    },
    statusTextPending: {
        color: '#475569',
    },
    statusTextCompleted: {
        color: '#475569',
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    cardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    dateTimeWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    dateTimeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#475569',
        marginLeft: 8,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    dividerText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginRight: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    cardBottomCompleted: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
    },
    dateTextCompleted: {
        fontSize: 10,
        fontWeight: '500',
        fontStyle: 'italic',
        color: 'rgba(71, 85, 105, 0.6)',
    },
    receiptButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    receiptText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#0f49bd',
        marginRight: 4,
    }
});
