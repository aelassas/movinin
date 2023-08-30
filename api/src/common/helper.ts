export function StringToBoolean(input: string): boolean {
    try {
        return Boolean(JSON.parse(input.toLocaleLowerCase()))
    } catch {
        return false
    }
}
