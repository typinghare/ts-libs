import { Configuration } from './Configuration'
import { addCssExtension, checkDir, checkFile } from './utils'
import fs from 'fs'
import path from 'path'

export class Linker {
    public constructor(private readonly configuration: Configuration) {
    }

    public run(): void {
        const themeDir: string = this.configuration.getValue('themeDir')
        const theme: string = this.configuration.getValue('theme')
        const outDir: string = this.configuration.getValue('outDir')
        const outName: string = this.configuration.getValue('outName') || theme
        const envDir: string = this.configuration.getValue('envDir')
        const env: string | undefined = this.configuration.getValue('env')

        // Checks directories
        checkDir(themeDir, 'Theme')
        checkDir(outDir, 'Output')
        if (env) {
            checkDir(envDir)
        }

        const themeFilepath: string = path.join(themeDir, addCssExtension(theme))
        checkFile(themeFilepath)

        // Start to link and get the content
        this.log(`@link: ${themeFilepath}`)
        const content = ((): string => {
            const themeFileContent = this.link(themeFilepath, themeDir)

            // Environment
            if (env) {
                this.log(`@env: ${env}`)
                const realEnvDir = path.join(envDir, env)
                checkDir(realEnvDir)

                const indexFilepath = path.join(realEnvDir, addCssExtension('index'))
                this.log(`@link: ${indexFilepath}`)

                const envFileContent = this.link(indexFilepath, path.dirname(indexFilepath))
                return themeFileContent + '\n' + envFileContent
            } else {
                return themeFileContent
            }
        })()

        // Output the content
        const outputFilepath: string = path.join(outDir, addCssExtension(outName))
        this.log(`@output: ${outputFilepath}`)
        console.log(content)
        fs.writeFileSync(outputFilepath, content)
    }

    /**
     * Links a file.
     * @param filepath The path of the file.
     * @param workingDir The working directory.
     * @private
     */
    private link(filepath: string, workingDir: string): string {
        const fileContent: string = fs.readFileSync(filepath).toString()
        let content: string = ''

        fileContent.split('\n').forEach(line => {
            // Match `@import ".*"`
            const matchResult = line.match(/@import "([^"]*)";/)
            if (matchResult !== null) {
                const importPath = matchResult[1]
                const importAbsolutePath = path.join(workingDir, importPath)
                checkFile(importAbsolutePath)

                this.log(`@import: ${importAbsolutePath}`)
                content += this.link(importAbsolutePath, path.dirname(importAbsolutePath))
            } else {
                content += line + '\n'
            }
        })

        return content
    }

    private log(message: string): void {
        console.log(message)
    }
}