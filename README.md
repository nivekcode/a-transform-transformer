# A-transformer-transformer

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

The `a-transformer-transformer` is a tool that allows you to migrate your Angular `@Input()`which are of type
`boolean` or `number` to use the new `transform` property with the `booleanAttribute` or the `numberAttribute`
transformer.

If you have `@Input` with existing decorator arguments for example (`@Input({required: true})`) the tool will merge them
with the `transform: booleanAttribute`.

## Installation

The package can either be installed locally inside your project as a dev dependency or globally. Since its a one time
migration tool we think its best used with `npx` though.

### Local

```bash
 npm i -D a-transformer-transformer
```

### Global

```bash
 npm i -g a-transformer-transformer
```

### npx

```bash
 npx a-transformer-transformer
```

## Usage

To use the transformer just execute one of the following commands inside the root of your project.

### Transform boolean

The transformer currently offers the option to add `{transform: booleanAttribute}` to your `@Input()` of type `boolean`. To do so you have to run the following command.

```bash
npx a-transformer-transformer -b
```

### Transform numbers

The transformer currently offers the option to add `{transform: numberAttribute}` to your `@Input()` of type `number`. To do so you have to run the following command.

```bash
npx a-transformer-transformer -n
```

### Help

To get a list of all the available options you can always run the following command.

```bash
npx a-transformer-transformer -h
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@kevinkreuzer"><img src="https://avatars.githubusercontent.com/u/5468954?v=4?s=100" width="100px;" alt="Nivek"/><br /><sub><b>Nivek</b></sub></a><br /><a href="https://github.com/kreuzerk/a-transform-transformer/commits?author=kreuzerk" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!
