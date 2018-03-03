#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const APPL_NAME = path.basename(__filename, '.js');
// bundler is replaced by APPL_NAME, if the latter ends
// with 'bundler' (e.g. my-bundler -> .my-bundlerc).
const CFG_NAME = '.jsts-bundlerc';

const FILE_HEADER = '// File created by ' + APPL_NAME +
    '<ext> - Do not edit manually!';

// Simple logging wrapper.
const log = {
    info: function() {
        console.info('INFO: ', ...arguments);
    },
    warn: function() {
        console.warn('WARN: ', ...arguments);
    },
    error: console.error
};

// ----------------------------------------------- Bundler class implementation

// ---------------------------------------------------------------- constructor

/**
 * The Bundler class does most of the procssing when bundling a source
 * directory.
 * @constructor
 * 
 * @param {string} sourceDir source directory to bundle
 * @param {string} outputFile master output file
 * @param {Object} [options] configuration object
 * @param {boolean} [options.clean=false] if <code>true</code>, remove all
 * files created by this tool
 * @param {boolean} [options.verbose=false] if <code>true</code>, output the
 * path of each file written or cleaned
 * @param {boolean} [options.quiet=false] if <code>true</code>, no messages
 * are logged
 * @param {string} [options.filePrefix=''] file name prefix for created files
 * @param {string} [options.fileSuffix=''] file name suffix for created files
 * @param {string} [options.fileExtension='.js'] file extension for created
 * files
 * @param {string} [options.pathSeparator] path separator  used with import
 * statements
 * @param {string} [options.indentation='\t'] indentation characters used in
 * created files
 * @param {string} [options.newline] line break character sequence used in
 * created files
 * @param {Array} [options.includes] list of Apache Ant like patterns to
 * define included files
 * @param {Array} [options.excludes] list of Apache Ant like patterns to
 * define excluded files
 * @param {boolean} [options.caseInsensitive] if <code>true</code>, Apache
 * Ant like patterns are case-insensitive
 */
function Bundler(sourceDir, outputFile, options = {}) {
    if (typeof sourceDir !== 'string') {
        throw new Error('"sourceDir" must be of type string.');
    }
    if (typeof outputFile !== 'string' && options.clean !== true) {
        throw new Error('"outputFile" must be of type string.');
    }

    // Ensure there is no trailing path separator.
    this.sourceDir = sourceDir.replace(/[\\/]+$/g, '');
    this.outputFile = outputFile;

    this.clean = typeof options.clean === 'boolean' ? options.clean : false;
    this.verbose = typeof options.verbose === 'boolean' ? options.verbose : false;
    this.quiet = typeof options.quiet === 'boolean' ? options.quiet : false;
    if (this.quiet) {
        log.info = log.error = log.warn = function() {};
    }

    this.filePrefix = typeof options.filePrefix == 'string' ? options.filePrefix : '';
    this.fileSuffix = typeof options.fileSuffix == 'string' ? options.fileSuffix : '';
    // Ensure file extension contains a leading "."
    this.fileExtension = typeof options.fileExtension == 'string' ? 
        options.fileExtension.replace(/^\.*/, '.') : '.js';

    this.pathSeparator = typeof options.pathSeparator == 'string'
        ? options.pathSeparator : path.sep;
    if (this.pathSeparator === '\\') {
        this.pathSeparator = '\\\\';
    }
    this.indentation = typeof options.indentation == 'string' ? options.indentation : '\t';
    this.newline = typeof options.newline == 'string' ? options.newline : os.EOL;

    this.excludes = options.excludes instanceof Array ? options.excludes : [];
    this.includes = options.includes instanceof Array ? options.includes : [];
    this.caseInsensitive = typeof options.caseInsensitive === 'boolean'
        ? options.caseInsensitive : false;

    this._fileHeaderBytes = Buffer.from(FILE_HEADER.replace(/<ext>/,
            this.fileExtension) + this.newline);
    this._fileHeaderLength = this._fileHeaderBytes.length;

    this._fileExtensionRegExp = new RegExp('\\' + this.fileExtension + '$');
    this._filePrefixLen = this.filePrefix ? this.filePrefix.length : 0;
    this._fileSuffixLen = this.fileSuffix ? this.fileSuffix.length : 0;
    this._includePatterns = [];
    this._excludePatterns = [];

    this._preImports = [];
    this._postImports = [];
    this._inlineModules = [];
    
    this._hidePathPatterns = [];

    this._outputFileRel = this._outputFileRelative();

    this._createIncludeExcludePatterns();
    this._setupBuiltInRules();
}

