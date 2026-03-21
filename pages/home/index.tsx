import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, ScrollView, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileTab from './profile';
import UpdatesTab from './updates';
import EarningsTab from './earnings';
import ScheduleTab from './schedule';
import MapTab from './map';
import ShowProviders from './showProviders';
import NavBar from './navbar';

const PROVIDER_DATA = [
    {
        id: '1',
        name: 'Elena Petrova',
        serviceText: 'PREMIUM CLEANING • 0.8 MI',
        rating: '4.9',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGtZkY9FbplsxbIfGVxgTjxRHaoN8o_oGZswXE88Pxi6g5zn_bvgUXGDWTBjcQP9Kihy1xdPPLxz27f74LUaAAgQF2jaQ_6ISPH1WCnkYQ4mPjE7Fzz-4nqcAg2ffAcYfFvngvKKl5e3BMLne6MPJP_FGpa0BVuMblVbvXmk5tPdnII46Z3Pzq7Ya1yiVA_oNpB-B07gZlLnz32W3te2Yc23mAhLRg2xdpeK3yO5FKvR2i1eOX9MxywVVJMX0eqgjMQXJcu5kAtMsa'
    },
    {
        id: '2',
        name: 'Marcus Thorne',
        serviceText: 'MASTER ELECTRICIAN • 1.2 MI',
        rating: '4.8',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb77G8OR0bKyKYFCRNiIMwoJGucc0fGpI__ll5v3JbDsx1-2PWILj8AdDAQJqhpeQdsp1ABdoPXgxkjnokk2hflj3aEfAwWLe1Ru9VLon-JKTFP6L-Nmwq7pk1UxLGg5iDthNnGHWaFRN65P1glozgqgd5p0lUqV3b4jmHMPslOE6xL6FJeD08noMLH0q-p4WZHz1XGNXDr82meZeq3IuzKYFFWKmnxqmTmGgpAd-D8Nhcigp5oj2cWg58Oewo6uNC7o3Uwx-aJT5O'
    },
    {
        id: '3',
        name: 'Sasha K.',
        serviceText: 'INTERIOR DESIGN • 2.4 MI',
        rating: '5.0',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsntkUghYSMMi2G0vnZ2Eb_lkV3C6uwZkLwNg9fa8PGrsnCgVtrxyf8ZiWFWL9av6nTng58JOp9dLJuvG96g9dUjmt3cpeCqKOttAiM-Gvr7o-mUi1w6YS259nWc9_ElH68pSguvR4RFf_aChex-vt8ZqXcYmPCGYVv2esjk4L6iYz6RtGCL04QKhSCugOkGorgbpZPDvoj4cHEPUsfnbcuo39QAU2D_FzcT-0I4SvhxIdaaVY4HqXUTxO7Xswesl1NtJZR_4gyY5A'
    },
    {
        id: '4',
        name: 'David Chen',
        serviceText: 'EXPERT PLUMBING • 0.5 MI',
        rating: '4.7',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2ktMcTueg2ntSvIkEFaLbJS6awc-YU6qWneHtwwwFWeA1gF_TyxjiReav4hMObr7jcLPM91bsS_ZfdHbWKO-iOTQdop7loXptHfDU_6xbzbiOlDEzMnApbXFT1xVpa-X1pnjfYnBNWWB-fIDCcNFTBd14WZ3NF1dv7v3bcjtfyNtij8xsp84h4nNRIeyAT58yNO8S0-a8rJwXYEEx7KqbaWofugzw_m7MqbwSJQAnPgM8RouYLDfwreDZJbKadyB3fCY5ABTfR6jt'
    },
    {
        id: '5',
        name: 'Elena Petrova',
        serviceText: 'PREMIUM CLEANING • 0.8 MI',
        rating: '4.9',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGtZkY9FbplsxbIfGVxgTjxRHaoN8o_oGZswXE88Pxi6g5zn_bvgUXGDWTBjcQP9Kihy1xdPPLxz27f74LUaAAgQF2jaQ_6ISPH1WCnkYQ4mPjE7Fzz-4nqcAg2ffAcYfFvngvKKl5e3BMLne6MPJP_FGpa0BVuMblVbvXmk5tPdnII46Z3Pzq7Ya1yiVA_oNpB-B07gZlLnz32W3te2Yc23mAhLRg2xdpeK3yO5FKvR2i1eOX9MxywVVJMX0eqgjMQXJcu5kAtMsa'
    },
    {
        id: '6',
        name: 'Marcus Thorne',
        serviceText: 'MASTER ELECTRICIAN • 1.2 MI',
        rating: '4.8',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb77G8OR0bKyKYFCRNiIMwoJGucc0fGpI__ll5v3JbDsx1-2PWILj8AdDAQJqhpeQdsp1ABdoPXgxkjnokk2hflj3aEfAwWLe1Ru9VLon-JKTFP6L-Nmwq7pk1UxLGg5iDthNnGHWaFRN65P1glozgqgd5p0lUqV3b4jmHMPslOE6xL6FJeD08noMLH0q-p4WZHz1XGNXDr82meZeq3IuzKYFFWKmnxqmTmGgpAd-D8Nhcigp5oj2cWg58Oewo6uNC7o3Uwx-aJT5O'
    },
    {
        id: '7',
        name: 'Sasha K.',
        serviceText: 'INTERIOR DESIGN • 2.4 MI',
        rating: '5.0',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsntkUghYSMMi2G0vnZ2Eb_lkV3C6uwZkLwNg9fa8PGrsnCgVtrxyf8ZiWFWL9av6nTng58JOp9dLJuvG96g9dUjmt3cpeCqKOttAiM-Gvr7o-mUi1w6YS259nWc9_ElH68pSguvR4RFf_aChex-vt8ZqXcYmPCGYVv2esjk4L6iYz6RtGCL04QKhSCugOkGorgbpZPDvoj4cHEPUsfnbcuo39QAU2D_FzcT-0I4SvhxIdaaVY4HqXUTxO7Xswesl1NtJZR_4gyY5A'
    },
    {
        id: '8',
        name: 'David Chen',
        serviceText: 'EXPERT PLUMBING • 0.5 MI',
        rating: '4.7',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2ktMcTueg2ntSvIkEFaLbJS6awc-YU6qWneHtwwwFWeA1gF_TyxjiReav4hMObr7jcLPM91bsS_ZfdHbWKO-iOTQdop7loXptHfDU_6xbzbiOlDEzMnApbXFT1xVpa-X1pnjfYnBNWWB-fIDCcNFTBd14WZ3NF1dv7v3bcjtfyNtij8xsp84h4nNRIeyAT58yNO8S0-a8rJwXYEEx7KqbaWofugzw_m7MqbwSJQAnPgM8RouYLDfwreDZJbKadyB3fCY5ABTfR6jt'
    }
];

