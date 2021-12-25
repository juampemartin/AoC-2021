import { readFileSync } from "fs"
import * as path from "path"
import {
    calculateMapDimensions,
    foldMapByX,
    foldMapByY,
    resetMap
} from "./functions"

const content = readFileSync(path.join(__dirname, "input.prod"), {
    encoding: "utf-8"
}).toString()

const coordinates: number[][] = content
    .split("\n\n")[0]
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(","))
    .map(([x, y]) => [parseInt(x), parseInt(y)])

const instructions = content
    .split("\n\n")[1]
    .trim()
    .split("\n")
    .map((line) => line.split(" ")[2])
    .map((line) => line.split("="))
    .map(([x, y]) => {
        return new Map<string, number>([[x, parseInt(y)]])
    })

const { x, y } = calculateMapDimensions(coordinates)

const baseMap: string[][] = new Array(y).fill(".").map((_: string) => {
    return new Array(x).fill(".") as string[]
})

let paper: string[][] = resetMap(baseMap, coordinates)

function partOne(): number {
    let count = 0
    const foldMap = (): string[][] => {
        const first = [...instructions][0]
        if (first.has("y") && first.get("y") != undefined) {
            let number: number | undefined = first.get("y")
            foldMapByX(paper, Number(number))
        } else {
            let number: number | undefined = first.get("x")
            foldMapByY(paper, Number(number))
        }

        return paper
    }

    let map = foldMap()
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if (map[r][c] === "#") count++
        }
    }

    return count
}

function partTwo() {
    const serialCoordinates: number[][] = []
    const foldMap = (): string[][] => {
        for (let map of instructions) {
            if (map.has("y") && map.get("y") != undefined) {
                let number: number | undefined = map.get("y")
                foldMapByX(paper, Number(number))
            } else {
                let number: number | undefined = map.get("x")
                foldMapByY(paper, Number(number))
            }
        }
        return paper
    }

    let serialKey = foldMap()
    for (let r = 0; r < serialKey.length; r++) {
        for (let c = 0; c < serialKey[0].length; c++) {
            if (serialKey[r][c] === "#") {
                serialCoordinates.push([c, r])
            }
        }
    }

    let set = new Set(serialCoordinates.map(([x, y]) => `${x}, ${y}`))

    let maxX: number = Math.max(...serialCoordinates.map((x) => x[0]))
    let maxY: number = Math.max(...serialCoordinates.map((x) => x[1]))

    for (let j = 0; j <= maxY; j++) {
        let string = ""
        for (let i = 0; i <= maxX; i++) {
            const key = `${i}, ${j}`
            if (set.has(key)) {
                string += "#"
            } else {
                string += "."
            }
        }
        console.log(string)
    }
    return 0
}

console.log("Part One: ", partOne())
console.log("Part Two: ", partTwo())
