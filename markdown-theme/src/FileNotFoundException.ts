export class FileNotFoundException extends Error {
    public constructor(filepath: string, name?: string) {
        super(`${name ? name + ' file' : 'File'} not found: ${filepath}`)
    }
}