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

This repository uses GitHub Actions to automatically generate HTML, PDF, and PPTX versions of all Marp presentations. The workflow is designed to be simple for contributors while maintaining high-quality output.

<details>
<summary><strong>How It Works</strong></summary>

1. **Automatic Detection**
   - The workflow automatically detects Markdown files containing `marp: true` in their frontmatter
   - Searches all directories except `.github` and `build`
   - Preserves your directory structure in the output

2. **File Generation**
   - For each Marp markdown file, generates:
     - HTML version for web viewing
     - PDF version for downloading/printing
     - PPTX version for PowerPoint compatibility
   - Automatically copies associated images
   - Creates metadata.json with presentation information

3. **Deployment**
   - Production (master branch):
     - Deploys to the root of gh-pages branch
     - Accessible at https://fumiya-kume.github.io/presentation/
   - Pull Requests:
     - Creates preview deployments
     - Available at https://fumiya-kume.github.io/presentation/pr-preview/{PR_NUMBER}/
     - Automatically cleaned up when PR is closed
</details>

<details>
<summary><strong>Creating a Presentation</strong></summary>

1. Create a new directory for your presentation:
   ```bash
   mkdir my-presentation
   ```

2. Create a markdown file with Marp frontmatter:
   ```markdown
   ---
   marp: true
   theme: default
   paginate: true
   ---

   # My Presentation Title

   A brief description of the presentation.

   ---

   ## Slide 2

   Content for slide 2
   ```

3. Add images to the same directory:
   ```
   my-presentation/
   ├── presentation.md
   ├── image1.png
   └── image2.jpg
   ```

4. Commit and push your changes:
   ```bash
   git add my-presentation
   git commit -m "Add my presentation"
   git push
   ```
</details>

<details>
<summary><strong>Directory Structure</strong></summary>

- Each presentation should be in its own directory
- Keep images in the same directory as the markdown file
- Supported image formats:
  - PNG (recommended for diagrams/screenshots)
  - JPG/JPEG (recommended for photos)
  - GIF (supported but use sparingly)
  - SVG (recommended for vector graphics)

Example structure:
```
repository/
├── presentation1/
│   ├── presentation.md
│   └── images/
│       ├── diagram.png
│       └── photo.jpg
└── presentation2/
    ├── slides.md
    └── screenshot.png
```
</details>

<details>
<summary><strong>Local Preview</strong></summary>

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

3. Live preview while editing:
   ```bash
   marp -w path/to/presentation.md
   ```
</details>

<details>
<summary><strong>Troubleshooting</strong></summary>

1. **Images not showing up:**
   - Ensure images are in the same directory or a subdirectory
   - Use relative paths in markdown
   - Check image file permissions

2. **PDF generation fails:**
   - Make sure all fonts are available
   - Check image paths are correct
   - Verify you're using `--allow-local-files` flag

3. **Preview deployment issues:**
   - Check PR build logs
   - Verify markdown frontmatter includes `marp: true`
   - Ensure images are committed
</details>

## Available Presentations

- [DB History in Mobile](DB%20history%20in%20Mobile/presentation.md) - A presentation about the evolution of databases in mobile application development