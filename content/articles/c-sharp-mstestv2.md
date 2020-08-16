---
title: C# - Automated Testing with MSTest V2
excerpt: Unit test in C# using MSTest V2.

# Optional
category: Programming Language
tags: 
  - C#
  - Automated Unit Tests
  - MSTest V2
createdAt: "2019-09-28T14:00:00.000Z"
updatedAt: "2020-08-16T05:27:19.317Z"
enableComments: true
enableTOC: true
---

## The benefits of automated tests

- Find (and fix) errors sooner
- Free to execute as often as required
- Quick to execute (versus manual testing)
- Generally more repeatable (versus manual)
- Execution flexibility:
  - Run on demand
  - As part of continuous integration
  - On a schedule (e.g. overnight)

## MSTest Overview

The high level components of MSTest are:

- **Attributes** are used in the code to mark methods as test methods.
- **Asserts** allow us to check the expected values are received from the production code.
- **Test runners** look through the code, look for specific test attributes that mark methods as tests and execute those methods. It also reports the outcome of tests, for example, whether a test passed or failed. These can include free test runners and 3rd party commercial test runners.

NuGet Packages

- `MSTest.TestFramework` includes,
  - Attributes,
  - Assert methods,
  - Data driven tests,
  - Extensibility points

- `MSTest.TestAdapter` allows us to,
  - discover MSTest-based tests such as `[TestMethod]` etc.,
  - execute tests

## Conventions

1. The test project should be named `<ProjectName>.Tests` where `<ProjectName>` is the name of the project that you are writing tests for.
2. Each test file and the class in it should be named as `<ClassName>Should.cs` and each test method name should describe the goal of the test such as `public void BeInExperiencedWhenNew() {}`

```csharp
[TestClass]
public class PlayerShould
{
   [TestMethod]
   public void BeInExpierencedWhenNew()
   {
      // ...
   }
}
```

## Asserts

The different types of asserts are,

- General purpose asserts, i.e. the static methods in `Assert`,
- Specialised string asserts, i.e. the static methods in `StringAssert`,
- Specialised collection asserts, i.e. the static methods in `CollectionAssert`
- Exception, type, and reference asserts
- Custom asserts

## Controlling and customising test execution

### Test categorisation

We can set a category on a test method or a test class. Multiple categories can be applied to a test method/class. When a category is set for a class, all test methods in that class are added to that category.

```csharp
[TestMethod]
[TestCategory("Player defaults")] // set a category for a test
[TestCategory("Another category")] // set a category for a test
public void BeInexperiencedWhenNew()
{

}
```

To run tests in a category, use `dotnet test --filter="TestCategory=Player defaults"`. To run tests in multiple categories, use `dotnet test --filter="TestCategory=Player defaults|TestCategory=Another category"`

To run tests in a class, use `dotnet test --filter="ClassName=<Namespace>.<ClassName>"`

### Ingore tests

Use the `Ignore` attribute to temporarily ignore a test method.

```csharp
[TestMethod]
[Ignore("Because ... ")] // ignore test method with a reason
public void BeNice()
{
   // ...
}
```

### Output additional messages

We can use `Console.WriteLine()` inside test methods to output additional messages. To see the messages, run `dotnet run -v n`

### Run additional code during the test execution lifecycle

We can add additional methods that will be run automatically for us by MSTest. These methods can be used to run set up code or clean up code.

```csharp
[TestClass]
public class LifeCycle
{

   /*
   * Run this method before any test method in this assembly runs.
   *
   * The method has to be static and passes the TestContext object as parameter.
   */
   [AssemblyInitialize]
   public static void AssemblyInit(TestContext context) {}

   /*
   * Run this code only once before any test method runs.
   *
   * This method has to be static and accepts the TestContext object as parameter.
   */
   [ClassInitialize]
   public static void LifeCycleClassInit(TestContext context) {}

   /*
   * Run this code before each and every test method runs.
   */
   [TestInitialize]
   public void LifeCycleInit() {}

   /*
   * Run this test method after each and every test method runs.
   */
   [TestCleanup]
   public void LifeCycleInit() {}

   /*
   * Run this code after all test methods have finished running.
   *
   * This method has to be static and accepts the TestContext object as parameter.
   */
   [ClassCleanup]
   public static void LifeCycleClassInit(TestContext context) {}

   /*
   * Run this method after all test methods in this assembly have finished running.
   *
   * The method has to be static and passes the TestContext object as parameter.
   */
   [AssemblyCleanup]
   public static void AssemblyCleanup(TestContext context) {}

   [TestMethod]
   public void Test1() {}

   [TestMethod]
   public void Test2() {}
}
```

### Share object between tests

Some object might take a long time to create. We can create one object and share it between tests.

