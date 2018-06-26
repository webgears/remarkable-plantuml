# remarkable-plantuml

PlantUML Plugin for Remarkable.js for use with docusaurus

This package requires the `fs` package to read the content of the plantuml files. It's therefore not possible to use it inside of
the browser.

## Install

```
yarn add remarkable-plantuml
```

## Usage

### Use with files

Register this plugin and link your plantuml files as in image in your markdown files

```md
![Some Diagram](/path/to/file.puml)
```

The path to file has to be correct for the node process that builds the files. It will read the content of the file and create
a plantuml server link for it.

For example if you have the following file

```
@startuml
Bob -> Alice : hello
@enduml
```

and link it as

```md
![Diagram 1](/path/to/diagram.puml)
```

it will be replaced with

```md
![Diagram 1](http://www.plantuml.com/plantuml/png/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000)
```

and shown as

![](http://www.plantuml.com/plantuml/png/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000)

### Use with inline scripts

When you add snippets like the one below it will automatically be replaced with an embedded image.

    ```uml
    @startuml
    Bob -> Alice : hello
    @enduml
    ```

```md
![Diagram 1](http://www.plantuml.com/plantuml/png/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000)
```

and shown as

![Diagram 1](http://www.plantuml.com/plantuml/png/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000)

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
* `base_path` - Base path for all files. Default: empty string
* `inline_type` - Defines what code blocks will be converted to diagrams. Default: `uml`
