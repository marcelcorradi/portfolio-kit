#!/usr/bin/env bash
# PreToolUse(Bash) guard: if a destructive scaffolding command runs while there
# are uncommitted git changes, ask for confirmation first.
#
# This exists because it happened: a `create-vite --overwrite` run in a project
# root wiped the .claude/skills directory along with the scaffold it replaced.
# Committing first makes that recoverable; this hook is the reminder.
input=$(cat)
cmd=$(printf '%s' "$input" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(\([^"\]\|\.\)*\)".*/\1/p')

# Destructive scaffolders / flags worth guarding
if printf '%s' "$cmd" | grep -qiE 'create-vite|(npm|yarn|pnpm|bun)[[:space:]]+create|degit|--overwrite|--force([[:space:]]|$)|[[:space:]]-f([[:space:]]|$)'; then
  if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Destructive scaffolder (create / --overwrite / --force) with uncommitted git changes. A command like this has wiped .claude/skills before. Commit first, or confirm if you are sure."}}\n'
    exit 0
  fi
fi
exit 0