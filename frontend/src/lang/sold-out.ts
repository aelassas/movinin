import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
    fr: {
        SOLD_OUT: 'Rupture',
        SOLD_OUT_INFO: 'Cette propriété est en rupture.',
    },
    en: {
        SOLD_OUT: 'Sold out',
        SOLD_OUT_INFO: 'This property is sold out.',
    },
    de: {
        SOLD_OUT: 'Ausverkauft',
        SOLD_OUT_INFO: 'Diese Immobilie ist ausverkauft.',
    },
    es: {
        SOLD_OUT: 'Agotada',
        SOLD_OUT_INFO: 'Esta propiedad está agotada.',
    },
    pt: {
        SOLD_OUT: 'Esgotada',
        SOLD_OUT_INFO: 'Esta propriedade está esgotada.',
    },
})

langHelper.setLanguage(strings)
export { strings }
