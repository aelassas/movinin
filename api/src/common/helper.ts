export const StringToBoolean = (input: string): boolean | undefined => {
    try {
        return Boolean(JSON.parse(input.toLocaleLowerCase()))
    } catch (e) {
        return undefined
    }
}
