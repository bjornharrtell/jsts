### jsts-bundler

A tool to help in customizing the ES5 build of JSTS. Contributed by @cklein05.

#### General Structure
The tool is contained in a single JavaScript file, whose filename (without extension) provides both the tool's name and the name of its configuration file (if not otherwise specified by a command line option). That way, you could name the tool whatever you like. If its filename ends with `<something>bundler.js`, the config file name gets `.<something>bundlerc`. Otherwise, the config file name it is hard-coded to `.jsts-bundlerc`.

If no alternate configuration file has been specified by a command line option, the default configuration file is loaded from the tool's current working directory. If it's not found there, or cannot be opened for any other reason, the tool continues without using a configuration file.

The tool is coded in quite old-style JavaScript, not using any modern ES6 features (except parameter default values) and relies on Node's `require('xxx')` imports. However, the code generated is pure ES6-style, of course. That file contains a private class `Bundler`, which does most of the work. An instance of this class is used at the end of the file, after command line arguments have been processed and the configuration file was loaded.

#### Basic Concepts
Basically, the goal of the tool is to create the _intermediate module files_ required for building the all-in-one ES5 artifact, one for each sub-directory under `src`. Also, the so called _maser output file_ is created as well, however, the latter requires some special treatment (see below). In the tools terminology, the tool-generated files are called _modules_, the files that you have created are called _classes_.

As with your hand-coded ES5 files, the module files are named `<directory-name>.js`. However, there are cases for which this does not work, at least on Windows with it's case-insensitive file system. For example, in `org/locationtech/jts/algorithm`, there is a lower case sub-directory `distance`, as well as a class file `Distance.js`. On Windows, it's just not possible to create a file `distance.js` in the `algorithm` directory. When such a collision occurs, the tool chooses a different module file by appending some numbered suffix. However, this makes it even harder to know which files have been created automatically.

In order to solve this, the tool makes quite some effort to determine, what files have been created by the tool itself and what files can be overwritten, when the tool is run again. For this, each created module file it tagged by a hard-coded file header: (the filename in the header is not hard-coded, of course)
~~~javascript
// File created by jsts-bundler.js - Do not edit manually!
~~~
There is also a `--clean` option to remove all tool-created files, which relays on this tag header as well.

#### Features
Many aspects of the created module files can be configured, either by command line options or through the configuration file. The configuration file is a simple JSON file, that contains an object with a couple of properties. Have a look at the options:

Configuration File | Command Line Option | Description| Default Value
--------------------|---------------------------|-------------|--------------
`-s, --src-dir=DIR` | `"sourceDir": DIR` | source directory to process |
`-c, --config-file=FILE` | _not supported_ | alternate configuration file |
`-o, --output-file=FILE` | `"outputFile": FILE` | master output file (must not necessarily be located under the source directory) |
|||
`-h, --help` | _not supported_ | show this help |
`--clean` | _not supported_ | removes all files under DIR created by this tool |
`-v, --verbose` | `"verbose": true` | output more messages | `false`
`-q, --quiet` | `"quiet": true` | prevent logging messages | `false`
|||
`--file-prefix=PREFIX` | `"filePrefix": PREFIX` | file name prefix for created module files | `''`
`--file-suffix=SUFFIX` | `"fileSuffix": SUFFIX` | file name suffix for created module files | `''`
`--file-extension=EXT` | `"fileExtension": EXT` | file name extension for created module files | `'.js'`
|||
`--path-separator=SEP` | `"pathSeparator": SEP` | path separator used with import statements | OS default
`--indentation=INDENT` | `"indentation": INDENT` | indentation characters used in created files | `'\t'`
`--newline=NEWLINE` | `"newline": NEWLINE` | line break character sequence used in created files | OS default
|||
`--includes=PATTERN` | `"includes": PATTERN` or an Array thereof | Apache Ant like patterns to define included files | empty list (includes all files)
`--excludes=PATTERN` | `"excludes": PATTERN` or an Array thereof | Apache Ant like patterns to define excluded files | empty list (excludes no files)
`--case-insensitive` | `"caseInsensitive":  true` | Apache Ant like patterns are case-insensitive | `false`
...................................................|......................................................| |..........................

Most of the options should be quite self-explanatory.

#### Including/Excluding Files
All files, that are not created by the tool itself, are considered public classes, that all get imported and exported. If that is wrong for a certain source file, it _must_ be excluded. The tool's include/exclude mechanism is almost the same as that known from Apache Ant. Also, the patterns are in Apache Ant style. In string form (e.g. with the `--excludes` command line parameter), the string is split into separate patterns at comma or space characters. So, as with Ant, it is not possible, to work with files, that contain those delimiter characters.

However, the `includes` and `excludes` properties in the configuration file may be string arrays, one element for each pattern. In that case, no splitting and so, no special treatment of space and comma characters is in place. On the command line, options `--includes` and `--excludes` can both be specified several times.

The specified patterns are relative to the specified source directory. That is, files located directly in `src/` can be excluded using a pattern `MyExcludedFile.js`, for example.

