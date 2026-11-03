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
})

langHelper.setLanguage(strings)
export { strings }