// ------------------------------------------------------------- built-in rules

/** 
 * Method to setup some built-in rules. Should be quite self-explanatory.
 * @private
 */
Bundler.prototype._setupBuiltInRules = function() {
    
    this._addExclude('extend.js');
    this._addExclude('hasInterface.js');
    this._addExclude('inherits.js');
    this._addExclude('isNaN.js');
    this._addExclude('Map.js');
    this._addExclude('org/locationtech/jts/JTSVersion.js');

    this._addPreImport('Array');
    this._addPreImport('Number');
    this._addPreImport('Math');
    
    this._addPostImport('org/locationtech/jts/monkey');
    
    this._addInlineModule('\'npm_package_version (git_hash)\'', 'version');

    this._hidePath('org/locationtech/jts', 3);
}

// ----------------------------------------------------------- public functions

/** 
 * Bundles source directory into the configured output file. If clean
 * option is set, bundler will delete files created by this tool within
 * the source directory instead.
 * @public
 */
Bundler.prototype.run = function() {
    if (opts.clean) {
        this._clean(this.sourceDir);
    } else {
        log.info('bundling directory \'' + this.sourceDir + '\'');
        var data = this._bundleDir(this.sourceDir);
        this._processInvisiblePaths(data);
        data.modules = data.modules.concat(this._inlineModules);
        // No modulesWritten specified: this is the master output file!
        this._writeFile(this.outputFile, data);
    }
};

/**
 * Cleans directory (and all sub-directories) by deleting files created
 * by this tool. Files to delete are identified by the file header.
 * @private
 * 
 * @param {string} dir the directory to clean
 */
Bundler.prototype._clean = function(dir) {
    if (this.verbose) {
        log.info('cleaning directory \'' + this._logPath(dir) + '\'');
    }
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(dir, files[i]),
            stat;
        try {
            stat = fs.statSync(filename);
            if (stat.isFile()) {
                if (this._isOwnFile(filename)) {
                    if (this.verbose) {
                        log.info('cleaning file \'' + this._logPath(filename) + '\'');
                    }
                    fs.unlinkSync(filename);
                }
            }
            else if (stat.isDirectory()) {
                this._clean(filename);
            }
        } catch (error) {
            // ignore
        }
    }
};

// ---------------------------------------------------------- private functions

/** 
 * Returns the path of the output file relative to the configured source
 * directory. The returned path is used to prevent the master output file
 * to be processed as a class file (in case the master output file is
 * located under the source directory).
 * @private
 * 
 * @returns {string} the path of the master output file relative to the
 * configured source directory
 * 
 */
Bundler.prototype._outputFileRelative = function() {
    var rel = path.relative(this.sourceDir, this.outputFile);
    if (!path.isAbsolute(rel)) {
        return path.join(this.sourceDir, rel);
    }
    return undefined;
};

/**
 * Adds the configured includes and excludes Apache Ant-like patterns.
 * Each pattern is transformed into an equivalent regular expression.
 * @private
 */
Bundler.prototype._createIncludeExcludePatterns = function() {
    for (var i = 0; i < this.excludes.length; i++) {
        var exclude = this.excludes[i];
        this._excludePatterns.push({
            builtin: false,
            pattern: exclude, 
            regexp: this._createRegExpFromAntPattern(exclude)
        });
    }
    for (var i = 0; i < this.includes.length; i++) {
        var include = this.includes[i];
        this._includePatterns.push({
            builtin: false,
            pattern: include, 
            regexp: this._createRegExpFromAntPattern(include)
        });
    }
};

