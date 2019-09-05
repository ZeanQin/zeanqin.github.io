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
- `dotnet add` - add a NuGet package to the project
- `dotnet restore` - restore dependencies i.e. NuGet packages
- `dotnet build` - compile the source code i.e. the C# compiler translates all `.cs` files into a `.dll` binary file (an assembly). 
- `dotnet run` - restore, build and run the project
- `dotnet <assembly.dll>` - run the assembly
- `dotnet test` - run unit tests using the test runner specified in the `.csproj` file

A **project** is a collection of source code files that you want to put together into a single application or library that you write to share with other developers. You can create a new project using `dotnet new` from the command line.

Typical folders/files in a project, 
- `.csproj` - the project configration file. It contains reference to NuGet packages
- `bin/Debug/netcoreapp2.2` - binarry, debug and SDK version
- `obj/` - temporary files that are put together during the restore and build process
- other source files

**NuGet** is the package system for .NET and .NET Core. External packages are referenced in the `.csproj` file and can be restored using the `dotnet restore` command.

Keywords: 
- `static` - The static keyword associates members (i.e. methods or fields in a class) to the class rather than its instances (i.e. objects) of a class. Static fields are mostly used to track some global states across all objects of the same class. Static methods are usually behaviours that have nothing to do with specific objects of the class.  
- `internal`


*Unit test* is testing a small unit of code, e.g. a method in a class, and verify that it's working as intended. The convention in C# is to create a separate project with the name _**<project_name>.Tests**_.