import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');
const MAX_WIDTH = screenWidth - 48; // Fills screen leaving 24px margins
const MIN_WIDTH = 64; // Collapses perfectly into a circular FAB

interface NavBarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    role?: string;
}

export default function NavBar({ activeTab, setActiveTab, role }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleNav = () => {
        const toValue = isOpen ? 0 : 1;
        setIsOpen(!isOpen);
        Animated.spring(animation, {
            toValue,
            useNativeDriver: false, // Animating 'width' cannot use native driver
            friction: 7,
            tension: 40,
        }).start();
    };

    const handleSelect = (tab: string) => {
        setActiveTab(tab);
        // Automatically close the nav when an option is selected to act like a true shortcut menu
        setIsOpen(false);
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: false,
            friction: 7,
            tension: 40,
        }).start();
    };

    // Calculate dynamic expanding width
    const containerWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [MIN_WIDTH, MAX_WIDTH],
    });

    // Fade icons in as the pill expands
    const contentOpacity = animation.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [0, 0, 1],
    });

    // Rotate the '+' icon 45 degrees to perfectly form an 'x' close button
    const fabRotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    });

    return (
        <Animated.View style={[styles.navContainer, { width: containerWidth }]}>
            {/* The Main Connective Pill Background */}
            <View style={styles.navBarBackground} />
            
            {/* The Wrapped Nav Items (Swapped to be on the left of FAB) */}
            <View style={styles.navItemsWrapper}>
                <Animated.View style={[styles.navItemsContainer, { opacity: contentOpacity }]}>
                    <NavItem iconName="home" isActive={activeTab === 'Home'} onPress={() => handleSelect('Home')} />
                    {role === 'provider' && (
                        <NavItem iconName="wallet" isActive={activeTab === 'Earnings'} onPress={() => handleSelect('Earnings')} />
                    )}
                    {role === 'seeker' && (
                        <NavItem iconName="calendar" isActive={activeTab === 'Schedule'} onPress={() => handleSelect('Schedule')} />
                    )}
                    <NavItem iconName="person" isActive={activeTab === 'Profile'} onPress={() => handleSelect('Profile')} />
                </Animated.View>
            </View>

            {/* The Floating Action Button (FAB) Toggle (Now pinned to right) */}
            <TouchableOpacity style={styles.fabBtn} onPress={toggleNav} activeOpacity={0.9}>
                <Animated.View style={{ transform: [{ rotate: fabRotation }] }}>
                    <Ionicons name="add" size={36} color="#ffffff" />
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
}

function NavItem({ iconName, isActive, onPress }: any) {
    return (
        <TouchableOpacity style={styles.navItem} onPress={onPress}>
            <Ionicons 
                name={isActive ? iconName : `${iconName}-outline`} 
                size={22} 
                color={isActive ? '#0f49bd' : '#64748b'} 
            />
            {/* Ultra-minimalistic active locator dot */}
            <View style={[styles.activeDot, { transform: [{ scale: isActive ? 1 : 0 }] }]} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 32 : 24,
        right: 24, // Shifted mapping to lock everything against right edge
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        // Global container shadow ensuring it pulls cleanly over content
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 15,
    },
    navBarBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    fabBtn: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#0f172a', // Sleek dark aesthetic
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        // The FAB gets its own inner shadow for layered visual priority over the white pill
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    navItemsWrapper: {
        flex: 1,
        overflow: 'hidden',
        height: '100%',
        borderRadius: 32,
        position: 'relative', // Added to support absolute child locking
    },
    navItemsContainer: {
        position: 'absolute',
        right: 0, // Locks the items firmly against the FAB boundary during layout extension
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100%',
        // Absolute fixed width ensures items don't jitter around during expansion
        width: MAX_WIDTH - MIN_WIDTH, 
        paddingLeft: 8, // Shifted to the left edge of the sequence instead
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingHorizontal: 12,
        paddingTop: 4,
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#0f49bd',
        position: 'absolute',
        bottom: 12,
    },
});
