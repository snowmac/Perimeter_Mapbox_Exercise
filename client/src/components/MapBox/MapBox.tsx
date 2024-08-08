import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { polygonFactory, labelPolygon } from "@utils/util.ts";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const MapBox = ({ onCreate, onUpdate, onDelete, data }: {
  onCreate: (e: mapboxgl.MapboxDrawCreateEvent) => void,
  onUpdate: (e: mapboxgl.MapboxDrawUpdateEvent) => void,
  onDelete: (e: mapboxgl.MapboxDrawDeleteEvent) => void,
  data: any
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const locationsToDraw = data?.polygons?.map((polygon) => {
      const props = JSON.parse(polygon.properties);
      props.DbId = polygon.id;
      
      return polygonFactory(
        JSON.parse(polygon.coordinates),
        props,
        polygon.mapboxId
      );
    }
    );

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    if (mapContainerRef.current) {
      // Initialize map and assign to mapRef
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-91.874, 42.76],
        zoom: 12,
      });

      // Ensure mapRef.current is not null before adding control
      const map = mapRef.current;
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
        defaultMode: "draw_polygon",
      });
      map.addControl(draw);

      map.on("draw.create", (e) => onCreate(e));
      map.on("draw.delete", (e) => onDelete(e));
      map.on("draw.update", (e) => onUpdate(e));

      if (mapRef.current && locationsToDraw) {
        locationsToDraw.forEach((item) => draw.add(item));
      }
    }
  }, []);

  return (
    <>
      <div
        ref={mapContainerRef}
        id="map"
        style={{ height: "400px", width: "700px" }}
      ></div>
    </>
  );
};

export default MapBox;
