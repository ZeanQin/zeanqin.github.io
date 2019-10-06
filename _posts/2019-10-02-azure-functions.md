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

## References

1. [Azure Functions in practice](https://www.troyhunt.com/azure-functions-in-practice/)
