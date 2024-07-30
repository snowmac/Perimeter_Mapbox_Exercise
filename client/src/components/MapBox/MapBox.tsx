import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { polygonFactory } from '@utils/util.ts';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import Controls from '../Controls/Controls.tsx';

const fakeOne = [[[-91.89339773559622,42.77310422996243],[-91.84086935424874,42.76264469821865],[-91.87708990478572,42.75306574667144],[-91.89339773559622,42.77310422996243]]];

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

      draw.add(polygonFactory(fakeOne))

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
      <Controls />
    </>
  );
};

export default MapBox;