/**
 * Adds a built-in exclude by means of an Apache Ant-like pattern.
 * The specified pattern is transformed into an equivalent regular
 * expression. This method is typically used from method
 * _setupBuiltInRules.
 * @private
 * 
 * @param {string} pattern Apache Ant-like pattern patter to add to
 * the excludes list are logged
 */
Bundler.prototype._addExclude = function(pattern) {
    this._excludePatterns.push({
        builtin: true,
        pattern: pattern, 
        regexp: this._createRegExpFromAntPattern(pattern)
    });
}

/**
 * Returnes a regular expression that is equivalent to the specified
 * Apache Ant pattern.
 * @private
 * 
 * @param {string} pattern the Apache Ant pattern to return a regular
 * expression for
 * 
 * @see http://ant.apache.org/manual/dirtasks.html#patterns
 */
Bundler.prototype._createRegExpFromAntPattern = function(pattern) {
    var p = pattern;
    // Replace each \ or / with path.sep
    p = p.replace(/[\/]/g, path.sep);
    // Replace all special characters except * and ?
    p = p.replace(/[\-\[\]\/\{\}\(\)\+\.\\\^\$\|]/g, "\\$&");
    // Replace each ? with [^\/]
    p = p.replace(/\?/g, '[^\\/]');
    // Replace each * with [^\/]*
    p = p.replace(/\*/g, '[^\\/]*');
    // Replace each [^\/]*[^\/]* with .* (support for **).
    p = p.replace(/(\[\^\\\/\]\*){2}/g, '.*');

    // If pattern ends with \ or /, append .* (support for xxx/**).
    if (/[\/]$/.test(pattern)) {
        p += '.*';
    }
    
    // Right-anchor at the end; append a $ character.
    p += '$';

    // If pattern starts NOT with **, left-anchor it by prepending
    // '^' + this.sourceDir + path.sep
    if (!/^\*\*/.test(pattern)) {
        p = '^' + this.sourceDir + '\\' + path.sep + p;
    }
    var flags = this.caseInsensitive ? 'i' : undefined;
    return new RegExp(p, flags);
};

/**
 * Adds an additional import statment for the module located at the
 * specified module path. Since this adds a <em>pre</em> import, the
 * resulting statement will be located before all other module or class
 * imports. Typically, this is used for globally required polyfills etc.
 * <p>
 * The optional module name parameter may contain any valid ES6 module
 * name definition, that is, anything between <code>import</code> and
 * <code>from</code>.
 * @private
 * 
 * @param {string} modulePath the path of the module
 * @param {string} [moduleName] the name of the imported module (may
 * contain everything between <code>import</code> and <code>from</code>)
 */
Bundler.prototype._addPreImport = function(modulePath, moduleName) {
    this._addImport(modulePath, moduleName, 'pre');
};

/**
 * Adds an additional import statment for the module located at the
 * specified module path. Since this adds a <em>pre</em> import, the
 * resulting statement will be located before all other module or class
 * imports. Typically, this is used for globally required polyfills etc.
 * <p>
 * The optional module name parameter may contain any valid ES6 module
 * name definition, that is, anything between <code>import</code> and
 * <code>from</code>.
 * @private
 * 
 * @param {string} modulePath the path of the module
 * @param {string} [moduleName] the name of the imported module (may
 * contain everything between <code>import</code> and <code>from</code>)
 */
Bundler.prototype._addPostImport = function(modulePath, moduleName) {
    this._addImport(modulePath, moduleName, 'post');
};

/**
 * Shared implementation for <code>_addPreImport</code> and
 * <code>_addPostImport</code>.
 * @private
 * 
 * @param {string} modulePath the path of the module
 * @param {string} moduleName the name of the imported module (may
 * contain everything between <code>import</code> and <code>from</code>)
 * @param {string} type 'pre' or 'post' (becomes part of the property name)
 */
