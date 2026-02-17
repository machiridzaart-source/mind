export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).json({
    status: 'running',
    message: 'Mindmap 3D API is online'
  });
}
