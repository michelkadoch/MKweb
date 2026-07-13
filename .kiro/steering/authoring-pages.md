---
inclusion: fileMatch
fileMatchPattern: "*/*.qmd"
---

# Writing a Note or Course Page

Rules for writing or editing a `.qmd` file inside a top-level content folder
(`notes/`, `mgr820/`, `ele649/`, or any future course folder added the same
way).

## Front Matter

Every note starts with a front-matter block between two `---` lines:

```yaml
---
title: "The Page Title"
description: "One plain sentence about what the page covers."
date: "YYYY-MM-DD"
order: 1
difficulty: 1
categories: [topic-tag]
---
```

- `title` is what shows at the top of the page and in the folder's listing.
- `description` is required (used for search engines and the listing).
- `date` is required. Use today's date (the date the page was written).
- `order` is required for `mgr820/` and `ele649/` pages. It is a whole number
  (1, 2, 3, ...) that sets the page's position in that folder's listing and
  in the sidebar progress bar. Lower numbers come first. Leave gaps (10, 20,
  30) if you want room to insert pages later without renumbering everything.
- `difficulty` is required for `mgr820/` and `ele649/` pages. A whole number
  from 1 (easiest) to 5 (hardest). It scales the estimated reading time and
  shows as a filled-dot indicator on the page.
- `categories` is optional. It groups related pages with clickable tags.

`notes/` pages do not use `order`/`difficulty` yet; that folder's listing
still sorts by `date desc`.

## Structure

- Start with a short introductory sentence before any list or heading. Do not
  jump straight into bullet points under a heading.
- Use `##` for main sections and `###` for sub-sections.
- Keep paragraphs short. Leave a blank line between them.

## Common Elements

- Bold with `**text**`, italic with `*text*`.
- Links: `[visible words](../index.qmd)` for a page, or a full `https://` URL.
- Lists use `-` at the start of a line.
- Inline math `$...$`, displayed math `$$...$$`. No setup needed.
- Note or tip boxes use callouts:

```
::: {.callout-note}
A short remark or tip.
:::
```

## Review Questions (optional)

To add practice questions at the end of a section, use this pattern. The
questions are renumbered automatically on the page, so always write `**1.`
for every question.

```
### Review Questions {.unnumbered}

**1. The question text goes here?**

::: {.callout-tip collapse="true"}
## Answer
The answer, revealed when the reader clicks.
:::
```

Separate multiple questions with a line containing only `---`.

## Images and Data

- Put image and data files in the `media/` folder at the project root.
- Reference an image in text with an absolute path from the root, for example
  `![A caption](/media/photo.png)`.

## Do Not

- Do not add manual "Previous" or "Next" links. Quarto adds page navigation.
- Do not invent facts. If reference material is provided, follow it and check
  claims, dates, and names before writing them.
