import * as fs from "fs"
import * as path from "path"

let content = fs
    .readFileSync(path.join(__dirname, "input.prod"), {
        encoding: "utf-8"
    })
    .toString()
    .trim()

let partOne = () => {
    let digits = content.split("\n").map((line) => {
        return line.split(" | ")[1].split(" ")
    })
    let count = 0
    digits.forEach((lineOfDigits) => {
        lineOfDigits.forEach((digit) => {
            if (
                digit.length === 2 ||
                digit.length === 4 ||
                digit.length === 3 ||
                digit.length === 7
            ) {
                count += 1
            }
        })
    })
    return count
}

let partTwo = () => {
    let displays: Display[] = content.split("\n").map((line) => {
        let [uniqueDigits, displayValues] = line.split(" | ")

        let display = {
            uniqueDigits: uniqueDigits.split(" "),
            displayValues: displayValues.split(" ")
        }

        return display
    })

    let sum = 0
    displays.forEach((display) => {
        let mappings: SignalMap = correctWireMappings(display.uniqueDigits)
        let numericValue = valueOnDisplay(display, mappings)
        sum += numericValue
    })

    return sum
}

type Display = {
    uniqueDigits: string[]
    displayValues: string[]
}

type Signal = "a" | "b" | "c" | "d" | "e" | "f" | "g"
type SignalMap = Record<Signal, Signal>

const correctWireMappings = (uniqueDigits: string[]): SignalMap => {
    // c, f
    let one = (
        uniqueDigits.find((signals) => signals.length === 2) as string
    ).split("")

    // b, c, d, f
    let four = (
        uniqueDigits.find((signals) => signals.length === 4) as string
    ).split("")

    // a, c, f
    let seven = (
        uniqueDigits.find((signals) => signals.length === 3) as string
    ).split("")

    // a, b, c, d, e, f, g
    let eight = (
        uniqueDigits.find((signals) => signals.length === 7) as string
    ).split("")

    let three = (
        uniqueDigits.find((signals) => {
            return (
                signals.length === 5 &&
                one.every((letter) => signals.includes(letter))
            )
        }) as string
    ).split("")

    let a = seven.find((letter) => !one.includes(letter)) as Signal

    let d = three.find((letter) => {
        return !one.includes(letter) && four.includes(letter)
    }) as Signal

    let g = three.find((letter) => {
        return !one.includes(letter) && letter !== a && letter !== d
    }) as Signal

    let six = (
        uniqueDigits.find((signals) => {
            return (
                signals.length === 6 &&
                !one.every((letter) => signals.includes(letter))
            )
        }) as string
    ).split("")

    let f = one.find((letter) => six.includes(letter)) as Signal
    let c = one.find((letter) => !six.includes(letter)) as Signal

    let five = (
        uniqueDigits.find((signals) => {
            return (
                signals.length === 5 &&
                signals.includes(a) &&
                signals.includes(d) &&
                signals.includes(f) &&
                signals.includes(g) &&
                !signals.includes(c)
            )
        }) as string
    ).split("")

    let b = five.find((letter) => {
        return ![a, d, f, g].includes(letter as Signal)
    }) as Signal

    let two = (
        uniqueDigits.find((signals) => {
            return (
                signals.length === 5 &&
                signals.includes(a) &&
                signals.includes(c) &&
                signals.includes(d) &&
                signals.includes(g) &&
                !signals.includes(f)
            )
        }) as string
    ).split("")

    let e = two.find((letter) => {
        return ![a, c, d, g].includes(letter as Signal)
    }) as Signal

    let obj = {} as SignalMap

    ;(obj[a] = "a"),
        (obj[b] = "b"),
        (obj[c] = "c"),
        (obj[d] = "d"),
        (obj[e] = "e"),
        (obj[f] = "f"),
        (obj[g] = "g")

    return obj as SignalMap
}

const includes = (signals: Signal[], ...letters: Signal[]): boolean => {
    return (
        letters.length === signals.length &&
        letters.every((letter) => signals.includes(letter))
    )
}

let signalsToNumbers = (signals: Signal[]): number => {
    if (includes(signals, "a", "b", "c", "e", "f", "g")) {
        return 0
    } else if (includes(signals, "c", "f")) {
        return 1
    } else if (includes(signals, "a", "c", "d", "e", "g")) {
        return 2
    } else if (includes(signals, "a", "c", "d", "f", "g")) {
        return 3
    } else if (includes(signals, "b", "c", "d", "f")) {
        return 4
    } else if (includes(signals, "a", "b", "d", "f", "g")) {
        return 5
    } else if (includes(signals, "a", "b", "d", "e", "f", "g")) {
        return 6
    } else if (includes(signals, "a", "c", "f")) {
        return 7
    } else if (includes(signals, "a", "b", "c", "d", "e", "f", "g")) {
        return 8
    } else if (includes(signals, "a", "b", "c", "d", "f", "g")) {
        return 9
    } else {
        throw new Error("Not Good")
    }
}

const toSignal = (letter: string): Signal => {
    if (
        letter !== "a" &&
        letter !== "b" &&
        letter !== "c" &&
        letter !== "d" &&
        letter !== "e" &&
        letter !== "f" &&
        letter !== "g"
    ) {
        throw new Error("Not a valid signal provided")
    }
    return letter
}

const valueOnDisplay = (display: Display, mappings: SignalMap): number => {
    let digits: number[] = []
    display.displayValues.forEach((value) => {
        let correctedSignals: Signal[] = value
            .split("")
            .map((signal) => mappings[toSignal(signal)])
        let asNumber = signalsToNumbers(correctedSignals)
        digits.push(asNumber)
    })

    return parseInt(digits.join(""))
}

console.log("Part One: ", partOne())
console.log("Part One: ", partTwo())
