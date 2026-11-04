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
        SOLD_OUT: 'Esgotado',
        SOLD_OUT_INFO: 'Esta propriedade está esgotada.',
    },
    it: {
        SOLD_OUT: 'Venduto',
        SOLD_OUT_INFO: 'Questo immobile è stato venduto.',
    },
    zh: {
        SOLD_OUT: '已售出',
        SOLD_OUT_INFO: '该房源已售出。',
    },
    ja: {
        SOLD_OUT: '売却済み',
        SOLD_OUT_INFO: 'この物件は売却済みです。',
    },
})

langHelper.setLanguage(strings)
export { strings }
