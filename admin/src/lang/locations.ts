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
  de: {
    NEW_LOCATION: 'Neuer Standort',
    DELETE_LOCATION: 'Sind Sie sicher, dass Sie diesen Standort löschen möchten?',
    CANNOT_DELETE_LOCATION: 'Dieser Standort kann nicht gelöscht werden, da er mit Standorten oder Immobilien verknüpft ist.',
    EMPTY_LIST: 'Keine Standorte.',
    LOCATION: 'Standort',
    LOCATIONS: 'Standorte',
  },
  es: {
    NEW_LOCATION: 'Nueva ubicación',
    DELETE_LOCATION: '¿Seguro que quieres eliminar esta ubicación?',
    CANNOT_DELETE_LOCATION: 'No se puede eliminar esta ubicación porque está relacionada con ubicaciones o propiedades.',
    EMPTY_LIST: 'No hay ubicaciones.',
    LOCATION: 'ubicación',
    LOCATIONS: 'ubicaciones',
  },
  pt: {
    NEW_LOCATION: 'Nova localização',
    DELETE_LOCATION: 'Tens a certeza de que queres eliminar esta localização?',
    CANNOT_DELETE_LOCATION: 'Esta localização não pode ser eliminada porque está associada a localizações ou propriedades.',
    EMPTY_LIST: 'Sem localizações.',
    LOCATION: 'localização',
    LOCATIONS: 'localizações',
  },
  it: {
    NEW_LOCATION: 'Nuova località',
    DELETE_LOCATION: 'Sei sicuro di voler eliminare questa località?',
    CANNOT_DELETE_LOCATION: 'Questa località non può essere eliminata perché è collegata ad altre località o immobili.',
    EMPTY_LIST: 'Nessuna località.',
    LOCATION: 'località',
    LOCATIONS: 'località',
  },
  zh: {
    NEW_LOCATION: '新建地点',
    DELETE_LOCATION: '确定要删除此地点吗？',
    CANNOT_DELETE_LOCATION: '该地点已关联其他地点或房源，无法删除。',
    EMPTY_LIST: '暂无地点。',
    LOCATION: '地点',
    LOCATIONS: '地点',
  },
  ja: {
    NEW_LOCATION: '新しい場所',
    DELETE_LOCATION: 'この場所を削除してもよろしいですか？',
    CANNOT_DELETE_LOCATION: 'この場所は他の場所または物件に関連付けられているため、削除できません。',
    EMPTY_LIST: '場所がありません。',
    LOCATION: '場所',
    LOCATIONS: '場所',
  },
})

langHelper.setLanguage(strings)
export { strings }
