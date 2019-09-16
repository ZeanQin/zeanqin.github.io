---
title: The definitive guide to C#
layout: post
use_toc: true
excerpt: This post contains some of the basic/important concpets that I find myself keeping coming back to. I will keep update this page as I learning about new things about C#.
---

|              | .NET              | .NET Core                 |
|:-------------|:------------------|:--------------------------|
| Platform     | Windows           | Linux, Mac, Windows, ARM  |

.NET and .NET Core are the programs that translates C# files into instructions for the CPU. They both contain, 
 - **_CLR (Common Language Rumtime)_** - the rumtime (or space) to run the programs in C#
 - **_FCL (Framework Class Library_** - also known as Base Class Library, the library to perform common activities such as communicate over the network over HTTP, manage files etc. 

The **_.NET Core SDK_** contains the CLR, FCL and other tools that make developing software easier.These tools include `dotnet`, the .NET CLI. The common commands are: 
- `dotnet new [options]` - scaffold a new project
- `dotnet add package <PACKAGE_NAME>` - add a NuGet package to the project
- `dotnet add reference <PROJECT_PATH>` - add a project-to-project reference to the project
- `dotnet restore` - restore dependencies i.e. NuGet packages
- `dotnet build` - compile the source code i.e. the C# compiler translates all `.cs` files into a `.dll` binary file (an assembly). Works on both the `.csproj` file and the `.sln` file.
- `dotnet run` - restore, build and run the project
- `dotnet <assembly.dll>` - run the assembly
- `dotnet test` - run unit tests using the test runner specified in the `.csproj` file. Also works on solution file i.e. `.sln`.
- `dotnet sln` - modify the solution file

A **project** is a collection of source code files that you want to put together into a single application or library that you write to share with other developers. You can create a new project using `dotnet new` from the command line.

Typical folders/files in a project, 
- `.csproj` - the project configration file. It contains reference to NuGet packages
- `bin/Debug/netcoreapp2.2` - binarry, debug and SDK version
- `obj/` - temporary files that are put together during the restore and build process
- other source files

**NuGet** is the package system for .NET and .NET Core. External packages are referenced in the `.csproj` file and can be restored using the `dotnet restore` command.

A **solution file** keeps track of multiple projects and is understood by Visual Studio or the .NET CLI i.e. `dotnet`. For example, `dotnet build` will build all projects in a solution and `dotnet test` will find all unit testing projects in the solution and run the unit tests. To create a solution file, run `dotnet new sln` at the top level of the collection of projects.

Keywords: 
- `static` - The static keyword associates members (i.e. methods or fields in a class) to the class rather than its instances (i.e. objects) of a class. Static fields are mostly used to track some global states across all objects of the same class. Static methods are usually behaviours that have nothing to do with specific objects of the class.  
- `internal` - Access modifier that makes a class only accessible inside a project. Good for internal classes that are implementation details of your project and you don't want to expose them publicly. The `public` modifier exposes a class to consumer of the project.


*Unit test* is testing a small unit of code, e.g. a method in a class, and verify that it's working as intended. The convention in C# is to create a separate project with the name _**<project_name>.Tests**_. A great side effect of writing unit tests is that it forces you to think about the design of your code. 

    Tip: if you try to describe what a class does or what a single method does, and you have to use a conjunction word like **_and_**, there is a chance that it's doing too many things. In this case, you should break your class or method up. 

## References vs Values
![](/assets/images/csharp/reference-type-vs-value-type.PNG)

    Tip: the keywords are "memory address".

In C#, when passing a variable to a method, we are always, 100% of the time, passing the parameter by value. It means, we always copy the value held by the variable, instead of the memory address of the variable. The held value could be a memory address if the variable holds a reference to an object or the actual value if variable holds the actual value. 

Passing a variable by its reference to a method allows (inside) that method to update the content of the variable. So, 
  - If the variable holds the memory address of some object, the method can change which object the variable is pointing to if it wants to, in addition to update the object.
  - If the variable holds a value, the method can update the value held by the varialbe. 

In C#, passing a variable by reference is achieved by using the `ref` keyword,  
```c#
var book = new Book("Book 1");
GetBookSetName(ref book);
```
```c#
void GetBookSetName(ref book)
{
    // your code here
}
```
or using the `out` keyword
```c#
var book = new Book("Book 1");
GetBookSetName(out book);
```
```c#
void GetBookSetName(out book)
{
    // out assumes the reference has not been initialised
    book = new Book();
}
```

Unlike `ref`, with the `out` keyword, the C# compiler assumes that the incoming reference has not been initialised. The compiler will give an error if the out parameter is not assigned in the `GetBookSetName` method. 

### How to tell if a varialbe is reference type or value type
A `class` type is a reference type and a `struct` type, including `double` (alias for `Double`), `DateTime`, `char` etc., is a value type. 

```
A `struct` is similar to a `class` in that it can have fields and methods. 
```

A `string` (alias for `String`) is a reference type but behaves like a value type. Like a value type, a `string` object is immutable and all of the methods on that object creates a copy of the original object. 

```
The CLR keeps track of all objects and varialbes. It knows if there are no fields or variables pointing to an object. And the garbage collector will deallocate that object to free up memory. 
```

Conventions
1. Use _PascalCase_ for public members i.e. methods, fields etc. of a class.

## Flow control
Execution always goes from top to bottom. Flow controls include, 
- `if` for branching,
- `foreach`, `do ... while`, `while`, `for` for looping
- `break`, `continue` for jumping statements
- `switch` for switching

```c#
// C# 7 and later supports switch with pattern matching
switch(a)
{
    case var aa when <predicate>: // aa will take on the value of a
        ...
        break;
    ...
    default: 
        ...
        break;
}
```
