import LocalizedStrings from 'react-localization'
import * as LangHelper from '../common/LangHelper'

const strings = new LocalizedStrings({
  fr: {
    MONTHLY: 'Mensuel',
    WEEKLY: 'Hebdomadaire',
    DAILY: 'Journalier',
    YEARLY: 'Annuel',
    MONTH: 'mois',
    WEEK: 'semaine',
    DAY: 'jour',
    YEAR: 'an',
  },
  en: {
    MONTHLY: 'Monthly',
    WEEKLY: 'Weekly',
    DAILY: 'Daily',
    YEARLY: 'Yearly',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    YEAR: 'year',
  },
})

LangHelper.setLanguage(strings)
export { strings }
