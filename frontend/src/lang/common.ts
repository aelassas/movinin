import LocalizedStrings from 'localized-strings'
import env from '@/config/env.config'
import * as langHelper from '@/utils/langHelper'
import * as PaymentService from '@/services/PaymentService'

const strings = new LocalizedStrings({
  fr: {
    GENERIC_ERROR: "Une erreur non gérée s'est produite.",
    CHANGE_LANGUAGE_ERROR: "Une erreur s'est produite lors du changement de langue.",
    UPDATED: 'Modifications effectuées avec succès.',
    GO_TO_HOME: "Aller à la page d'accueil",
    FULL_NAME: 'Nom complet',
    EMAIL: 'E-mail',
    PASSWORD: 'Mot de passe',
    EMAIL_ALREADY_REGISTERED: 'Cette adresse e-mail est déjà enregistrée.',
    CONFIRM_PASSWORD: 'Confirmer le mot de passe',
    PHONE: 'Téléphone',
    LOCATION: 'Localisation',
    BIO: 'Bio',
    IMAGE_REQUIRED: 'Veuillez ajouter une image.',
    LOADING: 'Chargement...',
    PLEASE_WAIT: 'Veuillez patienter...',
    SEARCH: 'Rechercher',
    SEARCH_PLACEHOLDER: 'Rechercher...',
    CONFIRM_TITLE: 'Confirmation',
    PASSWORD_ERROR: 'Le mot de passe doit contenir au moins 6 caractères.',
    PASSWORDS_DONT_MATCH: 'Les mots de passe ne correspondent pas.',
    CREATE: 'Créer',
    UPDATE: 'Modifier',
    DELETE: 'Supprimer',
    SAVE: 'Sauvegarder',
    CANCEL: 'Annuler',
    RESET_PASSWORD: 'Changer le mot de passe',
    CURRENCY: PaymentService.getCurrencySymbol(),
    DELETE_AVATAR_CONFIRM: 'Êtes-vous sûr de vouloir supprimer la photo ?',
    DELETE_IMAGE: "Supprimer l'image",
    UPLOAD_IMAGE: 'Charger une image',
    UNCHECK_ALL: 'Décocher tout',
    CHECK_ALL: 'Cocher tout',
    CLOSE: 'Fermer',
    BOOKING_STATUS_VOID: 'Vide',
    BOOKING_STATUS_PENDING: 'En cours',
    BOOKING_STATUS_DEPOSIT: 'Acompte',
    BOOKING_STATUS_PAID: 'Payée',
    BOOKING_STATUS_RESERVED: 'Réservée',
    BOOKING_STATUS_CANCELLED: 'Annulée',
    FROM: 'Du',
    TO: 'Au',
    OPTIONAL: 'Paramètres optionnels',
    AND: 'et',
    TYPE: 'Type',
    CONFIRM: 'Confirmer',
    USER: 'Utilisateur',
    INFO: 'Information',
    USER_TYPE_REQUIRED: 'Veuillez renseigner le champ : Type',
    FIX_ERRORS: 'Veuillez corriger les erreurs.',
    SEND_MESSAGE: 'Envoyer un message',
    VERIFIED: 'Compte vérifié',
    PROPERTY: 'propriété',
    RESEND_ACTIVATION_LINK: "Renvoyer le lien d'activation du compte",
    ACTIVATION_EMAIL_SENT: "E-mail d'activation envoyé.",
    EMAIL_NOT_VALID: 'E-mail non valide',
    PHONE_NOT_VALID: 'Numéro de téléphone non valide',
    ALL: 'Tous',
    TOS: "J'ai lu et j'accepte les conditions générales d'utilisation.",
    BIRTH_DATE: 'Date de naissance',
    RECAPTCHA_ERROR: 'Erreur reCAPTCHA',
    TOS_ERROR: "Veuillez accepter les conditions générales d'utilisation.",
    BIRTH_DATE_NOT_VALID: `Vous devez avoir au moins ${env.MINIMUM_AGE} ans.`,
    BIRTH_DATE_NOT_VALID_PART1: 'Le conducteur doit avoir au moins',
    BIRTH_DATE_NOT_VALID_PART2: 'ans.',
    AGENCY: 'Agence',
    STATUS: 'Statut',
    OPTIONS: 'Options',
    VIEW: 'Consulter',
    OF: 'sur',
    OR: 'ou',
    BACK: 'Précédant',
    NEXT: 'Suivant',
    LOCATION_TERM: 'Lieu / terme',
  },
  en: {
    GENERIC_ERROR: 'An unhandled error occurred.',
    CHANGE_LANGUAGE_ERROR: 'An error occurred while changing language.',
    UPDATED: 'Changes made successfully.',
    GO_TO_HOME: 'Go to the home page',
    FULL_NAME: 'Full name',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    EMAIL_ALREADY_REGISTERED: 'This email address is already registered.',
    CONFIRM_PASSWORD: 'Confirm Password',
    PHONE: 'Phone',
    LOCATION: 'Location',
    BIO: 'Bio',
    IMAGE_REQUIRED: 'Please add an image.',
    LOADING: 'Loading...',
    PLEASE_WAIT: 'Please wait...',
    SEARCH: 'Search',
    SEARCH_PLACEHOLDER: 'Search...',
    CONFIRM_TITLE: 'Confirmation',
    PASSWORD_ERROR: 'Password must be at least 6 characters long.',
    PASSWORDS_DONT_MATCH: "Passwords don't match.",
    CREATE: 'Create',
    UPDATE: 'Edit',
    DELETE: 'Delete',
    SAVE: 'Save',
    CANCEL: 'Cancel',
    RESET_PASSWORD: 'Change Password',
    CURRENCY: PaymentService.getCurrencySymbol(),
    DELETE_AVATAR_CONFIRM: 'Are you sure you want to delete the picture?',
    UPLOAD_IMAGE: 'Upload image',
    DELETE_IMAGE: 'Delete image',
    UNCHECK_ALL: 'Uncheck all',
    CHECK_ALL: 'Check all',
    CLOSE: 'Close',
    BOOKING_STATUS_VOID: 'Void',
    BOOKING_STATUS_PENDING: 'Pending',
    BOOKING_STATUS_DEPOSIT: 'Deposit',
    BOOKING_STATUS_PAID: 'Paid',
    BOOKING_STATUS_RESERVED: 'Reserved',
    BOOKING_STATUS_CANCELLED: 'Cancelled',
    FROM: 'From',
    TO: 'To',
    OPTIONAL: 'Optional Parameters',
    AND: 'and',
    TYPE: 'Type',
    CONFIRM: 'Confirm',
    USER: 'User',
    INFO: 'Information',
    USER_TYPE_REQUIRED: 'Please fill in the field: Type',
    FIX_ERRORS: 'Please fix errors.',
    SEND_MESSAGE: 'Send a message',
    VERIFIED: 'Verified account',
    PROPERTY: 'property',
    RESEND_ACTIVATION_LINK: 'Resend account activation link',
    ACTIVATION_EMAIL_SENT: 'Activation email sent.',
    EMAIL_NOT_VALID: 'Invalid email address',
    PHONE_NOT_VALID: 'Invalid phone number',
    ALL: 'All',
    TOS: 'I read and agree with the Terms of Use.',
    BIRTH_DATE: 'Birth date',
    RECAPTCHA_ERROR: 'reCAPTCHA error',
    TOS_ERROR: 'Please accept the Terms of Use.',
    BIRTH_DATE_NOT_VALID: `You must be at least ${env.MINIMUM_AGE} years old.`,
    BIRTH_DATE_NOT_VALID_PART1: 'The renter must be at least',
    BIRTH_DATE_NOT_VALID_PART2: 'years old.',
    AGENCY: 'Agency',
    STATUS: 'Status',
    OPTIONS: 'Options',
    VIEW: 'View',
    OF: 'of',
    OR: 'or',
    BACK: 'Back',
    NEXT: 'Next',
    LOCATION_TERM: 'Location / term',
  },
})

langHelper.setLanguage(strings)
export { strings }
