import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TOTAL: 'Total :',
    DELETE_BOOKING: 'Êtes-vous sûr de vouloir supprimer cette réservation ?',
  },
  en: {
    TOTAL: 'Total:',
    DELETE_BOOKING: 'Are you sure you want to delete this booking?',
  },
  de: {
    TOTAL: 'Gesamt:',
    DELETE_BOOKING: 'Sind Sie sicher, dass Sie diese Buchung löschen möchten?',
  },
  es: {
    TOTAL: 'Total:',
    DELETE_BOOKING: '¿Seguro que quieres eliminar esta reserva?',
  },
  pt: {
    TOTAL: 'Total:',
    DELETE_BOOKING: 'Tens a certeza de que queres eliminar esta reserva?',
  },
  it: {
    TOTAL: 'Totale:',
    DELETE_BOOKING: 'Sei sicuro di voler eliminare questa prenotazione?',
  },
  zh: {
    TOTAL: '总计：',
    DELETE_BOOKING: '确定要删除此预订吗？',
  },
  ja: {
    TOTAL: '合計：',
    DELETE_BOOKING: 'この予約を削除してもよろしいですか？',
  },
})

langHelper.setLanguage(strings)
export { strings }
