# Presentations

This repository contains various presentations created using Marp.

## Marp Workflow

This repository uses GitHub Actions to automatically generate HTML, PDF, and PPTX versions of all Marp presentations. The workflow:

1. Triggers on:
   - Push to main/master branch
   - Pull request events (open, reopen, sync, close)

2. Generates the following for each presentation:
   - HTML version for web viewing
   - PDF version for download/printing
   - PPTX version for PowerPoint compatibility

3. Deploys to GitHub Pages:
   - PR previews are available under the pr-preview directory
   - Production deployments go to the root of gh-pages branch

### Local Preview

To preview presentations locally:

1. Install Marp CLI:
   ```bash
   npm install -g @marp-team/marp-cli
   ```

2. Generate HTML:
   ```bash
   marp "DB history in Mobile/presentation.md" -o "DB history in Mobile/presentation.html"
   ```

3. Generate PDF:
   ```bash
   marp "DB history in Mobile/presentation.md" --allow-local-files -o "DB history in Mobile/presentation.pdf"
   ```

4. Generate PPTX:
   ```bash
   marp "DB history in Mobile/presentation.md" --allow-local-files -o "DB history in Mobile/presentation.pptx"
   ```

## Available Presentations

- [DB History in Mobile](DB%20history%20in%20Mobile/presentation.md) - A presentation about the evolution of databases in mobile application development