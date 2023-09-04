export function parseDate(input:any, format:any) {
    format = format || 'yyyy-mm-dd'; // default format
    var parts = input.match(/(\d+)/g),
        i = 0, fmt = {};
    // extract date-part indexes from the format
    format.replace(/(yyyy|dd|mm)/g, function (part:any) {
        // @ts-ignore
        fmt[part] = i++;
    });

    // @ts-ignore
    return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
}
export const dateParse = (date:any) => {
    return date.replace(/-/g, "/")
}