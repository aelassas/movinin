import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
    fr: {
        AVAILABLE: 'Disponible',
        AVAILABLE_INFO: 'Cette propriété est disponible.',
        UNAVAILABLE: 'Indisponible',
        UNAVAILABLE_INFO: 'Cette propriété est indisponible.',
    },
    en: {
        AVAILABLE: 'Available',
        AVAILABLE_INFO: 'This property is available.',
        UNAVAILABLE: 'Unavailable',
        UNAVAILABLE_INFO: 'This property is unavailable.',
    },
    de: {
        AVAILABLE: 'Verfügbar',
        AVAILABLE_INFO: 'Diese Immobilie ist verfügbar.',
        UNAVAILABLE: 'Nicht verfügbar',
        UNAVAILABLE_INFO: 'Diese Immobilie ist nicht verfügbar.',
    }
})

langHelper.setLanguage(strings)
export { strings }
