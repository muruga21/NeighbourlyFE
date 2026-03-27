import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapTab from './map';

const { width } = Dimensions.get('window');

// Reusing some provider data specific to the map discovery UI with Coimbatore coordinates
const PROVIDERS = [
    {
        id: '1',
        name: 'Elena Petrova',
        rating: '4.9',
        reviews: 124,
        distance: '0.4 miles away',
        price: 'From $45/hr',
        lat: 11.0180,
        lng: 76.9600,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGtZkY9FbplsxbIfGVxgTjxRHaoN8o_oGZswXE88Pxi6g5zn_bvgUXGDWTBjcQP9Kihy1xdPPLxz27f74LUaAAgQF2jaQ_6ISPH1WCnkYQ4mPjE7Fzz-4nqcAg2ffAcYfFvngvKKl5e3BMLne6MPJP_FGpa0BVuMblVbvXmk5tPdnII46Z3Pzq7Ya1yiVA_oNpB-B07gZlLnz32W3te2Yc23mAhLRg2xdpeK3yO5FKvR2i1eOX9MxywVVJMX0eqgjMQXJcu5kAtMsa'
    },
    {
        id: '2',
        name: 'Marcus Thorne',
        rating: '4.8',
        reviews: 89,
        distance: '1.2 miles away',
        price: 'From $62/hr',
        lat: 11.0120,
        lng: 76.9500,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb77G8OR0bKyKYFCRNiIMwoJGucc0fGpI__ll5v3JbDsx1-2PWILj8AdDAQJqhpeQdsp1ABdoPXgxkjnokk2hflj3aEfAwWLe1Ru9VLon-JKTFP6L-Nmwq7pk1UxLGg5iDthNnGHWaFRN65P1glozgqgd5p0lUqV3b4jmHMPslOE6xL6FJeD08noMLH0q-p4WZHz1XGNXDr82meZeq3IuzKYFFWKmnxqmTmGgpAd-D8Nhcigp5oj2cWg58Oewo6uNC7o3Uwx-aJT5O'
    },
    {
        id: '3',
        name: 'David Chen',
        rating: '4.7',
        reviews: 210,
        distance: '0.5 miles away',
        price: 'From $55/hr',
        lat: 11.0200,
        lng: 76.9700,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2ktMcTueg2ntSvIkEFaLbJS6awc-YU6qWneHtwwwFWeA1gF_TyxjiReav4hMObr7jcLPM91bsS_ZfdHbWKO-iOTQdop7loXptHfDU_6xbzbiOlDEzMnApbXFT1xVpa-X1pnjfYnBNWWB-fIDCcNFTBd14WZ3NF1dv7v3bcjtfyNtij8xsp84h4nNRIeyAT58yNO8S0-a8rJwXYEEx7KqbaWofugzw_m7MqbwSJQAnPgM8RouYLDfwreDZJbKadyB3fCY5ABTfR6jt'
    }
];

export default function ShowProviders({ selectedProvider, onBack, onBook }: any) {
    const defaultProviderId = selectedProvider ? selectedProvider.id : PROVIDERS[0].id;
    const [activeId, setActiveId] = useState(defaultProviderId);

    // If a provider was sent from the home page, make sure they are at the front of the list using a quick filter hack
    const [sortedProviders] = useState(() => {
        return [...PROVIDERS].sort((a, b) => {
            if (a.id === defaultProviderId) return -1;
            if (b.id === defaultProviderId) return 1;
            return 0;
        });
    });

    // If the selectedProvider passed prop is not in our small block list of PROVIDERS, we just map out our hardcoded ones.
    const activeProviderObj = PROVIDERS.find(p => p.id === activeId) || PROVIDERS[0];

    return (
        <View style={styles.container}>
            {/* Map Component reused as the raw Background */}
            <View style={StyleSheet.absoluteFillObject}>
                <MapTab providers={PROVIDERS} activeProvider={activeProviderObj} />
            </View>

            {/* Back button Overlay */}
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
                <Ionicons name="chevron-back" size={24} color="#0f172a" />
            </TouchableOpacity>

            {/* Floating Map Controls overlay */}
            <View style={styles.mapControls}>
                <TouchableOpacity style={styles.controlBtn}>
                    <Ionicons name="add" size={20} color="#0f172a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn}>
                    <Ionicons name="remove" size={20} color="#0f172a" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlBtn, styles.locationBtn]}>
                    <MaterialIcons name="my-location" size={20} color="#ffffff" />
                </TouchableOpacity>
            </View>

            {/* Bottom Sheet Drawer matching Stitch Design */}
            <View style={styles.bottomSheet}>
                {/* Visual Drag Handle */}
                <View style={styles.dragHandleContainer}>
                    <View style={styles.dragHandle} />
                </View>

                {/* Sheet Title & Metadata */}
                <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>Providers nearby</Text>
                    <Text style={styles.resultCount}>{PROVIDERS.length} results</Text>
                </View>

                {/* Horizontal Scroll List of Provider Cards */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                >
                    {sortedProviders.map((provider) => {
                        const isActive = activeId === provider.id;
                        
                        return (
                            <TouchableOpacity activeOpacity={0.9} onPress={() => setActiveId(provider.id)} key={provider.id} style={[styles.providerCard, isActive && styles.activeCard]}>
                                <View style={styles.cardTop}>
                                    <Image source={{ uri: provider.image }} style={styles.avatar} />
                                    <View style={styles.info}>
                                        <Text style={styles.name} numberOfLines={1}>{provider.name}</Text>
                                        <View style={styles.ratingContainer}>
                                            <Ionicons name="star" size={12} color="#f59e0b" />
                                            <Text style={styles.ratingText}>{provider.rating}</Text>
                                            <Text style={styles.reviewsText}>({provider.reviews})</Text>
                                        </View>
                                        <Text style={styles.distance}>{provider.distance}</Text>
                                    </View>
                                </View>
                                <View style={styles.cardBottom}>
                                    <Text style={styles.price}>{provider.price}</Text>
                                    <TouchableOpacity style={styles.bookBtn} onPress={() => onBook(provider.id)}>
                                        <Text style={styles.bookBtnText}>Book</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backBtn: {
        position: 'absolute',
        top: 24,
        left: 20,
        width: 44,
        height: 44,
        backgroundColor: '#ffffff',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
        zIndex: 10,
    },
    mapControls: {
        position: 'absolute',
        top: '40%',
        right: 16,
        zIndex: 10,
    },
    controlBtn: {
        width: 42,
        height: 42,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    locationBtn: {
        backgroundColor: '#0f49bd',
        marginTop: 12,
        borderColor: 'transparent',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingBottom: 110, // Avoid overlap with bottom nav bar
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -12 },
        shadowOpacity: 0.08,
        shadowRadius: 30,
        elevation: 25,
        zIndex: 20,
        borderTopWidth: 1,
        borderColor: '#f1f5f9',
    },
    dragHandleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
    },
    dragHandle: {
        width: 50,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#cbd5e1',
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
    },
    resultCount: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    providerCard: {
        width: width * 0.72,
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 14,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    activeCard: {
        borderColor: '#0f49bd',
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        shadowColor: '#0f49bd',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardTop: {
        flexDirection: 'row',
        marginBottom: 14,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 14,
        backgroundColor: '#f1f5f9',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#f59e0b',
        marginLeft: 4,
        marginRight: 4,
    },
    reviewsText: {
        fontSize: 11,
        color: '#94a3b8',
        fontWeight: '500',
    },
    distance: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    price: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0f49bd',
    },
    bookBtn: {
        backgroundColor: '#0f49bd',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    bookBtnText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '700',
    }
});
