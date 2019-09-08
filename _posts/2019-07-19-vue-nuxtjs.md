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

## Handling errors in NuxtJS
The two types of error pages are, 

|              | Client side error pages          | Server side error pages |
|:-------------|:------------------|:------|
| How it happens           | app is loaded in browser, and the user clicks on a link that can't be rendered | user directly visits a link that can't be rendered  |
| Location of rendering |  Browser  | Server  |
|  |    |   |

### How to override client side error pages
1. Add `~/layout/error.vue` 

    The error page is a page component which is always displayed when an error occurs (that does not happen while server-side rendering). Though this file is placed in the layouts folder, it should be treated as a page. this layout is special, since you should not include <nuxt/> inside its template. You must see this layout as a component displayed when an error occurs (404, 500, etc.). Similar to other page components, you can set a custom layout for the error page as well in the usual way.
    
    Nuxt.js adds the error(params) method in the context, which you can call to display the error page. i.e. 
    
    ```js
      error({ statusCode: 404, message: 'Post not found' })
    ```


### Server side error pages
1. Add `~/app/views/error.html` to the project

Errors on the server take the most precedence over anything else. Not that they are more important, but they stop the execution of the Nuxt application. If you app encounters an unhandled exception, and you do not handle it, then it is going to stop. As a last resort, Nuxt can throw the Nuxt Server Error page. By this point, your Nuxt app has stopped executing. It has a static page it will return to the browser as part of the Express request. There is no Nuxt magic at this point either so you cannot call for other resources or reference your Store or the error that caused this in the first place.

NuxtJS doesn't handle errors for you, but it allows you to handle known errors either on server side or client side and allows you to redirect to a page `error.vue` using the `error` method avaiable on the `context` object.

## Naming Conventions
The [nuxtjs.org](https://nuxtjs.org) website itself is a NuxtJS project and its source code can be found [here](https://github.com/nuxt/nuxtjs.org). Some conventions that I have observed and are following are: 
 - use kebab-case for everything in the `pages` folder
 - use kebab-case for folders under the `components` folder but use PascalCase for all component names
 - use kebab-case everywhere else

## References: 
1. https://blog.lichter.io/posts/organize-and-decouple-your-api-calls-in-nuxtjs/#generalize-our-implementation
2. https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c
3. https://css-tricks.com/snippets/css/a-guide-to-flexbox/
4. Auth External API (JWT) with SSR: https://nuxtjs.org/examples/auth-external-jwt
5. Change the Nuxt.js server error page: https://blog.lichter.io/posts/change-the-nuxtjs-server-error-page/
6. Error handling in NuxtJS: https://nuxtjs.org/guide/async-data#handling-errors
7. Handling errors while server side rendering your code in Nuxt.js: https://medium.com/@benrichardson_5275/handling-errors-while-server-side-rendering-your-code-in-nuxt-js-d733ed76239d
8. State management in Vue.js https://antenna.io/blog/2018/01/state-management-in-vue-js
9. Custom Events https://vuejs.org/v2/guide/components-custom-events.html