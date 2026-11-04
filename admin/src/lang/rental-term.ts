import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

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
  de: {
    MONTHLY: 'Monatlich',
    WEEKLY: 'Wöchentlich',
    DAILY: 'Täglich',
    YEARLY: 'Jährlich',
    MONTH: 'Monat',
    WEEK: 'Woche',
    DAY: 'Tag',
    YEAR: 'Jahr',
  },
  es: {
    MONTHLY: 'Mensual',
    WEEKLY: 'Semanal',
    DAILY: 'Diario',
    YEARLY: 'Anual',
    MONTH: 'mes',
    WEEK: 'semana',
    DAY: 'día',
    YEAR: 'año',
  },
})

langHelper.setLanguage(strings)
export { strings }
