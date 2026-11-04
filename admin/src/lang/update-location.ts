import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UPDATE_LOCATION: 'Modification du lieu',
    LOCATION_UPDATED: 'Lieu modifié avec succès.',
  },
  en: {
    UPDATE_LOCATION: 'Location update',
    LOCATION_UPDATED: 'Location updated successfully.',
  },
  de: {
    UPDATE_LOCATION: 'Standort aktualisieren',
    LOCATION_UPDATED: 'Standort erfolgreich aktualisiert.',
  },
  es: {
    UPDATE_LOCATION: 'Actualización de la ubicación',
    LOCATION_UPDATED: 'Ubicación actualizada correctamente.',
  },
})

langHelper.setLanguage(strings)
export { strings }
