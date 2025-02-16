# Generalize Marp Workflow

This PR updates the GitHub Actions workflow to automatically process all Markdown files in the repository, making it more flexible and maintainable.

## Changes

- Update workflow to automatically find and process all markdown files
- Maintain directory structure for all presentations
- Automatically handle image assets for each presentation
- Update documentation with generalized instructions

## Key Features

- Processes all markdown files in any directory
- Preserves directory structure in the output
- Copies associated images (PNG, JPG, JPEG, GIF)
- Generates HTML, PDF, and PPTX for each presentation

## Testing

The workflow will automatically:
- Find all markdown files
- Process each file with its images
- Generate all output formats
- Deploy to the preview environment

You can verify the results in the PR preview deployment.

# Add metadata.json Generation and Maintenance

This PR adds functionality to generate and maintain a metadata.json file that lists all presentations with their details.

## Changes

- Add metadata.json generation in the workflow
- Store metadata.json in the repository
- Automatically update metadata when presentations change
- Include title, description, and last modified date
- Add format links for HTML and PDF versions

## Implementation Details

The workflow now:
1. Generates metadata.json with presentation information
2. Maintains the file in the repository
3. Updates it automatically when presentations change
4. Includes comprehensive metadata for each presentation:
   - Title (from first h1)
   - Description (from first paragraph)
   - Last modified date
   - Links to HTML and PDF versions

## Testing

The workflow will:
1. Generate metadata.json on first run
2. Update it when presentations change
3. Skip updates when no changes are detected
4. Maintain the file in both PR previews and production

You can verify the results by:
1. Checking the generated metadata.json
2. Verifying the links work
3. Confirming the automatic updates

# Improve PR Description Management

This PR adds proper management for PR description files and temporary files in the repository.

## Changes

- Add `.cursorrule` file for PR description handling
  - Configure PR template location
  - Specify temporary file patterns
  - Define file organization rules

- Update `.gitignore` for temporary files
  - Add PR description temporary files
  - Add Cursor-specific patterns
  - Maintain consistent ignore patterns

## Implementation Details

The `.cursorrule` configuration:
```json
{
  "pr": {
    "description": {
      "template": ".github/pull_request_template.md",
      "temporary": ".github/pr-description.md"
    }
  },
  "ignore": [
    ".github/pr-description.md",
    ".git-commit-message.md",
    ".git-rebase-todo.md"
  ]
}
```

Added patterns to `.gitignore`:
```
# Cursor temporary files
.github/pr-description.md
.git-commit-message.md
.git-rebase-todo.md
```

## Testing

- Verify that temporary files are properly ignored
- Confirm PR template is preserved
- Check that PR descriptions are handled correctly
- Ensure Cursor integration works as expected 