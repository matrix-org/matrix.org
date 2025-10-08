+++
title = "My Contribution to Matrix"
date = 2025-10-08
author = "Harsh Gupta"
+++

## 🧭 Overview

This blog details my contribution to the Matrix.org open-source website — adding a **Blog Archive Filter** feature.

The goal was to let users easily browse blog posts by category (like *Releases*, *Announcements*, or *Projects*) using dynamic filters.

---

## 🧩 What I Built

- Added frontend filter buttons.
- Implemented JavaScript for dynamic filtering.
- Used Zola (Tera) template logic for category detection.
- Created reusable CSS for consistent design.

---

## ⚙️ How It Works

Each blog post title is checked for keywords to assign it to a category (e.g., “release” → Release, “project” → Project, etc.).  
Then, JavaScript toggles visibility when a filter button is clicked.

---

## 💡 Example Code

```html
{% if "release" in (blog_page.title | lower) %}
  {% set category = "release" %}
{% endif %}
