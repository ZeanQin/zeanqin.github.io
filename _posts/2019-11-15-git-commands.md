---
title: My commonly used Git commands
layout: post
use_toc: true
use_code: true
comments: true
excerpt: These are some of my most commonly used Git commands.
---

## Delete branch locally and remotely

```bash
git push -d <remote_name> <branch_name>
git branch -d <branch_name>
```

Note that in most cases the remote name is origin.

To delete the local branch use one of the following:

```bash
git branch -d branch_name
git branch -D branch_name
```

Note: The `-d` option is an alias for `--delete`, which only deletes the branch if it has already been fully merged in its upstream branch. You could also use `-D`, which is an alias for `--delete --force`, which deletes the branch "irrespective of its merged status." [Source: `man git-branch`]

## List local branch and their remote tracking branch along with the latest commits

```bash
git branch -vv
```

## Checkout remote branch

With Git versions ≥ 1.6.6, with only one remote, you can just do:

```bash
git fetch
git checkout test
```

`git checkout test` will NOT work in modern git if you have multiple remotes. In this case use

```bash
git checkout -b test <name of remote>/test
```

or the shorthand

```bash
git checkout -t <name of remote>/test
```

## Add and commit in one command

```bash
# add a `add-commit` alias, or
git config --global alias.add-commit '!git add -A && git commit'

# add a `ac` alias to save a few more keystrokes
git config --global alias.ac '!git add -A && git commit'
```

and use it with

```bash
git add-commit -m 'My commit message' # or
git ac -m 'My commit message'
```

## Make Git to use vim as editor for writing commit messages

If you want to set the editor only for Git, do either (you don’t need both):

- Set `core.editor` in your Git config: `git config --global core.editor "vim"`
- Set the `GIT_EDITOR` environment variable: `export GIT_EDITOR=vim`

If you want to set the editor for Git and also other programs, set the standardized `VISUAL` and `EDITOR` environment variables*:

```bash
export VISUAL=vim
export EDITOR="$VISUAL"
```

*Setting both is not necessarily needed, but some programs may not use the more-correct `VISUAL`. See `VISUAL` vs. `EDITOR`.

## Discard unstaged files in current working directory

To discard all unstaged files in current working directory,

```bash
git checkout -- .
```

For a specific file, use

```bash
git checkout -- path/to/file/to/revert
```

The `--` is to remove [argument ambiguation](https://git-scm.com/docs/git-checkout#_argument_disambiguation).

## Rename a local and remote branch

### Step 1: Rename your local branch

If you are on the branch you want to rename:

```bash
git branch -m new-name
```

If you are on a different branch:

```bash
git branch -m old-name new-name
```

### Step 2: Delete the old-name remote branch and push the new-name local branch

```bash
git push origin :old-name new-name
```

### Step 3: Reset the upstream branch for the new-name local branch

Switch to the branch and then:

```bash
git push origin -u new-name
```

## A better Git log

Step 1: Set up alias

```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
```

Step 2: Append additional flags if needed

```bash
# filter by start date
--after="2016-01-31"
--since="2016-01-31"

# filter by end date
--before="2017-03-10"
--until="2017-03-10"

# filter by auther
--author="John Doe"
```

### commonly used

```bash
git lg --after="yesterday" --author="Zean"
```

## Git Diffs

I use [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) to make the diffs more readable. Install it and then run,

```bash
git diff
```

## Automatically prune remote-tracking branches for a branch on the other side that has already been deleted

Without `git fetch --prune`, remote-tracking branches for a branch
the other side already has removed will stay forever.

To always `--prune` for `git fetch` and `git pull` in all your Git repositories:

```bash
git config --global fetch.prune true
```

To always `--prune` but from one single repository,

```bash
git config remote.origin.prune true
                 #^^^^^^
                 #replace with your repo name
```

## References

1. [How do I delete a Git branch locally and remotely?](https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-locally-and-remotely)
2. [How do I check out a remote Git branch?](https://stackoverflow.com/questions/1783405/how-do-i-check-out-a-remote-git-branch)
3. [Git add and commit in one command](https://stackoverflow.com/questions/4298960/git-add-and-commit-in-one-command)
4. [How do I make Git use the editor of my choice for commits?](https://stackoverflow.com/questions/2596805/how-do-i-make-git-use-the-editor-of-my-choice-for-commits)
5. [How do I discard unstaged changes in Git?](https://stackoverflow.com/questions/52704/how-do-i-discard-unstaged-changes-in-git)
6. [Rename a local and remote branch in git](https://multiplestates.wordpress.com/2015/02/05/rename-a-local-and-remote-branch-in-git/)
7. [Good-lookin' diffs. Actually… nah… The best-lookin' diffs.](https://github.com/so-fancy/diff-so-fancy)
8. [Automatic prune with Git fetch or pull](https://stackoverflow.com/questions/18308535/automatic-prune-with-git-fetch-or-pull)
9. [fetch: make --prune configurable](https://github.com/git/git/commit/737c5a9cde708d6995c765b7c2e95033edd0a896#diff-07f3b3cf16a56e95990c64bdef634199R940)
