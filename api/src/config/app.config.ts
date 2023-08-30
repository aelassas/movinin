import LocalizedStrings from 'localized-strings'

const LocalizedStringsDefault: typeof LocalizedStrings = 'default' in LocalizedStrings ? LocalizedStrings.default as typeof LocalizedStrings : LocalizedStrings

export default new LocalizedStringsDefault({
    fr: {
        LANG: 'french'
    },
    en: {
        LANG: 'english'
    }
})
