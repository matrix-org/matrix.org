#!/usr/bin/env python3
# SPDX-License-Identifier: Apache-2.0
# SPDX-FileCopyrightText: 2026 The Matrix.org Foundation C.I.C.

"""
Convert https://matrix.org links to Zola internal link format (@/).

This script converts absolute matrix.org links to relative Zola links using the
@/ prefix, which references content from the content/ directory. It intelligently
resolves file paths by checking the actual directory structure.

Usage:
    python contrib/convert_matrix_org_links.py <file_path>
    python contrib/convert_matrix_org_links.py content/blog/2026/05/2026-05-04-twim.md
"""

import re
import sys
from pathlib import Path


def find_file_in_content(path_segment: str, content_root: Path) -> str | None:
    """
    Find the actual file path in content/ directory for a given path segment.

    Args:
        path_segment: Path segment from URL (e.g., "blog/2026/05/conf-ticket-sales")
        content_root: Root of the content directory

    Returns:
        Relative path from content root to the file, or None if not found
    """
    # Try with .md extension
    candidate = content_root / f"{path_segment}.md"
    if candidate.exists():
        return f"@/{path_segment}.md"

    # Try with index.md
    candidate = content_root / path_segment / "index.md"
    if candidate.exists():
        result = f"@/{path_segment}/index.md"
        return result.replace("//", "/")

    # Try with _index.md
    candidate = content_root / path_segment / "_index.md"
    if candidate.exists():
        result = f"@/{path_segment}/_index.md"
        return result.replace("//", "/")

    # Try to find a matching file with date prefix (for blog posts)
    if "blog/" in path_segment:
        parts = path_segment.split("/")
        if len(parts) >= 3:  # e.g., ["blog", "2026", "05", "some-post"]
            dir_path = content_root / "/".join(parts[:-1])
            if dir_path.exists():
                slug = parts[-1]
                # Look for files matching pattern YYYY-MM-DD-{slug}.md
                for file in dir_path.glob(f"*-{slug}.md"):
                    result = f"@/{'/'.join(parts[:-1])}/{file.name}"
                    return result.replace("//", "/")

    return None


def extract_matrix_org_path(url: str) -> tuple[str | None, str | None]:
    """
    Extract the path and anchor from a matrix.org URL.

    Args:
        url: Full URL starting with https://matrix.org

    Returns:
        Tuple of (path, anchor) or (None, None) if not a matrix.org link
    """
    match = re.match(r"https://matrix\.org(/[^)>\s#]*)(?:#([^)>\s]*))?", url)
    if match:
        return match.group(1), match.group(2)
    return None, None


def convert_matrix_org_links(file_path: str, content_root: str | None = None) -> bool:
    """
    Convert all https://matrix.org links in a markdown file to Zola format.

    Args:
        file_path: Path to the markdown file to process (relative recommended)
        content_root: Root path of content directory (defaults to ./content)

    Returns:
        True if successful, False otherwise
    """
    file_path_obj = Path(file_path)

    # Warn if absolute paths are supplied
    if file_path_obj.is_absolute():
        print(
            f"Warning: Using absolute path {file_path_obj} (relative paths recommended)"
        )

    if not file_path_obj.exists():
        print(f"Error: File not found: {file_path_obj}")
        return False

    if file_path_obj.suffix != ".md":
        print(f"Warning: File does not have .md extension: {file_path_obj}")

    # Find content root
    content_root_obj: Path
    if content_root is None:
        # First check relative to current directory
        if Path("content").exists():
            content_root_obj = Path("content").resolve()
        else:
            # Walk up from file to find content directory
            current = file_path_obj.parent.resolve()
            found_root = None
            while current.parent != current:  # Stop at filesystem root
                if (current / "content").exists():
                    found_root = current / "content"
                    break
                current = current.parent

            if found_root is None:
                print("Error: Could not find content/ directory")
                return False
            content_root_obj = found_root
    else:
        content_root_obj = Path(content_root)
        if content_root_obj.is_absolute():
            print(
                f"Warning: Using absolute content root {content_root_obj} "
                + "(relative paths recommended)"
            )

    # Read file
    with open(file_path_obj, "r", encoding="utf-8") as f:
        content = f.read()

    original_content = content
    conversions: list[tuple[str, str]] = []

    # Find all matrix.org links
    for match in re.finditer(
        r"https://matrix\.org(/[^)>\s#]*)(?:#([^)>\s]*))?", content
    ):
        full_url = match.group(0)
        path = match.group(1)
        anchor = match.group(2)

        # Remove leading and trailing slashes and normalize
        path_normalized = path.strip("/")

        # Find the actual file
        resolved_path = find_file_in_content(path_normalized, content_root_obj)

        if resolved_path:
            # Add anchor back if present (though this may cause validation errors)
            if anchor:
                resolved_link = resolved_path.rstrip("/") + f"#{anchor}"
            else:
                resolved_link = resolved_path

            conversions.append((full_url, resolved_link))
            content = content.replace(full_url, resolved_link)
        else:
            print(f"Warning: Could not resolve: {full_url}")

    # Write file if changed
    if content != original_content:
        bytes_written = 0
        with open(file_path_obj, "w", encoding="utf-8") as f:
            bytes_written = f.write(content)
        if bytes_written == 0:
            print(f"Warning: No bytes written to {file_path_obj}")

        print(f"✓ Converted {len(conversions)} links in {file_path_obj}")
        for old, new in conversions:
            print(f"  {old}")
            print(f"  → {new}")
        return True
    else:
        print(f"No matrix.org links found in {file_path_obj}")
        return True


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    file_path = sys.argv[1]
    content_root = sys.argv[2] if len(sys.argv) > 2 else None

    success = convert_matrix_org_links(file_path, content_root)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
