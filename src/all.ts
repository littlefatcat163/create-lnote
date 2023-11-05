import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import path from 'path'

export function runtimePaths() {
    const workingDirname = path.parse(path.resolve()).name
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    return {
        rootDirname: __dirname,
        workingDirname,
    }
}
