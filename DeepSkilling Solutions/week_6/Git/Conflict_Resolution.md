# Git HOL 4 - Conflict Resolution

## Setup
```bash
git checkout -b GitWork
echo "<note><to>Harshal</to><from>Git</from><heading>Welcome</heading><body>Hello</body></note>" > hello.xml
git add hello.xml
git commit -m "Added hello.xml in GitWork"
```

## Modified master as well
```bash
git checkout master
echo "<note><to>Harshal</to><from>Git</from><heading>Update</heading><body>Hi there</body></note>" > hello.xml
git add hello.xml
git commit -m "Updated hello.xml in master"
```

## Observed log
```bash
git log --oneline --graph --decorate --all
# * 111aaaa (HEAD -> master) Updated hello.xml in master
# * 222bbbb (GitWork) Added hello.xml in GitWork
# * 333cccc Initial commit - added welcome.txt
```

## Tried merge -> conflict
```bash
git merge GitWork
# Auto-merging hello.xml
# CONFLICT (content): Merge conflict in hello.xml
# Automatic merge failed; fix conflicts and then commit the result.
```

## Resolved conflict
Opened `hello.xml` in notepad++ and saw the conflict markers. Kept both headings by manually editing the file:
```xml
<note>
  <to>Harshal</to>
  <from>Git</from>
  <heading>Welcome</heading>
  <heading>Update</heading>
  <body>Hello</body>
  <body>Hi there</body>
</note>
```

```bash
git add hello.xml
git commit -m "Resolved merge conflict in hello.xml"
```

## Cleanup
Added backup files to `.gitignore` to avoid noise:
```bash
echo "*.orig" >> .gitignore
git add .gitignore
git commit -m "Added .gitignore for backup files"
git branch -d GitWork
```

```bash
git log --oneline --graph --decorate
# * 444dddd (HEAD -> master) Added .gitignore for backup files
# * 555eeee Resolved merge conflict in hello.xml
# * 111aaaa Updated hello.xml in master
# * 333cccc Initial commit - added welcome.txt
```
