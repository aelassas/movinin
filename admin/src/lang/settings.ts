import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SETTINGS_UPDATED: 'Paramètres modifiés avec succès.',
    NETWORK_SETTINGS: 'Paramètres Réseau',
    SETTINGS_EMAIL_NOTIFICATIONS: 'Activer les notifications par email',
  },
  en: {
    SETTINGS_UPDATED: 'Settings updated successfully.',
    NETWORK_SETTINGS: 'Network settings',
    SETTINGS_EMAIL_NOTIFICATIONS: 'Enable email notifications',
  },
  de: {
    SETTINGS_UPDATED: 'Einstellungen erfolgreich aktualisiert.',
    NETWORK_SETTINGS: 'Netzwerkeinstellungen',
    SETTINGS_EMAIL_NOTIFICATIONS: 'E-Mail-Benachrichtigungen aktivieren',
  },
  es: {
    SETTINGS_UPDATED: 'Ajustes actualizados correctamente.',
    NETWORK_SETTINGS: 'Ajustes de red',
    SETTINGS_EMAIL_NOTIFICATIONS: 'Activar las notificaciones por correo electrónico',
  },
})

langHelper.setLanguage(strings)
export { strings }