Without any configuration, no files are excluded. Including and excluding, however, only has an effect on which classes are publicly available. Since classes required by other classes, are always still imported by the latter ones, no classes will actually be missing when being excluded.

#### External vs. Internal excludes/includes Rules
I recommend to leave the configurable includes/excludes rules up to the user, that likes to build his own version of the ES5 artifact. So, files needed to be excluded due to the fact, that those are no real public classes, should be defined internally. Also, Java classes, that are not public in JTS (if any) should be excluded programmatically. For my mind, the goal is to create a working ES5 artifact, providing access to all classes, that are public in JTS without any further configuration required.

Since there are many other exceptional cases with the master output file, the tool has the concept of _built-in rules_. This covers file exclusion as well as other required features.

#### Built-in Rules
In the master output file, there are lines, that cannot be created by just following the simple pattern of including classes and sub-modules (sub-packages), which can be used for building module files.

At the beginning of the file, there are imports, that are required by all other files. Those likely contain polyfills for making the following code work properly. Also, there is an import for file `org/locationtech/jts/monkey.js`, which shall follow the import statements of all other files, since it works on the code already loaded. Finally, there is an exported constant `version`, which has literal content.

For each of these cases, as well for excluding files programmatically, there are some private methods available in the `Bundler` class. Those should typically only be invoked in private method `_setupBuiltInRules`, which is called at the end of `Bundler`'s constructor function. Since most of the calls are self-explaining, have a quick look at this method:
~~~javascript
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
};
~~~
Here are some explaining word for each of the methods:

Method| Description
---------|-------------
`_addExclude(pattern)` | Like the `excludes` option, adds another Apache Ant pattern to the excludes list. The pattern is relative to the specified source directory.
`_addPreImport(modulePath, [moduleName])` | Emits an import statement _before_ importing auto-generated module files. The imported modules are implicitly excluded from the class detection process.
`_addPostImport(modulePath, [moduleName])` | Emits an import statement _after_ importing auto-generated module files. The imported modules are implicitly excluded from the class detection process.
`_addInlineModule(content, moduleName)` | Creates an exported constant `moduleName`, to which `content` is assigned.
`_hidePath(pattern, levels)` | Hides `levels` parent directories, starting from the path found by the specified Apache Ant pattern. The pattern is relative to the specified source directory.

Actually, that is the place where you may have some maintenance effort in the future. Additional imports (pre or post) must be maintained, as well as the list of non-class modules, which all must be excluded. However, I do not expect that many changes are required in the near future.

Let me finally explain the option to _hide_ paths. If you plan to have a look at path hiding feature's implementation (you don't want that), it is good to know, that these paths internally are also called _invisible paths_ or just _invisibles_. For many good reasons, this option is not configurable, but only available through built-in rules.

Hiding a path works like you did it for the `org/locationtech/jts` path in your hand-coded source files. All files below that path are directly imported into the file that is located at (used for) the upper end of the hidden path. In that case, since the `org` directory is located directly in `src`, that is the master output file. There will be no module files for all these three directories.

However, this feature also works for several hidden (invisible) paths, which could even overlap each other. Imagine some classes A and B beneath the not hidden `org/apache/whatever`. Then, there will be a module file for the `org` directory, which, however, only contains the `apache` sub-module (and somewhere below that the classes A and B).

Basically, that feature works like so: the Apache Ant pattern is used to detect the bottom end of a hidden path. That pattern could as well be relative like in `**/unit/tests`, which finds all `tests` directories under `unit` directories. The specified level then defines, how many levels the modules and classes found in `tests` are _pushed up_ before they are written to a module file (or to the master output file, if the upper end of the source tree was reached).

So, the levels specified must not necessarily be smaller or equal than the number of directories explicitly present in the pattern. In the above case, specifying 3, would hide both paths `tomcat/unit/tests`, `molly/unit/tests`, both `tomcat` and `molly` located somewhere in the source tree.

However, if the specified levels is too large, that is, the upper end of the hidden path is located above the source directory, the pushed up modules and classes are actually never written to any file and so, are actually excluded. For example, if you pass 4 as `levels` for `org/locationtech/jts`, you'll end up with no classes actually published in the final artifact.

Another caveat is, that if pushed up modules and classes are actually written to a file at the upper end of a hidden path, no attempt is made to check, whether the module names collide with other module names already present in that file.

I'm not sure, whether I shall recommend diving into this feature's implementation :-)

#### Statistics
Although there is no special performance optimization, the tool bundles all classes, including those under `java`, in about 700 ms on a typical Intel Core i5 machine.

Have a look at the different code sizes, after running _rollup_ and _uglifyjs_:

ES5 Artifact | Size of jsts.js | in % | Size of jsts.min.js | in %
-------------|---------------|-------|--------------------|-----
Current official version | 818 KB | 100% | 462 KB | 100%
All classes exposed version | 1061 KB | ~130% | 599 KB | ~130%

Actually, the code sizes for both the plain and the minimized file is increased by about 30%.