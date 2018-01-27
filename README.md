# JSON Type Validation

A typescript library to perform type checking and validation on untyped JSON
data at runtime.

This library owes thanks to:
- [JsonDecoder](https://github.com/aische/JsonDecoder) by Daniel van den Eijkel
- [Type-safe JSON Decoder](https://github.com/ooesili/type-safe-json-decoder) by Wesley Merkel
- The Elm [Json.Decode](http://package.elm-lang.org/packages/elm-lang/core/latest/Json-Decode) API

## Installation

### With Nix

There exists some [Nix](https://nixos.org/nix) infrastructure that can be used
to reproduce a build environment exactly. A helper shell script lives at
`bin/jtv` that you can use to enter environments for multiple uses.
You'll need to follow the directions on the Nix website to install and use the
Nix package manager.

* To enter a shell suitable for building the library run `./bin/jtv
  build-shell`. This will leave you in the root of the project and automatically
  install any project and npm dependencies. You can run further yarn commands
  here.
* To build the library for distribution and exit you can run `./bin/jtv distribute`.
* To enter a build shell and run the build process, watching for changes, run
  `./bin/jtv build-watch`.
* To run an arbitrary command in a build environment use `./bin/jtv run
  COMMAND`. For example, `./bin/jtv run yarn test` will run the tests and exit.

## Motivation

TODO:
* `JSON.parse` has a return type of `any`
* It's up to the user to type the parsed json at runtime
* A naive approach can be dangerous
* Here's an alternative...
* ...and here's an example

```
import {Decoder, object, string, optional, number, boolean} from 'json-type-validation'

interface Pet {
  name: string;
  species: string;
  age?: number;
  isCute?: boolean;
}

petDecoder: Decoder<Pet> = object({
  name: string(),
  species: string(),
  age: optional(number()),
  isCute: optional(boolean())
})

const input: any = {name: 'Lyle', species: 'Crocodile', isCute: true}

const myPet: Pet = petDecoder.runWithException(input)
```

## Documentation

[Documentation](https://github.com/mojotech/json-type-validation/tree/master/docs).

The best places to start are with the examples in the `test/` directory, and the
documentation for
[Decoder](https://github.com/mojotech/json-type-validation/blob/master/docs/classes/_decoder_.decoder.md).
At some point you may need the documentation for
[Result](https://github.com/mojotech/json-type-validation/blob/master/docs/modules/_result_.md).

This library uses the [combinator pattern](https://wiki.haskell.org/Combinator_pattern)
to build decoders. The decoder primitives `string`, `number`, `boolean`,
`anyJson`, `constant`, `succeed`, and `fail` act as decoder building blocks that
each perform a simple decoding operation. The decoder combinators `object`,
`array`, `dict`, `optional`, `oneOf`, `union`, `withDefault`, `valueAt`, and
`lazy` take decoders as inputs, and combined the decoders into more complicated
structures. You can think of your own user-defined decoders as an extension of
these composable units.
