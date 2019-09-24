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
 string[] daysOfWeek =  // omitting the type on the right hand side only works with arrays. For all other collection types, the type definition is required, see below. 
            {
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            };
 string[] daysOfWeek1 = new string[] 
            {
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
Characteristics
- No fixed size

Initialising a list
```csharp
List<string> daysOfWeek = new List<string>();

List<string> daysOfWeek = new List<string> 
{
    "Monday", 
    "Tuesday", 
    // ...
}
```

## Dictionary
A bag (no order) of key-value pairs. Type definition is `Dictionary<TKey, TValue>`
Initialising a dictionary.
```csharp
Dictionary<string, Country> countries = new Dictionary<string, Country>();

Dictionary<string, Country> countries = new Dictionary<string, Country>
{
    {key, value},
    {key, value}
}
```


## Comparision

|         | Array | List<T> | Dictionary<TKey, Tvalue>  | 
|:-------------|:------------------|:------| :------|
| Size           | Fixed size | Not fixed size  | 
| Initialisation | Start with fixed size of default values   | Start empty and add items dynamically. Even for `List<string> daysOfWeek = new List<string> { "Monday", "Tuesday" // ... }`, the compiler still initialises an empty list and call `Add()` for each item. i.e. it's just a syntactic sugar.  | Start with empty dictionary then add items to it. 
| Type syntax           | `string[]` This is because array is part of the .NET runtime and therefore has its own syntax.        | `List<string>`. It's just a normal type defined in the framework library and therefore follows the normal C# syntax.  | `Dictionary<TKey, TValue>` 
| Characteristics           | Simpler syntax | More flexible  |
| Check the number of items           | `Length` property | `Count` property  | `Count` property
| Efficiency           | Occupies a continouse chunck of memory. Suuports random access of items | Also occupies a continous chunk of memory. `Add()` or `Remove()` item near the front of the list can be expensive because it does copy and paste all following items. Also support random access of items. | Fast read
| Look up/replace an item           | `[index]` | `[index]` | `[key]`

### Reflections: 
- Use array when the number of items is known. 
- Use list when the number of items is not known and there are not many insert/remove operations
- Use dictionary if random access is important and order is not important