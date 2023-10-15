import { DataCollection, Datum } from '@typinghare/extrum'
import * as os from 'os'
import { CssEnv } from './CssEnv'

export class Configuration extends DataCollection<Config, ConfigMetadata> {
    public constructor() {
        const defaultTheme: string = 'modern-light'

        super({
            themeDir: new Datum(CssEnv.THEME_DIR),
            theme: new Datum(defaultTheme),
            outDir: new Datum(os.homedir()),
            outName: new Datum(undefined),
            envDir: new Datum(CssEnv.ENV_DIR),
            env: new Datum(undefined),
        })
    }
}

export interface Config {
    // The directory of the theme file
    themeDir: string

    // The name of the target theme file
    theme: string

    // The output directory
    outDir: string

    // [Optional] The output file name
    outName: string | undefined

    // The directory of environment file
    envDir: string

    // [Optional] The name of the environment
    env: string | undefined
}

export interface ConfigMetadata {

}