import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
    fr: {
        HIDDEN: 'Cachée',
        HIDDEN_INFO: 'Cette propriété est cachée.',
    },
    en: {
        HIDDEN: 'Hidden',
        HIDDEN_INFO: 'This property is hidden.',
    },
    de: {
        HIDDEN: 'Ausgeblendet',
        HIDDEN_INFO: 'Diese Immobilie ist ausgeblendet.',
    },
    es: {
        HIDDEN: 'Oculta',
        HIDDEN_INFO: 'Esta propiedad está oculta.',
    },
    pt: {
        HIDDEN: 'Oculto',
        HIDDEN_INFO: 'Esta propriedade está oculta.',
    },
    it: {
        HIDDEN: 'Nascosto',
        HIDDEN_INFO: 'Questo immobile è nascosto.',
    },
    zh: {
        HIDDEN: '已隐藏',
        HIDDEN_INFO: '该房源已隐藏。',
    },
    ja: {
        HIDDEN: '非表示',
        HIDDEN_INFO: 'この物件は非表示です。',
    },
})

langHelper.setLanguage(strings)
export { strings }
