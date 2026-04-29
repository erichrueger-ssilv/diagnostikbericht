#!/usr/bin/env python3
"""
Update VERSION constant in app.js from the latest Git tag.
If no tags exist, keeps the current VERSION or uses fallback.
Usage: python3 update-version.py
"""
import subprocess
import re
import sys

def run_git(*args):
    """Run a git command and return stripped stdout."""
    try:
        result = subprocess.run(
            ["git"] + list(args),
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None

def get_latest_git_tag():
    """Get the latest Git tag (e.g., 'v1.3')."""
    # Try annotated tags first, then lightweight tags
    tag = run_git("describe", "--tags", "--abbrev=0")
    if not tag:
        # Fallback: list tags sorted by version
        tags = run_git("tag", "--sort=-v:refname")
        if tags:
            tag = tags.split('\n')[0]
    return tag

def get_commits_since_tag(tag):
    """Get number of commits since the given tag."""
    if not tag:
        return 0
    count = run_git("rev-list", "--count", f"{tag}..HEAD")
    try:
        return int(count) if count else 0
    except ValueError:
        return 0

def get_version():
    """Build version string from Git tags."""
    tag = get_latest_git_tag()
    if not tag:
        return None  # Signal: no tags found

    commits = get_commits_since_tag(tag)
    base = tag[1:] if tag.startswith('v') else tag

    if commits > 0:
        return f"v{base}+"
    else:
        return f"v{base}"

def update_app_js(version):
    """Update VERSION constant in app.js."""
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(
        r'const VERSION = "[^"]*";',
        f'const VERSION = "{version}";',
        content
    )

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Updated app.js: VERSION = \"{version}\"")

if __name__ == '__main__':
    version = get_version()
    if version:
        update_app_js(version)
        print(f"Done. Current version: {version}")
    else:
        print("No Git tags found. Keeping current VERSION.")
        print("Hint: Create a tag with: git tag -a v1.0 -m 'Version 1.0'")
