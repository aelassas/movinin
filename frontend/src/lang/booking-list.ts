import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    PROPERTY: 'Propriété',
    AGENCY: 'Agence',
    PRICE: 'Prix',
    STATUS: 'Statut',
    EMPTY_LIST: 'Pas de réservations.',
    VIEW: 'Voir cette réservation',
    DAYS: 'Jours',
    COST: 'Total',
    CANCEL: 'Annuler cette réservation',
    CANCEL_BOOKING: 'Êtes-vous sûr de vouloir annuler cette réservation ?',
    CANCEL_BOOKING_REQUEST_SENT: "Votre requête d'annulation a bien été prise en compte. Nous vous contacterons pour finaliser la procédure d'annulation.",
  },
  en: {
    PROPERTY: 'Property',
    AGENCY: 'Agency',
    PRICE: 'Price',
    STATUS: 'Status',
    EMPTY_LIST: 'No bookings.',
    VIEW: 'View this booking',
    DAYS: 'Days',
    COST: 'COST',
    CANCEL: 'Cancel this booking',
    CANCEL_BOOKING: 'Are you sure you want to cancel this booking?',
    CANCEL_BOOKING_REQUEST_SENT: 'Your cancel request has been submited. We will contact you to finalize the cancellation procedure.',
  },
      de: {
        PROPERTY: 'Immobilie',
        AGENCY: 'Agentur',
        PRICE: 'Preis',
        STATUS: 'Status',
        EMPTY_LIST: 'Keine Buchungen.',
        VIEW: 'Diese Buchung ansehen',
        DAYS: 'Tage',
        COST: 'GESAMT',
        CANCEL: 'Diese Buchung stornieren',
        CANCEL_BOOKING: 'Sind Sie sicher, dass Sie diese Buchung stornieren möchten?',
        CANCEL_BOOKING_REQUEST_SENT: 'Ihre Stornierungsanfrage wurde übermittelt. Wir werden uns mit Ihnen in Verbindung setzen, um das Stornierungsverfahren abzuschließen.',
      },
      es: {
        PROPERTY: 'Propiedad',
        AGENCY: 'Agencia',
        PRICE: 'Precio',
        STATUS: 'Estado',
        EMPTY_LIST: 'No hay reservas.',
        VIEW: 'Ver esta reserva',
        DAYS: 'Días',
        COST: 'TOTAL',
        CANCEL: 'Cancelar esta reserva',
        CANCEL_BOOKING: '¿Está seguro de que desea cancelar esta reserva?',
        CANCEL_BOOKING_REQUEST_SENT: 'Su solicitud de cancelación ha sido enviada. Nos pondremos en contacto con usted para finalizar el procedimiento de cancelación.',
      },
    })

langHelper.setLanguage(strings)
export { strings }
