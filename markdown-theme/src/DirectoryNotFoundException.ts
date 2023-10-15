export class DirectoryNotFoundException extends Error {
    public constructor(directory: string, name?: string) {
        super(`${name ? name + ' directory' : 'Directory'} not found: ${directory}`)
    }
}