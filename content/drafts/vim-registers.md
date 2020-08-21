---
title: Vim - Registers
excerpt: What are registers in Vim and the common uses cases.

# Optional
category: Vim
tags: 
  - Vim Registers
createdAt: "2020-08-21T06:33:50.517Z"
updatedAt: "2020-08-21T06:33:50.517Z"
enableComments: true
enableTOC: true
---

### Commands

- `"reg` - list all registers and their contents
- `"reg <register-1> <register-2>` - list specified registers and their contents

- `"<register-name>` - access the register with name `<register-name>`
- `"<register-name>y` - yank selected text and store it in the register `<register-name>`
- `"<register-name>p` - paste the content stored in `<register-name>`

### Wellknown registers

#### `"` - the unnamed (or default) register

#### `0 - 9` - the numbered registers

- `"0` - the content of the latest yank
- `"1 - "9` - the last 9 deleted text with `"1` being the newest and `"9` being the oldes.

> If you yanked some text, you can always refer to it using `"0p`.

#### The read only registers

- `".` - The last inserted text. It’s quite handy if you need to write the same text twice, in different places, not needing to yank and paste
- `"%` - has the current file path, starting from the directory where vim was first opened.
- `":` -
- `"#` -
