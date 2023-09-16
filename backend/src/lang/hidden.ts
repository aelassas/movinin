import LocalizedStrings from 'react-localization'
import * as LangHelper from '../common/LangHelper'

const strings = new LocalizedStrings({
    fr: {
        HIDDEN: 'Cachée',
        HIDDEN_INFO: 'Cette propriété est cachée.',
    },
    en: {
        HIDDEN: 'Hidden',
        HIDDEN_INFO: 'This property is hidden.',
    }
})

LangHelper.setLanguage(strings)
export { strings }
