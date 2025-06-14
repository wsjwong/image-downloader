# Image Downloader

A web application that allows users to download multiple images from URLs and package them into a zip file.

## Features

- Download multiple images from URLs (supports tab, comma, or newline-separated input)
- Automatically packages downloaded images into a zip file
- Server-side image proxy to avoid CORS issues
- Clean, modern dark theme interface
- Progress tracking during downloads
- Error handling with fallback text files for failed downloads

## Architecture

### Frontend
- Pure HTML, CSS, and JavaScript
- Uses JSZip library for creating zip files
- Responsive design with dark theme

### Backend
- Vercel serverless function (`/api/proxy-image`) acts as an image proxy
- Handles CORS issues by fetching images server-side
- Includes security validations and error handling
- 30-second timeout for image downloads

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy the project**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new one
   - Choose your deployment settings
   - Vercel will automatically detect the serverless function

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start local development server**:
   ```bash
   vercel dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

## How It Works

### CORS Solution
Instead of relying on third-party CORS proxies, this application uses its own serverless function:

1. **Frontend** sends image URLs to `/api/proxy-image?url=<encoded_url>`
2. **Serverless function** fetches the image server-side (no CORS restrictions)
3. **Function** validates the URL and content type
4. **Function** returns the image data with proper headers
5. **Frontend** receives the image and adds it to the zip file

### Benefits of Server-Side Approach
- **Reliability**: No dependency on external proxy services
- **Security**: URL validation and content type checking
- **Performance**: Caching headers and optimized fetching
- **Control**: Custom error handling and timeout management

## File Structure

```
/
├── index.html              # Main application interface
├── api/
│   └── proxy-image.js      # Serverless function for image proxy
├── package.json            # Project configuration
├── vercel.json            # Vercel deployment configuration
├── README.md              # This file
└── assets/                # Favicon and logo files
    ├── favicon.ico
    ├── logo_transparent.png
    └── ...
```

## API Endpoint

### GET /api/proxy-image

Fetches an image from a remote URL and returns it with proper headers.

**Parameters:**
- `url` (required): The URL of the image to fetch

**Response:**
- Success: Returns the image data with appropriate content-type headers
- Error: Returns JSON error message with appropriate HTTP status code

**Example:**
```
GET /api/proxy-image?url=https://example.com/image.png
```

## Security Features

- URL validation (only HTTP/HTTPS protocols allowed)
- Content-type validation (only image types accepted)
- Request timeout (30 seconds maximum)
- Proper error handling and logging

## Browser Support

- Modern browsers with ES6+ support
- Fetch API support required
- Blob and URL.createObjectURL support required

## License

MIT License - feel free to use and modify as needed.
