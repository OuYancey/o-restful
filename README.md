# o-restful

> Node.js(TypeScript) + MongoDB

## Project Structure

### Top Level Project Structure

| Name | Description |
| ------------------| --------------------------------------------------------------------------------------------- |
| **dist**          | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**  | Contains all your npm dependencies                                                            |
| **public**        | Static assets that will be used client side                                                   |
| **src**           | Contains your source code that will be compiled to the dist dir                               |
| package.json      | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json     | Config settings for compiling server code written in TypeScript                               |
| tslint.json       | Config settings for TSLint code style checking                                                |

### Src Project Structure

I use namespace for the target module, the file name style was just follow angular's. <br>
Something like `route` `controller` `model`, was format to `[module name].route.ts` `[module name].controller.ts` and so on. <br>

| Name | Description |
| ------------------| -------------------------------- |
| **src/bingImage** | Contains the bing images module  |
| **src/common**    | Contains the common code         |
| **src/config**    | Config settings for the server   |
| src/server.ts     | Source root code                 |

## Commit Message

| Name | Description |
| -------- | ------------------------------------------ |
| feat     | New feature                                |
| fix      | Fix bugs                                   |
| docs     | Update documentations                      |
| style    | Code style                                 |
| refactor | Refactor code, not new feature             |
| chore    | Build tools or other support tools changed |

## Reference

- [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter)

## TODO

- refactor to Typescript
