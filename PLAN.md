# Project Plan: Calculator (Git practice)

The goal is to learn Git commands. Each feature is built on its own branch and merged into `main` when it's finished.

## Steps

| # | Branch | Feature | Status |
|---|---|---|---|
| 0 | `main` | Project setup (display, number buttons, README, .gitignore) | [ ] |
| 1 | `feature/addition` | `+` and `=` | [ ] |
| 2 | `feature/subtraction` | `-` | [ ] |
| 3 | `feature/multiplication` | `×` | [ ] |
| 4 | `feature/division` | `÷` (handle division by zero) | [ ] |
| 5 | `feature/clear` | `C` button (reset) | [ ] |
| 6 | `feature/decimal` | Decimal numbers (`.`) | [ ] |
| 7 | `feature/extras` | Optional: `%`, power, backspace | [ ] |
| 8 | — | Connect to GitHub, push, Pull Requests | [ ] |

## Workflow for each feature

```bash
git checkout main                    # 1. start from main
git checkout -b feature/<name>       # 2. create a new branch and switch to it
# ... write code ...
git status                           # 3. see which files changed
git diff                             # 4. see the exact changes
git add .                            # 5. stage the changes
git commit -m "Add <feature>"        # 6. save a snapshot
git checkout main                    # 7. go back to main
git merge feature/<name>             # 8. bring the feature into main
git branch -d feature/<name>         # 9. delete the finished branch
git log --oneline --graph --all      # 10. look at the history
```

## Git commands to learn

### Basics
- [ ] `git init` / `git init -b main`: create a repository
- [ ] `git status`: show the state of files
- [ ] `git add`: stage changes
- [ ] `git commit -m "..."`: save a snapshot
- [ ] `git log --oneline`: show history
- [ ] `git diff`: show changes

### Branches
- [ ] `git branch`: list branches
- [ ] `git checkout -b <name>` / `git switch -c <name>`: create a branch and switch to it
- [ ] `git checkout <name>` / `git switch <name>`: switch branch
- [ ] `git merge <name>`: merge a branch into the current one
- [ ] `git branch -d <name>`: delete a branch

### Fixing mistakes
- [ ] `git restore <file>`: discard changes in a file
- [ ] `git restore --staged <file>`: unstage a file
- [ ] `git commit --amend`: fix the last commit message
- [ ] `git revert <commit>`: undo a commit safely
- [ ] `git stash` / `git stash pop`: put work aside temporarily

### Advanced
- [ ] Merge conflict: create one on purpose and resolve it
- [ ] `git tag v1.0`: mark a version

### GitHub (later)
- [ ] `git remote add origin <url>`: connect to GitHub
- [ ] `git push -u origin main`: upload
- [ ] `git pull`: download changes
- [ ] Pull Request: merge a feature through GitHub
