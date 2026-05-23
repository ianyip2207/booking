# Post-hook: Enquiry Form Submission

**Trigger:** Contact form submits successfully (HTTP 200 from FormSubmit).

**Behaviour:** Plays a browser voice alert using the Web Speech API.

```js
// Fires inside Module 5 — CONTACT FORM, on response.ok
speakVoiceAlert('Hurray. Your voice is heard!');
```

**Implementation:** `script.js` — `speakVoiceAlert(text)` helper, Module 5 success path.

**Fallback:** Silent if the browser does not support `window.speechSynthesis` (e.g. some headless environments).
