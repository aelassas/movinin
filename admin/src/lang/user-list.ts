import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    DELETE_USER: 'Êtes-vous sûr de vouloir supprimer cet utilisateur et toutes ses données ?',
    DELETE_USERS: 'Êtes-vous sûr de vouloir supprimer les utilisateurs sélectionnés et toutes leurs données ?',
    DELETE_SELECTION: 'Supprimer les utilisateurs sélectionnés',
    BLACKLIST: 'Ajouter à la liste noire',
  },
  en: {
    DELETE_USER: 'Are you sure you want to delete this user and all his data?',
    DELETE_USERS: 'Are you sure you want to delete the selected users and all their data?',
    DELETE_SELECTION: 'Delete selectied users',
    BLACKLIST: 'Add to the blacklist',
  },
  de: {
    DELETE_USER: 'Sind Sie sicher, dass Sie diesen Benutzer und alle seine Daten löschen möchten?',
    DELETE_USERS: 'Sind Sie sicher, dass Sie die ausgewählten Benutzer und alle ihre Daten löschen möchten?',
    DELETE_SELECTION: 'Ausgewählte Benutzer löschen',
    BLACKLIST: 'Zur Sperrliste hinzufügen',
  },
})

langHelper.setLanguage(strings)
export { strings }
