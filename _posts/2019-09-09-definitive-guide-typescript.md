---
title: The definitive guide to TypeScript
layout: post
use_toc: true
use_code: true
excerpt: The definitive guide to TypeScript
---
> # This page is currently work in progress.

## The problem 

The main characteristics of JavaScript include encapsulation, messy code, and dynamic type system.

### Dynamic type system

In a dynamic type system, the same variable can be re-used to store a reference to objects of different types or store values of different types. 

```js
// An example of dynamic type

var person; // could be any type

person = "John Papa";
person.substring(1, 4);

person = 1;
person.substring(1, 4); // will cause an exception at runtime
```


The good: 
- variables can hold any type of object e.g. boolean, string, number, object literal etc. 
- Types determined on the fy
- Implicit type coercion (ex: string to number)
    ```js
    // will be true
    '1' == 1
    ```

The Bad:
- Difficult to ensure proper types are passed without tests
- Not all developers use `===` e.g. telling JavaScript to not coerce a type such as string `"1"` into a number `1`
- Enterprise-scale apps can have 1000s of lines of code to maintain. 

Solution for the problem include
 - Write better JavaScript and apply various patterns
 - TypeScript 
 - CoffeeScript 
 - Dart

One can write in Dart or CoffeeScript and output JavaScript. But TypeScript is JavaScript (a superset of JavaScript).

```
All programming languages are doing the same thing. But they exist on different layers. For example, both Java and .NET are one level above c and c++. c/c++ is above assembly, which is above machine code. 
```

## What is TypeScript
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. 

Ecosystem 
- Any broser,
- Any host such as node, 
- Any OS,
- Open source,
- Tool support e.g. Sublime, VS, VS Code etc.

Features: 
- Supports standard JavaScript code,
- Static typing so we can catch incorrect data types through either tooling, compilation process or after fact i.e. unit testing, 
- Encapsulation through classes and modules,
- Support for constructors, properties, functions, 
- Interfaces defining the mimimum members that a particular type must have
- Arrow functions `=>`
- Intellisense and syntax checking if using supported editor 

![](/assets/images/typescript/typescript-compilcation-process.PNG)

## Keywords and Operators
| Keyword                 | Description
|:------------------------|:-------------------------------------------------------|
| **declare**             | Creates an ambient declaration, meaning the variable doesn't exist in the current file but exists in somewhere else such as in a referenced library | 
| **class**               | Container for members such as properties and functions | 
| **constructor**         | Provides initialization functionality in a class |
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

Code Hierarchy in TypeScript is as following: 

![](/assets/images/typescript/code-hierarchy.PNG)

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