Bundler.prototype._addImport = function(modulePath, moduleName, type) {
    modulePath = path.join(this.sourceDir, modulePath);
    var filename = modulePath;
    if (!filename.endsWith('.js')) {
        filename += '.js';
    }
    try {
        fs.statSync(filename);
    } catch (error) {
        log.warn(type + '-imported module \'' + modulePath + '\' not found');
    }

    var module = {
        name: moduleName,
        path: modulePath
    };
    if (path.sep !== this.pathSeparator) {
        module.path = module.path.replace(new RegExp('\\' + path.sep, 'g'),
            this.pathSeparator);
    }
    this['_' + type + 'Imports'].push(module);

    // Exclude this module's filename from additionally being processed
    // by _bundleDir.
    filename = filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var flags = this.caseInsensitive ? 'i' : undefined;
    this._excludePatterns.push({
        builtin: true,
        regexp: new RegExp('^' + filename + '$', flags)
    });
};

/**
 * Adds an <em>inline module</em>. An inline module is a, more or less,
 * constant definition, which is also exported from the master output file.
 * This method only stores the module's definition in this._inlineModules.
 * @private
 * 
 * @param {string} expression the definition/contents of the module
 * @param {string} moduleName the name of the module
 */
Bundler.prototype._addInlineModule = function(expression, moduleName) {
    this._inlineModules.push({
        name: moduleName,
        expression: expression
    });
};

/**
 * Adds the specified definition of a <em>hidden path</em> to an internal
 * list of hidden paths. The definiton consists of an Apache Ant-like pattern,
 * that defines the bottom end of the hidden path, and the number of levels
 * (aka segments) upwards, that together define the whole path.
 * @private
 * 
 * @param {string} pattern the Apache Ant-like pattern that defines the
 * bottom end of the hidden path
 * @param {Number} numSegments the number of path segments (levels), that
 * specify the number of parent directories to move up, in order to get at
 * the upper end of the path
 */
Bundler.prototype._hidePath = function(pattern, numSegments) {
    this._hidePathPatterns.push({
        path: this._createRegExpFromAntPattern(pattern),
        numSegments: numSegments
    });
};

/**
 * Processes the specified directory and returns all its sub-modules (sub-
 * directories) and class files.
 * @private
 * 
 * @param {string} dir directory to process
 * 
 * @returns {Object} an object that contains the sub-modules and class files
 * of the processed directory
 */
Bundler.prototype._bundleDir = function(dir) {
    var filenames = fs.readdirSync(dir);
    var directories = [];
    var files = [];
    
    var result = {
        modules: [],
        classes: [],
        invisibles: []
    };

    // Process all sub-directories and files in the specified directory.
    for (var i = 0; i < filenames.length; i++) {
        var filename = path.join(dir, filenames[i]),
            stat;
        try {
            stat = fs.statSync(filename);
        } catch(error) {
            throw error;
        }
        if (stat.isDirectory()) {
            directories.push(filename);
        } else if (stat.isFile()) {
            if (!this._isFileIncluded(filename)) {
                // Skip not included and/or excluded files.
                continue;
            }
            files.push(filename);
        }
    }

    var modulesWritten = [];
    for (var i = 0; i < directories.length; i++) {
        var directory = directories[i],
            data = this._bundleDir(directory);
        result = this._processInvisiblePaths(data, result);
        // Do not create a module file for empty directories.
        if (data.classes.length > 0 || data.modules.length > 0) {
            var parts = this._hiddenPathParts(directory);
            if (parts > 0) {
                result.invisibles.push({
                    parts: parts - 1,
                    modules: data.modules,
                    classes: data.classes
                });
                log.info('hiding path starting at \''
                        + this._logPath(directory) + '\' (' + parts
                        + ' levels up)');
                continue;
            }
            var moduleFilename = this._mangleModuleFilename(directory),
                module = this._writeFile(moduleFilename, data, modulesWritten);
            result.modules.push(module);
            modulesWritten.push(module.path);
        }
    }

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (modulesWritten.indexOf(file) != -1 || file === this._outputFileRel) {
            continue;
        }
        result.classes.push(file);
    }

    return result;
};

