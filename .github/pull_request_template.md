# Add Marp Workflow for Automatic Presentation Generation

This PR adds a GitHub Actions workflow that automatically generates HTML, PDF, and PPTX versions of Marp presentations in the repository.

## Changes

- Add GitHub Actions workflow (`marp-to-pages.yml`) that:
  - Generates HTML/PDF/PPTX versions of presentations
  - Deploys to GitHub Pages
  - Provides PR preview functionality
- Add documentation in README about:
  - The Marp workflow
  - Local preview instructions
  - Available presentations

## Testing

The workflow will automatically run on this PR, generating:
- HTML version for web viewing
- PDF version for download/printing
- PPTX version for PowerPoint compatibility

You can check the preview deployment once the workflow completes.

## Additional Notes

- The workflow is configured to handle spaces in filenames
- Images are properly copied to the build directory
- Both PR previews and production deployments are configured 