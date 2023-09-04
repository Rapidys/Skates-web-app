export const GetYearsArray = () => {
    const arr = []
    const dateNow = new Date()

    for (let i = 1; i <= dateNow.getFullYear(); i++) {
        arr.push(i)
    }
    return arr
}

export const months = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნომბერი', 'დეკემბერი']

export function TranslateMonth(date: string) {
    const indexOfSpace = date.indexOf(' ')
    const monthName = date.slice(0, indexOfSpace)
    const year = date.slice(indexOfSpace, date.length)
    switch (monthName.toLowerCase()) {
        case "january":
            return 'იანვარი';
        case "february":
            return 'თებერვალი ' + year;
        case "march":
            return 'მარტი ' + year;
        case "april":
            return 'აპრილი ' + year;
        case "may":
            return 'მაისი ' + year;
        case "june":
            return 'ივნისი ' + year;
        case "july":
            return 'ივლისი ' + year;
        case "august":
            return 'აგვისტო ' + year;
        case "september":
            return 'სექტემბერი ' + year;
        case "october":
            return 'ოქტომბერი ' + year;
        case "november":
            return 'ნოემბერი ' + year;
        case "december":
            return 'დეკემბერი ' + year;
        default:
            return "Invalid month name";
    }
}