/**
 * Determines, whether the specified file was created by this tool. This
 * test is done by reading and checking the file's file header.
 * @private
 *
 * @param {string} filename the name of the file to test
 * 
 * @returns {boolean} <code>true</code> if the specified file was created
 * by this tool.
 */
Bundler.prototype._isOwnFile = function(filename) {
    try {
        // Reading only this._fileHeaderLength bytes would likely be
        // faster, but, at the time of writing, this required using
        // streams which have no sync methods.
        var bytes = fs.readFileSync(filename);
        return this._fileHeaderBytes.equals(
            bytes.slice(0, this._fileHeaderLength));
    } catch (error) {
        // On error, be conservative and return false.
        return false;
    }
};

/**
 * Processes the currently 'running' invisible path definitions for the
 * sub-directory, for which the specified data object was returned. This
 * method decides, whether the invisible path's modules and classes still
 * need to be pushed up, or, if the upper end of the invisible path has been
 * passed, those must now be written to a file.
 * @private
 * 
 * @param {Object} data the result data returned by _bundleDir for one
 * sub-directory
 * @param {Object} result the result to be returned by _bundleDir for the
 * current directory
 * 
 * @returns {Object} the object passed in the result parameter
 */
Bundler.prototype._processInvisiblePaths = function(data, result) {
    // Process every currently 'running' invisible path definition.
    for (var i = 0; i < data.invisibles.length; i++) {
        var invisible = data.invisibles[i];
        if (invisible.parts > 0) {
            // If there are still some parts/segments left, push up the
            // collected modules and classes (return back up in invisibles
            // property).
            invisible.parts--;
            if (result) {
                result.invisibles.push(invisible);
            }
        } else {
            // Otherwiese, add the pushed up modules and classes into data,
            // which gets processed in _bundleDir when this method returns.
            // Those are no longer pushed up, but are written to a file
            // together with the modules and classes collected in data.
            data.modules = invisible.modules.concat(data.modules);
            data.classes = invisible.classes.concat(data.classes);
        }
    }
    return result;
}

/**
 * Tests, whether the specified path is the bottom end of a hidden path and
 * returns its number of path segments. Reuturns <code>undefined</code>, if
 * no hidden path was found.
 * @private
 * 
 * @param {string} relpath the path to test
 * 
 * @returns {number} the number of segments of the hidden path found or
 * <code>undefined</code>, if none was found
 */
Bundler.prototype._hiddenPathParts = function(relpath) {
    for (var i = 0; i < this._hidePathPatterns.length; i++) {
        var hdp = this._hidePathPatterns[i];
        if (hdp.path.test(relpath)) {
            return hdp.numSegments;
        }
    }
};

Bundler.prototype._isFileIncluded = function (filename) {
    var included = this._isIncluded(filename);
    if (included && this._fileExtensionRegExp.test(filename)) {
        var excluded = this._isExcluded(filename);
        if (excluded) {
            if (this.verbose && typeof excluded === 'string') {
                log.info(excluded);
            }
            return false;
        }
        if (this.verbose && typeof included === 'string') {
            log.info(included);
        }
        return true;
    }
    return false;
}

/**
 * Determines wheter the specified path of a file or directory is included
 * explicitly by an include pattern. If no include patterns have been
 * specified, implicitly every path is included.
 * @private
 *
 * @param {string} filename the relative path of the file or directory to
 * test
 * 
 * @returns {boolean} <code>true</code>, if the specified relative path is
 * included; <code>false</code> otherwise
 */
Bundler.prototype._isIncluded = function (filename) {
    if (!this._includePatterns.length) {
        return true;
    }
    for (var i = 0; i < this._includePatterns.length; i++) {
        var item = this._includePatterns[i];
        if (item.regexp.test(filename)) {
            if (this.verbose) {
                var pattern = item.pattern;
                if (pattern) {
                    return ('including file \'' + this._logPath(filename)
                        + '\' due to pattern \'' + pattern + '\'');
                }
            }
            return true;
        }
    }
    return false;
};

