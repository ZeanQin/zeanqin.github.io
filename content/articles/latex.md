---
title: My LaTex setup
excerpt: Using LaTex for document authoring.

# Optional
category:
tags: 
  - LaTex
createdAt: "2019-11-30T13:00:00.000Z"
updatedAt: "2020-08-16T05:43:52.314Z"
enableComments: true
enableTOC: true
---

## Installation

1. Install TeX Live

    TeX Live is a TeX distribution to get up and running with the TeX document production system. To install it, once you're in the terminal, enter the following command:

    ```bash
    # Arch Linux Family
    sudo pacman -S texlive-most

    # For Ubuntu
    sudo apt update && sudo apt install texlive-full

    # Fedora
    sudo dnf install texlive-scheme-full
    ```

2. Install Visual Studio Code with the [LaTeX-Workshop](https://github.com/James-Yu/LaTeX-Workshop) extension.

## Basics

### Special symbols

- `%` - mark the line as comment
- `\` - escape character; remove special meaning of special symbols to make them display as text, or add special meaning to texts to make them a command. Use `$\setminus$` to write an escape character as text.
- `$ ... $` - add math mode
- `{ ... }` - contain parameters for commands
- `~` - generate a unit of whitespace that cannot be broken between two lines for word wrapping. Use either `\~` or `$\sim$` to insert the tilde symbol into document
- `^` - add superscript in math mode
- `_` - add subscript in math mode
- `&` - vary depends on context
- `#` - vary depends on context

### Formatting commands

#### In-line formatting commands

These commands only format a little bit of text at a time.

- `\textbf{ ... }` - write text in bold
- `\textit{ ... }` - write text in italics
- `\underline{ ... }` - write text with underline
- `\sout{ ... }` - strike out text (need to use the `ulem` package)
- `\textsc{ ... }` - write text in all capital letters without "shouting"

#### `\begin ... \end` environments (i.e. block formatting commands)

The `\begin{ <FORMAT COMMAND> } ... \end{ <FORMAT COMMAND> }` environments format the large amount of texts using the given format command.

`\begin` and `\end` can be seen as commands that accepts other format commands as parameters. Not all commands can be passed as parameters.

Some examples include,

- `\begin{center} ... \end{center}` - centers a large amount of texts
- `\begin{flushright} ... \end{flushright}` - moves large amount of texts to the right side
- `\begin{flushleft} ... \end{flushleft}` -  moves large amount of texts to the left side
- `\begin{verbatim} ... \end{verbatim}` - types everything character for character, including commands. Ideal for a large amount of texts containing a lot of special symbols such as programming code.
- `\begin{tiny} ... \end{tiny}` - write texts in a really small size
- `\begin{huge} ... \end{huge}` - writes texts in a really large font size

In addition to formatting commands, `\begin` and `\end` are used for special segments of the document, including

1. creating lists.

    Bulleted lists are created as

    ```C
    \begin{itemize}
    \item ...
    \item ...
    \item ...
    \end{itemize}
    ```

    Numbered list can be created as

    ```C
    \begin{enumerate}
    \item ...
    \item ...
    \item ...
    \end{enumerate}
    ```

    Labelled lists where each item starts with an emphasized word provided in brackets like `\item[word]`. The brackets after the command \item can be used for the other list environments.

    ```C
    \begin{description}
       \item[He]llo
       \item[Wo]rld
    \end{description}
    ```

2. wrapping paper in the `\begin{document}` and `\end{document}` environment.

3. creating a table using `{tabular}`

4. creating a special Math Mode that gets its own line that can present larger symbols as following

    ```c
    \begin{displaymath}
    ...
    \end{displaymath}
    ```

    And its shortcut is

    ```c
    $$
    ...
    $$
    ```

#### Other special commands

- `\newline` or `\\` - indicate a line break

#### Sections and subsections

    ```c
    \section{title} - defines larger sections that have a single number and the title
    \subsection{title} - defines the smaller sections within the section mostly recently declared in the .tex file. They have two numbers separated by a period.
    ```

#### Packages

Packages are libaries that provide additional commands. To install a package, download it and place it in the same directory as the .tex file. To use the package in a document, the command `\usepackage{packageName}` must appear after the `\documentclass` command. Some packages have special parameters that appear in brackets before the package name.

## References

- [Learn LaTeX in 30 minutes](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes)
- [Freedman_LaTeXCheatSheet](https://people.cs.umass.edu/~freedman/resources/Freedman_LaTeXCheatSheet.pdf)
- [Chang_LaTeX_sheet](https://www.nyu.edu/projects/beber/files/Chang_LaTeX_sheet.pdf)
- [undergradmath](http://tug.ctan.org/info/undergradmath/undergradmath.pdf)
- [Writing LaTeX Documents In Visual Studio Code With LaTeX Workshop](https://medium.com/@rcpassos/writing-latex-documents-in-visual-studio-code-with-latex-workshop-d9af6a6b2815)
- [Manuel Ignacio López Quintero](https://milq.github.io/install-latex-ubuntu-debian/)
