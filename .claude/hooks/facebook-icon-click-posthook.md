# Post-hook: Facebook Icon Click

**Trigger:** User clicks the Facebook social icon (`a[aria-label="Facebook"]`).

**Behaviour:** Plays a browser voice alert using the Web Speech API.

```js
// Fires inside Module 10 — SOCIAL ICON CLICK HOOKS
facebookIcon.addEventListener('click', () => {
  speakVoiceAlert('Hurray. Your voice is heard!');
});
```

**Implementation:** `script.js` — Module 10, using the shared `speakVoiceAlert(text)` utility defined at the top of the `DOMContentLoaded` block.

**Fallback:** Silent if the browser does not support `window.speechSynthesis`.
