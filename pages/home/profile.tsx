import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, ActivityIndicator, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FAKE_PROFILE_JSON = {
    id: 'p1',
    name: 'Marcus Sterling',
    title: 'Master Electrician • Smart Home Expert',
    status: 'Available',
    rating: '4.9',
    reviewsCount: 142,
    responseTime: '~15 mins',
    experience: '12 Years',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb77G8OR0bKyKYFCRNiIMwoJGucc0fGpI__ll5v3JbDsx1-2PWILj8AdDAQJqhpeQdsp1ABdoPXgxkjnokk2hflj3aEfAwWLe1Ru9VLon-JKTFP6L-Nmwq7pk1UxLGg5iDthNnGHWaFRN65P1glozgqgd5p0lUqV3b4jmHMPslOE6xL6FJeD08noMLH0q-p4WZHz1XGNXDr82meZeq3IuzKYFFWKmnxqmTmGgpAd-D8Nhcigp5oj2cWg58Oewo6uNC7o3Uwx-aJT5O',
    services: [
        { id: 's1', icon: 'emoji-objects', title: 'Fixture Installation', desc: 'Ceiling fans, chandeliers, and LED tracks', price: '$85' },
        { id: 's2', icon: 'router', title: 'Smart Home Setup', desc: 'Nest, Ring, and IoT automation', price: '$120' },
        { id: 's3', icon: 'electrical-services', title: 'Electrical Audit', desc: 'Safety checks and wiring inspection', price: '$150' },
    ],
    reviews: [
        { id: 'r1', name: 'Sarah Jenkins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW63UXL2hLwuwsvP-HHI-mVzVk7aj_85Hf24izNrKJaKeouXK6OQSpEzQ0oatBCe3peFD8lwMWGiX1TnsW7xnPz95gAbvaU8dPrhIQjqyUlEslB57yr7_Ou0dLiyWEroXn8x0Z-liJmGykqLd_vv2XAPyyNMW6Woa5HNetK6_5rWS1CBRFj9aJZLzNAzsIWI1zmktTEucxeYzL4xZ4xFOGG5SApvV9qZE1h_56nTTMkblhtZ_X4SfpiMeRZhZJAbdJBO4p3vtZriVc', rating: 5, text: 'Marcus arrived exactly on time and fixed our complex wiring issue in under an hour. Extremely professional and clean work.' },
        { id: 'r2', name: 'David Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgepXvW5Aqi5A0fwMufXcdmAuMxgmGW-BpXDCGBsHHxX6Vq0SAeFknvHsngy9yqYICtUu2ajzWyyZ-e6qfg-Aw1jsG8dIDf4VRtw5LZmG9mCQikUl35I7t24_PUBwxAlDyvr6nEuiLAYq0yiRHtbXZkE5Il9IjGcIIfxqLNiG4NmZj1H8HkJizhl_etDTwhVLf5zzoqvayPF3llh6EmQ50KdwgT2ZniwqvJmobHeWzQ5FPBjpDQMIf7YYDpD7EH64YSMu4RxjSsVxi', rating: 4, text: 'Great experience with the smart home setup. He even took the time to show me how to use the app.' }
    ]
};

function ProfileSkeleton() {
    const fadeAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [fadeAnim]);

    return (
        <View style={styles.profileTabContainer}>
            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', paddingTop: Platform.OS === 'android' ? 40 : 20, paddingBottom: 20 }}>
                {/* Avatar */}
                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#f1f5f9', marginBottom: 16 }} />
                {/* Status Pill */}
                <View style={{ width: 70, height: 20, borderRadius: 12, backgroundColor: '#f1f5f9', marginBottom: 12 }} />
                {/* Title */}
                <View style={{ width: 220, height: 28, borderRadius: 8, backgroundColor: '#f1f5f9', marginBottom: 8 }} />
                {/* Subtext */}
                <View style={{ width: 160, height: 16, borderRadius: 8, backgroundColor: '#f1f5f9', marginBottom: 16 }} />
                {/* Rating */}
                <View style={{ width: 130, height: 16, borderRadius: 8, backgroundColor: '#f1f5f9' }} />
            </Animated.View>
            
            {/* Metrics */}
            <Animated.View style={{ opacity: fadeAnim, flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 24 }}>
                <View style={{ flex: 1, height: 80, backgroundColor: '#f1f5f9', borderRadius: 16 }} />
                <View style={{ flex: 1, height: 80, backgroundColor: '#f1f5f9', borderRadius: 16 }} />
            </Animated.View>
            
            {/* Services */}
            <Animated.View style={{ opacity: fadeAnim, paddingHorizontal: 20, gap: 12 }}>
                <View style={{ width: 100, height: 24, backgroundColor: '#f1f5f9', borderRadius: 8, marginBottom: 4 }} />
                <View style={{ height: 80, backgroundColor: '#f1f5f9', borderRadius: 16 }} />
                <View style={{ height: 80, backgroundColor: '#f1f5f9', borderRadius: 16 }} />
                <View style={{ height: 80, backgroundColor: '#f1f5f9', borderRadius: 16 }} />
            </Animated.View>
        </View>
    );
}

