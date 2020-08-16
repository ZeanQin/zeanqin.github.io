---
title: Apache website files permission setup
excerpt: A quick summary of Apache website files permission setup

# Optional
category: 
tags: 
  - Apache file permissions
createdAt: "2017-08-05T14:00:00.000Z"
updatedAt: "2020-08-16T05:16:30.308Z"
enableComments: true
enableTOC: true
---

Website files served by Apache need to have appropriate permissions. The common practice is to set all directories to 755 and set all files to 644.

To change all the directories to 755 (`drwxr-xr-x`):

```bash
find <path_to_document_root> -type d -exec chmod 755 {} \;
```

To change all the files to 644 (`-rw-r--r--`):

```bash
find <path_to_document_root> -type f -exec chmod 644 {} \;
```

In the commands above, `chmod 644 {} \;` specifies the command that will be executed by `find` for each file. `{}` is replaced by the file path, and the semicolon denotes the end of the command (escaped, otherwise it would be interpreted by the shell instead of `find`).
