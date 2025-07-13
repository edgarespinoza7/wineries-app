'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MapDisplay from '@/components/MapDisplay' // Adjust path if needed
import { WineryDrawer } from '@/components/WineryDrawer' // Adjust path if needed
import type {
  WineryProperties,
  WineryFeature,
  WineryFeatureCollection,
} from '@/components/MapDisplay'

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for the raw data from Payload
  const [wineriesData, setWineriesData] = useState<WineryProperties[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from Payload CMS (logic moved from the old component)
  useEffect(() => {
    const fetchWineries = async () => {
      try {
        const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
        const response = await fetch(`${payloadUrl}/api/wineries?limit=100`)
        if (!response.ok) throw new Error('Failed to fetch wineries')
        const data = await response.json()
        // We now expect the full winery object, including the `id`
        setWineriesData(data.docs || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    fetchWineries()
  }, [])

  // Transform the fetched data into a GeoJSON FeatureCollection for the map
  const wineriesGeoJSON = useMemo((): WineryFeatureCollection | null => {
    if (!wineriesData || wineriesData.length === 0) return null

    const features: WineryFeature[] = wineriesData.map((winery) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        // @ts-ignore - Assuming location comes from Payload as [lon, lat]
        coordinates: winery.location,
      },
      // Pass the entire winery object, including the ID, to the properties
      properties: winery,
    }))
    return { type: 'FeatureCollection', features }
  }, [wineriesData])

  // --- State Management via URL ---
  const selectedWineryId = searchParams.get('winery')

  // Find the selected winery object from our fetched data based on the URL param
  const selectedWinery = useMemo(() => {
    if (!selectedWineryId || wineriesData.length === 0) return null
    return wineriesData.find((w) => w.id === selectedWineryId) || null
  }, [selectedWineryId, wineriesData])

  // This function is passed to the map. When the map calls it, we update the URL.
  const handleWineryClick = (id: string) => {
    router.push(`/?winery=${id}`, { scroll: false })
  }

  // This function is passed to the drawer. When the drawer closes, we clear the URL.
  const handleDrawerClose = () => {
    router.push(`/`, { scroll: false })
  }
  // --- End of State Management ---

  if (isLoading)
    return <div className="flex items-center justify-center h-screen">Loading Wineries...</div>
  if (error) return <div className="flex items-center justify-center h-screen">Error: {error}</div>

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <MapDisplay wineries={wineriesGeoJSON} onWineryClick={handleWineryClick} />
      <WineryDrawer winery={selectedWinery} onClose={handleDrawerClose} />
    </main>
  )
}
