import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export default function MapTab({ providers = [], activeProvider = null }: { providers?: any[], activeProvider?: any }) {
    const webviewRef = useRef<WebView>(null);

    const leafletHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
            <style>
                body { padding: 0; margin: 0; }
                html, body, #map { height: 100vh; width: 100vw; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                // Initialize map centered roughly at Coimbatore
                var map = L.map('map').setView([11.0168, 76.9558], 13);
                var markers = {};

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                // Add providers dynamically
                const providersData = ${JSON.stringify(providers)};
                
                providersData.forEach(function(prov) {
                    if (prov.lat && prov.lng) {
                        var popupContent = '<b style="font-family: sans-serif;">' + prov.name + '</b><br><span style="font-family: sans-serif;">' + prov.price + '</span>';
                        var m = L.marker([prov.lat, prov.lng]).addTo(map).bindPopup(popupContent);
                        markers[prov.id] = m;
                    }
                });

                function focusOnProvider(id) {
                    if (markers[id]) {
                        var m = markers[id];
                        map.setView(m.getLatLng(), 15, { animate: true });
                        m.openPopup();
                    }
                }
            </script>
        </body>
        </html>
    `;

    useEffect(() => {
        if (activeProvider && activeProvider.id && webviewRef.current) {
            // Wait for WebView script execution via timeout to prevent race conditions on initial mount
            setTimeout(() => {
                webviewRef.current?.injectJavaScript(`
                    if (typeof focusOnProvider !== 'undefined') {
                        focusOnProvider('${activeProvider.id}');
                    }
                    true;
                `);
            }, 500);
        }
    }, [activeProvider]);

    return (
        <View style={styles.container}>
            <WebView 
                ref={webviewRef}
                source={{ html: leafletHTML }} 
                style={styles.webview} 
                originWhitelist={['*']}
                keyboardDisplayRequiresUserAction={false}
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    webview: {
        flex: 1,
    }
});
