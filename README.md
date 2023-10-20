#A-transformer-transformer
The `a-transformer-transformer` is a tool that allows you to migrate your Angular `@Input()`which are of type
`boolean` to use the new `transform` property with the `booleanAttribute` transformer.

If you have `@Input` with existing decorator arguments for example (`@Input({required: true})`) the tool will merge them
with the `transform: booleanAttribute`.

## Installation
```bash
 npx a-transformer-transformer
```
