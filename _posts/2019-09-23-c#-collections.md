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
| Multiple indices for an element           | Yes, `[index1, index2]` i.e. multidimensional array | No | No

### Reflections: 
- Use array when the number of items is known. 
- Use list when the number of items is not known and there are not many insert/remove operations
- Use dictionary if random access is important and order is not important

Microsoft designed `foreach` loop to be read only; use `for` for updating a collection.


## LINQ
LINQ is for _reading_ data only. 

## Collection of collections

- `jagged array` is an array in which every element is an array, i.e. array of arrays `T[][]`
- `multidimensional array` is just one simple plain array that require multiple indices to access an element `T[,]`

```csharp
// Jagged array
int[][] foo = 
{
    new int[3],
    new int[3],
    new int[3],
}

// multidimensional array
int[,] = new int[3, 3]
```

Other collection types: 
- Array is _*not*_ a standard generic collection. It's uniquely baked into the .NET runtime. This gives them special syntax etc. 
 - `Standard generic collections` are usually found in `System.Collections.Generic` such as `List<T>`, `Dictionary<TKey, TValue>`, SortedDictionary, SortedList, LinkedList
  - `System.Collections.ObjectModel` usually contains collections for building custom collections. For example, the ObservableCollection is built on top of ObjectModel types. 
  - Immutable collections i.e. collections that can't be modified once instantiated. Most collections have their immutable counter parts e.g. `ImmutableArray`, `ImmutableList`, `ImmutableDictionary` etc. These are natually thread safe because they can never be modifed once they are created. 
  - Concurrent collections are similar to standard collections but are thread-safe. Arrays and all other collections are designed to be used by one thread at a time. 

## Collection Interfaces
  - `IEnumerable<T>` - All collections implement `IEnumerable<T>` that allows a collection to act as a data source. `LINQ` and `foreach` rely heavily on the interface. 
  - `IList<T>` - Implemented by types such as `T[][]` `List<T>` etc, this interface provides functions such as enumerate, look up by index, modify by index etc. 