import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

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
  de: {
    NEW_AGENCY: 'Neue Agentur',
    AGENCY: 'Agentur',
    AGENCIES: 'Agenturen',
  },
  es: {
    NEW_AGENCY: 'Nueva agencia',
    AGENCY: 'agencia',
    AGENCIES: 'agencias',
  },
  pt: {
    NEW_AGENCY: 'Nova agência',
    AGENCY: 'agência',
    AGENCIES: 'agências',
  },
})

langHelper.setLanguage(strings)
export { strings }
