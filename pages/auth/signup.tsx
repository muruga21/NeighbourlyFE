import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Signup: undefined;
    Home: undefined;
};

export default function JoinNeighbourly() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [role, setRole] = useState('seeker');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} bounces={false}>

                {/* Main Content */}
                <View style={styles.main}>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>Join Neighbourly</Text>
                        <Text style={styles.subtitle}>Enter your details to get started with the community.</Text>
                    </View>

                    {/* Role Selector Toggle */}
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[styles.toggleBtn, role === 'seeker' && styles.toggleBtnActive]}
                            onPress={() => setRole('seeker')}
                        >
                            <Text style={[styles.toggleText, role === 'seeker' && styles.toggleTextActive]}>Seeker</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleBtn, role === 'provider' && styles.toggleBtnActive]}
                            onPress={() => setRole('provider')}
                        >
                            <Text style={[styles.toggleText, role === 'provider' && styles.toggleTextActive]}>Provider</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.form}>
                        {/* Full Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="person" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Jane Doe"
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="mail" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="jane@example.com"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Phone */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Phone Number</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="call" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+1 (555) 000-0000"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="lock" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    style={styles.visibilityBtn}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <MaterialIcons
                                        name={showPassword ? "visibility-off" : "visibility"}
                                        size={20}
                                        color="#94a3b8"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* CTA Button */}
                        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.ctaText}>Create Account</Text>
                            <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <View style={styles.dividerTextContainer}>
                            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                        </View>
                    </View>

                    {/* Social Signup */}
                    <View style={styles.socialGrid}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={20} color="#334155" style={{ marginRight: 8 }} />
                            <Text style={styles.socialText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={20} color="#0f172a" style={{ marginRight: 8 }} />
                            <Text style={styles.socialText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer Link */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log in</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Aesthetic Decorations */}
                <View style={styles.decorationBottom} />
                <View style={styles.decorationTop} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    headerTitle: {
        marginLeft: 16,
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: '#64748b',
    },
    main: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 48,
        paddingTop: 55,
    },
    titleSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
    },
    toggleContainer: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        marginBottom: 32,
    },
    toggleBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleBtnActive: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    toggleTextActive: {
        color: '#0f49bd',
    },
    form: {
        gap: 16, // Use marginTop on items if gap isn't supported in your RN version
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#64748b',
        marginLeft: 4,
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#0f172a',
        fontSize: 16,
    },
    visibilityBtn: {
        padding: 4,
    },
    ctaButton: {
        height: 56,
        marginTop: 16,
        backgroundColor: '#0f172a',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    ctaText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    dividerContainer: {
        position: 'relative',
        marginVertical: 32,
        justifyContent: 'center',
    },
    dividerLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    dividerTextContainer: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
    },
    dividerText: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#64748b',
    },
    socialGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    socialButton: {
        flex: 1,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginHorizontal: 4, // Polyfill for gap if needed
    },
    socialText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    footer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#64748b',
        fontSize: 14,
    },
    footerLink: {
        color: '#0f49bd',
        fontSize: 14,
        fontWeight: '700',
    },
    decorationBottom: {
        position: 'absolute',
        bottom: -96,
        right: -96,
        width: 256,
        height: 256,
        borderRadius: 128,
        backgroundColor: 'rgba(15, 73, 189, 0.05)',
    },
    decorationTop: {
        position: 'absolute',
        top: -48,
        left: -48,
        width: 192,
        height: 192,
        borderRadius: 96,
        backgroundColor: 'rgba(15, 73, 189, 0.05)',
    },
});