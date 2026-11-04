This guide explains which languages Movin' In supports and how to add support for a new language across all parts of the application: Backend, Admin Panel, Frontend, and Mobile App.

> [!NOTE]
> All language codes must follow the [ISO 639-1 standard](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g., `en` for English, `fr` for French, `de` for German, `es` for Spanish).

## Supported Languages

Movin' In comes with built-in support for the following languages:

| Language | Code | Label |
|----------|------|-------|
| English  | `en` | English  |
| French   | `fr` | Français |
| German   | `de` | Deutsch  |
| Spanish  | `es` | Español  |

English is the default language (`DEFAULT_LANGUAGE`, configurable with `VITE_MI_DEFAULT_LANGUAGE` in the Admin Panel and Frontend). The Mobile App uses the device language when it is supported, otherwise the default language.

To add a new language, follow the instructions below. Use an existing language (for example `de`) as a reference: the new language must define **exactly the same translation keys** as English.

> [!TIP]
> In the examples below, replace `<code>` with your ISO 639-1 code (e.g., `es`).

### Backend
1. Add the new language [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) to the `LANGUAGES` setting in `backend/src/config/env.config.ts`.
2. Create a new file *<code>.ts* in the `backend/src/lang` folder (copy `en.ts` and translate the values) and export your translations from it.
3. Import and register your translations in `backend/src/lang/i18n.ts`.
4. To format dates in booking confirmation emails in the user's language, map the language code to a locale (e.g., `de` → `de-DE`) in the `confirm` function of `backend/src/controllers/bookingController.ts`.

> [!NOTE]
> Location and country names are stored per language in the database. Missing values for a newly supported language are created automatically from the existing ones at startup.

### Admin Panel
1. Add the new language [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and its label in the `LANGUAGES` setting in `admin/src/config/env.config.ts`:
   ```ts
   { code: '<code>', label: '<Language name>' }
   ```
2. Add a `<code>: { ... }` block next to the `en` and `fr` blocks in every file of `admin/src/lang/*.ts` (including `tos.ts`).
3. Add the date and UI component locales:
   * `admin/src/utils/dateLocale.ts`: return the [date-fns locale](https://date-fns.org/docs/I18n) of the new language in `getDateLocale`.
   * `admin/src/main.tsx`: add the MUI locales (`@mui/material/locale`, `@mui/x-date-pickers/locales` and `@mui/x-data-grid/locales`) of the new language, e.g. `deDE`.
   * `admin/src/components/PropertyScheduler.tsx`: add the scheduler labels in `getTranslations`.

### Frontend
1. Add the new language [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), its country code (used for the flag) and its label in the `LANGUAGES` setting in `frontend/src/config/env.config.ts`:
   ```ts
   { code: '<code>', countryCode: '<country code>', label: '<Language name>' }
   ```
2. Add a `<code>: { ... }` block next to the `en` and `fr` blocks in every file of `frontend/src/lang/*.ts` (including `tos.ts`, `privacy.ts` and `cookie-policy.ts`).
3. Add the date, UI component and payment locales:
   * `frontend/src/utils/dateLocale.ts`: return the date-fns locale of the new language in `getDateLocale`.
   * `frontend/src/main.tsx`: add the MUI locales of the new language. If `VITE_MI_SET_LANGUAGE_FROM_IP` is enabled, you can also map countries to the new language (e.g., `['DE', 'AT', 'CH']` → `de`).
   * `frontend/src/services/PayPalService.ts`: map the new language to a PayPal locale in `getLocale` (e.g., `de` → `de_DE`).

### Mobile App
1. Add the new language [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and its label in the `LANGUAGES` constant in `mobile/config/env.config.ts`.
2. Create a new file *<code>.ts* in the `mobile/lang` folder (copy `en.ts` and translate the values) and export your translations from it.
3. Import and register your translations in `mobile/lang/i18n.ts`.
4. Add the language code to `supportedLanguages` in `getDefaultLanguage` in `mobile/services/UserService.ts`, so that it is selected automatically when it matches the device language.
5. Add the date locales:
   * `mobile/utils/dateLocale.ts`: return the date-fns locale of the new language in `getDateLocale`.
   * `mobile/components/DateTimePicker.tsx` uses `getDateLocale`, so no change is needed there.

### Plurals and Grammar
Some labels are built in code and not only in translation files:
* Counts such as days, bedrooms, bathrooms, kitchens and parking spaces append a suffix to the singular word: `s` by default, `e` or `n` for German. If your language needs another rule, update `getPluralSuffix` in `admin/src/utils/helper.ts` and `frontend/src/utils/helper.ts`, and `getDaysPluralSuffix` in `mobile/utils/helper.ts`.
* Bedroom, bathroom and parking space tooltips use the `*_TOOLTIP_1` (singular) and `*_TOOLTIP_2` (plural) keys for French, German and Spanish. For these languages, make sure both keys are translated.
* French-specific punctuation and agreement (e.g., ` : ` and `Incluse`) are handled by `isFrench` in `packages/movinin-helper/index.ts`. Other languages use the default English rules.

### Check Your Changes
1. Make sure the new language defines the same translation keys as English in every file.
2. Check the types and lint in each project:
   ```
   cd backend && npm run lint && npx tsc --noEmit
   cd admin && npm run lint && npx tsc --noEmit
   cd frontend && npm run lint && npx tsc --noEmit
   cd mobile && npm run lint && npx tsc --noEmit
   ```
3. Run the backend language test `backend/__tests__/lang.test.ts`, which checks that all backend languages have the same keys. Add your language to it.
4. Start the apps, switch to the new language and check dates, pickers, tooltips and emails.

> [!CAUTION]
> If you use machine translation, have the legal pages (Terms of Service, Privacy Policy and Cookie Policy) reviewed before going to production.
