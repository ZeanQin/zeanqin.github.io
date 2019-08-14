---
title: Nuxt.js basics
layout: post
use_toc: true
excerpt: Basics of Nuxt.js
---

> # This page is currently work in progress.

## Scaffolding
Run `npx create-nuxt-app <project-name>`

## Directory structure
 - `assets` - un-compiled assets such as Stylus or Sass files, images, or fonts
 - `components` - Vue.js Components. You can't use either `asyncData` or `fetch` in these components.
 - `layouts` - application layouts that are used to change the look and feel of your page (for example by including a sidebar or having distinct layouts for mobile and desktop). _This directory cannot be renamed without extra configuration._
 - `middleware` - middleware letting you define custom functions that can be run before rendering either a page or a group of pages (layouts). The filename will be the name of the middleware (`middleware/auth.js` will be the `auth` middleware).
 - `pages` - Application Views and Routes. The framework reads all the .vue files inside this directory and creates the application router. _This directory cannot be renamed without extra configuration._
 - `plugins` - Javascript plugins that you want to run before instantiating the root Vue.js Application. This is the place to register components globally and to inject functions or constants.
 - `static` - The static directory is directly mapped to the server root (/static/robots.txt is accessible under http://localhost:3000/robots.txt) and contains files that likely won't be changed (i.e. the favicon). _This directory cannot be renamed without extra configuration._
    - Example: `/static/robots.txt` is mapped as `/robots.txt`
  - `store` - The `store` directory contains your Vuex Store files. The Vuex Store comes with Nuxt.js out of the box but is disabled by default. Creating an `index.js` file in this directory enables the store. _This directory cannot be renamed without extra configuration._
   - `nuxt.config.js` - The `nuxt.config.js` file contains your Nuxt.js custom configuration. _This file cannot be renamed without extra configuration._
   - `package.json` - The `package.json` file contains your Application dependencies and scripts. _This file can not be renamed._

### Aliases
  - `~` or `@` is srcDir
  - `~~` or `@@` is rootDir

## The `@nuxtjs/axios` Module
Instead of importing axios everywhere, the module provides you a convenient interface on,
 - the client-side (`this.$axios` in Vue components), 
 - in the Nuxt context (`ctx.$axios`) that is available in functions like `asyncData` and `fetch`, and 
 - in the Vuex store (`this.$axios` again but not in arrow functions!). 

  The main features include: 
   - set up default headers, 
   - a `baseURL` depending on your environment, 
   - a shorthand function for all HTTP verbs (eg. `$get`) which lets you omit the nested data key and delivers the response object on the top level.
   
   If necessary you can tweak your axios instance even more.

## Configure Nuxt with ESLint and Prettier in VSCode
 - https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c

## References: 
1. https://blog.lichter.io/posts/organize-and-decouple-your-api-calls-in-nuxtjs/#generalize-our-implementation
2. https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c
3. https://css-tricks.com/snippets/css/a-guide-to-flexbox/
4. Auth External API (JWT) with SSR: https://nuxtjs.org/examples/auth-external-jwt