# Image Downloader

A simple web tool to download multiple images from URLs and package them into a zip file.

## Features

- **Bulk Download**: Paste multiple image URLs (supports tab, comma, or newline-separated input)
- **Automatic Packaging**: Downloads are automatically packaged into a convenient zip file
- **Progress Tracking**: See real-time progress as images are downloaded
- **Error Handling**: Failed downloads are noted with helpful error messages
- **Clean Interface**: Modern, dark-themed design that's easy on the eyes

## How to Use

1. **Paste URLs**: Copy and paste image URLs into the text area
   - One URL per line, or separate with commas/tabs
   - Supports common image formats (PNG, JPG, GIF, WebP, etc.)

2. **Click Download**: Hit the "Download All Images" button

3. **Get Your Zip**: The tool will process all images and download a zip file containing them

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the setup prompts** and your tool will be live!

### Local Development

1. **Start development server**:
   ```bash
   vercel dev
   ```

2. **Open in browser**:
   ```
   http://localhost:3000
   ```

## Browser Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

## License

MIT License - free to use and modify.
