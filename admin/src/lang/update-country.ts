import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UPDATE_COUNTRY: 'Modification du pays',
    COUNTRY_UPDATED: 'Pays modifié avec succès.',
  },
  en: {
    UPDATE_COUNTRY: 'Country update',
    COUNTRY_UPDATED: 'Country updated successfully.',
  },
  de: {
    UPDATE_COUNTRY: 'Land aktualisieren',
    COUNTRY_UPDATED: 'Land erfolgreich aktualisiert.',
  },
  es: {
    UPDATE_COUNTRY: 'Actualización del país',
    COUNTRY_UPDATED: 'País actualizado correctamente.',
  },
  pt: {
    UPDATE_COUNTRY: 'Atualização do país',
    COUNTRY_UPDATED: 'País atualizado com sucesso.',
  },
  it: {
    UPDATE_COUNTRY: 'Aggiornamento paese',
    COUNTRY_UPDATED: 'Paese aggiornato con successo.',
  },
  zh: {
    UPDATE_COUNTRY: '更新国家/地区',
    COUNTRY_UPDATED: '国家/地区已成功更新。',
  },
  ja: {
    UPDATE_COUNTRY: '国の更新',
    COUNTRY_UPDATED: '国を更新しました。',
  },
})

langHelper.setLanguage(strings)
export { strings }
