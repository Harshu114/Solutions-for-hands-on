# Git HOL 1 - Basic Setup & Commit

## Git Configuration
```bash
git config --global user.name "Harshu114"
git config --global user.email "nandeshwarharshal21@gmail.com"
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -nosession"
```

## Created local repository
```bash
mkdir GitDemo
cd GitDemo
git init
```
Output showed `.git` hidden folder when I ran `ls -a`.

## Added file and committed
```bash
echo "Welcome to Git" > welcome.txt
git status
# On branch master
# Untracked files:
#   welcome.txt

git add welcome.txt
git commit -m "Initial commit - added welcome.txt"
# [master (root-commit) abc1234] Initial commit - added welcome.txt
#  1 file changed, 1 insertion(+)
#  create mode 100644 welcome.txt
```

## Pushed to remote
```bash
git remote add origin https://gitlab.com/Harshu114/GitDemo.git
git pull origin master
git push origin master
```

Everything synced properly.
