import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const COPYRIGHT_PART1 = `Copyright © ${new Date().getFullYear()} ${env.WEBSITE_NAME}`

const strings = new LocalizedStrings({
  fr: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Tous droits réservés.',

    CORPORATE: 'À Propos',
    ABOUT: 'À propos de Nous',
    TOS: "Conditions d'utilisation",
    RENT: 'Louer une Propriété',
    AGENCIES: 'Agences',
    LOCATIONS: 'Destinations',
    SUPPORT: 'Support',
    CONTACT: 'Contact',
    SECURE_PAYMENT: `Paiement 100% sécurisé avec ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Politique de Confidentialité',
    COOKIE_POLICY: 'Politique de cookies',
  },
  en: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. All rights reserved.',

    CORPORATE: 'Corporate',
    ABOUT: 'About Us',
    TOS: 'Terms of Service',
    RENT: 'Rent a Property',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Destinations',
    SUPPORT: 'Support',
    CONTACT: 'Contact',
    SECURE_PAYMENT: `100% secure payment with ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Privacy Policy',
    COOKIE_POLICY: 'Cookie Policy',
  },
  de: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Alle Rechte vorbehalten.',

    CORPORATE: 'Unternehmen',
    ABOUT: 'Über uns',
    TOS: 'Nutzungsbedingungen',
    RENT: 'Immobilie mieten',
    AGENCIES: 'Agenturen',
    LOCATIONS: 'Reiseziele',
    SUPPORT: 'Support',
    CONTACT: 'Kontakt',
    SECURE_PAYMENT: `100 % sichere Zahlung mit ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Datenschutzerklärung',
    COOKIE_POLICY: 'Cookie-Richtlinie',
  },
  es: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Todos los derechos reservados.',

    CORPORATE: 'Empresa',
    ABOUT: 'Sobre nosotros',
    TOS: 'Términos de servicio',
    RENT: 'Alquilar una propiedad',
    AGENCIES: 'Agencias',
    LOCATIONS: 'Destinos',
    SUPPORT: 'Soporte',
    CONTACT: 'Contacto',
    SECURE_PAYMENT: `Pago 100 % seguro con ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Política de privacidad',
    COOKIE_POLICY: 'Política de cookies',
  },
  pt: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Todos os direitos reservados.',

    CORPORATE: 'Empresa',
    ABOUT: 'Sobre Nós',
    TOS: 'Termos de Serviço',
    RENT: 'Alugar uma Propriedade',
    AGENCIES: 'Agências',
    LOCATIONS: 'Destinos',
    SUPPORT: 'Suporte',
    CONTACT: 'Contacto',
    SECURE_PAYMENT: `Pagamento 100% seguro com ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Política de Privacidade',
    COOKIE_POLICY: 'Política de Cookies',
  },
  it: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Tutti i diritti riservati.',

    CORPORATE: 'Azienda',
    ABOUT: 'Chi siamo',
    TOS: 'Termini di servizio',
    RENT: 'Affitta un immobile',
    AGENCIES: 'Agenzie',
    LOCATIONS: 'Destinazioni',
    SUPPORT: 'Assistenza',
    CONTACT: 'Contatti',
    SECURE_PAYMENT: `Pagamento sicuro al 100% con ${env.WEBSITE_NAME}`,
    PRIVACY_POLICY: 'Informativa sulla privacy',
    COOKIE_POLICY: 'Informativa sui cookie',
  },
  zh: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '。保留所有权利。',

    CORPORATE: '公司',
    ABOUT: '关于我们',
    TOS: '服务条款',
    RENT: '租赁房产',
    AGENCIES: '中介机构',
    LOCATIONS: '目的地',
    SUPPORT: '支持',
    CONTACT: '联系我们',
    SECURE_PAYMENT: `${env.WEBSITE_NAME} 100% 安全支付`,
    PRIVACY_POLICY: '隐私政策',
    COOKIE_POLICY: 'Cookie 政策',
  },
  ja: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '。無断転載を禁じます。',

    CORPORATE: '企業情報',
    ABOUT: '会社概要',
    TOS: '利用規約',
    RENT: '物件を借りる',
    AGENCIES: '不動産会社',
    LOCATIONS: '目的地',
    SUPPORT: 'サポート',
    CONTACT: 'お問い合わせ',
    SECURE_PAYMENT: `${env.WEBSITE_NAME}なら100%安全なお支払い`,
    PRIVACY_POLICY: 'プライバシーポリシー',
    COOKIE_POLICY: 'Cookieポリシー',
  },
})

langHelper.setLanguage(strings)
export { strings }
