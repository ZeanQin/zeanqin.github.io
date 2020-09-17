---
title: Build a git-based headless blog using @nuxt/content - part 2 - typography
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

Typography is about shaping and laying out the texts on your website to create a pleasant user experience. [Web Design is 95% Typography](https://ia.net/topics/the-web-is-all-about-typography-period). It's an essential tool that a software developer should have in their toolbox.

There's a lot more jargon and subjectivity in Typography than in other areas. This article is intended as a concise and practical guide for software developers on choosing/using custom fonts and laying out the texts nicely and comfortabely. It covers the basics to get you most of the way there.

## Basics

Let's start with some basic terms and the common categories of fonts.

### 1. Typeface vs. Font

"**Typeface**" and "**Font**" mean different things,

- **typeface** is the design (e.g. shape) of a collection of letters, numbers and symbols (also called glyphs), whereas
- **font** is a specific size, weight, or style (e.g. regular, bold, italic) of a typeface.

Most of the time people use them interchangeably. But hey, we're trying to look prefessional here ;-).

### 2. Common Font Categories

TODO

### 3. "Web safe" Fonts vs Custom Fonts

A font is "web safe" if most computers have it installed already, and these computers don't have to download it separately when visiting your site. Examples include Arial, Times New Roman, Courier, Georgia, Verdana and [more](http://web.mit.edu/jmorzins/www/fonts.html).

A website can declare a custom font as a resource, just like CSS, images or JavaScripts. And the visiting browser will download the font and apply it to the texts on the website.

## Using fonts

You can apply a font by using the "font-family" attribute with the following syntax in CSS.

```css
body {
  font-family: 'custom-font', fallback1, fallback2;
}
```

Where is the `custom-font` coming from? Well, it could be from either your OS if you have it installed (e.g. `Segoe UI` on Windows, or `Roboto` on Android), or a third party such as [Google Fonts](https://fonts.google.com/), [Adobe Fonts](https://fonts.adobe.com/) etc. In the later case, you most likely need to tell the browser to download it by including the `<link>` tag in the `head` of your page, like below.

```html
<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
  </head>
</html>
```

### Flash of Unstyled Text

In the case that a custom font used by a website is not available on the visiting computer, it needs to be transferred across the wire. This takes time! The browser will use a fallback font in the font stack until the custom font is loaded. This can cause the [flash of unstyled text (FOUT)](https://www.paulirish.com/2009/fighting-the-font-face-fout/).

As an example, suppose you had the font stack below,

```css
body {
  font-family: Merriweather, Georgia;
}
```

and the font "Merriweather" needs to be downloaded by the browser, you could get the text to flash like below.

<asset src="articles/git-based-headless-blog/flash-of-unstyled-text.gif" name="List local and remote tracking branches" newline></asset>

Some common apporaches to mitigate FOUT include,

- using a third party (e.g. [Google Fonts](https://fonts.google.com/), [Adobe Fonts](https://fonts.adobe.com/) etc.) to optimise the font files and deliver them via a CDN,
- transforming your font files using tools like [Transfonter](https://transfonter.org/),
- picking a fallback font that's similar to the custom font you want to use with tools like [Font style matcher](https://meowni.ca/font-style-matcher/).

### Native font stack

A “native font stack” allows for optimum text rendering on every device and OS with **zero latency**. For example, Bootstrap 4 uses the following native font stack by default,

```scss
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

And you can find more system font stacks [here](https://css-tricks.com/snippets/css/system-font-stack/).

## Best Practices

## References

1. [nuxt/content](https://content.nuxtjs.org/)
2. [Typography for Developers](https://css-tricks.com/typography-for-developers/#typeface-vs-font)
3. [Web Design is 95% Typography](https://ia.net/topics/the-web-is-all-about-typography-period)
4. [Using UI System Fonts In Web Design: A Quick Practical Guide](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)
