// Service worker: makes the app work offline.
// - On install it downloads the app shell (index.html + the JS/CSS it links to).
// - Page loads try the network first and fall back to the cached copy when offline.
// - Other files (JS, CSS, icons) come from the cache first and are refreshed in the background.
// Bump CACHE_NAME to force old caches to be dropped.
const CACHE_NAME = 'breathe-v1'
const scope = self.registration.scope // e.g. https://example.com/

// Look-ups ignore the Vary header. Servers often send "Vary: Origin", and the page's
// script request carries an Origin header that the install-time download did not,
// so without this the cached JS would not be found offline after a single visit.
const matchOptions = { ignoreVary: true }

self.addEventListener('install', (event) => {
  event.waitUntil(precacheShell().then(() => self.skipWaiting()))
})

// Vite gives the JS/CSS files hashed names, so read index.html to find them.
async function precacheShell() {
  const cache = await caches.open(CACHE_NAME)
  const response = await fetch(scope, { cache: 'reload' })
  const html = await response.clone().text()
  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => new URL(match[1], scope))
    .filter((url) => url.origin === self.location.origin)
    .map((url) => url.href)
  await cache.put(scope, response)
  // Set removes duplicates: cache.addAll fails if the same URL appears twice
  const files = new Set([...urls, new URL('icons/icon-512.png', scope).href])
  await cache.addAll([...files])
}

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    // Page load: network first, cached app shell when offline
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(scope, copy))
          return response
        })
        .catch(() => caches.match(scope, matchOptions)),
    )
    return
  }

  // Files: cache first, update the cache in the background
  event.respondWith(
    caches.match(request, matchOptions).then((cached) => {
      const refresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(() => cached)
      return cached || refresh
    }),
  )
})
