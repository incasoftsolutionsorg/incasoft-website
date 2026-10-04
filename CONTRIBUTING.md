# Contributing to the INCASOFT Website

This guide explains how the team works on this project, from picking up an issue to getting your work merged.

---

## The Workflow at a Glance

```
 Issue assigned to you
        │
        ▼
 1. Create a branch       git checkout -b fix/12-case-study-mobile
        │
        ▼
 2. Make your changes     commit with "Refs #12"
        │
        ▼
 3. Push & open a PR      PR description says "Closes #12"
        │
        ▼
 4. Owner reviews         may ask for changes → you push more commits
        │
        ▼
 5. Owner merges          issue #12 closes automatically ✅
```

---

## 1. Find Your Work

- Open the [**Issues**](https://github.com/incasoftsolutionsorg/incasoft-website/issues) tab and filter by **Assignee → you**.
- Issues are grouped into [**Milestones**](https://github.com/incasoftsolutionsorg/incasoft-website/milestones):
  - **Design & Product Layout**: layout, visuals, content and UX
  - **Fixing & Testing**: bugs, code quality and testing
- Each issue has **What is the issue**, **What to do**, **Affected files** and **Done when**. Read all four before you start.
- To pick up an unassigned issue, comment on it first so two people don't work on the same thing.

## 2. Set Up the Project (first time only)

```bash
git clone https://github.com/incasoftsolutionsorg/incasoft-website.git
cd incasoft-website
npm install

# Use the team's commit message template
git config commit.template .gitmessage
```

## 3. Create a Branch

Never work directly on `main`. Always start from the latest `main`:

```bash
git checkout main
git pull
git checkout -b <type>/<issue-number>-<short-name>
```

| Type      | Use for                     | Example                           |
|-----------|-----------------------------|-----------------------------------|
| `fix/`    | Bugs                        | `fix/1-case-study-mobile-overflow` |
| `design/` | Layout / visual changes     | `design/8-compact-chat-button`     |
| `feat/`   | New features or content     | `feat/10-first-insights-article`    |
| `chore/`  | Cleanup, config, tooling    | `chore/4-remove-template-files`    |

## 4. Make Your Changes and Commit

Run the site while you work:

```bash
npm run dev        # http://localhost:3000
```

Commit message format:

```
<type>: <short summary>

<optional: what you changed and why>

Refs #<issue-number>
```

Examples:

```
fix: stop case study page scrolling sideways on mobile

The product mock had min-h-[280px] with a 16:8 aspect ratio, which
forced it to 560px wide. Use a taller ratio on small screens instead.

Refs #1
```

```bash
git add .
git commit -m "fix: stop case study page scrolling sideways on mobile" -m "Refs #1"
```

### `Refs #N` vs `Closes #N`

| Keyword                                | What it does                                                         |
|----------------------------------------|----------------------------------------------------------------------|
| `Refs #12`                             | Links your commit to issue #12. The issue **stays open**.           |
| `Closes #12` / `Fixes #12` / `Resolves #12` | **Closes** issue #12 once the change is merged into `main`.      |

- Use **`Refs #N`** in commits while you are working.
- Put **`Closes #N`** in the **pull request description**. The issue then closes only after the owner reviews and merges your PR, not while the work is still unreviewed.
- One PR can close several issues: `Closes #3, closes #5`.

## 5. Check Before You Push

```bash
npm run build      # must pass with no errors
npm run lint       # don't add new errors
```

Also check your change:
- on **mobile (360px)**, **tablet (768px)** and **desktop (1280px+)**. In Chrome, press `F12`, then `Ctrl+Shift+M` for the device toolbar.
- in both **light** and **dark** theme

## 6. Push and Open a Pull Request

```bash
git push -u origin <your-branch-name>
```

GitHub then shows a **"Compare & pull request"** button. Click it and fill in the template:

- **Closes #N**: the issue number this PR finishes
- **What changed**
- **How I tested it**: tick the checklist
- **Screenshots**: before and after, for anything visual

Then select the repository owner as the **Reviewer**.

## 7. Review and Merge

- The owner reviews the PR and either **approves** it or **requests changes**.
- To make changes, commit and push to the **same branch**. The PR updates automatically.
- After approval, the owner **merges** the PR, the linked issue **closes automatically**, and the issue moves to "Closed" in its milestone.
- After the merge, update your local copy:

```bash
git checkout main
git pull
git branch -d <your-branch-name>
```

---

## Reporting a New Problem

Go to **Issues → New issue** and choose:

- **🐞 Bug report**: something is broken or looks wrong
- **🛠️ Task / improvement**: something that should be added or changed

Fill in every section, especially **Affected files** if you know them.

## Need Help?

Comment on the issue you're working on and mention the owner (for example `@chathuka55`).
