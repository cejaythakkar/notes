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
