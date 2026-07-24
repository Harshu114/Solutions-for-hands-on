# Git HOL 2 - Git Ignore

Created a `.log` file and a `log` folder in the GitDemo working directory.

```bash
touch error.log
mkdir log
ls -la
# error.log  log/  .git/  welcome.txt
```

Updated `.gitignore`:
```bash
cat > .gitignore << IGNORE
*.log
log/
IGNORE
```

Then checked status:
```bash
git status
# On branch master
# nothing to commit, working tree clean
```

The `.log` files and `log` folder are now ignored as expected. Verified that adding new `.log` files doesn't show up in `git status`.
