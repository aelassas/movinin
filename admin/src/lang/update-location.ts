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
  pt: {
    UPDATE_LOCATION: 'Atualização da localização',
    LOCATION_UPDATED: 'Localização atualizada com sucesso.',
  },
  it: {
    UPDATE_LOCATION: 'Aggiornamento località',
    LOCATION_UPDATED: 'Località aggiornata con successo.',
  },
  zh: {
    UPDATE_LOCATION: '更新地点',
    LOCATION_UPDATED: '地点已成功更新。',
  },
  ja: {
    UPDATE_LOCATION: '場所の更新',
    LOCATION_UPDATED: '場所を更新しました。',
  },
})

langHelper.setLanguage(strings)
export { strings }
