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
  pt: {
    SETTINGS_UPDATED: 'Definições atualizadas com sucesso.',
    NETWORK_SETTINGS: 'Definições de rede',
    SETTINGS_EMAIL_NOTIFICATIONS: 'Ativar notificações por e-mail',
  },
  it: {
    SETTINGS_UPDATED: 'Impostazioni aggiornate con successo.',
    NETWORK_SETTINGS: 'Impostazioni di rete',
    SETTINGS_EMAIL_NOTIFICATIONS: 'Abilita le notifiche via email',
  },
  zh: {
    SETTINGS_UPDATED: '设置已成功更新。',
    NETWORK_SETTINGS: '网络设置',
    SETTINGS_EMAIL_NOTIFICATIONS: '启用邮件通知',
  },
  ja: {
    SETTINGS_UPDATED: '設定を更新しました。',
    NETWORK_SETTINGS: 'ネットワーク設定',
    SETTINGS_EMAIL_NOTIFICATIONS: 'メール通知を有効にする',
  },
})

langHelper.setLanguage(strings)
export { strings }
