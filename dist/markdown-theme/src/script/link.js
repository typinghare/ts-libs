"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linker = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
class Linker {
    constructor(config) {
        const { theme, env, out } = config;
        // Autocomplete file extension
        const themeFile = theme.endsWith('.css') ? theme : `${theme}.css`;
        // Determine the working directory
        this.workingDir = path.dirname(__dirname);
        // Determine the style directory
        this.styleDir = this.getStyleDir();
        // Determine the theme directory
        this.themeDir = this.getThemeDir();
        // Determine the env directory
        this.envDir = this.getEnvDir();
        // Determine the theme file path
        const themeFilepath = this.getThemeFilepath(themeFile);
        // Start to link and get the content returned
        const content = (() => {
            const themeFileContent = this.link(themeFilepath, this.themeDir);
            // Environment
            if (env) {
                const specifiedEnvDir = path.join(this.envDir, env);
                if (!fs.existsSync(specifiedEnvDir)) {
                    throw new Error(`Specified env directory does not exist: [ ${specifiedEnvDir} ].`);
                }
                const mainFilepath = path.join(specifiedEnvDir, 'main.css');
                const envFileContent = this.link(mainFilepath, path.dirname(mainFilepath));
            }
            return themeFileContent;
        })();
        // Output the content to the specified output directory
        const outputDir = out || os.homedir();
        // const outputDir = out || `~/.markdown-theme`
        fs.writeFileSync(`${outputDir}/${themeFile}`, content);
    }
    /**
     * Returns the absolute path of style directory.
     * @private
     */
    getStyleDir() {
        const styleDir = path.join(this.workingDir, Linker.STYLE_DIR);
        if (!fs.existsSync(styleDir)) {
            throw new Error(`Style directory does not exist: [ ${styleDir} ].`);
        }
        return styleDir;
    }
    /**
     * Returns the absolute path of theme directory.
     * @private
     */
    getThemeDir() {
        const themeDir = path.join(this.workingDir, Linker.THEME_DIR);
        if (!fs.existsSync(themeDir)) {
            throw new Error(`Theme directory does not exist: [ ${themeDir} ].`);
        }
        return themeDir;
    }
    /**
     * Returns the absolute path of env directory.
     * @private
     */
    getEnvDir() {
        const envDir = path.join(this.workingDir, Linker.ENV_DIR);
        if (!fs.existsSync(envDir)) {
            throw new Error(`Env directory does not exist: [ ${envDir} ].`);
        }
        return envDir;
    }
    /**
     * Returns the absolute path of theme file.
     * @private
     */
    getThemeFilepath(themeFile) {
        const themeFilepath = path.join(this.themeDir, themeFile);
        if (!fs.existsSync(themeFilepath)) {
            throw new Error(`Theme file does not exist: [ ${themeFilepath} ].`);
        }
        return themeFilepath;
    }
    link(filepath, workingDir) {
        const fileContent = fs.readFileSync(filepath).toString();
        let content = '';
        fileContent.split('\n').forEach(line => {
            // Match `@import ".*"`
            const matchResult = line.match(/@import "([^"]*)";/);
            if (matchResult !== null) {
                const importPath = matchResult[1];
                const importAbsPath = path.join(workingDir, importPath);
                if (!fs.existsSync(importAbsPath)) {
                    throw new Error(`File not exist: [ ${importAbsPath} ].`);
                }
                content += this.link(importAbsPath, path.dirname(importAbsPath));
            }
            else {
                content += line + '\n';
            }
        });
        return content;
    }
}
exports.Linker = Linker;
Linker.ENV_DIR = 'env';
Linker.STYLE_DIR = 'style';
Linker.THEME_DIR = 'theme';
