'use client'
import { useState, useEffect, useMemo } from 'react'
import Map, {
  GeolocateControl,
  NavigationControl,
  Popup,
  Layer,
  Source,
  type MapMouseEvent,
} from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Feature, Point, FeatureCollection } from 'geojson'

// Define the structure of the properties within our GeoJSON features
interface WineryProperties {
  name: string
  address: string
  website: string
  do: string
  wine_tours: boolean
  tour_languages: string[]
  children_activities: boolean
  starlight_destination: boolean
  services?: {
    pet_friendly?: boolean
    corporate_events?: boolean
    motorhome_parking?: boolean
    accommodation?: boolean
    ev_charging?: boolean
    restaurant?: boolean
  }
}

// Define a specific type for our winery features for better type safety
type WineryFeature = Feature<Point, WineryProperties>

export default function MapComponent() {
  const [viewport, setViewport] = useState({
    latitude: 39.545586,
    longitude: -0.810916,
    zoom: 9,
  })

  const [selectedWinery, setSelectedWinery] = useState<WineryFeature | null>(null)

  // State for managing fetched data, loading, and errors
  const [wineries, setWineries] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from Payload CMS when the component mounts
  useEffect(() => {
    const fetchWineries = async () => {
      try {
        const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
        const response = await fetch(`${payloadUrl}/api/wineries?limit=100`)

        if (!response.ok) {
          throw new Error('Failed to fetch wineries from Payload CMS')
        }

        const data = await response.json()
        setWineries(data.docs || []) // Payload returns items in the 'docs' property
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWineries()
  }, []) // Empty dependency array ensures this runs only once on mount

  // Transform the fetched data into a GeoJSON FeatureCollection
  const wineriesGeoJSON = useMemo((): FeatureCollection<Point, WineryProperties> | null => {
    if (!wineries || wineries.length === 0) return null

    const features: WineryFeature[] = wineries.map((winery: any) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: winery.location, // Use the 'location' field from Payload
      },
      properties: {
        name: winery.name,
        address: winery.address,
        website: winery.website,
        do: winery.do,
        wine_tours: winery.wine_tours,
        services: winery.services,
        tour_languages: winery.tour_languages,
        children_activities: winery.children_activities,
        starlight_destination: winery.starlight_destination,
      },
    }))

    return {
      type: 'FeatureCollection',
      features,
    }
  }, [wineries]) // This memoization re-runs only when the 'wineries' state changes

  const handleMapClick = (e: MapMouseEvent) => {
    const clickedFeature = e.features && e.features[0]

    if (clickedFeature) {
      // The feature from the event needs to be cast to our specific type
      setSelectedWinery(clickedFeature as unknown as WineryFeature)
    } else {
      setSelectedWinery(null)
    }
  }

  // Render loading/error states before attempting to render the map
  if (isLoading)
    return <div className="flex items-center justify-center h-screen">Loading Map...</div>

  if (error) return <div className="flex items-center justify-center h-screen">Error: {error}</div>

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
      interactiveLayerIds={['winery-points']} // Make the layer clickable
    >
      {/* The Source component now gets its data from our state-derived GeoJSON object */}
      {wineriesGeoJSON && (
        <Source id="wineries" type="geojson" data={wineriesGeoJSON}>
          <Layer
            id="winery-points"
            type="circle"
            paint={{
              'circle-radius': 6,
              'circle-color': '#c94de8',
              'circle-opacity': 0.6
              ,
              'circle-stroke-width': 1.5,
              'circle-stroke-color': '#9f32ba',
            }}
          />
        </Source>
      )}

      {selectedWinery && selectedWinery.geometry && (
        <Popup
          anchor="top"
          longitude={selectedWinery.geometry.coordinates[0]}
          latitude={selectedWinery.geometry.coordinates[1]}
          onClose={() => setSelectedWinery(null)}
          closeOnClick={false}
        >
          <div className="text-gray-900">
            <h3 className="text-lg font-bold mb-1">{selectedWinery.properties.name}</h3>
            <p className="text-sm">{selectedWinery.properties.address}</p>
            <p className="text-sm mb-2">DO: {selectedWinery.properties.do}</p>
            <a
              href={selectedWinery.properties.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
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
