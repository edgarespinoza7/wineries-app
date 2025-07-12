// src/collections/Wineries.ts

import { CollectionConfig } from 'payload'

export const Wineries: CollectionConfig = {
  // The 'slug' is used to build the API endpoint and for database table naming
  slug: 'wineries',

  // This helps identify documents in the admin panel
  admin: {
    useAsTitle: 'name',
  },

  // Here we define the fields for our collection
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Winery Name',
    },
    {
      name: 'location',
      type: 'point', // Payload's GeoJSON field for [longitude, latitude]
      label: 'Coordinates',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      required: true,
    },
    {
      name: 'website',
      type: 'text', // Using text for flexibility, but 'url' is also an option
      label: 'Website URL',
      required: true,
    },
    {
      name: 'do',
      type: 'text',
      label: 'Denominación de Origen',
      required: true,
    },
    {
      name: 'wine_tours',
      type: 'checkbox',
      label: 'Offers Wine Tours?',
      defaultValue: false,
    },
    {
      name: 'tour_languages',
      type: 'select',
      label: 'Tour Languages',
      hasMany: true, // Allows selecting multiple languages
      options: [
        { label: 'Spanish', value: 'spanish' },
        { label: 'English', value: 'english' },
        { label: 'Valencian', value: 'valencian' },
        { label: 'French', value: 'french' },
        { label: 'German', value: 'german' },
        { label: 'Russian', value: 'russian' },
      ],
    },
    {
      name: 'children_activities',
      type: 'checkbox',
      label: 'Offers Activities for Children?',
      defaultValue: false,
    },
    {
      name: 'starlight_destination',
      type: 'checkbox',
      label: 'Is a Starlight Destination?',
      defaultValue: false,
    },
    {
      name: 'services',
      type: 'group', // 'group' is perfect for nesting related fields
      label: 'On-site Services',
      fields: [
        { name: 'pet_friendly', type: 'checkbox', label: 'Pet Friendly' },
        { name: 'corporate_events', type: 'checkbox', label: 'Corporate Events' },
        { name: 'motorhome_parking', type: 'checkbox', label: 'Parking for Mobile Homes' },
        { name: 'accommodation', type: 'checkbox', label: 'On-site Accommodation' },
        { name: 'ev_charging', type: 'checkbox', label: 'EV Charging Station' },
        { name: 'restaurant', type: 'checkbox', label: 'On-site Restaurant' },
      ],
    },
  ],
}
