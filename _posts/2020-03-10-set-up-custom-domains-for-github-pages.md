---
title: How to Point Custom Subdomain and Root Domain to Github Pages
layout: post
use_toc: true
excerpt: Point a custom root domain and a subdomain to GitHub pages
---

## Introduction

I followed the steps below to point my root domain i.e. `zean.be` and a custom subdomain i.e. `www.zean.be` to a GitHub pages project.

## Steps

### Step 1: Configure your GitHub pages project to accept requests from your custom domains

Create a **CNAME** file in the root directory and add the following two entries (with zean.be replaced by your own domain)

```CNAME
zean.be
www.zean.be
```

These two entries tell GitHub to redirect any requests to **USERNAME.github.io** to the domain specified in the **CNAME** file.

There are two entries to ensure that **www.zean.be** will also redirect to **zean.be**. The order matters here; the first domain in the list is the primary domain and the other domains will be redirected to it.

### Step 2: Add DNS records to point your root domain/subdomain to GitHub

Add the following CNAME record to your DNS provider,

```CNAME
www.zean.be    CNAME    USERNAME.github.io
```

and add the following A records for the root domain

```CNAME
@    A    185.199.108.153
@    A    185.199.109.153
@    A    185.199.110.153
@    A    185.199.111.153
```

## References

- [Managing a custom domain for your GitHub Pages site](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site#about-custom-domain-configuration)
- [How to point a domain on Google Domains to GitHub pages](http://www.curtismlarson.com/blog/2015/04/12/github-pages-google-domains/)
