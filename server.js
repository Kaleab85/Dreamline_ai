const next = require('next')
const { createServer } = require('http')

// Initialize Next.js app
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Get port from environment or default to 3000
const port = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    // Let Next.js handle all requests
    handle(req, res)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`🚀 Server ready on http://localhost:${port}`)
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}).catch((ex) => {
  console.error('❌ Server failed to start:', ex.stack)
  process.exit(1)
})