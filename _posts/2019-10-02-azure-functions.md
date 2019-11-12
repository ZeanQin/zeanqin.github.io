---
title: Azure functions
layout: post
use_toc: true
excerpt: Basics of Azure functions
---
## Azure function basics

An Azure function is a function that runs in response to an event i.e. a trigger. Azure Function = Events + Code

A "Function App" is a group of Azure functions and it allows them to share configrations and local resources. It's a unit of deployment.

Azure functions is built on top of Azure App Service.

We are charged based by

- Number of executions of the function
- CPU Time (s) X RAM (GB)

## Use cases

Refactor “Monolithic” application (with many responsibilities) into a main app and multiple Azure functions that each has single responsibility. For example, from

![Monolithic](/assets/images/azure-functions/monolithic.PNG)

to

![Refactor to Azure functions](/assets/images/azure-functions/refactor-to-azure-functions.PNG)

## Serverless

There are still servers such as DB server, web server etc., but you delegate the management and maitenance of them to third parities. And the developers focus on exclusively the business requirements.

## Triggers and bindings

### Trigger types

- Timers, HTTP requests
- Queue messages, blobs, Cosmos DB

### Input and output bindings

Tasks of connecting to external resources i.e. post message to a queue, write a file to blob storage, send an email. Bindings can reduce the amount of code to achieve these tasks. Input bindings allows us to look up data from different input sources easily.

## Two ways of writing C# in Azure Functions

### C# Script vs C# class library

The script files are compiled on the fly and can be programmed in the Azure portal. However, it's better to precompile the functions into an DLL (the class library). 

With the pre-compiled approach, a `function.json` file will get automatically created for each function and will point to the function in the DLL that implements the function. This approach uses attributes (provided by the `Microsoft.NET.Sdk.Functions` package) to hold information about the triggers and bindings.

## Azure Functions Core Tools

 It lets you develop and test your functions on your local computer from the command prompt or terminal. Your local functions can connect to live Azure services, and you can debug your functions on your local computer using the full Azure Functions runtime.

Version 2.x of the tools uses the Azure Functions runtime 2.x that is built on .NET Core. This version is supported on all platforms .NET Core 2.x supports, including Windows, macOS, and Linux.

### Installing on Linux (Ubuntu/Debian) with APT

1. Install the Microsoft package repository GPG key, to validate package integrity:

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
```

2.Set up the .NET development source list before doing an APT update.

To set up the APT source list for Ubuntu, run this command:

```bash
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
```

To set up the APT source list for Debian, run this command:

```bash
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs)/prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
```

3.Check the /etc/apt/sources.list.d/dotnetdev.list file for one of the appropriate Linux version strings listed below:

- Debian 10 - buster
- Debian 9 - stretch
- Debian 8 - jessie
- Ubuntu 18.10 - cosmic
- Ubuntu 18.04 - bionic
- Ubuntu 17.04 - zesty
- Ubuntu 16.04/Linux Mint 18 - xenial

4.Start the APT source update:

```bash
sudo apt-get update
```

5.Install the Core Tools package:

```bash
sudo apt-get install azure-functions-core-tools
```

After the installation finishes, the `func` command should be available.

### Common commands

- `func -v` - Shows version of the core tools
- `func init` - Create a new Function App in the current folder by adding the following files
  - `<name>.csproj` - The C# project file. It contains info such as the target framework, Azure Functions version, dependencies, what should be copied into the output folder etc.,
  - `host.json` - It contains the configration settings for the function app as a whole.
  - `local.settings.json` - It contains the settings to use when running locally.
  - `.gitignore` - Useful if we need to initialise a git repository.
  - `.vscode` -  It contains settings that prompts VS Code to install some useful extentions that improves the Azure Functions development experience.
- `func new` - Create a new function from a template.
- `func start` - Launches the functions runtime host

### What happens under the hood

The compilation process,

- copies over the `host.json` file and `local.settings.json` file,
- generates the bin folder containing the DLL files, and
- generates a folder for each Azure function with each folder containing a `function.json` file. This `function.json` file is generated based on the attributes in the C# code. It contains info such as the bindings, script file (i.e. the dll file containing our function) and entry point (i.e. the full qualified name of the function) etc.

![After compilation](/assets/images/azure-functions/after-compilation.PNG)

```bash
## Sending a GET request
curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://hostname/resource

## Sending a POST request
curl --data "param1=value1&param2=value2" http://hostname/resource
```

## Triggers

| Trigger type        | Package          | Other |
|:-------------|:------------------|:------|
| HTTP trigger | `Microsoft.NET.Sdk.Functions` |   |
| Queue trigger | `` |   |
| Blob trigger | `` |   |
| Table Storage trigger | `` |   |

## Bindings

| Output binding type | Package          | Other |
|:-------------|:------------------|:------|
| Queue output  | `Microsoft.Azure.WebJobs.Extensions.Storage` |   |
| Blob output  | `` |   |
| SendGrid email output  | `Microsoft.Azure.WebJobs.Extensions.SendGrid` |   |
| Table Storage output  | `` |   |

### The `IBinder` interface

Normally, the output binding is defined as part of the function signature. The `IBinder` interface allows us to customise the binding at rumtime.

```csharp
public static class GenerateLicenseFile
    {
        [FunctionName("GenerateLicenseFile")]
        public static async Task Run(
            [QueueTrigger("orders", Connection = "AzureWebJobsStorage")] Order order,
            IBinder binder,
            ILogger log)
        {
            var outputBlob = await binder.BindAsync<TextWriter>(new BlobAttribute($"licenses/{order.OrderId}.lic"){
                Connection = "AzureWebJobsStorage"
            });

            outputBlob.WriteLine($"OrderId: {order.OrderId}");
            outputBlob.WriteLine($"Email: {order.Email}");
            outputBlob.WriteLine($"ProductId: {order.ProductId}");
            outputBlob.WriteLine($"PurchaseDate: {DateTime.UtcNow}");
            var md5 = System.Security.Cryptography.MD5.Create();
            var hash = md5.ComputeHash(
                System.Text.Encoding.UTF8.GetBytes(order.Email + "secret"));
            outputBlob.WriteLine($"SecretCode: {BitConverter.ToString(hash).Replace("-", "")}");

            log.LogInformation($"C# Queue trigger function processed: {order}");
        }
    }
}
```

The benefits of using the `IBinder` interface is that, it

- works with all binding attributes (e.g. QueueAttribute, SendGridAttribute),
- calculates attribute parameters on-demand in the function body,
- has the flexibility to choose the type to bind to at rumtime.

## References

1. [Azure Functions in practice](https://www.troyhunt.com/azure-functions-in-practice/)
2. [Azure Functions triggers and bindings concepts](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)
3. [Supported languages in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/supported-languages)
4. [Azure functions core tools](https://github.com/Azure/azure-functions-core-tools)
5. [Work with Azure functions core tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
6. [Azure Queue storage bindings for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue)
