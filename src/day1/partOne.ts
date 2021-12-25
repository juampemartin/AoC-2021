import * as fs from "fs"
import * as path from "path"

const contents = fs
    .readFileSync(path.join(__dirname, "input.prod"), { encoding: "utf-8" })
    .toString()

const sweepReport = contents
    .split("\n")
    .filter((x) => Boolean(x))
    .map((x) => parseInt(x))

function partOne() {
    let increased = 0
    for (let i = 1; i < sweepReport.length; i++) {
        const previous = sweepReport[i - 1]
        const current = sweepReport[i]
        if (current > previous) {
            increased++
        }
    }
    return increased
}

function partTwo() {
    let increased = 0
    for (let i = 3; i < sweepReport.length; i++) {
        const previous =
            sweepReport[i - 1] + sweepReport[i - 2] + sweepReport[i - 3]
        const current = sweepReport[i] + sweepReport[i - 1] + sweepReport[i - 2]
        if (current > previous) {
            increased++
        }
    }
    return increased
}

console.log(partOne())
console.log(partTwo())
