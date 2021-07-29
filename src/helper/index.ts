import { LANGUAGE_CODE, SUB_FIX_PRICE } from "common/enum"

export class utilities {
    static readonly getImageUrl = (id: string): string => {
        if (!id) return "#"
        return `https://drive.google.com/uc?export=view&id=${id}`

    }
    static formatPrice = (number: number) => {
        return new Intl.NumberFormat(LANGUAGE_CODE.VN, { style: 'currency', currency: SUB_FIX_PRICE.VND }).format(number)
    }

    static caculatorPriceSale = (price: number, sale: number) => {
        const result = price - (price * sale / 100)
        return new Intl.NumberFormat(LANGUAGE_CODE.VN, { style: 'currency', currency: SUB_FIX_PRICE.VND }).format(result)
    }
    static uidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
      }
    static convertToTreeData = (arr) => {
        let arrMap = new Map(arr.map(item => [item._id, item]));
        let tree = [];
     
        for (let i = 0; i < arr.length; i++) {
           let item = arr[i];
     
           if (item.parent_id) {
              let parentItem:any = arrMap.get(item.parent_id);
     
              if (parentItem) {
                 if (parentItem?.children || "") {
                    parentItem.children.push(item);
                 } else {
                    parentItem.children = [item];
                 }
              }
           } else {
              tree.push(item);
           }
        }
     
        return tree;
     }
     
}