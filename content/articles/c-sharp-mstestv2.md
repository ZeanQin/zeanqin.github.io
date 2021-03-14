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
  - Run on demand (e.g. on a local machine after we've made a change)
  - As part of continuous integration (e.g. on a build server)
  - On a schedule (e.g. overnight)

## MSTest Overview

The high level components of MSTest are:

- **Attributes** are used in the code to mark methods as test methods.
- **Asserts** allow us to check the expected values are received from the production code.
- **Test runners** look through the code, look for specific test attributes that mark methods as tests and execute those methods. It also reports the outcome of tests, for example, whether a test passed or failed. These can include free test runners and 3rd party commercial test runners.

The MSTest framework has a number of NuGet packages,

- The `MSTest.TestFramework` package contains the core framework which includes,
  - Attributes,
  - Assert methods,
  - Data-driven tests,
  - Extensibility points

- The `MSTest.TestAdapter` package allows us to,
  - discover MSTest-based tests such as methods decorated with the `[TestMethod]` attribute and,
  - execute the discovered tests

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

3. Each test should be broken into 3 sections,

```csharp
[TestClass]
public class PlayerShould
{
   [TestMethod]
   public void BeInExpierencedWhenNew()
   {
      // arrange - put together the test data, and arrange the objects/values to be used

      // act - invoke a method to perform a computation to produce the actual result

      // assert - assert something about the value that is computed inside of act
   }
}
```

## Asserts

The different types of asserts are,

- General purpose asserts, i.e. the static methods in the `Assert` class. Examples include,
  - check result = and != expected value for built in types such as ints, floats, doubles, bool, string etc.
- Specialised string asserts, i.e. the static methods in `StringAssert`. Examples include
  - `StartsWith`, `EndsWith`, `Contains`,
  - `Matches` for regular expression matches
- Specialised collection asserts, i.e. the static methods in `CollectionAssert`. Examples include,
  - `Contains`, `AreEqual`, `AllItemsAreUnique`
- Other assertions including,
  - exceptions are thrown,
  - objects are of the specificed type,
  - object reference
- Custom asserts

## Controlling and customising test execution

### Selectively execute tests based on filtering condition(s)

Use `dotnet test --filter <Expression>`, where expression is in the format `<property><operator><value>[|&<Expression>]`,  via the CLI to execute only the tests matching the filtering condition(s).

To run tests whose `FullyQualifiedName` (i.e. `<Namespace>.<ClassName>.<MethodName>`) contains a particular string, use `dotnet test --filter <arbitrary_string>`. We could set `<arbitrary_string>` to different values to filter at different levels,

- when `<arbitrary_string>` is set to `<Namespace>`, we will execute all tests in the matching namespace,
- when `<arbitrary_string>` is set to `<ClassName>`, we will execute all tests in all the matching classes,
- when `<arbitrary_string>` is set to `<MethodName>`, we will execute all tests with the matching name,
- etc.

To run tests in a class, use `dotnet test --filter "ClassName=<Namespace>.<ClassName>"`.

See <https://aka.ms/vstest-filtering> for more information on filtering support.

### Categorise tests

We can set a category on a test method or a test class. Multiple categories can be applied to a test method/class. When a category is set for a class, all test methods in that class are added to that category.

```csharp
[TestMethod]
[TestCategory("Player defaults")] // set a category for a test
[TestCategory("Another category")] // set a category for a test
public void BeInexperiencedWhenNew()
{

}
```

To run tests in a category via the CLI, use `dotnet test --filter "TestCategory=Player defaults"`. To run tests in multiple categories, use `dotnet test --filter "TestCategory=Player defaults|TestCategory=Another category"`

### Ingore some tests

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

We can use `Console.WriteLine()` inside test methods to output additional messages. To see the messages, run `dotnet test -v n`.

### Run additional code during the test execution lifecycle

We can add additional methods that will be run automatically for us by MSTest. These methods can be used to run set up code or clean up code.

```csharp
[TestClass]
public class LifeCycle
{

   /*
   * Run this method before any test method in this assembly (i.e. project) runs.
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
   public void LifeCycleClean() {}

   /*
   * Run this code after all test methods in this class have finished running.
   *
   * This method has to be static and accepts the TestContext object as parameter.
   */
   [ClassCleanup]
   public static void LifeCycleClassClean(TestContext context) {}

   /*
   * Run this method after all test methods in this assembly (i.e. project) have finished running.
   *
   * The method has to be static and passes the TestContext object as parameter.
   */
   [AssemblyCleanup]
   public static void AssemblyClean(TestContext context) {}

   [TestMethod]
   public void Test1() {}

   [TestMethod]
   public void Test2() {}
}
```

### Share objects between tests

Some object might take a long time to create e.g. it might involve I/O, network access or reading from a database or file. We can create the object once and share it between tests.

```csharp
[TestClass]
public class Foo
{
   // The object needs to be static as we're using a static method to initialise the data.
   static string SomeExpensiveObject;

   [ClassInitialize]
   public static void LifeCycleClassInit(TestContext context)
   {
      SomeExpensiveOjbect = // create object
   }
}
```

## Data-driven Tests

### Benefits

- Reduce duplicated test code and associated maintenance costs with having to maintain that duplicated code. For example, instead of having 10 similar test methods testing the same function with different data, we can keep only one of the test methods, run it multiple times with a set of test data we specify.  
- Reuse the same test data sets across multiple test methods or test classes.
- Allow external non-developers to create or modify test data.

### Example 1: specify test data for one test method

```csharp
[DataTestMethod] // The attribute tells mstest that we want to execute the method multiple times with different test data.
[DataRow(1, 99)]
[DataRow(2, 98)]
[DataRow(3, 97)]
public void Foo(int input, int expectedValue)
{
   // arrange 
   var bar = new Bar();

   // act
   var actualOutput = bar.take(input);

   // assert
   Assert.AreEqual(expectedValue, actualOutput);
}
```

### Example 2: centralise test data into a getter-only static property

```csharp
[TestClass]
public class Foo
{
   /*
    * Static getter for generating the test data.
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

   [DataTestMethod] // The attribute tells mstest that we want to execute the method multiple times with different test data.
   [DynamicData(nameof(Damages), DynamicDataSourceType.Property)] // This attribute allows us to choose a property or method that returns the test data.
   public void Foo(int input, int expectedValue)
   {
      // arrange
      var bar = new Bar();

      // act
      var actualOutput = bar.take(input);

      // assert
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
    * Static method for generating the test data.
    */
   public static IEnumerable<object[]> GetDamages()
   {
      return new List<object[]>
      {
         new object[] { 1, 99 },
         new object[] { 2, 98 },
         new object[] { 3, 97 },
      };
   }

   [DataTestMethod] // The attribute tells mstest that we want to execute the method multiple times with different test data.
   [DynamicData(nameof(GetDamages), DynamicDataSourceType.Method)] // This attribute allows us to choose a method or property that returns the test data.
   public void Foo(int input, int expectedValue)
   {
      // arrange 
      var bar = new Bar();

      // act
      var actualOutput = bar.take(input);

      // assert
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

### Example 4: centralise test data into a static getter-only property or method in a different class

```csharp
public class Data
{
   /*
    * Static getter for generating the test data.
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

   /*
    * Static method for generating the test data.
    */
   public static IEnumerable<object[]> GetDamages()
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
   [DynamicData( // This attribute allows us to choose a property or method that returns the test data.
      nameof(Data.GetDamages), // The name of method or property having test data.
      typeof(Data), //  The declaring type of property or method having data.
      DynamicDataSourceType.Method)] 
   public void Foo(int input, int expectedValue)
   {
      // arrange 
      var bar = new Bar();

      // act
      var actualOutput = bar.take(input);

      // assert
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

### Example 4: read test data from external soure

Step 1: create an external file such as a csv file `DamageData.csv` like below,

```txt[DamageData.csv]
1, 99
2, 98
3, 97
```

Step 2: create the class for reading the data and providing it as a static getter-only property or method.

```csharp[Data.cs]
class Data
{
    public static IEnumerable<object[]> Damages
    {
        get
        {
            return File
                .ReadAllLines("DamageData.csv")
                .Select(line =>
                    line.Split(',').Select(int.Parse).Cast<object>().ToArray());
        }
    }

    public static IEnumerable<object[]> GetDamages()
    {
        return File
            .ReadAllLines("DamageData.csv")
            .Select(line =>
                line.Split(',').Select(int.Parse).Cast<object>().ToArray());
    }
}
```

Step 3: make sure the `DamageData.csv` file is copied to the output directory.

Step 4: update the test method to use the data provided by the `Data.cs` class.

```csharp[Foo.cs]
[TestClass]
public class Foo
{
   [DataTestMethod]
   [DynamicData( // This attribute allows us to choose a property or method that returns the test data.
      nameof(Data.GetDamages), // The name of method or property having test data.
      typeof(Data), //  The declaring type of property or method having data.
      DynamicDataSourceType.Method)] 
   public void Foo(int input, int expectedValue)
   {
      // arrange 
      var bar = new Bar();

      // act
      var actualOutput = bar.take(input);

      // assert
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

## Reducing code duplication and increasing test readability

### Create custom asserts

This can be done by defining extention methods on the `Assert`, `StringAssert` and `CollectionAssert` classes.

#### Example 1: custom assert

Step 1: define the custom assert

```csharp[CustomAsserts.cs]
public static class CustomAsserts
{
    public static void IsInRange(this Assert assert,
                                 int actual,
                                 int expectedMinimumValue,
                                 int expectedMaximumValue)
    {
        if (actual < expectedMaximumValue || actual > expectedMaximumValue)
        {
            throw new AssertFailedException($"{actual} was not in the range {expectedMinimumValue} - {expectedMaximumValue}");
        }
    }
}
```

Step 2: use the custom assert in a test method

```csharp
Assert.That.IsInRange(2, 1, 100); // `That` is for getting the singleton instance of the Assert functionality.
```

#### Example 2: custom collection assert

Step 1: define the custom collection assert

```csharp[CustomAsserts.cs]
public static void AllItemsSatisfy<T>(this CollectionAssert collectionAssert,
                                      ICollection<T> collection,
                                      Predicate<T> predicate)
{
    if (collection.Any(item => !predicate(item)))
        throw new AssertFailedException("All items don't satisfy the predicate.");
}
```

Step 2: use the custom collection assert in a test method

```csharp
// e.g. check all items in a string array are not null or empty.
CollectionAssert.That.AllItemsSatisfy(new [] {"Zean", "Qin"}, i => !string.IsNullOrEmpty(i));
```

### Create custom reusable test category attributes

We might have multiple test categories with the same e.g. `TestCategory("Player Defaults")`. To avoid the duplicated magic strings (and only write it once), we can create a custom test category.

```csharp[CustomCategories.cs]
/*
 * Custom test category attribute
 */
public class PlayerDefaultsAttribute : TestCategoryBaseAttribute
{
   public override IList<string> TestCategories => new [] {"Player Defaults"}
}


// then somewhere else for a test method
[TestMethod]
[PlayerDefaults]
public void Foo() {}
```

### Create custom data source attributes

We can implement our own version of the `DynamicData` attribute to,

- increases the code readability, and
- allow us to specify the file name containing the test data.

The `DynamicData` attribute implements the `ITestDataSource` interface by relying on another class (specified by the parameters of the attribute) to provide the data parsing logic.

Our custom attribute will implement the `ITestDataSource` interface by directly implementing the logic for parsing the data.

Step 1: define custom attribute

```csharp
public class CsvDataSourceAttribute : Attribute, ITestDataSource
{
    public string FileName { get; }
    public CsvDataSourceAttribute(string fileName)
    {
        this.FileName = fileName;
    }

    public IEnumerable<object[]> GetData(MethodInfo methodInfo)
    {
        return File
            .ReadAllLines(this.FileName)
            .Select(line =>
                line.Split(',').Select(int.Parse).Cast<object>().ToArray());
    }

    public string GetDisplayName(MethodInfo methodInfo, object[] data)
    {
        if (data == null)
            return null;

        return $"{methodInfo.Name}({string.Join(",", data)})";
    }
}
```

Step 2: use the attribute

```csharp
[TestClass]
public class Foo
{
   [DataTestMethod]
   // [DynamicData( // This attribute allows us to choose a property or method that returns the test data.
   //    nameof(Data.GetDamages), // The name of method or property having test data.
   //    typeof(Data), //  The declaring type of property or method having data.
   //    DynamicDataSourceType.Method)] 
   [CsvDataSourceAttribute("DamageData.csv")] // Use our custom data attribute instead.
   public void Foo(int input, int expectedValue)
   {
      // arrange 
      var bar = new Bar();

      // act
      var actualOutput = bar.take(input);

      // assert
      Assert.AreEqual(expectedValue, actualOutput);
   }
}
```

## References

1. [TestCase filter](https://github.com/Microsoft/vstest-docs/blob/master/docs/filter.md)
