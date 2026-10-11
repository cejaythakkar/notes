# Git Comprehensive Guide

A practical Git guide for day-to-day developer work. It includes the commands you practiced, corrections for a few commands, and extra workflows that are useful in real projects.

## Index

- [1. What Git Tracks](#1-what-git-tracks)
- [2. First-Time Setup](#2-first-time-setup)
- [3. Create or Clone a Repository](#3-create-or-clone-a-repository)
- [4. Check Status and Add Files](#4-check-status-and-add-files)
- [5. Commit Changes](#5-commit-changes)
- [6. View History](#6-view-history)
- [7. Compare Changes](#7-compare-changes)
- [8. Restore Files and Undo Mistakes](#8-restore-files-and-undo-mistakes)
- [9. Branches](#9-branches)
- [10. Remote Repositories](#10-remote-repositories)
- [11. Pull, Fetch, Push](#11-pull-fetch-push)
- [12. Merge and Conflicts](#12-merge-and-conflicts)
- [13. Stash](#13-stash)
- [14. Tags](#14-tags)
- [15. Clean Untracked Files](#15-clean-untracked-files)
- [16. Protect Main Branch](#16-protect-main-branch)
- [17. Daily Developer Workflows](#17-daily-developer-workflows)
- [18. Common Mistake Recipes](#18-common-mistake-recipes)
- [19. Useful Aliases](#19-useful-aliases)
- [20. Official References](#20-official-references)

---

## 1. What Git Tracks

Git has three common working areas:

| Area         | Meaning                            |
| ------------ | ---------------------------------- |
| Working tree | Your actual files on disk          |
| Staging area | Files selected for the next commit |
| Repository   | Saved commits in Git history       |

Common flow:

```bash
edit files
git status
git add .
git commit -m "message"
git push
```

---

## 2. First-Time Setup

Set your name and email once:

```bash
git config --global user.name "Jay Thakkar"
git config --global user.email "ce.jaythakkar@gmail.com"
```

Check config:

```bash
git config --list
```

Set default branch name to `main`:

```bash
git config --global init.defaultBranch main
```

---

## 3. Create or Clone a Repository

Create Git tracking in an existing folder:

```bash
git init
```

Clone an existing remote repository:

```bash
git clone https://github.com/cejaythakkar/notes.git
```

After cloning:

```bash
cd notes
git status
```

---

## 4. Check Status and Add Files

Check current state:

```bash
git status
```

Add all changed and new files:

```bash
git add .
```

Add one file:

```bash
git add git.md
```

Add all files using wildcard:

```bash
git add *
```

Prefer `git add .` in most cases because it is clearer and handles nested changes from the current folder.

See what is staged:

```bash
git diff --staged
```

---

## 5. Commit Changes

Commit staged changes:

```bash
git commit -m "adding git.md"
```

Another commit:

```bash
git commit -m "second commit"
```

Good commit message examples:

```bash
git commit -m "Add Git notes"
git commit -m "Fix login validation"
git commit -m "Update product API response"
```

Commit message tip:

- Use present tense: `Add`, `Fix`, `Update`, `Remove`
- Keep it short but meaningful
- Explain why in the body if needed:

```bash
git commit -m "Fix checkout total calculation" -m "Discount was applied before tax, causing incorrect final totals."
```

---

## 6. View History

Basic log:

```bash
git log
```

One commit per line:

```bash
git log --pretty=oneline
```

Short, readable format:

```bash
git log --pretty=format:"%h - %an, %ar: %s"
```

Meaning:

| Placeholder | Meaning               |
| ----------- | --------------------- |
| `%h`        | Short commit hash     |
| `%an`       | Author name           |
| `%ar`       | Author date, relative |
| `%s`        | Commit subject        |

Show latest 2 commits with patch:

```bash
git log -p -2
```

Show file change statistics:

```bash
git log --stat
```

Search commit messages:

```bash
git log --grep="fifth"
```

Important correction:

```bash
git log grep="fifth"
```

is wrong. Use:

```bash
git log --grep="fifth"
```

Search code changes containing a string:

```bash
git log -S "made changes by mistake and added in the staging area"
```

Filter by date:

```bash
git log --since="2025-01-01"
git log --until="2025-01-01"
```

Filter by author:

```bash
git log --author="cejaythakkar"
```

Show a file from a specific commit:

```bash
git show 089f659:git.md
```

Show a specific commit:

```bash
git show 089f659
```

---

## 7. Compare Changes

Show unstaged changes:

```bash
git diff
```

Show staged changes:

```bash
git diff --staged
```

Compare current branch with `main`:

```bash
git diff main
```

Compare two commits:

```bash
git diff commit_hash_1 commit_hash_2
```

Compare one file between commits:

```bash
git diff commit_hash_1 commit_hash_2 -- git.md
```

---

## 8. Restore Files and Undo Mistakes

Restore one file from the working tree:

```bash
git restore git.md
```

Restore all unstaged changes:

```bash
git restore .
```

Same idea, explicit working tree:

```bash
git restore --worktree .
```

Unstage everything:

```bash
git restore --staged .
```

Use this when you made changes by mistake and already added them to staging:

```bash
git restore --staged .
git restore .
```

Restore one file from a previous commit:

```bash
git checkout 0d0b98c2a47d7bdce9a9679cf60c64338e5ce824 -- git.md
```

Restore all files from a previous commit:

```bash
git checkout 0d0b98c2a47d7bdce9a9679cf60c64338e5ce824 -- .
```

Avoid this unless you are sure:

```bash
git checkout 0d0b98c2a47d7bdce9a9679cf60c64338e5ce824 -- *
```

The `.` version is usually safer and clearer.

Hard reset to previous commit:

```bash
git reset --hard HEAD^
```

Warning: this removes local changes and moves the branch back by one commit. Use only when you are sure.

Safer alternative when the commit is already pushed:

```bash
git revert commit_hash
```

`revert` creates a new commit that undoes an old commit. It is safer for shared branches.

---

## 9. Branches

Show local branches:

```bash
git branch
```

Create a branch:

```bash
git branch design
```

Switch to a branch:

```bash
git checkout design
```

Create and switch in one command:

```bash
git checkout -b feature/my-change
```

Modern alternative:

```bash
git switch -c feature/my-change
```

Rename current branch to `main`:

```bash
git branch -M main
```

Delete a local branch:

```bash
git branch -d design
```

Force delete local branch:

```bash
git branch -D design
```

List remote branches:

```bash
git branch -r
```

List all branches:

```bash
git branch -a
```

---

## 10. Remote Repositories

Show remotes:

```bash
git remote -v
```

Add remote:

```bash
git remote add origin https://github.com/cejaythakkar/notes.git
```

Change remote URL:

```bash
git remote set-url origin https://github.com/cejaythakkar/notes.git
```

Remove remote:

```bash
git remote remove origin
```

---

## 11. Pull, Fetch, Push

Push current branch:

```bash
git push
```

First push for a new local branch:

```bash
git push -u origin feature/my-change
```

Push `main` first time:

```bash
git push -u origin main
```

After upstream is set, use:

```bash
git push
```

Fetch latest remote changes without merging:

```bash
git fetch
```

Pull latest changes and merge into current branch:

```bash
git pull
```

Pull with rebase:

```bash
git pull --rebase
```

Simple rule:

- `fetch` downloads remote updates only
- `pull` downloads and applies remote updates
- `push` uploads your commits

---

## 12. Merge and Conflicts

Merge another branch into current branch:

```bash
git merge design
```

If conflicts happen:

1. Open the conflicted files.
2. Find conflict markers.
3. Keep the correct code.
4. Remove conflict markers.
5. Add resolved files.
6. Commit the merge.

Conflict markers look like this:

```text
<<<<<<< HEAD
your current branch code
=======
incoming branch code
>>>>>>> design
```

After fixing:

```bash
git add .
git commit
```

Abort a merge:

```bash
git merge --abort
```

---

## 13. Stash

`git stash` temporarily saves uncommitted changes so you can return to a clean working tree.

Stash tracked changes:

```bash
git stash
```

Stash with message:

```bash
git stash push -m "message"
```

Stash tracked and untracked files:

```bash
git stash -u
```

Show stash list:

```bash
git stash list
```

Apply latest stash but keep it in stash list:

```bash
git stash apply
```

Apply specific stash:

```bash
git stash apply stash@{1}
```

Apply latest stash and remove it from stash list:

```bash
git stash pop
```

Delete one stash:

```bash
git stash drop stash@{1}
```

Clear all stashes:

```bash
git stash clear
```

Common use case:

```bash
git stash push -m "work in progress"
git checkout main
git pull
git checkout feature/my-change
git stash pop
```

---

## 14. Tags

List tags:

```bash
git tag
```

Important correction:

```bash
git tags
```

is wrong. Use:

```bash
git tag
```

Create annotated tag:

```bash
git tag -a v7 -m "this is v7"
```

Create annotated tag on a specific commit:

```bash
git tag -a v6 commit_hash -m "this is v6"
```

Push all tags:

```bash
git push origin --tags
```

Push one tag:

```bash
git push origin v7
```

Delete local tag:

```bash
git tag -d v7
```

Delete remote tag:

```bash
git push origin --delete v7
```

---

## 15. Clean Untracked Files

Preview files Git will remove:

```bash
git clean -n
```

Remove untracked files:

```bash
git clean -f
```

Remove untracked files and folders:

```bash
git clean -fd
```

Remove ignored files too:

```bash
git clean -fdx
```

Warning: `git clean` deletes untracked files. Always run preview first:

```bash
git clean -n
```

---

## 16. Protect Main Branch

On GitHub, protect `main` so nobody pushes directly.

Classic branch protection:

```text
Repository -> Settings -> Branches -> Add branch protection rule
Branch name pattern: main
Enable: Require a pull request before merging
Enable: Require approvals
Save
```

Newer GitHub rulesets:

```text
Repository -> Settings -> Rules -> Rulesets -> New branch ruleset
Target branch: main
Require pull request before merging
Save
```

Useful options:

- Require pull request before merging
- Require approvals
- Require status checks to pass before merging
- Do not allow bypassing the above settings

Status checks usually appear after you have CI configured, for example GitHub Actions.

---

## 17. Daily Developer Workflows

### Start New Feature

```bash
git checkout main
git pull
git checkout -b feature/login-page
```

Work, then:

```bash
git status
git add .
git commit -m "Add login page"
git push -u origin feature/login-page
```

Then open a pull request into `main`.

### Continue Existing Feature

```bash
git checkout feature/login-page
git pull
git status
```

### Update Feature Branch with Latest Main

Option 1: merge:

```bash
git checkout feature/login-page
git fetch origin
git merge origin/main
```

Option 2: rebase:

```bash
git checkout feature/login-page
git fetch origin
git rebase origin/main
```

Use merge if you want simpler history handling. Use rebase if your team prefers cleaner linear history.

### Finish Feature

```bash
git checkout main
git pull
git branch -d feature/login-page
```

Delete remote branch:

```bash
git push origin --delete feature/login-page
```

---

## 18. Common Mistake Recipes

### I changed files by mistake but did not stage them

```bash
git restore .
```

### I changed files by mistake and staged them

```bash
git restore --staged .
git restore .
```

### I committed on the wrong branch

Save the commit hash:

```bash
git log --oneline
```

Switch to the correct branch and cherry-pick:

```bash
git checkout correct-branch
git cherry-pick commit_hash
```

Go back to wrong branch and remove commit:

```bash
git checkout wrong-branch
git reset --hard HEAD^
```

Be careful if the wrong branch was already pushed.

### I forgot to add one file to the last commit

```bash
git add missing-file.md
git commit --amend
```

If you only want to update the commit without changing message:

```bash
git commit --amend --no-edit
```

### I want to undo a pushed commit safely

```bash
git revert commit_hash
git push
```

### I want to see who changed a line

```bash
git blame git.md
```

### I want to find when text was added or removed

```bash
git log -S "some text"
```

### I want to recover a lost commit

```bash
git reflog
```

Then:

```bash
git checkout commit_hash
```

or create a branch from it:

```bash
git checkout -b recovered-work commit_hash
```

---

## 19. Useful Aliases

Add shortcuts:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --pretty=format:'%h - %an, %ar: %s'"
```

Then use:

```bash
git st
git lg
```

---

## 20. Official References

- [Git official documentation](https://git-scm.com/docs/git)
- [Git official cheat sheet](https://git-scm.com/cheat-sheet)
- [GitHub Docs: Pushing commits to a remote repository](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository)
- [GitHub Docs: Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub Docs: Pull requests](https://docs.github.com/en/pull-requests)
