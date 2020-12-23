export const isBase64 = (value: string): boolean => {
    return (
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
    ).test(value);
}
