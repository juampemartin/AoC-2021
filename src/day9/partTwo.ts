import * as fs from "fs"
import * as path from "path"

const data: number[][] = fs
    .readFileSync(path.join(__dirname, "input.prod"), { encoding: "utf-8" })
    .toString()
    .trim()
    .split("\n")
    .map((line) => {
        return line.split("").map((value) => parseInt(value))
    })

const seen: boolean[][] = new Array(data.length).fill(0).map((_: number) => {
    return new Array(data[0].length).fill(false) as boolean[]
})

function changeMap(map: number[][]): number[][] {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 9) {
                map[i][j] = 1
            } else {
                map[i][j] = 0
            }
        }
    }
    return map
}

function floodFill(
    map: number[][],
    seen: boolean[][],
    r: number,
    c: number
): number {
    if (seen[r][c]) {
        return 0
    }

    if (map[r][c] === 1) {
        seen[r][c] = true
        return 0
    }

    seen[r][c] = true
    let size = 1

    if (r - 1 >= 0) {
        size += floodFill(map, seen, r - 1, c)
    }
    if (r + 1 < map.length) {
        size += floodFill(map, seen, r + 1, c)
    }
    if (c - 1 >= 0) {
        size += floodFill(map, seen, r, c - 1)
    }
    if (c + 1 < map[0].length) {
        size += floodFill(map, seen, r, c + 1)
    }

    // console.log("Size: ", size)
    return size
}

const partTwo = (): number => {
    const map: number[][] = changeMap(data)
    let bassins: number[] = []

    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            const size = floodFill(map, seen, r, c)

            if (size > 0) {
                bassins.push(size)
            }
        }
    }
    bassins.sort((a, b) => b - a)
    return bassins[0] * bassins[1] * bassins[2]
}

console.log("Part Two: ", partTwo())
