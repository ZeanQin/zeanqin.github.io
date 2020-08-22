---
title: Point custom subdomain and root domain to GitHub Pages
excerpt: Steps I followed to point a custom root domain and a subdomain to GitHub Pages

# Optional
category: Frontend
tags: 
  - GitHub Pages
  - Custom Domain
createdAt: "2020-03-09T13:00:00.000Z"
updatedAt: "2020-08-22T13:45:58.424Z"
enableComments: true
enableTOC: true
---

## Introduction

I followed the steps below to point my root domain `zean.be` and the custom subdomain `www.zean.be` to a GitHub Pages project.

## Steps

**Step 1**: configure your GitHub Pages project to accept requests from your custom domains.

Create a file called **CNAME** in the root directory with the following two entries (with `zean.be` replaced by your own domain),

```CNAME
zean.be
www.zean.be
```

These two entries tell GitHub to redirect any requests to **_USERNAME_.github.io** to the domain specified in the **CNAME** file.

There are two entries to ensure that **[www.zean.be](https://www.zean.be)** will also redirect to **[zean.be](https://zean.be)**.

<b-alert variant="info" show>
  The order matters here; the first domain in the list is the primary domain and the other domains will be redirected to it.
</b-alert>

**Step 2**: add DNS records to point your root domain/subdomain to GitHub.

Add the following CNAME record to your DNS provider,

```CNAME
www.zean.be    CNAME    USERNAME.github.io
```

and add the following A records for the root domain,

```CNAME
@    A    185.199.108.153
@    A    185.199.109.153
@    A    185.199.110.153
@    A    185.199.111.153
```

## References

- [Managing a custom domain for your GitHub Pages site](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site#about-custom-domain-configuration)
- [How to point a domain on Google Domains to GitHub pages](http://www.curtismlarson.com/blog/2015/04/12/github-pages-google-domains/)
