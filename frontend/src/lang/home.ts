import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    COVER: 'Rechercher des biens immobiliers',
    DESTINATIONS_TITLE: 'Parcourir par destinations',
    MAP_TITLE: 'Carte des destinations',
  },
  en: {
    COVER: 'Search for Real Estate, Property & Homes',
    DESTINATIONS_TITLE: 'Browse by Destinations',
    MAP_TITLE: 'Map of Destinations',
  },
})

langHelper.setLanguage(strings)
export { strings }
