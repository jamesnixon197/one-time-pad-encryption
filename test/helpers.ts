export const buildRandomString = (length: number): string => {
    return Math.random().toString(20).substr(2, length);
}
