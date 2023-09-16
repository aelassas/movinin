import LocalizedStrings from 'react-localization'
import * as LangHelper from '../common/LangHelper'

const strings = new LocalizedStrings({
    fr: {
        SOLD_OUT: 'Rupture',
        SOLD_OUT_INFO: 'Cette propriété est en rupture.',
    },
    en: {
        SOLD_OUT: 'Sold out',
        SOLD_OUT_INFO: 'This property is sold out.',
    }
})

LangHelper.setLanguage(strings)
export { strings }
