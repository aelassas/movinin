import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    REQUIRED_FIELD: 'Veuillez renseigner le champ : ',
    REQUIRED_FIELDS: 'Veuillez renseigner les champs : ',
  },
  en: {
    REQUIRED_FIELD: 'Please fill in the field: ',
    REQUIRED_FIELDS: 'Please fill in the fields: ',
  },
  de: {
    REQUIRED_FIELD: 'Bitte füllen Sie das Feld aus: ',
    REQUIRED_FIELDS: 'Bitte füllen Sie die Felder aus: ',
  },
  es: {
    REQUIRED_FIELD: 'Por favor, rellene el campo: ',
    REQUIRED_FIELDS: 'Por favor, rellene los campos: ',
  },
  pt: {
    REQUIRED_FIELD: 'Preencha o campo: ',
    REQUIRED_FIELDS: 'Preencha os campos: ',
  },
  it: {
    REQUIRED_FIELD: 'Compili il campo: ',
    REQUIRED_FIELDS: 'Compili i campi: ',
  },
  zh: {
    REQUIRED_FIELD: '请填写以下字段：',
    REQUIRED_FIELDS: '请填写以下字段：',
  },
  ja: {
    REQUIRED_FIELD: '次の項目を入力してください：',
    REQUIRED_FIELDS: '次の項目を入力してください：',
  },
})

langHelper.setLanguage(strings)
export { strings }
