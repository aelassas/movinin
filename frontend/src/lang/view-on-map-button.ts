import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    VIEW_ON_MAP: 'Voir sur la carte',
  },
  en: {
    VIEW_ON_MAP: 'View on map',
  },
  de: {
    VIEW_ON_MAP: 'Auf der Karte ansehen',
  },
  es: {
    VIEW_ON_MAP: 'Ver en el mapa',
  },
  pt: {
    VIEW_ON_MAP: 'Ver no mapa',
  },
  it: {
    VIEW_ON_MAP: 'Visualizza sulla mappa',
  },
  zh: {
    VIEW_ON_MAP: '在地图上查看',
  },
  ja: {
    VIEW_ON_MAP: '地図で表示',
  },
})

langHelper.setLanguage(strings)
export { strings }
