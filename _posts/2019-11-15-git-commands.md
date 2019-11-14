---
title: My commonly used Git commands
layout: post
use_toc: true
excerpt: These are some of my most commonly used Git commands.
---

## Delete branch locally and remotely

```
$ git push -d <remote_name> <branch_name>
$ git branch -d <branch_name>
```
Note that in most cases the remote name is origin.

To delete the local branch use one of the following:

```
$ git branch -d branch_name
$ git branch -D branch_name
```

Note: The `-d` option is an alias for `--delete`, which only deletes the branch if it has already been fully merged in its upstream branch. You could also use `-D`, which is an alias for `--delete --force`, which deletes the branch "irrespective of its merged status." [Source: `man git-branch`]

## List local branch and their remote tracking branch along with the latest commits
```
git branch -vv
```

## Checkout remote branch 

With Git versions ≥ 1.6.6, with only one remote, you can just do:

```
git fetch
git checkout test
```

`git checkout test` will NOT work in modern git if you have multiple remotes. In this case use

```
git checkout -b test <name of remote>/test
```

or the shorthand 

```
git checkout -t <name of remote>/test
```

## add and commit in one command

```
git config --global alias.add-commit '!git add -A && git commit'
```

and use it with

```
git add-commit -m 'My commit message'
```


## References

1. [How do I delete a Git branch locally and remotely?](https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-locally-and-remotely)
2. [How do I check out a remote Git branch?](https://stackoverflow.com/questions/1783405/how-do-i-check-out-a-remote-git-branch)
3. [Git add and commit in one command](https://stackoverflow.com/questions/4298960/git-add-and-commit-in-one-command)
