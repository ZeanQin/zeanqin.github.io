---
title: Build a git-based headless blog using the @nuxt/content module
excerpt: I have used Nuxt.js with the @nuxt/content module to build this site. I will talk about the reasons for the switch, the challenges occured and the design choices

# Optional
category: Frontend
tags: 
  - Nuxt.js
  - Vue.js
  - Static Website
  - Headless Git-based CMS
createdAt: "2020-08-15T14:00:00.000Z"
updatedAt: "2020-08-16T05:47:23.306Z"
enableComments: true
enableTOC: true
---

I've been using the Nuxt.js framework to build our company's [online training platform](https://riberry.health/) for quite some time now. More recently (specifically 22 May 2020), the `nuxt/content` module was [officially released](https://github.com/nuxt/content/releases/tag/v1.0.0). This module can parse markdown files (among other file types) from a folder and render them into html.

Similar to Jekyll, you can build a Git-based headless blog by writing your contents in markdown files and have them automatically generated into posts. But it's got a number of big advantages over Jekyll, most notabely allowing you to use Vue components inside markdown files.

So I've decided to reboot my Jekyll blog using Nuxt.js with the `nuxt/content` module.

## Reading experience

[Web Design is 95% Typography](https://ia.net/topics/the-web-is-all-about-typography-period).

### Native font stack

I've chosen to use a “native font stack” for optimum text rendering on every device and OS, instead of using one typeface to rule them all.

One problem with

-

Luckily Bootstrap 4 provides this by default, and the typeface stack looks like below

```bash
$font-family-sans-serif:
  // Safari for OS X and iOS (San Francisco)
  -apple-system,
  // Chrome < 56 for OS X (San Francisco)
  BlinkMacSystemFont,
  // Windows
  "Segoe UI",
  // Android
  "Roboto",
  // Basic web fallback
  "Helvetica Neue", Arial, sans-serif,
  // Emoji fonts
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !default;
```

## References

1. [nuxt/content](https://content.nuxtjs.org/)
2. [Typography for Developers](https://css-tricks.com/typography-for-developers/#typeface-vs-font)
3. [Web Design is 95% Typography](https://ia.net/topics/the-web-is-all-about-typography-period)
