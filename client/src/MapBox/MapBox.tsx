import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const MapBox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWJvdXJnIiwiYSI6ImNsejNxbDRmajBic2MyaXExN2hrMm1udTcifQ.AT2bCOKyUAwyW8mywMmzug';

    if (mapContainerRef.current) {
      // Initialize map and assign to mapRef
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-91.874, 42.76],
        zoom: 12
      });

      // Ensure mapRef.current is not null before adding control
      const map = mapRef.current;
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        },
        defaultMode: 'draw_polygon'
      });
      map.addControl(draw);

      map.on('draw.create', updateArea);
      map.on('draw.delete', updateArea);
      map.on('draw.update', updateArea);

      function updateArea(e: mapboxgl.MapEvent) {
        if (!mapRef.current) return;
        const data = draw.getAll();
        console.log('data', JSON.stringify(data.features[0].geometry.coordinates));
      }
    }
  }, []);

  return (
    <>
      <div ref={mapContainerRef} id="map" style={{ height: '400px' }}></div>
      <div
        className="calculation-box"
        style={{
          height: 75,
          width: 150,
          position: 'absolute',
          bottom: 40,
          left: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 15,
          textAlign: 'center'
        }}
      >
      </div>
    </>
  );
};

export default MapBox;
