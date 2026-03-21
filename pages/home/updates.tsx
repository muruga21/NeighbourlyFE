import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// --- DUMMY DATA ---
const UPDATES_DUMMY_DATA = {
    earnings: {
        total: '$4,250.00',
        trendText: '+12.5% vs last month',
        isPositive: true
    },
    weeklyRevenue: {
        total: '$1,120',
        chart: [
            { day: 'M', value: 30 },
            { day: 'T', value: 85 },
            { day: 'W', value: 45 },
            { day: 'T', value: 60 },
            { day: 'F', value: 55 },
            { day: 'S', value: 20 },
            { day: 'S', value: 15 },
        ]
    },
    incomingRequests: [
        {
            id: 'req_1',
            clientName: 'Marcus Thompson',
            serviceType: 'Plumbing Repair',
            distance: '2.4 miles away',
            estPrice: '$85.00 Est.',
            timeAgo: '12m ago',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkiF5vmd1xOc1cwrT-Eg1XDLVIuqptuCIsP8iz2ZIwKAhAXGuXE1wY392hCguxinF8y8uamAk7A8eUIiPf09wT09ueHBnitTJahyj5snlvtHRZOLchpMNCi2BKlQvpy0n5raUtgoAW4JfWv4yAhtEU-1205n7PNXhX9t7WysOResOCVSBCT2-csjPaRunqfow-W4o6QWDvAWCkvhj4vOjfuZQSIUCjNfq8Afbu9ohoSvFSuNeQaAqbKQyJty8mzpqMQA2uns1NUqeK'
        },
        {
            id: 'req_2',
            clientName: 'Elena Rodriguez',
            serviceType: 'Lawn Maintenance',
            distance: '0.8 miles away',
            estPrice: '$45.00 Est.',
            timeAgo: '45m ago',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2e4iMC-blRqZ-ChrTgaE8WiUFYgO1RLAQ1_0i41JeCwtkFMjch2GIlSaxJnBgI81I8nxSjhUEabeT1s-gJr4iYZQEJHxJ1g85AI84UxxsBUB6ZCpgtyrAenDFgzHxYQaYtry1gpSuJmWBS2V7V5gf3XoOPBfoo0WcWQdgh5owbJlTnviaP3O0v8uywyc3lu6v7bIKM9LH5r0IvnSZmIcOWJIFQPI5n2dXLAespXhC99QkxAC8XFBsqVy8m7j5-XR-O6PlNQu13Kti'
        }
    ],
    activeBookings: [
        {
            id: 'book_1',
            serviceTitle: 'House Cleaning',
            datetime: 'Today, 2:30 PM',
            clientInitial: 'Sarah J.',
            icon: 'event-available'
        },
        {
            id: 'book_2',
            serviceTitle: 'Furniture Assembly',
            datetime: 'Tomorrow, 10:00 AM',
            clientInitial: 'Mike L.',
            icon: 'event-available'
        }
    ]
};

// --- REUSABLE COMPONENTS ---

// 1. Earnings Card
const EarningsCard = ({ data }: any) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Total Earnings</Text>
            <MaterialIcons name="payments" size={16} color="#94a3b8" />
        </View>
        <Text style={styles.earningsValue}>{data.total}</Text>
        <View style={styles.trendRow}>
            <MaterialIcons name={data.isPositive ? "trending-up" : "trending-down"} size={14} color="#059669" />
            <Text style={styles.trendText}>{data.trendText}</Text>
        </View>
    </View>
);

// 2. Weekly Chart
const WeeklyChart = ({ data }: any) => (
    <View style={styles.card}>
        <View style={styles.chartHeader}>
            <View>
                <Text style={styles.cardTitle}>Weekly Revenue</Text>
                <Text style={styles.chartTotal}>{data.total}</Text>
            </View>
            <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>This Week</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16} color="#64748b" />
            </TouchableOpacity>
        </View>
        
        <View style={styles.chartBarsContainer}>
            {data.chart.map((item: any, idx: number) => {
                const isMax = item.value === Math.max(...data.chart.map((d: any) => d.value));
                return (
                    <View key={idx} style={styles.barWrapper}>
                        <View style={[styles.barBg, { height: `${item.value}%`, backgroundColor: isMax ? '#0f49bd' : '#f1f5f9' }]} />
                        <Text style={[styles.barLabel, { color: isMax ? '#0f172a' : '#94a3b8' }]}>{item.day}</Text>
                    </View>
                );
            })}
        </View>
    </View>
);

