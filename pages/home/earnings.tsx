import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const INITIAL_ACTIVITY_DATA = [
    {
        id: '1',
        name: 'Sarah Miller',
        service: 'House Cleaning · Oct 24',
        amount: 85.00,
        status: 'Settled',
        pending: false,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSFbma5zfvhKzR0rvLh28EW52CpFUdX7hAPGnvMDQaVY27xXVuR3GE7xN_zk8bnnV-_uI64Mhm1aMc5kQtETCvIgwdeopSjXXwhz43CTdo3chwV1nc-foUacQSQvlvx0hAETMw9ikC7tbWa3UoinhJRAvVVKUZB2cJ3f5ue7PZTwQoWnby0Qy8DQpyIar6UdKP2fPq1jNUq4L1aDAogutgMD4jwh6bEj4574Ooz9xfcMl-jfKNeprs4KIoeg92cAjAok7C_aj8sBkd'
    },
    {
        id: '2',
        name: 'David Chen',
        service: 'Plumbing · Oct 22',
        amount: 140.00,
        status: 'Settled',
        pending: false,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQHUUTsuOJYNoyQa20CFKm3-32oJqLtuPAH12lUghYYQQdMcmum2Uz10dFrP3dN5L5hcuaeW4UKEUMVL6jH_a-_mwDW6WWtmLd66pHghcH1Ti-b0g1EnouxFoSJGzCJ7UGO2K60tDFjxvTG1e_-vnzPHO3TJVk3KFfMYLq73K7v2sPcjgXUG4N2hUZlT7qDTnXh2k3oETyfuB0yYYR8ByhNugqFBRks1G5E-grJPFGMtd35W2CY8ouRyIMEUE-yEBnFcdsWviwWmKk'
    },
    {
        id: '3',
        name: 'Emma Wilson',
        service: 'Maintenance · Oct 21',
        amount: 65.00,
        status: 'Pending',
        pending: true,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTJ3pnNO7i8N1JtqaTAifg0Zrb_TNaToczR-GInkfntNW3woR1T3ArfE2rJ0x3PjXBzxuGYoRzYSmtUpEbrfRIytiJWJnGdce947Q-BQ8YvbNxc93aZfnhJunOWtDSnX1_pt_jsZacknd01vAfVmQmAQnam1XUFowXY_cDr2MaUEm6TWPCqhsSPhnIfuhT1cpT8ARMD3Z8K7hh7h-N54-AFNvas7IrlBAqLTNlqpC2ynLCXbYWkys2uysp3rQPmQ7H2X4Xff4w0dvk'
    },
    {
        id: '4',
        name: 'Marcus Wright',
        service: 'Repair · Oct 19',
        amount: 210.00,
        status: 'Settled',
        pending: false,
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmzYQI7DWqFVB_zECbZvjnNe1FwQeTWPUs1HWg3NGNUScfMvrF5ihFimv5UC-EYyZhzVM12-2RyZ7PXqt_5ksZVD9wsRYfRNeexx0ds1wL7h8L3jG3pLNdbPp1djEqk107ze9jnZGUg_2j72edO87qpeVpTEaTm_YTkXmz6wJLEly-MhFw9rRoXz9BcutOQv3d36Ck9o7J2tYiZsvGn2Bzn4gqgTQtmbqxJ8JtVDy2EKsD46e0J6HTEujj_SnuvdJLv0qMb7u1bSkq'
    }
];

export default function EarningsTab() {
    const [activities, setActivities] = useState(INITIAL_ACTIVITY_DATA);
    
    // Calculate total balance from json data
    const totalBalance = activities.reduce((sum, item) => sum + item.amount, 0);
    const formattedBalance = `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Earnings & History</Text>
                </View>
            </View>

            {/* Earnings Section */}
            <View style={styles.balanceSection}>
                <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
                <View style={styles.balanceRow}>
                    <Text style={styles.balanceAmount}>{formattedBalance}</Text>
                    <View style={styles.trendContainer}>
                        <View style={styles.trendBadge}>
                            <Ionicons name="trending-up" size={12} color="#18181b" />
                            <Text style={styles.trendText}>+12.5%</Text>
                        </View>
                        <Text style={styles.trendSubtext}>vs last month</Text>
                    </View>
                </View>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>CLIENTS</Text>
                    <Text style={styles.statValue}>{String(activities.length).padStart(2, '0')}</Text>
                </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>RECENT ACTIVITY</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>SEE ALL ACTIVITY</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.activityList}>
                {activities.map((item) => (
                    <Transaction 
                        key={item.id}
                        name={item.name} 
                        service={item.service} 
                        amount={`$${item.amount.toFixed(2)}`} 
                        status={item.status} 
                        pending={item.pending}
                        img={item.img} 
                    />
                ))}
            </View>
            <View style={{height: 100}} />
        </ScrollView>
    );
}

function Transaction({ name, service, amount, status, img, pending = false }: any) {
    return (
        <View style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
                <Image source={{ uri: img }} style={styles.avatar} />
                <View>
                    <Text style={styles.txName}>{name}</Text>
                    <Text style={styles.txService}>{service}</Text>
                </View>
            </View>
            <View style={styles.transactionRight}>
                <Text style={styles.txAmount}>{amount}</Text>
                <View style={[styles.statusBadge, pending && styles.statusBadgePending]}>
                    <Text style={[styles.statusText, pending && styles.statusTextPending]}>{status}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
    },
    header: {
        paddingTop: 20,
        marginBottom: 32,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: -0.5,
        marginTop: 20,
    },
    balanceSection: {
        marginBottom: 32,
    },
    balanceLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#71717a',
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    balanceAmount: {
        fontSize: 40,
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: -1,
        marginBottom: 16,
    },
    balanceRow: {
        flexDirection: 'column',
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f4f5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    trendText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#18181b',
        marginLeft: 4,
    },
    trendSubtext: {
        fontSize: 11,
        fontWeight: '600',
        color: '#71717a',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    statsGrid: {
        flexDirection: 'row',
        paddingTop: 32,
        paddingBottom: 32,
        borderTopWidth: 1,
        borderTopColor: '#f4f4f5',
        marginBottom: 40,
    },
    statBox: {
        flex: 1,
    },
    statBoxRight: {
        paddingLeft: 24,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#71717a',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0f172a',
        textTransform: 'uppercase',
        letterSpacing: -0.5,
    },
    seeAllText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#71717a',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    activityList: {
        flexDirection: 'column',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f4f4f5',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fafafa',
        marginRight: 16,
    },
    txName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 2,
    },
    txService: {
        fontSize: 12,
        color: '#71717a',
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    txAmount: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 4,
    },
    statusBadge: {
        borderWidth: 1,
        borderColor: '#f4f4f5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#a1a1aa',
        textTransform: 'uppercase',
        letterSpacing: -0.5,
    },
    statusBadgePending: {
        backgroundColor: '#f4f4f5',
        borderWidth: 0,
    },
    statusTextPending: {
        color: '#000000',
    }
});
