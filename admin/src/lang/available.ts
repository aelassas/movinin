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
    },
    es: {
        AVAILABLE: 'Disponible',
        AVAILABLE_INFO: 'Esta propiedad está disponible.',
        UNAVAILABLE: 'No disponible',
        UNAVAILABLE_INFO: 'Esta propiedad no está disponible.',
    },
    pt: {
        AVAILABLE: 'Disponível',
        AVAILABLE_INFO: 'Esta propriedade está disponível.',
        UNAVAILABLE: 'Indisponível',
        UNAVAILABLE_INFO: 'Esta propriedade está indisponível.',
    },
    it: {
        AVAILABLE: 'Disponibile',
        AVAILABLE_INFO: 'Questo immobile è disponibile.',
        UNAVAILABLE: 'Non disponibile',
        UNAVAILABLE_INFO: 'Questo immobile non è disponibile.',
    },
    zh: {
        AVAILABLE: '可租',
        AVAILABLE_INFO: '此房产可供出租。',
        UNAVAILABLE: '不可租',
        UNAVAILABLE_INFO: '此房产暂不可出租。',
    },
    ja: {
        AVAILABLE: '空室あり',
        AVAILABLE_INFO: 'この物件は利用可能です。',
        UNAVAILABLE: '空室なし',
        UNAVAILABLE_INFO: 'この物件は利用できません。',
    },
})

langHelper.setLanguage(strings)
export { strings }
