---
title: Common Git commands and configurations used in a day-to-day workflow
excerpt: When using Git via the command line, I find myself repeating similar tasks everyday. Over time, I've built up a curated list of Git commands, aliases and configrations that I use on a daily basis.

# Optional
category: Git
tags: 
  - Git Commands
createdAt: "2019-11-14T13:00:00.000Z"
updatedAt: "2020-09-07T13:15:30.403Z"
enableComments: true
enableTOC: true
---

I'm a command line lover and use Git from the terminal all the time.

If you're like me, you might start getting annoyed by some little things from a certain point. For example, it starts to get a bit annoying to always type two separate commands - `git add <file>` then `git commit -m 'Your commit message'` - to commit your changes. Or maybe you want to have a nicer view when you type `git log`. Or you want your local branch to be automatically pruned when the remote branch has been deleted. Little things like this - you get the idea.

Over time, I have built up a curated list of commands, aliases and configrations that I use on a daily basis that makes my workflow more efficient and pleasant. And I'd like to share them with you below.

### Delete branch locally and remotely

When you're done with a branch, you might want to delete it from both the remote and your local machine.

```bash
# delete a remote branch
git push -d <remote_name> <branch_name> # or
git push -D <remote_name> <branch_name>

# delete a local branch
git branch -d <branch_name> # or
git branch -D <branch_name>
```

<b-alert variant="info" show>Note that in most cases the _<remote_name>_ name is origin.</b-alert>

**Note**: The `-d` option is an alias for `--delete`, which only deletes the branch if it has already been fully merged in its upstream branch. You could also use `-D`, which is an alias for `--delete --force`, which deletes the branch "[irrespective of its merged status](https://git-scm.com/docs/git-branch#Documentation/git-branch.txt--D)".

### List local branch and their remote tracking branch along with the latest commits

```bash
git branch -vv
```

### Checkout remote branch

With Git versions ≥ 1.6.6 and with only one remote, you can just do:

```bash
git fetch
git checkout <branch_name>
```

`git checkout <branch_name>` will NOT work in modern Git if you have multiple remotes. In this case use

```bash
git checkout -b <branch_name> <remote_name>/<branch_name>
```

or the shorthand

```bash
git checkout -t <remote_name>/<branch_name>
```

### Add and commit in one command

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

### Make Git to use Vim as editor for writing commit messages

If you want to set the editor only for Git, do either (you don’t need both):

- Set `core.editor` in your Git config: `git config --global core.editor "vim"`
- Set the `GIT_EDITOR` environment variable: `export GIT_EDITOR=vim`

If you want to set the editor for Git and also other programs, set the standardized `VISUAL` and `EDITOR` environment variables:

<b-alert variant="info" show>
Setting both is not necessarily needed, but some programs may not use the more-correct <code>VISUAL</code>.
</b-alert>

```bash
export VISUAL=vim
export EDITOR="$VISUAL"
```

### Discard unstaged files in current working directory

To discard all unstaged files in current working directory,

```bash
git checkout -- .
```

For a specific file, use

```bash
git checkout -- path/to/file/to/revert
```

The `--` is to remove [argument ambiguation](https://git-scm.com/docs/git-checkout#_argument_disambiguation).

### Rename a local and remote branch

**Step 1**: Rename your local branch

If you are on the branch you want to rename:

```bash
git branch -m new-name
```

If you are on a different branch:

```bash
git branch -m old-name new-name
```

**Step 2**: Delete the old-name remote branch and push the new-name local branch

```bash
git push origin :old-name new-name
```

**Step 3**: Reset the upstream branch for the new-name local branch

Switch to the branch and then:

```bash
git push origin -u new-name
```

### Prettify the Git log

**Step 1**: Set up alias

```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
```

**Step 2**: Append additional flags if needed

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

My most commonly used command is

```bash
git lg --after="yesterday" --author="Zean"
```

### Prettify Git diff

I use [diff-so-fancy](https://github.com/so-fancy/diff-so-fancy) to make the diffs more readable. Install it and then run,

```bash
git diff
```

### Prune remote-tracking branches automatically for a branch on the other side that has already been deleted

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
