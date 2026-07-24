# Git HOL 3 - Branching and Merging

## Branching
```bash
git checkout -b GitNewBranch
# Switched to a new branch 'GitNewBranch'

echo "Branch content" > feature.txt
git add feature.txt
git commit -m "Added feature.txt in GitNewBranch"

git status
# On branch GitNewBranch
# nothing to commit, working tree clean
```

## Merging
```bash
git checkout master
git log --oneline --graph --decorate --all
# * abc1234 (HEAD -> master) Initial commit - added welcome.txt
# * def5678 (GitNewBranch) Added feature.txt in GitNewBranch

git merge GitNewBranch
# Updating abc1234..def5678
# Fast-forward
#  feature.txt | 1 +
#  1 file changed, 1 insertion(+)
#  create mode 100644 feature.txt

git branch -d GitNewBranch
# Deleted branch GitNewBranch (was def5678).
```

## Visual diff with P4Merge
Configured P4Merge as diff tool locally for this repo to see visual differences before merging.

```bash
git config --local merge.tool p4merge
git config --local diff.tool p4merge
```