/**
 * Determines wheter the specified path of a file or directory is excluded.
 * @private
 * 
 * @param {string} filename the relative path of the file or directory to
 * test
 * 
 * @returns {boolean} <code>true</code>, if the specified relative path is
 * excluded; <code>false</code> otherwise
 */
Bundler.prototype._isExcluded = function (filename) {
    for (var i = 0; i < this._excludePatterns.length; i++) {
        var item = this._excludePatterns[i];
        if (item.regexp.test(filename)) {
            if (this.verbose) {
                var pattern = item.pattern;
                if (pattern) {
                    return ('excluding file \'' + this._logPath(filename)
                        + '\' due to ' + (item.builtin ? 'built-in ' : '')
                        + 'pattern \'' + pattern + '\'');
                }
            }
            return true;
        }
    }
    return false;
};

/**
 * Mangles the specified module filename by adding the configured prefix,
 * suffix and extension to the filename. Optionally, the specified suffix,
 * used to prevent filename collisions, is appended. The returned path
 * contains the platform specific path separator for easy further internal
 * processing.
 * @private
 * 
 * @param {string} relpath the relative path to mangle
 * @param {any} [suffix] an additional identifier to append in order to
 * create an unique filename
 * 
 * @returns {string} the mangled module filename
 */
Bundler.prototype._mangleModuleFilename = function (relpath, suffix = '') {
    return path.dirname(relpath) + path.sep + this.filePrefix
        + path.basename(relpath) + suffix + this.fileSuffix
        + this.fileExtension;
};

/**
 * Writes a module file containing the imports and exports contained in
 * the specified data object. Optionally a list of files already written
 * is passed as third argument in order to prevent these from being
 * overwritten. The presence of the third parameter is used to identify the
 * file to be written as the master output file. Only for this file the
 * built-in pre- and post-imports as well as inline modules are processed.
 * @private
 * 
 * @param {string} filename the name of the file to write/create
 * @param {Object} data an object holding the modules and classes to import
 * and export
 * @param {Array} [modulesWritten] a list containing the filenames of already
 * written module files to prevent those from being overwritten
 * 
 * @returns {Object} an object containing both the name and path of the
 * module written
 */
