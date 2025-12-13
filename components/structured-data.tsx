import Script from 'next/script'

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tuinity AI',
    alternateName: 'Tuinity',
    url: 'https://tuinity.lat',
    description: 'Agencia líder de Inteligencia Artificial en Panamá. Automatiza tus ventas con agentes de IA conversacionales.',
    telephone: '+507-6346-9953',
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PA',
        addressLocality: 'Panamá',
      }
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+507-6346-9953',
      url: 'https://tuinity.lat/#contact',
      availableLanguage: ['Spanish', 'English']
    },
    sameAs: [
      'https://github.com/TuinityAI',
      'https://instagram.com/tuinity.lat',
      'https://www.tiktok.com/@tuinitylat',
      'https://www.linkedin.com/company/tuinity',
      'https://twitter.com/tuinity_lat',
      'https://facebook.com/tuinity.lat'
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '8.9936',
        longitude: '-79.5197'
      },
      geoRadius: '50000'
    },
    knowsAbout: [
      'Inteligencia Artificial',
      'Machine Learning',
      'Agentes Conversacionales',
      'Automatización',
      'Voice AI',
      'Chatbots',
      'NLP'
    ]
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Inteligencia Artificial',
    provider: {
      '@type': 'Organization',
      name: 'Tuinity AI',
      url: 'https://tuinity.lat'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Panama'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de IA',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tuinity Voice Agent',
            description: 'Agente de voz con IA para automatización de llamadas y atención al cliente',
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tuinity Chat Agent',
            description: 'Asistente conversacional inteligente para WhatsApp y múltiples plataformas',
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tuinity Broadcast',
            description: 'Sistema de difusión automatizada con segmentación inteligente',
          }
        }
      ]
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tuinity AI',
    url: 'https://tuinity.lat',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tuinity.lat/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Tuinity AI',
    '@id': 'https://tuinity.lat',
    url: 'https://tuinity.lat',
    telephone: '+507-6346-9953',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PA',
      addressLocality: 'Ciudad de Panamá',
      addressRegion: 'Panamá'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.9936,
      longitude: -79.5197
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://tuinity.lat'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Soluciones',
        item: 'https://tuinity.lat/#solutions'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Precios',
        item: 'https://tuinity.lat/#pricing'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contacto',
        item: 'https://tuinity.lat/#contact'
      }
    ]
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
