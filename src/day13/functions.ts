export function calculateMapDimensions(coordinates: number[][]) {
    let x: number[] = []
    let y: number[] = []

    for (let r = 0; r < coordinates.length; r++) {
        x.push(coordinates[r][0])
        y.push(coordinates[r][1])
    }

    x.sort((a, b) => b - a)
    y.sort((a, b) => b - a)
    return {
        x: x[0] + 1,
        y: y[0] + 1
    }
}

export function resetMap(target: string[][], coordinates: number[][]) {
    for (let r = 0; r < coordinates.length; r++) {
        for (let c = 0; c < coordinates[0].length; c++) {
            if (
                coordinates[r][c] != undefined &&
                coordinates[r][c + 1] != undefined
            ) {
                target[coordinates[r][c + 1]][coordinates[r][c]] = "#"
            }
        }
    }
    return target
}

export function foldMapByX(target: string[][], fold: number) {
    for (let r = 0; r < target.length; r++) {
        for (let c = 0; c < target[0].length; c++) {
            if (target[r][c] != undefined && fold != undefined) {
                if (r >= fold && target[r][c] === "#") {
                    const dest: number = (r - fold) * 2
                    target[r][c] = "."
                    target[r - dest][c] = "#"
                }
            }
        }
    }
    return target
}

export function foldMapByY(target: string[][], fold: number) {
    for (let r = 0; r < target.length; r++) {
        for (let c = 0; c < target[0].length; c++) {
            if (target[r][c] != undefined && fold != undefined) {
                if (c >= fold && target[r][c] === "#") {
                    const dest: number = (c - fold) * 2
                    target[r][c] = "."
                    target[r][c - dest] = "#"
                }
            }
        }
    }
    return target
}
