# Presentations

This repository contains various presentations created using Marp.

## View Presentations

You can browse all presentations at our GitHub Pages site:
- Production: https://fumiya-kume.github.io/presentation/
- PR Previews: https://fumiya-kume.github.io/presentation/pr-preview/{PR_NUMBER}/

The index page provides:
- List of all presentations with descriptions
- Links to HTML and PDF versions
- Last modified dates
- Dark mode support

## Marp Workflow

This repository uses GitHub Actions to automatically generate HTML, PDF, and PPTX versions of all Marp presentations. The workflow:

1. Triggers on:
   - Push to main/master branch
   - Pull request events (open, reopen, sync, close)

2. Automatically processes all markdown files in the repository:
   - Maintains the original directory structure
   - Copies associated images
   - Generates HTML, PDF, and PPTX versions

3. Deploys to GitHub Pages:
   - PR previews are available under the pr-preview directory
   - Production deployments go to the root of gh-pages branch

### Directory Structure

- Place your Marp markdown files in any directory
- Keep images in the same directory as the markdown file
- Supported image formats: PNG, JPG, JPEG, GIF

### Local Preview

To preview presentations locally:

1. Install Marp CLI:
   ```bash
   npm install -g @marp-team/marp-cli
   ```

2. Generate outputs (replace `path/to/presentation.md` with your file path):
   ```bash
   # Generate HTML
   marp path/to/presentation.md -o path/to/presentation.html

   # Generate PDF
   marp path/to/presentation.md --allow-local-files -o path/to/presentation.pdf

   # Generate PPTX
   marp path/to/presentation.md --allow-local-files -o path/to/presentation.pptx
   ```

## Available Presentations

- [DB History in Mobile](DB%20history%20in%20Mobile/presentation.md) - A presentation about the evolution of databases in mobile application development