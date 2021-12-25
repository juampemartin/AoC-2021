import * as fs from "fs"
import * as path from "path"

type Cave = (number | null)[][]
const content: number[][] = fs
    .readFileSync(path.join(__dirname, "input.prod"), { encoding: "utf-8" })
    .toString()
    .trim()
    .split("\n")
    .map((line) => {
        return line.split("").map((value) => parseInt(value))
    })
const increaseEnergy = (octopuses: Cave): Cave => {
    return octopuses.map((row) =>
        row.map((octopus) => {
            if (octopus === null) {
                throw new Error("Cave in wrong sate")
            } else {
                return octopus + 1
            }
        })
    )
}

const triggerFlashes = (octopuses: Cave): number => {
    let count = 0
    for (let r = 0; r < octopuses.length; r++) {
        let row = octopuses[r]
        for (let c = 0; c < row.length; c++) {
            let octopus = row[c]
            if (octopus && octopus > 9) {
                octopuses[r][c] = null
                count += 1
                ;[
                    [r - 1, c - 1],
                    [r - 1, c],
                    [r - 1, c + 1],
                    [r, c - 1],
                    [r, c + 1],
                    [r + 1, c - 1],
                    [r + 1, c],
                    [r + 1, c + 1]
                ].forEach(([xx, yy]) => {
                    if (octopuses[xx] && octopuses[xx][yy] !== null) {
                        ;(octopuses[xx][yy] as number) += 1
                    }
                })
            }
        }
    }
    return count
}

const resetOctopus = (octopuses: Cave) => {
    for (let r = 0; r < octopuses.length; r++) {
        let row = octopuses[r]
        for (let c = 0; c < row.length; c++) {
            let octopus = row[c]
            if (octopus === null) {
                octopuses[r][c] = 0
            }
        }
    }
}

function partOne(): number {
    let flashCount = 0
    let octopuses: Cave = content

    for (let i = 0; i < 100; i++) {
        let newFlashes = 0
        octopuses = increaseEnergy(octopuses)
        do {
            newFlashes = triggerFlashes(octopuses)
            flashCount += newFlashes
        } while (newFlashes > 0)
        resetOctopus(octopuses)
    }
    return flashCount
}

function partTwo(): number {
    let octopuses: Cave = content
    let i = 1

    while (true) {
        let flashCount = 0
        let newFlashes = 0
        octopuses = increaseEnergy(octopuses)
        do {
            newFlashes = triggerFlashes(octopuses)
            flashCount += newFlashes
        } while (newFlashes > 0)
        resetOctopus(octopuses)

        if (flashCount === 100) {
            return i
        }
        i++
    }
}

console.log("Part One: ", partOne())
console.log("Part Two: ", partTwo())
