export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  // Validate URL parameter
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  // Validate URL format
  try {
    const parsedUrl = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).json({ error: 'Invalid URL protocol. Only HTTP and HTTPS are allowed.' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // Fetch the image from the provided URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      // Set a timeout to prevent hanging requests
      signal: AbortSignal.timeout(30000) // 30 seconds timeout
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Failed to fetch image: ${response.status} ${response.statusText}` 
      });
    }

    // Get the content type from the response
    const contentType = response.headers.get('content-type');
    
    // Validate that it's actually an image
    if (!contentType || !contentType.startsWith('image/')) {
      return res.status(400).json({ 
        error: 'URL does not point to a valid image file' 
      });
    }

    // Get the image data as an array buffer
    const imageBuffer = await response.arrayBuffer();
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Send the image data
    res.send(Buffer.from(imageBuffer));

  } catch (error) {
    console.error('Error fetching image:', error);
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      return res.status(408).json({ error: 'Request timeout - image took too long to download' });
    }
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(404).json({ error: 'Image URL not found or unreachable' });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error while fetching image',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
