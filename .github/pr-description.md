# Implement Marp workflow with best practices

This PR implements a GitHub Actions workflow for automatically generating and deploying Marp presentations.

## Changes

- Set up GitHub Actions workflow for Marp presentations
- Configure dynamic file finding and processing
- Implement proper Docker integration with MARP_USER
- Add safe image handling per presentation
- Configure GitHub Pages deployment
- Set up .gitignore for build artifacts

## Technical Details

- Uses GitHub Actions' native Docker support
- Processes all Markdown files with `marp: true`
- Maintains original file structure
- Handles spaces in filenames correctly
- Provides clear logging for debugging

## Deployment

- PR previews under pr-preview directory
- Production deployments to gh-pages root
- Clean exclusion for PR previews

## Testing

The workflow automatically:
- Finds and processes all Marp markdown files
- Generates HTML, PDF, and PPTX outputs
- Deploys to GitHub Pages
- Provides PR preview links 