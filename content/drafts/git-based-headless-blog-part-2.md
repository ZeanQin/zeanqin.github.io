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

<asset src="articles/typography/flash-of-unstyled-text.gif" name="Flash of Unstyled Text" newline></asset>

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

TODO

### 1. Font sizing

Sizing in CSS can be specified in either _absolute_ units (think `px`) or _relative_ units (e.g. `em`). The size of an element specified in absolute units doesn't change, while the size of an element specified in relative units depends on the size of other elements on the page.

<b-alert variant="success" show>
<p>You should avoid using absolute units like <code>px</code>, and instead use relative units like <code>em</code>) as much as possible.</p>

<p>The purpose of the <code>px</code> unit should be to serve as the foundation of a type system based on relative units. In other words, it’s an absolute value that a relative unit can point to in order to define its own size relative to that value.</p>
</b-alert>

<b-alert variant="info" show>
Fun fact, the <code>px</code> unit doesn't actually have anything to do with screen pixels - it's just a poorly chosen name. It's actually <b-link target="_blank" href="http://inamidst.com/stuff/notes/csspx">an non-linear angular measurement</b-link>. And this is why you can actually specify pixels in decimals such as <code>12.4px</code>.
</b-alert>

As an example, most desktop browsers usually sets the texts inside the `body` tag to `16px` by default. You can use `2em` on an element if you want it to be twice as big as the body text.

<b-alert variant="success" show>
When setting the size of some texts, try to think in relative units - "I want element A to be twice as big as element B". Instead of thinking "I want element A to be <code>20px</code>".
</b-alert>

### 2. Heading sizing

The size of headings are usually expressed in relative units. And it's common to define 6 levels of headings.

Bootstrap 4 defines the size of headings as below,

<asset src="articles/typography/bootstrap-headings.png" name="Headings in Bootstrap 4" newline></asset>

Another popular apporach is to define a _modular scale_ to define the heading sizes. Basically, it means specifying a root number and a ratio, and ratios are multiplied by the base to produce a scale of numbers that is proportionally related. For example, the following scale uses base `1em` and the ratio `1.5`. You can use [this tool](https://www.modularscale.com/) to create your custom scale.

<asset src="articles/typography/modular-scales.png" name="Modular Scale" newline></asset>

### 3. Line height

Line height can be specified in CSS using the `line-height` property like below,

```css
p {
  line-height: 1.5; # Note - better to not use any unit here.
}
```

When you don't put a unit, it's relative to the computed size of the text. For example, if the text is `12px` (or `0.75em` in a browser with default font size of `16px`)  in size, the line height will be `18px`.

The browser sets the line height to 1.2 by default, but it's usually too tight. And a line height of 1.5 makes the viewing experience a lot better. See image below, the line height on the left is 1.2 while the line height on the right is 1.5.

<asset src="articles/typography/line-height.png" name="Line Height" newline></asset>

### 4. Letter spacing

This is used a lot less compared to `line-height` or `font-size`. In general, we only need to specify custom spacing for texts that are either too big or too small. And you can do it in CSS using the `letter-spacing` property. Similar to `font-size`, it's best to be specified in relative units such as `em`.

```css
p {
  letter-spacing: 1em;
}
```

### 5. Length of line

The general consensus is that lines should contain 60 to 70 characters for best reading experience. Especially for text heavy pages.

And you can specify the line length in CSS using the following property,

```css
p {
  width: 50ch;
}
```

The unit `ch` [represents the width, or more precisely the advance measure, of the glyph "0"](https://developer.mozilla.org/en-US/docs/Web/CSS/length). And `50ch` generally results in line width to be 60 to 70 characters in length. A lot of text heavy sites, such as Medium.com, or even the Google search result page, put a similar limit on the number of characters in a line.

## References

1. [nuxt/content](https://content.nuxtjs.org/)
2. [Typography for Developers](https://css-tricks.com/typography-for-developers/#typeface-vs-font)
3. [Web Design is 95% Typography](https://ia.net/topics/the-web-is-all-about-typography-period)
4. [Using UI System Fonts In Web Design: A Quick Practical Guide](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)
5. [CSS px is an Angular Measurement](http://inamidst.com/stuff/notes/csspx)
6. [Modular Scale](https://www.modularscale.com/)
