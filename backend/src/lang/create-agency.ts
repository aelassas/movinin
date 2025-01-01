import LocalizedStrings from 'localized-strings'
import env from '@/config/env.config'
import * as langHelper from '@/common/langHelper'

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
})

langHelper.setLanguage(strings)
export { strings }
