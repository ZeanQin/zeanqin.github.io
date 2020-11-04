---
title: Build a git-based headless blog using @nuxt/content
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

I've been using the [Nuxt.js framework](https://nuxtjs.org/) to build the [online training platform at Riberry](https://riberry.health/) for quite some time now. Recently (specifically 22 May 2020), the [`nuxt/content` module](https://content.nuxtjs.org/) was [officially released](https://github.com/nuxt/content/releases/tag/v1.0.0) and it supports parsing markdown files (among other file types) from a folder and rendering their contents in html.

This means that we can now build a static, Git-based headless blog using the new `nuxt/content` module and the [static site generation](https://nuxtjs.org/docs/2.x/concepts/static-site-generation/) capability provided by NuxtJS. Similar to Jekyll, we can author the blog posts in markdown files, place them into a `content` folder, and have them automatically converted into articles.

So I've decided to reboot my Jekyll blog (this website) using Nuxt.js with the `nuxt/content` module.

## The motivation

The goal is to reduce the amount of mental energy spent on maintaining the blog so I can just focus on writing good contents. This means,

- making the process of publishing contents as simple as possible, and
- having the ability to easily customise the site, where needed, to suite my preferences.

#### The optimised content publishing process

Only 3 steps are needed to author & publish an article,

1. `npm run dev`

  This enables hot reload in development mode. You can then have your markdown file and the article rendered from it (in browser) side by side - whenever you save your `.md` file, the changes will be instantly visible in your browser. You're seeing directly what the end result looks like, instead of relying a different tool to preview your markdown file and realising it applies a different styling than your website does.
2. `npm run generate`

  Generates the static website files in a `dist` folder.
3. `npm run deploy`

  Pushes the contents in the _local `dist` folder_ into the _remote `dist` branch_ in my [GitHub repository](https://github.com/ZeanQin/zeanqin.github.io), where the website files are served from.

  <asset src="articles/git-based-headless-blog/branch-setup.png" name="Branch setup on remote" newline></asset>

  <b-alert variant="success" show>
  <span class="font-weight-bold">Tip:</span> I use the <code>master</code> branch to store the source files and use the <code>dist</code> branch to serve the static files. See the <a href="https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source" target="_blank">instructions here on how to configure a separate branch as the publishing source for your GitHub Pages site</a>.
  </b-alert>

  <b-alert variant="success" show>
  <span class="font-weight-bold">Tip:</span> This uses a package called <a href="https://github.com/L33T-KR3W/push-dir" target="_blank"><code>push-dir</code></a> that can push the contents of a directory to a remote branch <span class="font-weight-bold">without messing around with <code>.gitignore</code> (no need to commit the directory)</span>. You can find the set-up instructions <a href="https://nuxtjs.org/faq/github-pages/#command-line-deployment" target="_blank">here</a>.
  </b-alert>
## Main components

- NuxtJS
- `@nuxt/content`
- [BootstrapVue](https://bootstrap-vue.org/)

## The bad

- Not clean markdown when using Vue components

## The good

### How to point custom domain to GitHub

### Choosing a publishing source <https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source>

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
