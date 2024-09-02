export const setToLocalStorage = ({ dish }: any) => {
    if (localStorage.getItem('goods')) {
        let data: any = localStorage.getItem('goods')
        data = JSON.parse(data)

        if (dish.count) {
            const index = data.findIndex(
                (element: any) => element.id === dish.id
            )
            data[index].count++
        } else {
            data.push({ ...dish, count: 1 })
        }
        localStorage.setItem('goods', JSON.stringify(data))
    } else {
        let data = []
        data.push({ ...dish, count: 1 })
        localStorage.setItem('goods', JSON.stringify(data))
    }
}

export const removeFromLocalStorage = ({ dish }: any) => {
    if (localStorage.getItem('goods')) {
        let data: any = localStorage.getItem('goods')
        data = JSON.parse(data)
        const index = data.findIndex((element: any) => element.id === dish.id)
        if (index !== -1) {
            if (dish.count > 1) {
                data[index].count--
            } else {
                data.splice(index, 1)
            }
            localStorage.setItem('goods', JSON.stringify(data))
        }
    }
}

export const getFromLocalStorage = () => {
    if (localStorage.getItem('goods')) {
        let data: any = localStorage.getItem('goods')
        data = JSON.parse(data)
        return data
    }
}

export const removeItemsFromLocalStorage = ({ dish }: any) => {
    if (localStorage.getItem('goods')) {
        let data: any = localStorage.getItem('goods')
        data = JSON.parse(data)
        const index = data.findIndex((element: any) => element.id === dish.id)
        if (index !== -1) {
            data.splice(index, 1)
            localStorage.setItem('goods', JSON.stringify(data))
        }
    }
}
