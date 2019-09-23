---
title: C# collections
layout: post
use_toc: true
excerpt: C# collection basics
---

## What is Collection? 
A collection is a type whose purpose is to group data together and let you deal with lots of objects at the same time. 

Basic terminologies:
- The object or struct in a collection is called an `element` or `item`.
- `Enumerate` or `Iterate` a collection is the process of going through each item in turn. 
- `Look up an item` means accessing an individual item in a collection.

## Array 
### Characteristics:
- fixed size
- ordered

Arrays are always reference types. 

Initialising an array
```csharp
// using a collection initialiser if you already know the items in the array
 string[] daysOfWeek = {
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            };
 string[] daysOfWeek1 = new string[] {
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            };

// instantiate array without knowing its elements
// A default value is set for each item. The default value is different depending on the type of that element e.g. `null` for reference type, `0` for int type etc. 
Country[] countries = new Country[10];
```

The `params` keyword instructs the C# compiler to generate code to construct an array. For example, 
```csharp
public void Foo(params char[] test ) {};

// The following two are the same
Foo('a', 'b');
Foo(new char[] {'a', 'b'})
```


## List 

## Dictionary