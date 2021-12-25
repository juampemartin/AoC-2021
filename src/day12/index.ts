import * as fs from "fs"
import * as path from "path"

const connections = fs
    .readFileSync(path.join(__dirname, "input.prod"), {
        encoding: "utf-8"
    })
    .toString()
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("-"))
    .map(([a, b]) => [a, b])

type Caves = Record<string, Set<string>>
const caveGraph: Caves = {}

connections.forEach(([a, b]) => {
    if (!caveGraph[a]) {
        caveGraph[a] = new Set()
    }

    caveGraph[a].add(b)

    if (!caveGraph[b]) {
        caveGraph[b] = new Set()
    }

    caveGraph[b].add(a)
})

const isSmallCave = (name: string): boolean => name.toLowerCase() === name

function depthSearch(current: string, visited: string[], paths: string[]) {
    visited.push(current)
    if (current === "end") {
        paths.push(visited.join(`,`))
        return
    }

    for (const neighbor of caveGraph[current]) {
        if (isSmallCave(neighbor) && visited.includes(neighbor)) {
            continue
        }
        depthSearch(neighbor, [...visited], paths)
    }
}

function depthSearchFirst(
    current: string,
    visited: string[],
    visitedTwice: boolean,
    paths: string[]
) {
    visited.push(current)
    if (current === "end") {
        paths.push(visited.join(`,`))
        return
    }
    for (const neighbor of caveGraph[current]) {
        if (neighbor === "start") {
            continue
        }
        if (isSmallCave(neighbor) && visited.includes(neighbor)) {
            if (visitedTwice) {
                continue
            }
            if (visited.filter((x) => x === neighbor).length >= 2) {
                continue
            }
            depthSearchFirst(neighbor, [...visited], true, paths)
        } else {
            depthSearchFirst(neighbor, [...visited], visitedTwice, paths)
        }
    }
}

function partOne(): number {
    let paths: string[] = []
    let visited: string[] = []
    depthSearch("start", visited, paths)

    return paths.length
}

function partTwo(): number {
    let paths: string[] = []
    let visited: string[] = []
    depthSearchFirst("start", visited, false, paths)
    return paths.length
}
console.log("Part One: ", partOne())
console.log("Part Two: ", partTwo())
