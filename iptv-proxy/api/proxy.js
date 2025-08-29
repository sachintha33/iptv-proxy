// /api/proxy.js
export default async function handler(req, res) {
  try {
    const targetUrl = req.query.url;

    if (!targetUrl || !targetUrl.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    // Fetch the stream with Node
    const response = await fetch(targetUrl);

    // Pass headers so browser doesn’t block
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/vnd.apple.mpegurl");

    // Pipe back the response body
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}