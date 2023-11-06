import { createContext } from 'this-file'
import path from 'path'

export function runtimePaths() {
    const context = createContext()
    const workingDirname = path.parse(path.resolve()).name
    return {
        rootDirname: path.resolve(context.dirname, '../'),
        workingDirname,
    }
}