// 3. Incoming Request Card
const RequestCard = ({ req }: any) => (
    <View style={styles.card}>
        <View style={styles.reqHeaderRow}>
            <Image source={{ uri: req.avatar }} style={styles.reqAvatar} />
            <View style={styles.reqDetails}>
                <Text style={styles.reqName}>{req.clientName}</Text>
                <Text style={styles.reqSub}>{req.serviceType} • {req.distance}</Text>
                <Text style={styles.reqPrice}>{req.estPrice}</Text>
            </View>
            <Text style={styles.reqTime}>{req.timeAgo}</Text>
        </View>
        <View style={styles.reqActions}>
            <TouchableOpacity style={styles.btnAccept}>
                <Text style={styles.btnAcceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDecline}>
                <Text style={styles.btnDeclineText}>Decline</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// 4. Booking Item
const BookingItem = ({ booking }: any) => (
    <TouchableOpacity style={styles.bookingRow}>
        <View style={styles.bookingIconWrap}>
            <MaterialIcons name={booking.icon} size={20} color="#0f49bd" />
        </View>
        <View style={styles.bookingDetails}>
            <Text style={styles.bookingTitle}>{booking.serviceTitle}</Text>
            <Text style={styles.bookingSub}>{booking.datetime} • {booking.clientInitial}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
    </TouchableOpacity>
);

export default function UpdatesTab() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Mock API Fetch
        const loadDashboard = async () => {
            setIsLoading(true);
            await new Promise(res => setTimeout(() => res(true), 800));
            setData(UPDATES_DUMMY_DATA);
            setIsLoading(false);
        };
        loadDashboard();
    }, []);

    if (isLoading || !data) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0f49bd" />
                <Text style={styles.loadingText}>Syncing Provider Data...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Neighbouly</Text>
                </View>
            </View>

            {/* Overview Section */}
            <View style={styles.sectionPadding}>
                <EarningsCard data={data.earnings} />
                <View style={{height: 16}} />
                <WeeklyChart data={data.weeklyRevenue} />
            </View>

            {/* Incoming Requests */}
            <View style={styles.sectionHeaderLine}>
                <Text style={styles.sectionTitle}>Incoming Requests</Text>
                <View style={styles.badgePill}>
                    <Text style={styles.badgePillText}>{data.incomingRequests.length} New</Text>
                </View>
            </View>
            <View style={styles.sectionPadding}>
                {data.incomingRequests.map((req: any) => (
                    <View key={req.id} style={{marginBottom: 12}}>
                        <RequestCard req={req} />
                    </View>
                ))}
            </View>

            {/* Active Bookings */}
            <View style={[styles.sectionHeaderLine, {marginTop: 10}]}>
                <Text style={styles.sectionTitle}>Active Bookings</Text>
            </View>
            <View style={[styles.sectionPadding, {paddingBottom: 120}]}>
                {data.activeBookings.map((b: any) => (
                    <BookingItem key={b.id} booking={b} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 20, // Avoid safe area overlap
        paddingBottom: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
        gap: 12,
        marginLeft: 10,
    },
    menuIconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
    },
    bellWrap: {
        position: 'relative',
    },
    bellBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 10,
        height: 10,
        backgroundColor: '#0f49bd',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    sectionPadding: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionHeaderLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
    },
    badgePill: {
        backgroundColor: 'rgba(15, 73, 189, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgePillText: {
        color: '#0f49bd',
        fontSize: 11,
        fontWeight: '700',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '600',
    },
    earningsValue: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    trendText: {
        color: '#059669',
        fontSize: 12,
        fontWeight: '700',
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    chartTotal: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0f172a',
        marginTop: 4,
    },
    dropdownBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
    },
    dropdownText: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '600',
    },
    chartBarsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 120,
        marginTop: 24,
    },
    barWrapper: {
        alignItems: 'center',
        gap: 8,
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
    },
    barBg: {
        width: '70%',
        borderRadius: 4,
    },
    barLabel: {
        fontSize: 11,
        fontWeight: '700',
    },
    reqHeaderRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    reqAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
        backgroundColor: '#f1f5f9',
    },
    reqDetails: {
        flex: 1,
    },
    reqName: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0f172a',
    },
    reqSub: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
        marginVertical: 2,
    },
    reqPrice: {
        fontSize: 14,
        color: '#0f49bd',
        fontWeight: '700',
    },
    reqTime: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94a3b8',
        textTransform: 'uppercase',
    },
    reqActions: {
        flexDirection: 'row',
        gap: 12,
    },
    btnAccept: {
        flex: 1,
        backgroundColor: '#0f49bd',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnAcceptText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
    },
    btnDecline: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnDeclineText: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '700',
    },
    bookingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginBottom: 12,
    },
    bookingIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: 'rgba(15, 73, 189, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    bookingDetails: {
        flex: 1,
    },
    bookingTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 2,
    },
    bookingSub: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    }
});
