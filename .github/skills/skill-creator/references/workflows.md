# Workflow Patterns

## Sequential Workflows

For complex tasks, break operations into clear, sequential steps. Example outline:

```markdown
1. Analyze input
2. Prepare resources
3. Execute transformation
4. Validate output
5. Return results
```

## Conditional Workflows

For branching tasks, describe decision points and which sub-workflow to follow.

```markdown
1. Determine modification type
  - Creating new content -> follow Creation workflow
  - Editing existing content -> follow Editing workflow

2. Creation workflow: [steps]
3. Editing workflow: [steps]
```

Keep workflows short and concrete; include commands to run scripts when helpful.