Bundler.prototype._writeFile = function(filename, data, modulesWritten) {
    var newline = this.newline,
        indent = this.indentation,
        curdirStr = '.' + this.pathSeparator,
        importStr = '',
        exportStr = 'export {' + newline,
        modulename = path.basename(filename, this.fileExtension),
        masterFile = !(modulesWritten instanceof Array),
        first = true;

    if (!masterFile) {
        try {
            var i = 0;
            while (true) {
                var stat = fs.statSync(filename);
                if (modulesWritten.indexOf(filename) === -1
                        && stat.isFile() && this._isOwnFile(filename)) {
                    // It's not a newly created file, but it is a file and it
                    // was authored by this tool so, we can safely overwrite it.
                    break;
                }
                var origFilename = path.join(path.dirname(filename), modulename);
                filename = this._mangleModuleFilename(origFilename, '$' + (++i));
            }
        } catch (error) {
            if (error.code !== 'ENOENT') {
                log.error('failed accessing file \'' + filename + '\': ' + error.message);
                log.error('unable to continue processing');
                log.error('terminating!');
                process.exit(error.errno);
            }
            // If the file does not yet exist, we can carefreely create it.
        }
    }

    if (masterFile) {
        var preImports = this._preImports;
        for (var i = 0; i < preImports.length; i++) {
            var module = preImports[i];
            importStr += 'import ';
            if (module.name) {
                importStr += module.name + ' from ';
            }
            importStr += '\'' + curdirStr + this._makeRelative(filename, module.path)
                    + '\';' + newline;
        }
        if (preImports.length > 0) {
            importStr += newline;
        }
    }

    // Write imports for sub-modules (packages). The module list may contain
    // inline modules.
    var inlineModule;
    for (var i = 0; i < data.modules.length; i++) {
        var module = data.modules[i];
        if (module.path) {
            importStr += inlineModule === true ? newline : '';
            inlineModule = false;
            importStr += 'import * as ' + module.name + ' from \''  + curdirStr
                + this._makeRelative(filename, module.path) + '\';' + newline;
        } else if (module.expression) {
            importStr += inlineModule === false ? newline : '';
            inlineModule = true;
            importStr += 'const ' + module.name + ' = ' + module.expression + ';' + newline;
        }
        exportStr += first ? indent + module.name : ',' + newline + indent + module.name;
        first = false;
    }
    
    if (importStr.length && data.classes.length) {
        importStr += newline;
    }

    // Write imports for class modules (classes).
    for (var i = 0; i < data.classes.length; i++) {
        var classname = path.basename(data.classes[i], this.fileExtension);
        importStr += 'import ' + classname + ' from \'' + curdirStr 
                    + this._makeRelative(filename, data.classes[i]) + '\';' + newline;
        exportStr += first ? indent + classname : ',' + newline + indent + classname;
        first = false;
    }

    if (masterFile) {
        var postImports = this._postImports;
        if (postImports.length > 0) {
            importStr += newline;
        }
        for (var i = 0; i < postImports.length; i++) {
            var module = postImports[i];
            importStr += 'import ';
            if (module.name) {
                importStr += module.name + ' from '
            }
            importStr += '\'' + curdirStr + this._makeRelative(filename, module.path)
                    + '\;' + newline;
        }
    }

    importStr += newline;
    exportStr += newline + '};';

    if (this.verbose) {
        log.info('writing file \'' + this._logPath(filename) + '\'');
    }

    fs.writeFileSync(filename, this._fileHeaderBytes);
    fs.appendFileSync(filename, importStr);
    fs.appendFileSync(filename, exportStr);
    return {
        name: modulename,
        path: filename
    };
};

/**
 * Returns the specified path, transformed to be relative to the configured
 * source directory. This method is used for logging purposes.
 * @private
 * 
 * @param {string} relpath the path to log
 * 
 * @returns {string} the specified path, transformed to be relative to the
 * configured source directory
 */
Bundler.prototype._logPath = function(relpath) {
    return this._makeRelative(this.sourceDir, relpath, true);
};

/**
 * Returns the relative path from one directory ("from") to another ("to").
 * The returned path contains the configured path sparator.
 * @private
 * 
 * @param {string} from the filename, to whose directory the path to shall
 * be made relative to
 * @param {string} to the path to make relative to from
 * @param {boolean} [preserveExtension=false] a boolean value that
 * indicates, wheter the file extension shall be preserved
 * 
 * @returns {string} the relative path from the file's directory to module
 * path.
 */
Bundler.prototype._makeRelative = function(from, to, preserveExtension = false) {
    var result = path.relative(path.dirname(from), to)
        .replace(new RegExp('\\' + path.sep, 'g'), this.pathSeparator);
    return preserveExtension ? result : result.replace(
        this._fileExtensionRegExp, '');
};

// ----------------------------------------------- Command Line Interface (CLI)

// location of the (optional) config-file used, if no
// -c or --config-file option has been specified
const configFilename = APPL_NAME.endsWith('bundler')
        ? '.' + APPL_NAME + 'c' : CFG_NAME;

const definedArgs = {
    '-s': 'sourceDir',
    '-c': 'configFile',
    '-o': 'outputFile',
    '-h': 'help',
    '-v': 'verbose',
    '-q': 'quiet',

    '--help': 'help',
    '--clean': 'clean',
    '--verbose': 'verbose',
    '--quiet': 'quiet',

    '--src-dir': 'sourceDir',
    '--config-file': 'configFile',
    '--out-file': 'outputFile',

    '--file-prefix': 'filePrefix',
    '--file-suffix': 'fileSuffix',
    '--file-extension': 'fileExtension',

    '--path-separator': 'pathSeparator',
    '--indentation': 'indentation',
    '--newline': 'newline',

    '--includes': 'includes',
    '--excludes': 'excludes',
    '--case-insensitive': 'caseInsensitive'
};

