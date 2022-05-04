interface Change {
    from1: number
    from2: number
    to: number
}

// export interface Data {
//     arr: number[]
//     changes: Change[]
// }

export interface Data {
    values: Updates[]
}

export interface Updates {
    value: number
    change?: Change
}

export const prefixSum = (input: number[]): Data[] => {
    let arr = [...input]
    const n = arr.length;
    const output: Data[] = []
    let i = 1;
    const orgArr: Data = {
        values: arr.map(e => {
            return {value: e}
        })
    }
    while (i < n) {
        const copy = [...arr]
        const changes: Updates[] = arr.map(e => {
            return {value: e}
        })
        for (let l = 0; l < n - i; l++) {
            copy[l + i] = arr[l] + arr[l + i];
            changes[l + i] = ({value: copy[l + i], change: {from1: l, from2: l + i, to: l + i}})
        }
        arr = copy;
        output.push({values: changes})
        i *= 2;

    }
    return [orgArr, ...output];
}