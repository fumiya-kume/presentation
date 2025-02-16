# Setup Marp Workflow

## Objective
Set up GitHub Actions workflow to automatically generate HTML, PDF, and PPTX files from Marp markdown presentations.

## Tasks

### 1. Create GitHub Actions Workflow File
- [x] Create `.github/workflows` directory
- [x] Create `marp-to-pages.yml` workflow file
- [x] Configure workflow triggers and permissions

### 2. Configure Build Process
- [x] Set up build directory structure
- [x] Configure Marp CLI Docker image usage
- [x] Set up image copying for presentations
- [x] Configure HTML output generation
- [x] Configure PDF output generation
- [x] Configure PPTX output generation

### 3. Setup GitHub Pages Deployment
- [x] Configure preview deployment for pull requests
- [x] Configure production deployment for main branch
- [x] Set up clean-exclude for PR previews

### 4. Testing
- [x] Test workflow with a pull request
- [x] Verify HTML/PDF/PPTX generation
- [x] Verify preview deployment
- [x] Verify production deployment

### 5. Documentation
- [x] Update README with information about the Marp workflow
- [x] Document how to preview changes locally
- [x] Document deployment process 