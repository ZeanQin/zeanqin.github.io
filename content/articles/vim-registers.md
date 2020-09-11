---
title: Vim - Registers 
excerpt: What are registers in Vim, how to use them and the best practices.

# Optional
category: Vim
tags: 
  - Vim Registers
createdAt: "2020-08-21T06:33:50.517Z"
updatedAt: "2020-08-31T11:47:22.367Z"
enableComments: true
enableTOC: true
---

## Overview

A register in Vim is basically a slot in memory that you can put a piece of text in and read it out later. Each register is like the clipboard provided by the OS (e.g. Windows, MacOS etc.), except that Vim has a LOT of them instead of just one.

<b-alert variant="info" show>
  It takes a while to learn how to use them and some slow repetitions in the beginning to develop the muscle memory, but you'll never go back to the simple yank/paste again after getting comfortable with it.
</b-alert>

## Basic usage

You can list all registers and their contents by using the `:reg` command, or using the `:reg <register-a> <register-b> ...` to filter to the specific registers and their contents.

Each register is accessed following the pattern `"<register-name><command>`. Note it's got 3 parts,

- the `"` prefix,
- the `<register-name>`, and
- the `<command>` to perform on that register.

For example, `"ay` yanks the current selected text and stores it in the register `"a`, and `"ap` pastes the current content of register `"a`.

## Registers

There're 9 different types of registers provided by Vim. I've listed them all below, but only included detailed explanation (with some common practices) for the ones I've used the most. For the advanced ones, I've included a link to the official documentation.

### 1. Unnamed (or default) register

The `"` register (accessed via `""`) is the default register.

Its content will be updated whenever you delete (using the `d`, `c`, `s` or `x` commands) or yank (using the `y` command) some text.

You can read the content of this register by using `""`. For example, you can do `""p` to paste the value store in it.

<b-alert variant="info" show>
  Vim reads the content of the unnamed register for any put command (<code>p</code> or <code>P</code>) which does not specify a register. So, <code>p</code> is the same as <code>""p</code>
</b-alert>

### 2. Numbered registers

These are the registers `"0`, `"1`, `"2`, `"3`, `"4`, `"5`, `"6`, `"7`, `"8`, `"9`.

**`"0`** will be set by the most recent yank command, therefore it always has the content of the latest yank.

<b-alert variant="info" show>
  If you yanked some text, you can always refer to it using <code>"0p</code>.
</b-alert>

**`"1`** will be set by the most recent delete or change command _**only if the deleted or changed text is longer than one line (also called big delete)**_.

**`"2`, `"3`, `"4`, `"5`, `"6`, `"7`, `"8`, `"9`** stores the other 8 latest _*big*_ deletion or change. With each successive _big_ deletion or change command, Vim shifts the previous contents of `"1` into `"2`, `"2` into `"3`, and so forth, losing the previous contents of `"9`.

### 3. Small delete register

The register **`-`** is set by a delete command _**only if the deleted text is smaller than one line (also called small delete)**_.

<b-alert variant="success" show>
  <span class="font-weight-bold">Tip</span>: The latest yanked texts will always appear in <code>"0</code>. The latest small deletion will appear in <code>"-</code> while the latest big deletion will appear in <code>"1</code>. The other latest 8 big deletion will appear in <code>"2</code>,  <code>"3</code>,  <code>"4</code>,  <code>"5</code>,  <code>"6</code>,  <code>"7</code>,  <code>"8</code>, <code>"9</code>.
</b-alert>

### 4. Named registers

These are the registers **`"a`** to **`"z`**, or **`"A`** to **`"Z`**.

These registers are only used when you say so.  Specify them as lowercase letters to replace their previous contents or as uppercase letters to append to their previous contents.

<b-alert variant="success" show>
  <span class="font-weight-bold">Tip</span>: I only use a couple of these as more permanent storage for code snippets such as <code>console.log(``)</code>, as compared to the temporary storage provided by the numbered registers and the small delete register.
</b-alert>

<b-alert variant="info" show>
  I find myself can survive with just the basic registers mentioned so far, and rarely use the ones below. But if you're interested, keep reading.