const CATEGORY_DATA = [
    { id: '1', name: 'All Services', icon: null, active: true },
    { id: '2', name: 'Cleaning', icon: 'cleaning-services', active: false },
    { id: '3', name: 'Plumbing', icon: 'plumbing', active: false },
    { id: '4', name: 'Electrical', icon: 'electrical-services', active: false },
    { id: '5', name: 'Painting', icon: 'format-paint', active: false }
];

export default function Home() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Home');
    const [role, setRole] = useState('seeker'); // Initializing as seeker
    const [selectedProvider, setSelectedProvider] = useState<any>(null);

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return role === 'provider' ? <UpdatesTab /> : <HomeTab onProviderSelect={(provider: any) => {
                    setSelectedProvider(provider);
                    setActiveTab('ShowProviders');
                }} />;
            case 'ShowProviders':
                return <ShowProviders selectedProvider={selectedProvider} onBack={() => setActiveTab('Home')} onBook={() => setActiveTab('Profile')} />;
            case 'Schedule':
                return <ScheduleTab />;
            case 'Map':
                return <MapTab />;
            case 'Earnings':
                return <EarningsTab />;
            case 'Updates':
                return <UpdatesTab />;
            case 'Profile':
                return <ProfileTab onLogout={() => navigation.goBack()} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainContainer}>
                {renderContent()}
            </View>

            {/* Custom Minimalistic Bottom Navigation Bar */}
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
        </SafeAreaView>
    );
}

function HomeTab({ onProviderSelect }: { onProviderSelect?: (provider: any) => void }) {
    const [categories, setCategories] = useState(CATEGORY_DATA);

    return (
        <ScrollView style={styles.homeTabContainer} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity>
                        <Ionicons name="menu-outline" size={28} color="#0f172a" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Neighbourly</Text>
                    <TouchableOpacity>
                        <Ionicons name="location-outline" size={24} color="#0f172a" />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#94a3b8" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="What service do you need today?"
                        placeholderTextColor="#94a3b8"
                    />
                </View>
            </View>

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={category.active ? styles.categoryActive : styles.categoryInactive}
                        onPress={() => {
                            const updatedCategories = categories.map(c => ({
                                ...c,
                                active: c.id === category.id
                            }));
                            setCategories(updatedCategories);
                        }}
                    >
                        {category.icon && (
                            <MaterialIcons
                                name={category.icon as any}
                                size={16}
                                color={category.active ? "#ffffff" : "#475569"}
                                style={styles.categoryIcon}
                            />
                        )}
                        <Text style={category.active ? styles.categoryActiveText : styles.categoryInactiveText}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Top Rated Nearby */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Rated Nearby</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>SEE ALL</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.providersGrid}>
                {PROVIDER_DATA.map((provider) => (
                    <TouchableOpacity 
                        key={provider.id} 
                        style={styles.providerCard}
                        onPress={() => onProviderSelect && onProviderSelect(provider)}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: provider.image }}
                                style={styles.providerImage}
                            />
                            <View style={styles.ratingBadge}>
                                <Ionicons name="star" size={12} color="#eab308" />
                                <Text style={styles.ratingText}>{provider.rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.providerName}>{provider.name}</Text>
                        <Text style={styles.providerService}>{provider.serviceText}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.footer}>
                <Text>Bring up more services later...!</Text>
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    placeholderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
    },



    /* Home Tab Styles */
    homeTabContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        marginBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0f172a',
        letterSpacing: -0.5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        color: '#0f172a',
        fontSize: 14,
    },
    categoriesContainer: {
        paddingTop: 8,
        paddingBottom: 24,
        paddingRight: 20,
    },
    categoryActive: {
        height: 40,
        backgroundColor: '#0f49bd',
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0f49bd',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginRight: 12,
    },
    categoryActiveText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    categoryInactive: {
        height: 40,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 12,
    },
    categoryIcon: {
        marginRight: 6,
    },
    categoryInactiveText: {
        color: '#475569',
        fontSize: 13,
        fontWeight: '600',
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
    providersGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    providerCard: {
        width: '47%',
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 0.8,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
        marginBottom: 10,
        overflow: 'hidden',
    },
    providerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ratingBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#0f172a',
        marginLeft: 4,
    },
    providerName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    providerService: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748b',
        letterSpacing: 0.5,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        color: '#333',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    }
});
