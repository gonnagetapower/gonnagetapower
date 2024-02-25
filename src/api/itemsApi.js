import { $authHost } from "./index"

let diffArrIndex = 0;

export const getPages = async () => {
    const { data } = await $authHost.post('/', {
        action: "get_ids",
    })
    return data.result.length;
}

export const getIds = async (offset = 0) => {
    const { data } = await $authHost.post('/', {
        action: "get_ids",
        params: { "offset": 50 * offset + diffArrIndex, "limit": 100 }
    })
    let noDublIndex = [...new Set(data.result)];
    diffArrIndex = data.result.length - noDublIndex.length;
    return noDublIndex;
}

export const getItems = async (arrayIds, query = false) => {
    const { data } = await $authHost.post('/', {
        action: "get_items",
        params: { "ids": arrayIds }
    })
    const res = data.result.reduce((o, i) => {
        if ((!o.find(v => v.id === i.id)) && o.length < 50) {
            o.push(i);
        }
        return o;
    }, []);
    if (query) {
        return data.result;
    }
    return res;
}

export const searchItems = async (obj) => {
    if (obj.hasOwnProperty('price')) {
        console.log('da')
        obj.price = parseInt(obj.price)
        console.log(obj)
    }
    const { data } = await $authHost.post('/', {
        action: "filter",
        params: obj
    })
    return data.result;
}
