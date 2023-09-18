export interface LinkerConfig {
    theme: string;
    env?: string;
    out?: string;
}
export declare class Linker {
    private static readonly ENV_DIR;
    private static readonly STYLE_DIR;
    private static readonly THEME_DIR;
    protected workingDir: string;
    protected styleDir: string;
    protected themeDir: string;
    protected envDir: string;
    constructor(config: LinkerConfig);
    /**
     * Returns the absolute path of style directory.
     * @private
     */
    private getStyleDir;
    /**
     * Returns the absolute path of theme directory.
     * @private
     */
    private getThemeDir;
    /**
     * Returns the absolute path of env directory.
     * @private
     */
    private getEnvDir;
    /**
     * Returns the absolute path of theme file.
     * @private
     */
    private getThemeFilepath;
    private link;
}
