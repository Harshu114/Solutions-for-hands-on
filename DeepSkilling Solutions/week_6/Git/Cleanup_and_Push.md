# Git HOL 5 - Cleanup and Push Back to Remote

## Verified clean state
```bash
git status
# On branch master
# nothing to commit, working tree clean
```

## Listed branches
```bash
git branch -a
# * master
#   remotes/origin/master
```

## Pulled remote changes
```bash
git pull origin master
# Already up to date.
```

## Pushed pending changes to remote
```bash
git push origin master
# Counting objects: 3, done.
# Writing objects: 100% (3/3), 225 bytes | 225.00 KiB/s, done.
# Total 3 (delta 1), reused 0 (delta 0)
# To gitlab.com/Harshu114/GitDemo.git
#    abc1234..444dddd  master -> master
```

Changes were reflected on GitLab after pushing.
