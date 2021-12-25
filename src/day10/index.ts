import * as fs from "fs"
import * as path from "path"
import { characters, points, found, median, points_2 } from "./constants"

const content = fs
    .readFileSync(path.join(__dirname, "input.prod"), { encoding: "utf-8" })
    .toString()
    .trim()
    .split("\n")
    .filter(Boolean)

function partOne() {
    for (const line of content) {
        const stack: string[] = []
        for (let i = 0; i < line.length; i++) {
            const element: string = line[i]
            if (/[({\[<]/.test(element)) {
                stack.push(characters[element as string])
            } else {
                const expected = stack.pop()
                if (expected !== element) {
                    found[element]++
                    break
                }
            }
        }
    }
    const score = Object.keys(found)
        .map((key) => points[key] * found[key])
        .reduce((a, b) => a + b, 0)

    return score
}

function partTwo() {
    let scores: number[] = []
    for (let line of content) {
        const stack: string[] = []
        let corrupted = false
        for (let i = 0; i < line.length; i++) {
            const element: string = line[i]
            if (/[({\[<]/.test(element)) {
                stack.push(characters[element])
            } else {
                const expected = stack.pop()
                if (expected !== element) {
                    corrupted = true
                    break
                }
            }
        }
        if (!corrupted && stack.length > 0) {
            // There is an incomplete line.
            const closingChars = stack.reverse().join("")
            let score = 0
            for (let i = 0; i < closingChars.length; i++) {
                const element: string = closingChars[i]
                score *= 5
                score += points_2[element]
            }
            scores.push(score)
        }
    }
    return median(scores)
}

console.log("Part One: ", partOne())
console.log("Part Two: ", partTwo())
