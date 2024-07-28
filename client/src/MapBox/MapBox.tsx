import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const paragraphStyle = {
  fontFamily: 'Open Sans',
  margin: 0,
  fontSize: 13
};

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLInputElement>(null);
  const [roundedArea, setRoundedArea] = useState();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWJvdXJnIiwiYSI6ImNsejNxbDRmajBic2MyaXExN2hrMm1udTcifQ.AT2bCOKyUAwyW8mywMmzug';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-91.874, 42.76],
      zoom: 12
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });
    mapRef.current.addControl(draw);

    mapRef.current.on('draw.create', updateArea);
    mapRef.current.on('draw.delete', updateArea);
    mapRef.current.on('draw.update', updateArea);

    function updateArea(e) {
      const data = draw.getAll();
      console.log('data', data)
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

export default MapboxExample;