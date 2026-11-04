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
  it: {
    NEW_AGENCY: 'Nuova agenzia',
    AGENCY: 'agenzia',
    AGENCIES: 'agenzie',
  },
  zh: {
    NEW_AGENCY: '新建中介机构',
    AGENCY: '中介机构',
    AGENCIES: '中介机构',
  },
  ja: {
    NEW_AGENCY: '新規代理店',
    AGENCY: '代理店',
    AGENCIES: '代理店',
  },
})

langHelper.setLanguage(strings)
export { strings }
