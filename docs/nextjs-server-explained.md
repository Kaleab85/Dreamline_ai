# Next.js Server Architecture

## Option 2: Next.js Built-in Server (Standard)

### What Happens:
```bash
# Build process
npm run build
# Creates:
# .next/server/          ← Server-side code
# .next/static/          ← Static assets
# .next/standalone/      ← Optimized server bundle

# Run process
npm start
# Internally runs: node .next/standalone/server.js
```

### You DON'T create server.js yourself:
```
❌ Don't create this:
/your-project/
├── server.js          ← You don't write this
├── src/
└── package.json

✅ Next.js creates this automatically:
/your-project/
├── .next/
│   ├── server/        ← Next.js generates this
│   └── standalone/
│       └── server.js  ← Next.js creates this
├── src/
└── package.json
```

## Custom Server.js (Advanced - Not Recommended)

### Only if you need custom server logic:
```javascript
// server.js (custom - rarely needed)
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

### When you'd need custom server.js:
- Custom routing logic
- WebSocket servers
- Custom middleware
- Integration with Express.js
- **Most projects don't need this!**