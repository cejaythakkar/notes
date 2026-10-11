# Git Scenario Cheat Sheet

A short guide for common day-to-day Git situations.

## Index

- [I changed files but want to discard changes](#i-changed-files-but-want-to-discard-changes)
- [I staged changes by mistake](#i-staged-changes-by-mistake)
- [I committed by mistake](#i-committed-by-mistake)
- [I want to change my last commit message](#i-want-to-change-my-last-commit-message)
- [I forgot to add a file to my last commit](#i-forgot-to-add-a-file-to-my-last-commit)
- [I committed on the wrong branch](#i-committed-on-the-wrong-branch)
- [I want to save work temporarily](#i-want-to-save-work-temporarily)
- [I want to stash only some files](#i-want-to-stash-only-some-files)
- [I applied stash and got conflicts](#i-applied-stash-and-got-conflicts)
- [I want to switch branches but Git is stopping me](#i-want-to-switch-branches-but-git-is-stopping-me)
- [I want to create a new branch](#i-want-to-create-a-new-branch)
- [I want to push a new branch](#i-want-to-push-a-new-branch)
- [I want to connect local repo to GitHub](#i-want-to-connect-local-repo-to-github)
- [I want latest code from main](#i-want-latest-code-from-main)
- [I want to pull but avoid messy merge commits](#i-want-to-pull-but-avoid-messy-merge-commits)
- [I have merge conflicts](#i-have-merge-conflicts)
- [I want to undo a pushed commit safely](#i-want-to-undo-a-pushed-commit-safely)
- [I deleted a branch or commit by mistake](#i-deleted-a-branch-or-commit-by-mistake)
- [I want to see what changed](#i-want-to-see-what-changed)
- [I want to check commit history](#i-want-to-check-commit-history)
- [I want to find a commit by text](#i-want-to-find-a-commit-by-text)
- [I want to know who changed a line](#i-want-to-know-who-changed-a-line)
- [I want to restore one file from old commit](#i-want-to-restore-one-file-from-old-commit)
- [I want to remove untracked files](#i-want-to-remove-untracked-files)
- [I want to tag a release](#i-want-to-tag-a-release)
- [I want to delete branches](#i-want-to-delete-branches)
- [I want to protect main](#i-want-to-protect-main)
- [Daily safe workflow](#daily-safe-workflow)

---

## I changed files but want to discard changes

If changes are not staged:

```bash
git restore .
```

For one file:

```bash
git restore git.md
```

This removes local uncommitted changes from your working tree.

---

## I staged changes by mistake

If you ran `git add .` by mistake:

```bash
git restore --staged .
```

This only unstages the files. Your changes still remain in the files.

If you also want to remove those file changes:

```bash
git restore --staged .
git restore .
```

---

## I committed by mistake

If the commit is local and not pushed:

```bash
git reset --hard HEAD^
```

This removes the latest commit and its changes.

If you want to undo the commit but keep the changes unstaged:

```bash
git reset HEAD^
```

If you want to undo the commit but keep changes staged:

```bash
git reset --soft HEAD^
```

Quick meaning:

| Command                  | Commit removed? | Changes kept? |
| ------------------------ | --------------- | ------------- |
| `git reset --hard HEAD^` | Yes             | No            |
| `git reset HEAD^`        | Yes             | Yes, unstaged |
| `git reset --soft HEAD^` | Yes             | Yes, staged   |

---

## I want to change my last commit message

If the commit is not pushed yet:

```bash
git commit --amend -m "New commit message"
```

If already pushed, avoid amending unless your team is okay with force-push.

---

## I forgot to add a file to my last commit

Add the missing file:

```bash
git add missing-file.md
```

Update the last commit without changing the message:

```bash
git commit --amend --no-edit
```

Avoid this if the commit is already pushed and shared.

---

## I committed on the wrong branch

Find your commit:

```bash
git log --oneline
```

Copy the commit hash.

Switch to the correct branch:

```bash
git checkout correct-branch
```

Apply that commit:

```bash
git cherry-pick commit_hash
```

Go back to wrong branch:

```bash
git checkout wrong-branch
```

Remove the mistaken commit:

```bash
git reset --hard HEAD^
```

Only do the reset if the commit was not already pushed/shared.

---

## I want to save work temporarily

Use stash:

```bash
git stash push -m "work in progress"
```

Include untracked files too:

```bash
git stash -u
```

See saved stashes:

```bash
git stash list
```

Bring latest stash back:

```bash
git stash pop
```

Apply a specific stash:

```bash
git stash apply stash@{1}
```

Clear all stashes:

```bash
git stash clear
```

---

## I want to stash only some files

Stash one file:

```bash
git stash push -m "stash git notes" -- git.md
```

Stash multiple files:

```bash
git stash push -m "stash selected files" -- file1.md file2.md
```

Apply stash but keep it in stash list:

```bash
git stash apply
```

Apply and remove from stash list:

```bash
git stash pop
```

Delete one stash:

```bash
git stash drop stash@{1}
```

---

## I applied stash and got conflicts

Check conflicted files:

```bash
git status
```

Open files, fix conflict markers, then stage:

```bash
git add .
```

If you used `git stash pop`, the stash may remain if conflicts happened. Check:

```bash
git stash list
```

After everything is resolved, continue working or commit:

```bash
git commit -m "Apply stashed changes"
```

---

## I want to switch branches but Git is stopping me

If Git says your local changes would be overwritten, either commit, stash, or discard changes.

Option 1: commit:

```bash
git add .
git commit -m "Save current work"
git checkout other-branch
```

Option 2: stash:

```bash
git stash push -m "before switching branch"
git checkout other-branch
```

Option 3: discard:

```bash
git restore .
git checkout other-branch
```

---

## I want to create a new branch

Create and switch:

```bash
git checkout -b feature/my-change
```

Modern version:

```bash
git switch -c feature/my-change
```

---

## I want to push a new branch

First push:

```bash
git push -u origin feature/my-change
```

After that:

```bash
git push
```

---

## I want to connect local repo to GitHub

Check remotes:

```bash
git remote -v
```

Add GitHub remote:

```bash
git remote add origin https://github.com/username/repo.git
```

Rename branch to main:

```bash
git branch -M main
```

Push first time:

```bash
git push -u origin main
```

If remote URL is wrong:

```bash
git remote set-url origin https://github.com/username/repo.git
```

---

## I want latest code from main

Go to main:

```bash
git checkout main
```

Pull latest:

```bash
git pull
```

Update your feature branch with latest main:

```bash
git checkout feature/my-change
git merge main
```

Alternative using remote main:

```bash
git fetch origin
git merge origin/main
```

---

## I want to pull but avoid messy merge commits

Use rebase:

```bash
git pull --rebase
```

If there are conflicts:

```bash
git status
```

Fix files, then:

```bash
git add .
git rebase --continue
```

Abort rebase:

```bash
git rebase --abort
```

---

## I have merge conflicts

Git will show conflicted files.

Check status:

```bash
git status
```

Open the files and look for:

```text
<<<<<<< HEAD
your current branch changes
=======
incoming branch changes
>>>>>>> branch-name
```

Fix the file manually.

Then:

```bash
git add .
git commit
```

If you want to cancel the merge:

```bash
git merge --abort
```

If conflict happened during rebase:

```bash
git rebase --abort
```

After fixing conflict during rebase:

```bash
git add .
git rebase --continue
```

---

## I want to undo a pushed commit safely

Use `revert`, not `reset`.

```bash
git revert commit_hash
git push
```

This creates a new commit that undoes the old commit.

Use this for shared branches like `main`.

---

## I deleted a branch or commit by mistake

Use reflog:

```bash
git reflog
```

Find the lost commit hash, then create a branch from it:

```bash
git checkout -b recovered-work commit_hash
```

This is useful when you reset, deleted a branch, or lost local commits.

---

## I want to see what changed

Unstaged changes:

```bash
git diff
```

Staged changes:

```bash
git diff --staged
```

Changed files summary:

```bash
git status
```

---

## I want to check commit history

Normal log:

```bash
git log
```

Short log:

```bash
git log --oneline
```

Pretty log:

```bash
git log --pretty=format:"%h - %an, %ar: %s"
```

Last 2 commits with actual changes:

```bash
git log -p -2
```

Commit stats:

```bash
git log --stat
```

---

## I want to find a commit by text

Search commit messages:

```bash
git log --grep="fifth"
```

Search code changes:

```bash
git log -S "made changes by mistake and added in the staging area"
```

Search by author:

```bash
git log --author="cejaythakkar"
```

Search by date:

```bash
git log --since="2025-01-01"
git log --until="2025-01-01"
```

---

## I want to know who changed a line

Use blame:

```bash
git blame git.md
```

For a specific line range:

```bash
git blame -L 10,20 git.md
```

---

## I want to restore one file from old commit

Restore one file from a commit:

```bash
git checkout commit_hash -- git.md
```

Example:

```bash
git checkout 0d0b98c2a47d7bdce9a9679cf60c64338e5ce824 -- git.md
```

Then commit the restored file:

```bash
git add git.md
git commit -m "Restore git.md from old commit"
```

---

## I want to remove untracked files

Preview first:

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

Be careful. `git clean` deletes files that Git is not tracking.

---

## I want to tag a release

List tags:

```bash
git tag
```

Create tag:

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
```

Create tag on specific commit:

```bash
git tag -a v1.0.0 commit_hash -m "Release v1.0.0"
```

Push one tag:

```bash
git push origin v1.0.0
```

Push all tags:

```bash
git push origin --tags
```

---

## I want to delete branches

Delete local branch after merge:

```bash
git branch -d feature/my-task
```

Force delete local branch:

```bash
git branch -D feature/my-task
```

Delete remote branch:

```bash
git push origin --delete feature/my-task
```

---

## I want to protect main

On GitHub:

```text
Repository -> Settings -> Branches -> Add branch protection rule
Branch name pattern: main
Enable: Require a pull request before merging
Enable: Require approvals
Save
```

After this, work like this:

```bash
git checkout main
git pull
git checkout -b feature/my-change
git add .
git commit -m "Add my change"
git push -u origin feature/my-change
```

Then open a pull request into `main`.

---

## Daily safe workflow

Start work:

```bash
git checkout main
git pull
git checkout -b feature/my-task
```

Check changes:

```bash
git status
git diff
```

Commit:

```bash
git add .
git commit -m "Describe the change"
```

Push:

```bash
git push -u origin feature/my-task
```

Open PR.

After PR merge:

```bash
git checkout main
git pull
git branch -d feature/my-task
```
