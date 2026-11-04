import LocalizedStrings from 'localized-strings'
import env from '@/config/env.config'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    CREATE_AGENCY_HEADING: 'Nouelle agence',
    INVALID_AGENCY_NAME: 'Cette agence existe déjà.',
    AGENCY_IMAGE_SIZE_ERROR: `L'image doit être au format ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Taille d'image recommandée : ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
  },
  en: {
    CREATE_AGENCY_HEADING: 'New agency',
    INVALID_AGENCY_NAME: 'This agency already exists.',
    AGENCY_IMAGE_SIZE_ERROR: `The image must be in the format ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Recommended image size: ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
  },
  de: {
    CREATE_AGENCY_HEADING: 'Neue Agentur',
    INVALID_AGENCY_NAME: 'Diese Agentur existiert bereits.',
    AGENCY_IMAGE_SIZE_ERROR: `Das Bild muss das Format ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT} haben`,
    RECOMMENDED_IMAGE_SIZE: `Empfohlene Bildgröße: ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
  },
  es: {
    CREATE_AGENCY_HEADING: 'Nueva agencia',
    INVALID_AGENCY_NAME: 'Esta agencia ya existe.',
    AGENCY_IMAGE_SIZE_ERROR: `La imagen debe tener el formato ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Tamaño de imagen recomendado: ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
  },
  pt: {
    CREATE_AGENCY_HEADING: 'Nova agência',
    INVALID_AGENCY_NAME: 'Esta agência já existe.',
    AGENCY_IMAGE_SIZE_ERROR: `A imagem deve estar no formato ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Tamanho de imagem recomendado: ${env.AGENCY_IMAGE_WIDTH}x${env.AGENCY_IMAGE_HEIGHT}`,
  },
})

langHelper.setLanguage(strings)
export { strings }
