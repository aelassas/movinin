import LocalizedStrings from 'react-localization'
import Env from '../config/env.config'
import * as LangHelper from '../common/LangHelper'

const strings = new LocalizedStrings({
  fr: {
    CREATE_AGENCY_HEADING: 'Nouelle agence',
    INVALID_AGENCY_NAME: 'Cette agence existe déjà.',
    AGENCY_IMAGE_SIZE_ERROR: `L'image doit être au format ${Env.AGENCY_IMAGE_WIDTH}x${Env.AGENCY_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Taille d'image recommandée : ${Env.AGENCY_IMAGE_WIDTH}x${Env.AGENCY_IMAGE_HEIGHT}`,
  },
  en: {
    CREATE_AGENCY_HEADING: 'New agency',
    INVALID_AGENCY_NAME: 'This agency already exists.',
    AGENCY_IMAGE_SIZE_ERROR: `The image must be in the format ${Env.AGENCY_IMAGE_WIDTH}x${Env.AGENCY_IMAGE_HEIGHT}`,
    RECOMMENDED_IMAGE_SIZE: `Recommended image size: ${Env.AGENCY_IMAGE_WIDTH}x${Env.AGENCY_IMAGE_HEIGHT}`,
  },
})

LangHelper.setLanguage(strings)
export { strings }
