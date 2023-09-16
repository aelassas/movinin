import LocalizedStrings from 'react-localization'
import * as LangHelper from '../common/LangHelper'

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
    }
})

LangHelper.setLanguage(strings)
export { strings }