function printHelp() {
    log.info(
`Usage: ${APPL_NAME} [options]

Options:
  -s, --src-dir=DIR          source directory to process
  -c, --config-file=FILE     alternate configuration file
  -o, --output-file=FILE     master output file (must not necessarily be
                             located under the source directory)

  -h, --help                 shows this help
      --clean                removes all files under DIR created by this tool
  -v, --verbose              output more messages
  -q, --quiet                prevent logging messages

      --file-prefix=PREFIX   file name prefix for created module files
      --file-suffix=SUFFIX   file name suffix for created module files
      --file-extension=EXT   file name extension for created module files
                             (defaults to '*.js')
      
      --path-separator=SEP   path separator used with import statements
                             (defaults to OS default)
      --indentation=INDENT   indentation characters used in created files 
                             (defaults to \\t)
      --newline=SEQ          line break character sequence used in created 
                             files (defaults to OS default)

      --includes=PATTERN     Apache Ant patterns of files to be included
                             (defaults to an empty list, including all files)
      --excludes=PATTERN     Apache Ant patterns of files to be excluded
                             (defaults to an empty list, excluding no files)
      --case-insensitive     Apache Ant patterns are case insensitive
`
    );
}

var opts = {};
opts.clean = false;
opts.includes = [];
opts.excludes = [];

// Parse command line arguments.
var args = process.argv.slice(2);
while(args.length) {
    var arg = args.shift(),
        key = definedArgs[arg];
    
    if (key === 'caseInsensitive') {
        opts.caseInsensitive = true;
        continue;
    }
    if (key === 'clean') {
        opts.clean = true;
        continue;
    }
    if (key === 'verbose') {
        opts.verbose = true;
        continue;
    }
    if (key === 'quiet') {
        opts.quiet = true;
        continue;
    }
    if (key === 'help') {
        printHelp();
        process.exit(0);
    }
    
    var value;
    if (!key) {
        log.error(APPL_NAME + ': unrecognized option »' + arg + '«');
        log.error('Try \'' + APPL_NAME + ' --help\' for more information.');
        process.exit(1);
    }
    var pos = key.indexOf('=');
    if (pos > 0) {
        value = key.substring(pos + 1);
        key = key.substring(0, pos - 1);
    } else {
        value = args.shift();
    }
    if (key === 'includes' || key === 'excludes') {
        opts[key] = opts[key].concat(value.split(/[, ]+/));
        continue;
    }
    opts[key] = value;
}

// Load the configuration file. If no alternate location was specified
// through the --config-file parameter, do not raise an error, if the
// file could not be loaded.
const configFile = opts.configFile || configFilename;
var configText;
try {
    configText = fs.readFileSync(configFile);
} catch (error) {
    if (opts.configFile) {
        log.error('failed reading specified configuration file \''
            + configFile + '\': ' + error.message);
        process.exit(2);
    }
}

var cfg;
try {
    if (configText) {
      cfg = JSON.parse(configText);
    }
}  catch (error) {
    log.error('failed parsing configuration file \''
        + configFile + '\': ' + error.message);
    process.exit(3);
}

delete cfg.clean;
for (var key in opts) {
    if (key === 'includes' || key === 'excludes') {
        if (typeof cfg[key] == 'string') {
            cfg[key] = cfg[key].split(/[, ]+/)
        }
        if (cfg[key] instanceof Array) {
            cfg[key] = cfg[key].concat(opts[key]);
            continue;
        }
    }
    cfg[key] = opts[key];
}
opts = cfg;

var start = Date.now();

var bundler = new Bundler(opts.sourceDir, opts.outputFile, opts);
bundler.run();

var time = (Date.now() - start) / 1000;
log.info('finished successfully in ' + time + 's');