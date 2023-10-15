import * as fs from 'fs'
import { DirectoryNotFoundException } from './DirectoryNotFoundException'
import { FileNotFoundException } from './FileNotFoundException'

export function checkDir(directory: string, name?: string): void {
    if (!fs.existsSync(directory)) {
        throw new DirectoryNotFoundException(directory, name)
    }
}

export function checkFile(filepath: string, name?: string): void {
    if (!fs.existsSync(filepath)) {
        throw new FileNotFoundException(filepath, name)
    }
}

export function addCssExtension(filename: string): string {
    return filename.endsWith('.css') ? filename : `${filename}.css`
}