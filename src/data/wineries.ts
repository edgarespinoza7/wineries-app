import type { Feature, Point, FeatureCollection } from 'geojson'

// Define TypeScript types for our winery data structure
export interface WineryServices {
  pet_friendly: boolean
  corporate_events: boolean
  motorhome_parking: boolean
  accommodation: boolean
  ev_charging: boolean
  restaurant: boolean
}

export interface WineryProperties {
  name: string
  address: string
  website: string
  do: string
  wine_tours: boolean
  services: WineryServices
  tour_languages: string[]
  children_activities: boolean
  starlight_destination: boolean
}

// Combine the properties with the GeoJSON Feature structure
export type WineryFeature = Feature<Point, WineryProperties>

// GeoJSON data for wineries in Valencia, now with a specific type
export const wineriesGeoJSON: FeatureCollection<Point, WineryProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.0945, 39.4883],
      },
      properties: {
        name: 'Bodegas Murviedro',
        address: 'Ambaixador Bodeguer s/n, 46340 Requena, Valencia',
        website: 'https://murviedro.es/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: false,
          corporate_events: true,
          motorhome_parking: false,
          accommodation: false,
          ev_charging: false,
          restaurant: false,
        },
        tour_languages: ['Spanish', 'English'],
        children_activities: false,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.0569, 39.4805],
      },
      properties: {
        name: 'Pago de Tharsys',
        address: 'Carretera Nacional III, Km. 277, 46340 Requena, Valencia',
        website: 'https://www.pagodetharsys.com/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: true,
          corporate_events: true,
          motorhome_parking: false,
          accommodation: true,
          ev_charging: false,
          restaurant: true,
        },
        tour_languages: ['Spanish', 'English'],
        children_activities: false,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.1432, 39.5499],
      },
      properties: {
        name: 'Bodega Vera de Estenas',
        address: 'Finca Casa Don Angel, Ctra. N-III, km 267, 46310 Utiel, Valencia',
        website: 'https://veradeestenas.es/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: false,
          corporate_events: true,
          motorhome_parking: false,
          accommodation: false,
          ev_charging: false,
          restaurant: false,
        },
        tour_languages: ['aSpanish', 'English', 'French'],
        children_activities: false,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.148527927872615, 39.4651340617789],
      },
      properties: {
        name: 'Bodegas Hispano Suizas',
        address: 'Carretera Nacional 322, km 451,7, 46357 El Pontón, Requena, Valencia',
        website: 'https://bodegashispanosuizas.com/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: false,
          corporate_events: true,
          motorhome_parking: true,
          accommodation: true,
          ev_charging: false,
          restaurant: true,
        },
        tour_languages: ['Spanish', 'English'],
        children_activities: false,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.305369, 39.419885],
      },
      properties: {
        name: 'Bodegas del Valle',
        address: 'C/ Molineta, 4, 46354 Los Cojos, Valencia',
        website: 'https://www.facebook.com/bodegas.delvalle.33',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: false,
          corporate_events: true,
          motorhome_parking: false,
          accommodation: false,
          ev_charging: false,
          restaurant: false,
        },
        tour_languages: ['Spanish', 'English', 'Valencian'],
        children_activities: true,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.1242093909697326, 39.52937698610178],
      },
      properties: {
        name: 'Chozas Carrascal',
        address: 'Vereda Real de San Antonio 46390, San Antonio de Requena, Valencia',
        website: 'https://chozascarrascal.com/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: true,
          corporate_events: true,
          motorhome_parking: false,
          accommodation: false,
          ev_charging: true,
          restaurant: false,
        },
        tour_languages: ['Spanish', 'English', 'Valencian', 'French'],
        children_activities: true,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.1448739852634666, 39.51471911796188],
      },
      properties: {
        name: 'Dominio de la Vega',
        address: 'Ctra. Madrid-Valencia, PK 270, 650 46390 San Antonio, Valencia',
        website: 'https://dominiodelavega.com/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: true,
          corporate_events: true,
          motorhome_parking: true,
          accommodation: false,
          ev_charging: false,
          restaurant: false,
        },
        tour_languages: ['Spanish', 'English'],
        children_activities: true,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.3443996606052027, 39.377867248699204],
      },
      properties: {
        name: 'Finca Cor Ví',
        address: 'N-322, km 431, 46354 Requena, Valencia',
        website: 'https://closcorvi.com/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: false,
          corporate_events: true,
          motorhome_parking: false,
          accommodation: false,
          ev_charging: false,
          restaurant: false,
        },
        tour_languages: ['Spanish', 'English'],
        children_activities: false,
        starlight_destination: false,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-1.4272026519634762, 39.551050230154694],
      },
      properties: {
        name: 'Las Mercedes del Cabriel',
        address: 'CV-474, 2, 46317 Villargordo del Cabriel, Valencia',
        website: 'https://bodegalasmercedes.com/',
        do: 'Utiel-Requena',
        wine_tours: true,
        services: {
          pet_friendly: false,
          corporate_events: true,
          motorhome_parking: false,
          accommodation: true,
          ev_charging: false,
          restaurant: false,
        },
        tour_languages: ['Spanish', 'English'],
        children_activities: false,
        starlight_destination: false,
      },
    },
  ],
}
