export const numberFormat = (number: string) => {
    const num = parseFloat(number)
    if (num <= 999) {
        return num
    } else if (num <= 999999) {
        return `${(num / 1000).toFixed(2)}k`
    } else {
        return `${(num / 1000000).toFixed(2)}M`
    }
}