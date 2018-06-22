# remarkable-plantuml

PlantUML Plugin for Remarkable.js for use with docusaurus

This package requires the `fs` package to read the content of the plantuml files. It's therefore not possible to use it inside of
the browser.

## Install

```
yarn add remarkable-plantuml
```
## Usage

Register this plugin and link your plantuml files as in image in your markdown files

```md
![Some Diagram](/path/to/file.puml)
```

The path to file has to be correct for the node process that builds the files. It will read the content of the file and create
a plantuml server link for it.

### Register Plugin with Docusaurus

```
// siteConfig.js
// ...
  markdownPlugins: [
    (md) => {
      require('remarkable-plantuml')(md, {base_path: './static'});
    }
  ]
// ...
```

### Options


* `url` - The plantuml server link. Default: `http://www.plantuml.com/plantuml/`
* `format` - Diagram format. Default: `png`
* `base_path` - Base path for all files. Default: ``
```
