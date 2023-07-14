import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'

export interface LinkerConfig {
    // The path of the objective theme file
    theme: string

    // [Optional] The name of the environment selected
    env?: string

    // [Optional] The output directory
    out?: string
}

export class Linker {
    private static readonly ENV_DIR = 'env'
    private static readonly STYLE_DIR = 'style'
    private static readonly THEME_DIR = 'theme'

    protected workingDir: string
    protected styleDir: string
    protected themeDir: string
    protected envDir: string

    public constructor(config: LinkerConfig) {
        const { theme, env, out } = config

        // Autocomplete file extension
        const themeFile: string = theme.endsWith('.css') ? theme : `${theme}.css`

        // Determine the working directory
        this.workingDir = path.dirname(__dirname)

        // Determine the style directory
        this.styleDir = this.getStyleDir()

        // Determine the theme directory
        this.themeDir = this.getThemeDir()

        // Determine the env directory
        this.envDir = this.getEnvDir()

        // Determine the theme file path
        const themeFilepath = this.getThemeFilepath(themeFile)

        // Start to link and get the content returned
        const content = (() => {
            const themeFileContent = this.link(themeFilepath, this.themeDir)

            // Environment
            if (env) {
                const specifiedEnvDir = path.join(this.envDir, env)

                if (!fs.existsSync(specifiedEnvDir)) {
                    throw new Error(`Specified env directory does not exist: [ ${specifiedEnvDir} ].`)
                }

                const mainFilepath = path.join(specifiedEnvDir, 'main.css')
                const envFileContent = this.link(mainFilepath, path.dirname(mainFilepath))
            }

            return themeFileContent
        })()

        // Output the content to the specified output directory
        const outputDir = out || os.homedir()
        // const outputDir = out || `~/.markdown-theme`
        fs.writeFileSync(`${outputDir}/${themeFile}`, content)
    }

    /**
     * Returns the absolute path of style directory.
     * @private
     */
    private getStyleDir(): string {
        const styleDir = path.join(this.workingDir, Linker.STYLE_DIR)

        if (!fs.existsSync(styleDir)) {
            throw new Error(`Style directory does not exist: [ ${styleDir} ].`)
        }

        return styleDir
    }

    /**
     * Returns the absolute path of theme directory.
     * @private
     */
    private getThemeDir(): string {
        const themeDir = path.join(this.workingDir, Linker.THEME_DIR)

        if (!fs.existsSync(themeDir)) {
            throw new Error(`Theme directory does not exist: [ ${themeDir} ].`)
        }

        return themeDir
    }

    /**
     * Returns the absolute path of env directory.
     * @private
     */
    private getEnvDir(): string {
        const envDir = path.join(this.workingDir, Linker.ENV_DIR)

        if (!fs.existsSync(envDir)) {
            throw new Error(`Env directory does not exist: [ ${envDir} ].`)
        }

        return envDir
    }

    /**
     * Returns the absolute path of theme file.
     * @private
     */
    private getThemeFilepath(themeFile: string): string {
        const themeFilepath = path.join(this.themeDir, themeFile)

        if (!fs.existsSync(themeFilepath)) {
            throw new Error(`Theme file does not exist: [ ${themeFilepath} ].`)
        }

        return themeFilepath
    }

    private link(filepath: string, workingDir: string): string {
        const fileContent: string = fs.readFileSync(filepath).toString()
        let content: string = ''

        fileContent.split('\n').forEach(line => {
            // Match `@import ".*"`
            const matchResult = line.match(/@import "([^"]*)";/)
            if (matchResult !== null) {
                const importPath = matchResult[1]
                const importAbsPath = path.join(workingDir, importPath)

                if (!fs.existsSync(importAbsPath)) {
                    throw new Error(`File not exist: [ ${importAbsPath} ].`)
                }

                content += this.link(importAbsPath, path.dirname(importAbsPath))
            } else {
                content += line + '\n'
            }
        })

        return content
    }
}