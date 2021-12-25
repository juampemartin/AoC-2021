import * as fs from "fs"
import * as path from "path"

const content = fs.readFileSync(path.join(__dirname, "input.prod")).toString()

type Fishes = Record<number, number>
const countFishes = (fishes: Fishes): number => {
    let count = 0

    for (const [_, value] of Object.entries(fishes)) {
        count += value
    }
    return count
}

const countForDays = (days: number): number => {
    let fishes: Fishes = content
        .split(",")
        .map((value) => parseInt(value))
        .reduce((acc: Fishes, value: number) => {
            if (acc[value]) {
                acc[value] += 1
            } else {
                acc[value] = 1
            }

            return acc
        }, {})
    for (let day = 1; day <= days; day++) {
        let newFishes: Record<number, number> = {}

        for (let timer = 8; timer > 0; timer--) {
            if (fishes[timer]) {
                newFishes[timer - 1] = fishes[timer]
            }
        }

        if (!newFishes[6]) {
            newFishes[6] = 0
        }

        if (!newFishes[8]) {
            newFishes[8] = 0
        }

        if (fishes[0]) {
            newFishes[6] += fishes[0]
            newFishes[8] += fishes[0]
        }

        fishes = newFishes
    }
    return countFishes(fishes)
}

// console.log('Part One: ', countForDays(80));
console.log("Part Two: ", countForDays(256))