</b-alert>

### 5. Read-only registers

These are **`%`**, **`#`**, **`:`** and **`.`**.  

You can use them only with the `p`, `P`, and `:put` commands and with `CTRL-R`.

<b-table-simple hover small caption-top responsive>
    <b-tbody>
      <b-tr>
        <b-th colspan="3"><code>".</code></b-th>
        <b-td>
          <p>Contains the last inserted text (the same as what is inserted with the insert mode commands <code>CTRL-A</code> and <code>CTRL-@</code>).</p>
          <p>
          <span class="font-weight-bold">Note</span>: this doesn't work with <code>CTRL-R</code> on the command-line.  It works a bit differently, like inserting the text instead of putting it ('textwidth' and other options affect what is inserted).
          </p>
        </b-td>
      </b-tr>
      <b-tr>
        <b-th colspan="3"><code>"%</code></b-th>
        <b-td>Contains the name of the current file.</b-td>
      </b-tr>
      <b-tr>
        <b-th colspan="3"><code>"#</code></b-th>
        <b-td>Contains the name of the alternate file.</b-td>
      </b-tr>
      <b-tr>
        <b-th colspan="3"><code>":</code></b-th>
        <b-td>
        <p>
          Contains the most recent executed command-line.  Example: Use <code>@:</code> to repeat the previous command-line command.
        </p>
        <p>
          The command-line is only stored in this register when at least one character of it was typed.  Thus it remains unchanged if the command was completely from a mapping.
        </p>
        </b-td>
      </b-tr>
    </b-tbody>
</b-table-simple>

### 6. Expression register

The expression register is the **`"=`**. According to the documentation,

> This is not really a register that stores text, but is a way to use an expression in commands which use a register.  The expression register is read-only; you cannot put text into it.  After the <code>'='</code>, the cursor moves to the command-line, where you can enter any expression. All normal command-line editing commands are available, including a special history for expressions.  When you end the command-line by typing <code><CR\></code>, Vim computes the result of the expression.  If you end it with <code><Esc\></code>, Vim abandons the expression.  If you do not enter an expression, Vim uses the previous expression (like with the "/" command).
> The expression must evaluate to a String.  A Number is always automatically converted to a String.  For the <code>p</code> and <code>:put</code> command, if the result is a Float it's converted into a String.  If the result is a List each element is turned into a String and used as a line. A Dictionary or FuncRef results in an error message.
> If the <code>"=</code> register is used for the <code>p</code> command, the String is split up at <code><NL\></code> characters.  If the String ends in a <code><NL\></code>, it is regarded as a linewise register.

Please see the [documentation](http://vimdoc.sourceforge.net/htmldoc/change.html#registers) for details

### 7. Selection and drop registers

These are the **`"*`**, **`"+`**, and **`"~`**.

They're used for storing and retrieving the selected text for the GUI. As I've never used this, I won't write down all the details for it. If you're interested, you could read the [documentation](http://vimdoc.sourceforge.net/htmldoc/change.html#registers) for details.

### 8. Black hole register

The **`"_`** is the black hole register. As the name implies, nothing will happen if you write to it, and nothing will be returned from it if you try to read its content.

<b-alert variant="success" show>
  <span class="font-weight-bold">Tip</span>: You can direct your deleted text to the black hole register to avoid affecting other normal registers.
</b-alert>

### 9. Last search pattern register

This is the **`"/`** register, and it stores the most recent search pattern.

According to the [documentation](http://vimdoc.sourceforge.net/htmldoc/change.html#registers),
> This is used for `n` and `hlsearch`. It is writable with `:let`, you can change it to have `hlsearch` highlight other matches without actually searching.  You can't yank or delete into this register.  The search direction is available in `v:searchforward`. Note that the valued is restored when returning from a function `function-search-undo`.

## References

- [The nine types of registers in Vim](http://vimdoc.sourceforge.net/htmldoc/change.html#registers)
- [Vim registers: The basics and beyond](https://www.brianstorti.com/vim-registers/)
