import React,{ useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default function GetStarted() {
    const [role, setRole] = useState('');
    const handleContinue = () => {
        console.log('Continue pressed');
    };
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container} bounces={false}>
                <View style={styles.main}>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>How will you use the app?</Text>
                        <Text style={styles.subtitle}>Select your primary role to get started with your local community.</Text>
                    </View>

                    <TouchableOpacity style={[styles.roleCard, role === 'seeker' && styles.roleCardActive]} onPress={() => setRole(role === 'seeker' ? '' : 'seeker')}>
                        <View style={styles.roleCardTop}>
                            <View style={styles.roleIconBox}>
                                <MaterialIcons name="search" size={20} color="black" />
                            </View>
                            <View style={[styles.radioCircle, role === 'seeker' && styles.radioCircleActive]}>
                                {role === 'seeker' && <View style={styles.radioDot} />}
                            </View>
                        </View>
                        <Text style={styles.roleCardTitle}>Service Seeker</Text>
                        <Text style={styles.roleCardDesc}>
                                I am looking for help with tasks, chores, or professional services nearby.
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.roleCard, role === 'Service Provider' && styles.roleCardActive]} onPress={() => setRole(role === 'Service Provider' ? '' : 'Service Provider')}>
                        <View style={styles.roleCardTop}>
                            <View style={styles.roleIconBox}>
                                <MaterialIcons name="handyman" size={20} color="black" />
                            </View>
                            <View style={[styles.radioCircle, role === 'Service Provider' && styles.radioCircleActive]}>
                                {role === 'Service Provider' && <View style={styles.radioDot} />}
                            </View>
                        </View>
                        <Text style={styles.roleCardTitle}>Service Provider</Text>
                        <Text style={styles.roleCardDesc}>
                                I offer services to people in my local community nearby.
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleContinue}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>Continue</Text>
                            <Ionicons name="arrow-forward" size={18} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.termsText}>
                        By continuing, you agree to{' '}
                        <Text>Neighbourly's Terms of Service</Text>{' '}
                        and{' '}
                        <Text>Privacy Policy</Text>.
                    </Text>

                </View>
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
    main: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 48,
        paddingTop: 65,
    },
    titleSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
    },
    roleCard: {
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        borderRadius: 16,
        padding: 18,
        backgroundColor: '#ffffff',
        marginBottom: 22,
    },
    roleCardActive: {
        borderColor: 'black',
        backgroundColor: '#f0f5ff',
    },
    roleCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    roleIconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#f7f9fb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircleActive: {
        borderColor: 'black',
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'black',
    },
    roleCardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    roleCardDesc: {
        fontSize: 13,
        color: '#64748b',
        lineHeight: 20,
    },
    button: {
        marginTop: 32,
        width: '100%',
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginRight:'2'
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    termsText: {
        marginTop: 22,
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        lineHeight: 18,
    },

});