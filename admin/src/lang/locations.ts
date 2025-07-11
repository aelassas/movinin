import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_LOCATION: 'Nouveau lieu',
    DELETE_LOCATION: 'Êtes-vous sûr de vouloir supprimer ce lieu ?',
    CANNOT_DELETE_LOCATION: 'Ce lieu ne peut pas être supprimé car il est lié à des lieux ou propriétés.',
    EMPTY_LIST: 'Pas de lieux.',
    LOCATION: 'lieu',
    LOCATIONS: 'lieux',
  },
  en: {
    NEW_LOCATION: 'New location',
    DELETE_LOCATION: 'Are you sure you want to delete this location?',
    CANNOT_DELETE_LOCATION: 'This location cannot be deleted because it is related to locations or properties.',
    EMPTY_LIST: 'No locations.',
    LOCATION: 'location',
    LOCATIONS: 'locations',
  },
})

langHelper.setLanguage(strings)
export { strings }
