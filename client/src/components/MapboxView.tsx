import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiaW50ZXJuZXRtYWlzIiwiYSI6ImNtb3N3ZXVpODAzcWMycXB1eml4OHNsdGUifQ.LQjeJXcWF45juASHasbIog';

interface MapboxViewProps {
  className?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
  onMapReady?: (map: mapboxgl.Map) => void;
}

export function MapboxView({
  className = 'h-[500px]',
  initialCenter = [-55.4944, -20.4697], // Campo Grande, MS
  initialZoom = 13,
  onMapReady,
}: MapboxViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Call onMapReady callback when map is loaded
    map.current.on('load', () => {
      if (onMapReady && map.current) {
        onMapReady(map.current);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [initialCenter, initialZoom, onMapReady]);

  return <div ref={mapContainer} className={className} />;
}

// Helper function to add markers to the map
export function addMapboxMarker(
  map: mapboxgl.Map,
  coordinates: [number, number],
  title: string,
  type: 'neighborhood' | 'store'
) {
  const color = type === 'store' ? '#3DD93D' : '#0D1B3E';
  const icon = type === 'store' ? '🏪' : '📍';

  // Create a marker element
  const markerElement = document.createElement('div');
  markerElement.style.width = '40px';
  markerElement.style.height = '40px';
  markerElement.style.backgroundColor = color;
  markerElement.style.borderRadius = '50%';
  markerElement.style.display = 'flex';
  markerElement.style.alignItems = 'center';
  markerElement.style.justifyContent = 'center';
  markerElement.style.fontSize = '20px';
  markerElement.style.cursor = 'pointer';
  markerElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  markerElement.textContent = icon;

  // Create popup
  const popup = new mapboxgl.Popup({ offset: 25 }).setText(title);

  // Add marker to map
  new mapboxgl.Marker({ element: markerElement })
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);
}
