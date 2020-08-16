---
title: Vue-cli basics
excerpt: Basics of @vue/cli.

# Optional
category: Frontend
tags: 
  - Vue.js
createdAt: "2019-07-15T14:00:00.000Z"
updatedAt: "2020-08-16T05:57:08.314Z"
enableComments: true
enableTOC: true
---

> # This page is currently work in progress

# @vue/cli

@vue - <https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue>

## CLI

The CLI (`@vue/cli`) is a globally installed npm package and provides the,

- `vue` command in your terminal,
- `vue create` to quickly scaffold a new project,
- `vue serve` to instantly prototype new ideas, or
- `vue ui` to manage your projects using a graphical user interface.

## CLI Service

The CLI Service (`@vue/cli-service`) is a development dependency. It's an npm package installed locally into every project created by `@vue/cli`.

The CLI Service is built on top of webpack and webpack-dev-server. It contains:

- The core service that loads other CLI Plugins;
- An internal webpack config that is optimized for most apps;
- The `vue-cli-service` binary inside the project, which comes with the basic `serve`, `build` and `inspect` commands.

  Using the CLI Service by,

- accessing the binary directly as `vue-cli-service` in npm scripts, or
- running `./node_modules/.bin/vue-cli-service` from the terminal.

  Common commands:

- `vue-cli-service serve` starts a dev server (based on `webpack-dev-server`) that comes with Hot-Module-Replacement (HMR) working out of the box
- `vue-cli-service build` produces a production-ready bundle in the dist/ directory, with minification for JS/CSS/HTML and auto vendor chunk splitting for better caching. The chunk manifest is inlined into the HTML. There are a few useful flags:

  - `--modern` builds your app using Modern Mode, shipping native ES2015 code to modern browsers that support it, with auto fallback to a legacy bundle.

  - `--target` allows you to build any component(s) inside your project as a library or as web components.

  - `--report` and `--report-json` will generate reports based on your build stats that can help you analyze the size of the modules included in your bundle

    - `vue-cli-service inspect` inspects the webpack config inside the Vue project.

## CLI Plugins

CLI Plugins are npm packages that provide optional features to your Vue CLI projects, such as Babel/TypeScript transpilation, ESLint integration, unit testing, and end-to-end testing. Plugins can modify the internal webpack configuration and inject commands to `vue-cli-service`.

Plugin naming conventions:

- `@vue/cli-plugin-` for built-in plugins, or
- `vue-cli-plugin-` for community plugins.

When you run the `vue-cli-service` binary inside your project, it automatically resolves and loads all CLI Plugins listed in your project's `package.json`.

Plugins can be included as part of your project creation process or added into the project later. They can also be grouped into reusable presets.

Run `vue add <plugin-name>` to,

- resolve `<plugin-name>` to full package name,
- installs it from npm, and
- invokes its generator.
