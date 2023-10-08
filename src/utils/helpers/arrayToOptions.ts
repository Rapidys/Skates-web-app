import {IServices} from "../../types/Dashboard";

export const ArrayToOptions = (data: any[], obj: string) => {
    const arr: any = []

    data.forEach((item: IServices) => {
        const displayName = obj === 'services' ? `${item.displayName} (ფასი: ${item.price}; რაოდენობა: ${item.serviceQuantity})` : item?.displayName
        arr.push({...item, value: displayName, label: displayName,})
    })
    return arr
}
