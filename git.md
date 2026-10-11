git init
git status
git add \*
git commit -m "adding git.md"
git branch
git log
git diff
git add .
git commit -m "second commit"
git checkout 0d0b98c2a47d7bdce9a9679cf60c64338e5ce824 -- git.md
git checkout 0d0b98c2a47d7bdce9a9679cf60c64338e5ce824 -- \*
git restore git.md
git restore .
made changes by mistake and added in the staging area
git restore --staged .
git status
git restore .
git restore --worktree .
git reset --hard HEAD^
git log -p -2
git log --stat
git log --pretty=oneline
git log --pretty=format:"%h - %an,%ar:%s"
git show 089f659:git.md
git log -S "made changes by mistake and added in the staging area"
git log grep="fifth"
git log --since="2025-01-01"
git log --until="2025-01-01"
git log --author="cejaythakkar"
git branch -M main
git push
git remote -v
git pull
git clone https://github.com/cejaythakkar/notes.git
git branch design
git checkout design

conflicts
git clean -n
git clean -f

git tags

git tag -a v7 -m "this is v7"

git tag -a v6 -m "this is v6" commit_hash

git push origin --tags
git stash temporarily saves your uncommitted changes so you can return to a clean working tree.
git stash push -m "message"

git stash apply stash@{1}
git stash apply
git stash clear

git stash pop

git stash list
sdfsdfsdf
