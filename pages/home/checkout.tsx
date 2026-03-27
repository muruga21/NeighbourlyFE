import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Platform, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CheckoutTab({ service, onBack, onConfirm }: { service: any, onBack: () => void, onConfirm: () => void }) {
    const [selectedDate, setSelectedDate] = useState(5);
    const [selectedTime, setSelectedTime] = useState('10:30 AM');
    
    // Parse service price if available
    const basePrice = service ? parseFloat(service.price.replace(/[^0-9.]/g, '')) : 80;
    const equipmentFee = 15.00;
    const serviceCharge = 4.50;
    const totalPrice = basePrice + equipmentFee + serviceCharge;

    const provider = service?.provider;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Service Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>SERVICE SUMMARY</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryInfo}>
                            <Text style={styles.serviceCategory}>Professional Service</Text>
                            <Text style={styles.serviceName}>{service?.title || 'Service Title'}</Text>
                            <View style={styles.providerInfoRow}>
                                <MaterialIcons name="verified-user" size={14} color="#64748b" />
                                <Text style={styles.providerName}>{provider?.name || 'Provider Name'}</Text>
                            </View>
                            <TouchableOpacity style={styles.changeBtn} onPress={onBack}>
                                <Text style={styles.changeBtnText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <Image source={{ uri: provider?.avatar || 'https://via.placeholder.com/150' }} style={styles.summaryImage} />
                    </View>
                </View>

                {/* Date & Time Picker */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>SELECT DATE & TIME</Text>
                        <Text style={styles.monthText}>October 2023</Text>
                    </View>
                    <View style={styles.calendarCard}>
                        {/* Days Header */}
                        <View style={styles.daysHeader}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <Text key={i} style={styles.dayText}>{day}</Text>
                            ))}
                        </View>
                        {/* Dates */}
                        <View style={styles.datesGrid}>
                            {[28, 29, 30, 1, 2, 3, 4, 5, 6, 7].map((date, i) => {
                                const isSelected = date === selectedDate;
                                const isPastMonth = i < 3;
                                return (
                                    <TouchableOpacity 
                                        key={i} 
                                        style={[styles.dateCell, isSelected && styles.dateCellSelected]}
                                        onPress={() => !isPastMonth && setSelectedDate(date)}
                                        disabled={isPastMonth}
                                    >
                                        <Text style={[
                                            styles.dateCellText, 
                                            isPastMonth && styles.dateCellPast,
                                            isSelected && styles.dateCellTextSelected
                                        ]}>{date}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        {/* Time slots */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSlotsRow}>
                            {['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'].map((time) => {
                                const isSelected = time === selectedTime;
                                return (
                                    <TouchableOpacity 
                                        key={time} 
                                        style={[styles.timeSlot, isSelected && styles.timeSlotSelected]}
                                        onPress={() => setSelectedTime(time)}
                                    >
                                        <Text style={[styles.timeSlotText, isSelected && styles.timeSlotTextSelected]}>{time}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>

                {/* Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>SERVICE ADDRESS</Text>
                    <View style={styles.addressInputContainer}>
                        <MaterialIcons name="location-on" size={20} color="#64748b" style={styles.addressIcon} />
                        <TextInput 
                            style={styles.addressInput}
                            defaultValue="742 Evergreen Terrace, Springfield"
                        />
                    </View>
                    <View style={styles.mapPreview}>
                        <Image 
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALG2q65WIcj28i9Nap_6yTK8FnhOucxWRZL5dEWmMvGE5mpR13sfFrvH8p4JAnbLh2jG_XQBoZtiq_0wadRZrXcZ4LylllDxoWhop1RwclQ1E75bcR92uPl53KR_22w60tg542LzFmU7xEClawNhmP6frmX6xvR_Y4jgf3YLeo38U-fXkf2r7wyGKqlhsFaAc_aEAxWFr3bBLgytij-zzQdLSWYZ-S5xRJ17tYrPwDfRsc4DNERisAVS5Cgo4ZJv_qOQSwQDXqmP79' }} 
                            style={styles.mapImage} 
                        />
                        <View style={styles.mapOverlay}>
                            <MaterialIcons name="location-pin" size={32} color="#0f49bd" />
                        </View>
                    </View>
                </View>

                {/* Payment Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
                    <View style={styles.paymentCard}>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Base Rate / Service</Text>
                            <Text style={styles.paymentValue}>${basePrice.toFixed(2)}</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Equipment Fee</Text>
                            <Text style={styles.paymentValue}>${equipmentFee.toFixed(2)}</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Service Charge</Text>
                            <Text style={styles.paymentValue}>${serviceCharge.toFixed(2)}</Text>
                        </View>
                        <View style={styles.paymentDivider} />
                        <View style={styles.paymentRowTotal}>
                            <Text style={styles.paymentTotalLabel}>Total Price</Text>
                            <Text style={styles.paymentTotalValue}>${totalPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 40}} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
                    <Text style={styles.confirmBtnText}>Confirm Booking</Text>
                    <MaterialIcons name="chevron-right" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.termsText}>By tapping 'Confirm Booking', you agree to Neighbourly's Terms of Service and Privacy Policy.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    backBtn: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    content: {
        flex: 1,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748b',
        letterSpacing: 1,
        marginBottom: 12,
    },
    summaryCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    summaryInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    serviceCategory: {
        fontSize: 10,
        fontWeight: '800',
        color: '#0f49bd',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    providerInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 16,
    },
    providerName: {
        fontSize: 12,
        color: '#64748b',
    },
    changeBtn: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    changeBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#334155',
    },
    summaryImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#e2e8f0',
        marginLeft: 16,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    monthText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f49bd',
    },
    calendarCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dayText: {
        width: `${100/7}%`,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
    },
    datesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dateCell: {
        width: `${100/7}%`,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    dateCellSelected: {
        backgroundColor: '#0f49bd',
        shadowColor: '#0f49bd',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    dateCellText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    dateCellPast: {
        color: '#cbd5e1',
    },
    dateCellTextSelected: {
        color: '#ffffff',
        fontWeight: '800',
    },
    timeSlotsRow: {
        marginTop: 16,
        flexDirection: 'row',
    },
    timeSlot: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        marginRight: 8,
    },
    timeSlotSelected: {
        backgroundColor: '#0f172a',
        borderColor: '#0f172a',
    },
    timeSlotText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#334155',
    },
    timeSlotTextSelected: {
        color: '#ffffff',
        fontWeight: '700',
    },
    addressInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    addressIcon: {
        marginRight: 8,
    },
    addressInput: {
        flex: 1,
        height: 50,
        fontSize: 14,
        color: '#0f172a',
    },
    mapPreview: {
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 42, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    paymentLabel: {
        fontSize: 13,
        color: '#64748b',
    },
    paymentValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },
    paymentDivider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginVertical: 12,
    },
    paymentRowTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentTotalLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    paymentTotalValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f49bd',
    },
    footer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    confirmBtn: {
        backgroundColor: '#0f172a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    confirmBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
        marginRight: 8,
    },
    termsText: {
        fontSize: 10,
        color: '#94a3b8',
        textAlign: 'center',
        paddingHorizontal: 16,
    }
});
