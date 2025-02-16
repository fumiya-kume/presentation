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