```csharp
[TestClass]
public class Foo
{
   static string SomeExpensiveObject;

   [ClassInitialize]
   public static void Bar(TestContext context)
   {
      SomeExpensiveOjbect = // create object
   }
}
```

## Data-driven Tests

### Benefits

- Reduce duplicated tests and associated maintenance costs. i.e. instead of having 10 similar test methods testing the same function with different data, we can keep only one of the test methods, run it multiple times with a set of test data we specify.  
- Reuse the same test data sets across multiple test methods or test classes.
- External non-developers can create test data

### Example 1: specify test data for one test method

```csharp
// The attribute tells mstest that we want to execute the method multiple times with different test data
[DataTestMethod]
[DataRow(1, 99)]
[DataRow(2, 98)]
[DataRow(3, 97)]
public void Foo(int input, int expectedValue)
{
   var bar = new Bar();
   var actualOutput = bar.take(input);
   Assert.AreEqual(expectedValue, actualOutput);
}
```

### Example 2: centralise test data into a static getter

```csharp
[TestClass]
public class Foo
{
   /*
    * Static getter for generate test data
    */
   public static IEnumerable<object[]> Damages
   {
      get
      {
         return new List<object[]>
         {
            new object[] { 1, 99 },
            new object[] { 2, 98 },
            new object[] { 3, 97 },
         };
      }
   }

   [DataTestMethod]
   [DynamicData(nameof(Damages))] // the attribute allows us to choose a property that returns the test data
   public void Foo(int input, int expectedValue)
   {
      var bar = new Bar();
      var actualOutput = bar.take(input);
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

### Example 3: centralise test data into a static method

```csharp
[TestClass]
public class Foo
{
   /*
    * Static method for generate test data
    */
   public static IEnumerable<object[]> GetDamages
   {
      return new List<object[]>
      {
         new object[] { 1, 99 },
         new object[] { 2, 98 },
         new object[] { 3, 97 },
      };
   }

   [DataTestMethod]
   [DynamicData(nameof(GetDamages), DynamicDataSourceType.Method)] // the attribute allows us to choose a method that returns the test data
   public void Foo(int input, int expectedValue)
   {
      var bar = new Bar();
      var actualOutput = bar.take(input);
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

### Example 4: centralise test data into a static method in a different class

```csharp
public class Data
{
   public static IEnumerable<object[]> GetDamages
   {
      return new List<object[]>
      {
         new object[] { 1, 99 },
         new object[] { 2, 98 },
         new object[] { 3, 97 },
      };
   }
}

[TestClass]
public class Foo
{
   [DataTestMethod]
   [DynamicData(nameof(Data.GetDamages), typeof(Data), DynamicDataSourceType.Method)] // the attribute allows us to choose a method that returns the test data
   public void Foo(int input, int expectedValue)
   {
      var bar = new Bar();
      var actualOutput = bar.take(input);
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

### Example 4: read test data from external soure

```csharp
public class Data
{
   public static IEnumerable<object[]> Damages
   {
      get
      {
         // step 1: get data from external source

         // step 2: construct and return IEnumerable<object[]>
      }
   }
}

[TestClass]
public class Foo
{
   [DataTestMethod]
   [DynamicData(nameof(Data.Damages), typeof(Data))] // the attribute allows us to choose a property that returns the test data
   public void Foo(int input, int expectedValue)
   {
      var bar = new Bar();
      var actualOutput = bar.take(input);
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

## Reducing code duplication and increasing test readability

### Custom Asserts by using extention methods

```csharp
public static class CustomAsserts
{
   public static void IsInRange(this Assert assert, int actual, int expectedMin, int expectedMax)
   {
      // custom logic

      throw new AssertFailedException("Message");
   }
}

// somewhere else in a test method
Assert.That.IsInRange(2, 1, 100);
```

### Custom test category attribute

```csharp
/*
 * Custom test category attribute
 */
public class PlayerDefaultsAttribute : TestCategoryBaseAttribute
{
   public override Ilist<string> TestCategories => new [] {"Player Defaults"}
}


// then somewhere else for a test method
[TestMethod]
[PlayerDefaults]
public void Foo() {}
```

### Custom data source attribute

```csharp
/*
 * Custom data source attribute
 */
public class CsvDataSourceAttribute : Attribute, ITestDataSource
{
   public string FileName { get; }
   public CsvDataSourceAttribute(string fileName)
   {
      FileName = fileName;
   }

   public string GetDisplayName( MethodInfo methodInfo, object[] data)
   {

   }

   public IEnumerable<object[]> GetData(MethodInfo methodInfo)
   {

   }
}

// then somewhere else for a test method
[DataTestMethod]
[CsvDataSource("data.csv")]
public void Foo() {}
```

## References

1. [TestCase filter](https://github.com/Microsoft/vstest-docs/blob/master/docs/filter.md)
