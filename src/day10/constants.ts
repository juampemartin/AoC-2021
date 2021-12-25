export const characters: any = {
    "(": ")",
    "{": "}",
    "[": "]",
    "<": ">"
}

export const points: any = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

export const points_2: any = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}

export const found: any = {
    ")": 0,
    "]": 0,
    "}": 0,
    ">": 0
}

export function median(array: Array<number>): number {
    const internalArray = [...array]
    internalArray.sort((a, b) => a - b)
    if (internalArray.length % 2 === 0) {
        return (
            (internalArray[internalArray.length / 2 - 1] +
                internalArray[internalArray.length / 2]) /
            2
        )
    } else {
        return internalArray[Math.floor(internalArray.length / 2)]
    }
}
