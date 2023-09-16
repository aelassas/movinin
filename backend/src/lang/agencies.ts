import LocalizedStrings from 'react-localization'
import * as LangHelper from '../common/LangHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_AGENCY: 'Nouvelle agence',
    AGENCY: 'agence',
    AGENCIES: 'agences',
  },
  en: {
    NEW_AGENCY: 'New agency',
    AGENCY: 'agency',
    AGENCIES: 'agencies',
  },
})

LangHelper.setLanguage(strings)
export { strings }
