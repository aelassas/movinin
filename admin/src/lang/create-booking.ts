import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_BOOKING_HEADING: 'Nouvelle réservation',
  },
  en: {
    NEW_BOOKING_HEADING: 'New booking',
  },
  de: {
    NEW_BOOKING_HEADING: 'Neue Buchung',
  },
  es: {
    NEW_BOOKING_HEADING: 'Nueva reserva',
  },
  pt: {
    NEW_BOOKING_HEADING: 'Nova reserva',
  },
})

langHelper.setLanguage(strings)
export { strings }
