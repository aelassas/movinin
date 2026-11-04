import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_LOCATION_HEADING: 'Nouveau lieu',
    LOCATION_NAME: 'Lieu',
    INVALID_LOCATION: 'Ce lieu existe déjà.',
    LOCATION_CREATED: 'Lieu créé avec succès.',
    COUNTRY: 'Pays',
    PARENT_LOCATION: 'Lieu Parent',
  },
  en: {
    NEW_LOCATION_HEADING: 'New location',
    LOCATION_NAME: 'Location',
    INVALID_LOCATION: 'This location already exists.',
    LOCATION_CREATED: 'Location created successfully.',
    COUNTRY: 'Country',
    PARENT_LOCATION: 'Parent Location',
  },
  de: {
    NEW_LOCATION_HEADING: 'Neuer Standort',
    LOCATION_NAME: 'Standort',
    INVALID_LOCATION: 'Dieser Standort existiert bereits.',
    LOCATION_CREATED: 'Standort erfolgreich erstellt.',
    COUNTRY: 'Land',
    PARENT_LOCATION: 'Übergeordneter Standort',
  },
  es: {
    NEW_LOCATION_HEADING: 'Nueva ubicación',
    LOCATION_NAME: 'Ubicación',
    INVALID_LOCATION: 'Esta ubicación ya existe.',
    LOCATION_CREATED: 'Ubicación creada correctamente.',
    COUNTRY: 'País',
    PARENT_LOCATION: 'Ubicación principal',
  },
  pt: {
    NEW_LOCATION_HEADING: 'Nova localização',
    LOCATION_NAME: 'Localização',
    INVALID_LOCATION: 'Esta localização já existe.',
    LOCATION_CREATED: 'Localização criada com sucesso.',
    COUNTRY: 'País',
    PARENT_LOCATION: 'Localização principal',
  },
  it: {
    NEW_LOCATION_HEADING: 'Nuova località',
    LOCATION_NAME: 'Località',
    INVALID_LOCATION: 'Questa località esiste già.',
    LOCATION_CREATED: 'Località creata con successo.',
    COUNTRY: 'Paese',
    PARENT_LOCATION: 'Località principale',
  },
  zh: {
    NEW_LOCATION_HEADING: '新建地点',
    LOCATION_NAME: '地点',
    INVALID_LOCATION: '此地点已存在。',
    LOCATION_CREATED: '地点创建成功。',
    COUNTRY: '国家',
    PARENT_LOCATION: '上级地点',
  },
  ja: {
    NEW_LOCATION_HEADING: '新規場所',
    LOCATION_NAME: '場所',
    INVALID_LOCATION: 'この場所はすでに存在します。',
    LOCATION_CREATED: '場所を作成しました。',
    COUNTRY: '国',
    PARENT_LOCATION: '親の場所',
  },
})

langHelper.setLanguage(strings)
export { strings }
