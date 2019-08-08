let myid = 0;
export const add = text => {
    return {
        type: "ADD",
        add: {
            id: myid++,
            text,
            show: true
        }
    }
}

export const show = id => {
    return {
        type: 'SHOW',
        id: id
    }
}

export const inverse = () => {
    return {
        type: 'INVERSE'
    }
}

export const all = () => {
    return {
        type: 'ALL'
    }
}