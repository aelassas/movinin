import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_BOOKING: 'Nouvelle réservation',
  },
  en: {
    NEW_BOOKING: 'New Booking',
  },
  de: {
    NEW_BOOKING: 'Neue Buchung',
  },
  es: {
    NEW_BOOKING: 'Nueva reserva',
  },
  pt: {
    NEW_BOOKING: 'Nova Reserva',
  },
})

langHelper.setLanguage(strings)
export { strings }
