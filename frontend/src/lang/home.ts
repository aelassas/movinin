import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TITLE: "Bienvenue sur l'immobilier",
    COVER: 'Rechercher des biens immobiliers',
    DESTINATIONS_TITLE: 'Parcourir par destinations',
    MAP_TITLE: 'Carte des destinations',
  },
  en: {
    TITLE: 'Welcome to Real Estate',
    COVER: 'Search for Real Estate, Property & Homes',
    DESTINATIONS_TITLE: 'Browse by Destinations',
    MAP_TITLE: 'Map of Destinations',
  },
})

langHelper.setLanguage(strings)
export { strings }
