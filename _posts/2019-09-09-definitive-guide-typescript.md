---
title: The definitive guide to TypeScript
layout: post
use_toc: true
use_code: true
comments: true
excerpt: The definitive guide to TypeScript
---

## The problems with JavaScript

The main characteristics of JavaScript include encapsulation, messy code, and dynamic type system.

### Dynamic type system

In a dynamic type system, the same variable can be re-used to store a reference to objects of different types or store values of different types.

```js
/**
 *  An example of dynamic type.
 */

var person; // could be any type

person = "John Papa";
person.substring(1, 4);

person = 1;
person.substring(1, 4); // will cause an exception at runtime
```

The good:

- Variables can hold any type of object e.g. boolean, string, number, object literal etc..
- Types determined on the fly.
- Implicit type coercion (ex: string to number)

    ```js
    '1' == 1 // will be true
    ```

The Bad:

- Difficult to ensure proper types are passed without tests.
- Not all developers use `===` e.g. telling JavaScript not to coerce a type such as converting string `"1"` into a number `1`.
- Enterprise-scale apps can have 1000s of lines of code to maintain.

Solution for the problem include,

- writing better JavaScript code and applying various patterns,
- writing in TypeScript,
- writing in CoffeeScript, or
- writing in Dart.

One can write in Dart or CoffeeScript and output JavaScript. But TypeScript is JavaScript (a superset of JavaScript).

> All programming languages are doing the same thing, but they exist on different layers. For example, both Java and C# are one level above C and C++. C/C++ is above assembly, which is above machine code.

## What is TypeScript

_TypeScript is a typed superset of JavaScript that compiles to plain JavaScript_. TypeScript is not a totally separate language; it's a language built on top of JavaScript, by adding new features and additional key words.

Some key TypeScript features include,

- supports standard JavaScript code,
- provides static typing so we can catch incorrect data types through tooling (e.g. red lines in editor), compilation process or after fact (e.g. unit testing),
- provides encapsulation through classes and containers i.e. modules,
- supports for constructors, variables, properties and functions,
- supports interfaces to define the mimimum members that a particular type must have,
- supports arrow functions `=>`,
- enables intellisense and syntax checking if using supported editor.

The TypeScript compiler is what converts TypeScript code into plain JavaScript code, and it works as below,

![TypeScript compiler](/assets/images/typescript/typescript-compilcation-process.PNG)

## Some keywords and operators in TypeScript

| Keyword                 | Description
|:------------------------|:-------------------------------------------------------|
| **declare**             | Creates an ambient declaration, meaning the variable doesn't exist in the current file but exists in somewhere else such as in a referenced library |
| **class**               | Container for members such as properties and functions |
| **constructor**         | Provides initialisation functionality in a class |
| **exports**             | Export a member from a module |
| **extends**             | Extend a class or interface |
| **implements**          | Implement an interface |
| **imports**             | Import a module |
| **interface**           | Defnes code contract that can be implemented by types |
| **module / namespace**  | Naming container for classes and other code. namespace is preferred over module |
| **public/private**      | Member visibility modifers |
| **…**                   | Rest parameter syntax |
| **=>**                  | Arrow syntax used with defnitions and functions |
| **< typeName>**         | < > characters use to cast/convert between types |
| **:**                   | Separator between variable/parameter names and types |

```ts
/** Example ambient declaration*/

//  Reference the types file
/// <reference path="jquery.d.ts">  

declare var $ // meaning the dollar sign is not in this file, but it's coming from somewhere else, in this case, the jquery typings file

$("div").text("hi");
```

The code hierarchy in TypeScript is as following:

![TypeScript code hierarchy](/assets/images/typescript/code-hierarchy.PNG)

## Tooling and Framework Options

- Node.js (server side framework)
- Sublime, Emacs, Vi, VS (including auto compling into JavaScript upon saving a TypeScript file), VS Code, Atom, and WebStorm

### Type inference

Type inference

```ts
var num = 2; // num has the type number
var num; // num has the type any, which is the base type for all types
```

Explicit type (recommended)

```ts
var num: number = 2;
var num: number;
```

### Defining the type

```ts
// for a variable
var a: number = 2;
```

```ts
// for a function
// TODO: this doesn't seem to be correct
foo: (a: string, b: number) => void
= function(aliasForA, aliasForB)
{

}
```

`tsc` commands

- `tsc --init` - creates a `.tsconfig.json` file
- `tsc -w` - watch input files
