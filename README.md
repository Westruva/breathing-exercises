# Breathe

A simple breathing exercise app that works fully offline and can be installed on your phone.

I made it after quitting alcohol, when I needed a new way to deal with stress. Diaphragmatic breathing changed my life. It isn't a fix-all, but it's a very handy tool when you are feeling low, bored or anxious.

## Features

- Four guided exercises: **Box (4-4-4-4)**, **4-7-8**, **Coherent (5-5)** and **Diaphragmatic (4-6)**
- An animated circle that grows and shrinks to pace each breath, with a text cue
- Start, pause, resume and end, with a session timer
- Vibration cues, so you can follow along with your eyes closed (Android; iPhone Safari does not support web vibration)
- Option to keep the screen awake during a session
- Session history: total sessions, total minutes and your latest sessions
- Works offline after the first visit and can be installed as an app
- No account, no tracking, no server. Everything stays on your device.

## Run it

You need Node.js. Then:

```
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Build and test offline

```
npm run build
npm run preview
```

Open the preview address, wait a few seconds, then stop the preview server and reload. The app should still load. The offline service worker only runs in the production build, not in `npm run dev`.

The build in `dist/` is plain static files and can be hosted on any static host. Installing it on a phone needs HTTPS.

If you change the app and publish an update, bump `CACHE_NAME` in `public/sw.js` so devices drop their old cached copy.

## Project layout

```
public/                   manifest, icons and the offline service worker (sw.js)
src/
  features/
    exercises/            exercise data, breathing circle, session screen
    history/              saved sessions and the History page
    about/                the "Why the app was made" dropdown
  hooks/                  timers, wake lock, remembered settings
  lib/                    storage and vibration helpers
  App.jsx, main.jsx
```

Built with React and Vite, in plain JavaScript.
