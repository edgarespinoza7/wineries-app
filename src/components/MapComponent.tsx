'use client'

import Map, { GeolocateControl, NavigationControl, Popup, Layer, Source } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useState } from 'react'
import { wineriesGeoJSON, type WineryFeature } from '../data/wineries'

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 39.545586,
    longitude: -0.810916,
    zoom: 9,
  })

  const [selectedWinery, setSelectedWinery] = useState<WineryFeature | null>(null)

  interface MapClickEvent {
    features?: unknown[]
  }

  const handleMapClick = (e: MapClickEvent) => {
    const features = e.features
    const wineryFeature = features && features[0]

    if (wineryFeature) {
      setSelectedWinery(wineryFeature as WineryFeature)
    } else {
      setSelectedWinery(null)
    }
  }

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
      <Source id="wineries" type="geojson" data={wineriesGeoJSON}>
        <Layer
          id="winery-points"
          type="circle"
          paint={{
            'circle-radius': 5,
            'circle-color': '#c94de8',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#8d34a3',
          }}
        />
      </Source>
      {selectedWinery && (
        <Popup
          anchor="top"
          longitude={Number(selectedWinery.geometry.coordinates[0])}
          latitude={Number(selectedWinery.geometry.coordinates[1])}
          onClose={() => setSelectedWinery(null)}
          closeOnClick={false}
          
        >
          <div className="text-gray-900">
            <h3 className="text-2xl mb-2">{selectedWinery.properties.name}</h3>
            <p className="text-xs">{selectedWinery.properties.address}</p>
            <p className="mb-2">DO: {selectedWinery.properties.do}</p>
            <a
              href={selectedWinery.properties.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text hover:underline"
            >
              Website
            </a>
          </div>
        </Popup>
      )}
      <NavigationControl />
      <GeolocateControl />
    </Map>
  )
}

export default MapComponent