export default function ProfileTab({ onLogout, providerId, onBook }: { onLogout: () => void, providerId?: string | null, onBook?: (service: any) => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    // Simulate API call loading
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(() => resolve(true), 1200));
            
            // If providerId is provided, fetch provider data instead of current user profile
            const profileData = {
                ...FAKE_PROFILE_JSON,
                id: providerId || FAKE_PROFILE_JSON.id,
                name: providerId ? `Provider ${providerId}` : FAKE_PROFILE_JSON.name
            };
            
            setProfile(profileData);
            setIsLoading(false);
        };
        fetchProfile();
    }, [providerId]);

    if (isLoading || !profile) {
        return <ProfileSkeleton />;
    }

    return (
        <ScrollView style={styles.profileTabContainer} showsVerticalScrollIndicator={false}>
            {/* Profile Header section */}
            <View style={styles.profileHeader}>
                <View style={styles.avatarWrapper}>
                    <Image source={{ uri: profile.avatar }} style={styles.profileAvatar} />
                    <View style={styles.statusIndicator} />
                </View>
                
                <View style={styles.statusPill}>
                    <Text style={styles.statusPillText}>{profile.status}</Text>
                </View>
                
                <Text style={styles.profileNameH1}>{profile.name}</Text>
                <Text style={styles.profileSubtext}>{profile.title}</Text>
                
                <View style={styles.profileRatingRow}>
                    <Ionicons name="star" size={16} color="#eab308" />
                    <Text style={styles.profileRatingNum}>{profile.rating}</Text>
                    <Text style={styles.profileReviewCount}>({profile.reviewsCount} Reviews)</Text>
                </View>
            </View>

            {/* Metrics */}
            <View style={styles.metricsContainer}>
                <View style={styles.metricCard}>
                    <Text style={styles.metricLabel}>Response Time</Text>
                    <Text style={styles.metricValue}>{profile.responseTime}</Text>
                </View>
                <View style={styles.metricCard}>
                    <Text style={styles.metricLabel}>Experience</Text>
                    <Text style={styles.metricValue}>{profile.experience}</Text>
                </View>
            </View>

            {/* Services */}
            <View style={styles.servicesSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Services</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>VIEW PORTFOLIO</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.servicesList}>
                    {profile.services.map((svc: any) => {
                        const isSelected = selectedServiceId === svc.id;
                        return (
                            <TouchableOpacity 
                                key={svc.id} 
                                style={[styles.serviceItem, isSelected && styles.serviceItemSelected]}
                                onPress={() => setSelectedServiceId(svc.id)}
                            >
                                <View style={[styles.serviceIconWrap, isSelected && styles.serviceIconWrapSelected]}>
                                    <MaterialIcons name={svc.icon} size={24} color={isSelected ? "#ffffff" : "#0f172a"} />
                                </View>
                                <View style={styles.serviceDetails}>
                                    <Text style={styles.serviceItemTitle}>{svc.title}</Text>
                                    <Text style={styles.serviceItemSub}>{svc.desc}</Text>
                                </View>
                                <Text style={[styles.servicePrice, isSelected && styles.servicePriceSelected]}>{svc.price}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Reviews */}
            <View style={styles.reviewsSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Client Reviews</Text>
                    <TouchableOpacity>
                        <Text style={[styles.seeAllText, { color: '#0f172a', textDecorationLine: 'underline' }]}>Write Review</Text>
                    </TouchableOpacity>
                </View>

                {profile.reviews.map((rev: any) => (
                    <View key={rev.id} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <Image source={{ uri: rev.avatar }} style={styles.reviewerAvatar} />
                            <Text style={styles.reviewerName}>{rev.name}</Text>
                            <View style={styles.reviewStars}>
                                {[1,2,3,4,5].map((star) => (
                                    <Ionicons 
                                        key={star} 
                                        name="star" 
                                        size={12} 
                                        color={star <= rev.rating ? '#0f172a' : '#e2e8f0'} 
                                    />
                                ))}
                            </View>
                        </View>
                        <Text style={styles.reviewText}>{rev.text}</Text>
                    </View>
                ))}

                <TouchableOpacity style={styles.allReviewsBtn}>
                    <Text style={styles.allReviewsText}>Read All {profile.reviewsCount} Reviews</Text>
                </TouchableOpacity>
            </View>

            {/* Conditional Button: Book Provider or Log Out */}
            {providerId ? (
                <TouchableOpacity 
                    style={[
                        styles.profileLogOut, 
                        styles.bookProviderBtn,
                        !selectedServiceId && { opacity: 0.5, backgroundColor: '#94a3b8', borderColor: '#94a3b8' }
                    ]} 
                    disabled={!selectedServiceId}
                    onPress={() => {
                        if (selectedServiceId && onBook) {
                            const svc = profile.services.find((s: any) => s.id === selectedServiceId);
                            // Add provider details so checkout page has it
                            onBook({ ...svc, provider: profile });
                        }
                    }}>
                    <Ionicons name="calendar-outline" size={20} color="#ffffff" />
                    <Text style={styles.bookProviderLabel}>
                        {selectedServiceId ? 'Proceed to Checkout' : 'Select a Service to Book'}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.profileLogOut} onPress={onLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={styles.logOutLabel}>Log Out of Application</Text>
                </TouchableOpacity>
            )}

            <View style={{height: 100}} />
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
    profileTabContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    profileHeader: {
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 20,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f1f5f9',
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#22c55e',
        borderWidth: 3,
        borderColor: '#ffffff',
    },
    statusPill: {
        backgroundColor: '#0f172a',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 12,
    },
    statusPillText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    profileNameH1: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 4,
    },
    profileSubtext: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
        marginBottom: 12,
    },
    profileRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    profileRatingNum: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    profileReviewCount: {
        fontSize: 14,
        color: '#94a3b8',
    },
    metricsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 24,
    },
    metricCard: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    metricLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
        letterSpacing: -0.5,
    },
    seeAllText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0f49bd',
        letterSpacing: 1,
    },
    servicesSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    servicesList: {
        gap: 12,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    serviceIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    serviceDetails: {
        flex: 1,
    },
    serviceItemTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 2,
    },
    serviceItemSub: {
        fontSize: 12,
        color: '#64748b',
    },
    servicePrice: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0f172a',
    },
    reviewsSection: {
        paddingHorizontal: 20,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    reviewCard: {
        marginBottom: 20,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 12,
        backgroundColor: '#f1f5f9',
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
        flex: 1,
    },
    reviewStars: {
        flexDirection: 'row',
        gap: 2,
    },
    reviewText: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
    },
    allReviewsBtn: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        alignItems: 'center',
        marginTop: 8,
    },
    allReviewsText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
    },
    profileLogOut: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 40,
        marginHorizontal: 20,
        padding: 16,
        backgroundColor: '#fef2f2',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#fee2e2',
    },
    logOutLabel: {
        color: '#ef4444',
        fontWeight: '700',
        fontSize: 14,
    },
    bookProviderBtn: {
        backgroundColor: '#0f49bd',
        borderColor: '#0f49bd',
    },
    bookProviderLabel: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 14,
    },
    serviceItemSelected: {
        borderColor: '#0f49bd',
        backgroundColor: '#f8fafc',
    },
    serviceIconWrapSelected: {
        backgroundColor: '#0f49bd',
    },
    servicePriceSelected: {
        color: '#0f49bd',
    }
});
