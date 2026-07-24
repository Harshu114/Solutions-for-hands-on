# Git HOL 3 - Branching and Merging

## Branching
```bash
git checkout -b GitNewBranch


echo "Branch content" > feature.txt
git add feature.txt
git commit -m "Added feature.txt in GitNewBranch"

git status

```

## Merging
```bash
git checkout master
git log --oneline --graph --decorate --all


git merge GitNewBranch


git branch -d GitNewBranch

```

## Visual diff with P4Merge
Configured P4Merge as diff tool locally for this repo to see visual differences before merging.

```bash
git config --local merge.tool p4merge
git config --local diff.tool p4merge
```
