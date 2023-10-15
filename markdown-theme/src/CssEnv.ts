import * as path from 'path'

export class CssEnv {
    public static readonly ROOT_DIR = path.join(__dirname, '../css')

    public static readonly ENV_DIR = path.join(__dirname, '../css/env')

    public static readonly STYLE_DIR = path.join(__dirname, '../css/style')

    public static readonly THEME_DIR = path.join(__dirname, '../css/theme')
}