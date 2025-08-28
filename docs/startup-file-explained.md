# cPanel Node.js Startup File Configuration

## What is a Startup File?

The startup file is the **entry point** that cPanel uses to start your Node.js application. It's like telling cPanel: "When someone visits my website, run THIS file first."

## Common Startup File Options:

### Option 1: server.js (Custom Server)
```javascript
// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`Ready on http://${hostname}:${port}`)
  })
})
```

### Option 2: Use Next.js Built-in (Recommended)
```javascript
// server.js (simple wrapper)
const { createServer } = require('http')
const next = require('next')

const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(handle).listen(3000)
})
```

### Option 3: Direct Next.js Start
Some cPanel setups can run Next.js directly:
- Startup file: `node_modules/.bin/next`
- Arguments: `start`

## How to Configure in cPanel:

### Step 1: Go to Node.js App in cPanel
You'll see fields like:
- **App Root**: `/public_html/` (your project folder)
- **Startup File**: `server.js` (the file to run)
- **Application URL**: `yourdomain.com`
- **Node.js Version**: `18.x` or `20.x`

### Step 2: Choose Your Startup Method

#### Method A: Custom server.js
- **Startup File**: `server.js`
- **Create**: Custom server file (more control)

#### Method B: Direct Next.js
- **Startup File**: `node_modules/.bin/next`
- **Arguments**: `start`
- **Simpler**: Uses Next.js built-in server

#### Method C: Package.json Script
- **Startup File**: `npm`
- **Arguments**: `start`
- **Uses**: Your package.json "start" script

## What Each Method Does:

### Your package.json currently has:
```json
{
  "scripts": {
    "start": "next start"
  }
}
```

So if cPanel runs `npm start`, it will execute `next start`, which starts the Next.js server.

## Recommended Setup for Your Project:

### Option 1: Simple server.js (Recommended)
```javascript
// server.js
const next = require('next')
const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = require('http').createServer(handle)
  const port = process.env.PORT || 3000
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})
```

### cPanel Configuration:
- **Startup File**: `server.js`
- **Node.js Version**: Latest available (18+ recommended)
- **Environment Variables**: Add your Telegram credentials