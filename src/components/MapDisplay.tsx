"use client";
import { useState } from 'react';
import Map, {
  GeolocateControl,
  NavigationControl,
  Layer,
  Source,
  type MapMouseEvent,
} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Feature, Point, FeatureCollection } from 'geojson';

// Define and export the types so they can be used across the application
export interface WineryProperties {
  id: string; // <-- Add the ID field from Payload
  name: string;
  address: string;
  website: string;
  do: string[];
  wine_tours: boolean;
  tour_languages: string[];
  children_activities: boolean;
  starlight_destination: boolean;
  services?: {
    pet_friendly?: boolean;
    corporate_events?: boolean;
    motorhome_parking?: boolean;
    accommodation?: boolean;
    ev_charging?: boolean;
    restaurant?: boolean;
  };
}

export type WineryFeature = Feature<Point, WineryProperties>;
export type WineryFeatureCollection = FeatureCollection<Point, WineryProperties>;

// Define the props for our new, "dumb" map component
interface MapDisplayProps {
  wineries: WineryFeatureCollection | null;
  onWineryClick: (id: string) => void;
}

// This component now only displays the map and reports clicks.
export default function MapDisplay({ wineries, onWineryClick }: MapDisplayProps) {
  const [viewport, setViewport] = useState({
    latitude: 39.545586,
    longitude: -0.810916,
    zoom: 9,
  });

  const handleMapClick = (e: MapMouseEvent) => {
    const clickedFeature = e.features && e.features[0];

    // When a winery is clicked, call the handler from props with the ID
    // We ensure properties and id exist before calling the handler.
    if (clickedFeature && clickedFeature.properties && clickedFeature.properties.id) {
      onWineryClick(clickedFeature.properties.id as string);
    }
  };

  return (
    <Map
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/edgarespinoza7/cmcwgscpb05vc01sbawhudclk"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      onMove={(evt) => setViewport(evt.viewState)}
      onClick={handleMapClick}
      interactiveLayerIds={['winery-points']}
    >
      {wineries && (
        <Source id="wineries" type="geojson" data={wineries}>
          <Layer
            id="winery-points"
            type="circle"
            paint={{
              'circle-radius': 6,
              'circle-color': '#c94de8',
              'circle-opacity': 0.6,
              'circle-stroke-width': 1.5,
              'circle-stroke-color': '#9f32ba',
            }}
          />
        </Source>
      )}
      <NavigationControl />
      <GeolocateControl />
    </Map>
  );
}
