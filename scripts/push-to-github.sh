#!/usr/bin/env bash
# One-command push to GitHub.
#
# Usage:
#   ./scripts/push-to-github.sh <github-repo-url> [branch]
#
# Example:
#   ./scripts/push-to-github.sh git@github.com:bharath/anvith-i5-interiors.git main
set -euo pipefail

REMOTE_URL="${1:-}"
BRANCH="${2:-main}"

if [ -z "$REMOTE_URL" ]; then
  echo "Usage: $0 <github-repo-url> [branch]" >&2
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git checkout -B "$BRANCH"
git add -A
git commit -m "Initial commit: Anvith I5 Interiors site" || echo "Nothing to commit."

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git push -u origin "$BRANCH"
echo "✅ Pushed to $REMOTE_URL ($BRANCH)"
