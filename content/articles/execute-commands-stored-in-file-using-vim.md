---
title: How to execute commands stored in a file opened in vim
layout: post
use_toc: true
comments: true
excerpt: Store commands in a file then execute the current line in Vim
---

## How to
To store a list of commands in a text file, then execute the command where the cursor is located,

1. Set up shortcut in Vim using `:nmap ,x Y:!clear && <C-R>"<C-H><CR>`.
2. Then use `,``x`

The `<C-R>"` pastes the yanked text into the command-line; the `<C-H>` deletes the EOL character which was yanked along with the line.

Then you can set up the mapping upon starting vim by updating the `.vimrc` file with 
`nmap ,x Y:!clear && <C-R>"<C-H><CR>`. My sample `.vimrc` file is .

## References
1. [Mapping keys in Vim](https://vim.fandom.com/wiki/Mapping_keys_in_Vim_-_Tutorial_(Part_1))
2. [Vim: How to execute commands stored in a textfile opened in Vim](https://superuser.com/questions/125272/vim-how-to-execute-commands-stored-in-a-textfile-opened-in-vim)
3. [commandlinefu](https://www.commandlinefu.com/commands/browse)