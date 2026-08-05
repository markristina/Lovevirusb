[OPEN] Debug Session: mobile-shape-audio

- Symptom: `Shape.mp3` does not play on mobile on the deployed GitHub Pages site.
- Expected: The song should play on mobile, either automatically when allowed or through a reliable in-page tap fallback.
- Scope: Live deployment at `https://markristina.github.io/Lovevirusb/`

## Hypotheses

1. The deployed site is not running the latest audio fallback code.
2. Mobile autoplay is blocked because playback is not started from a trusted user gesture.
3. GitHub Pages path/base behavior affects audio loading under `/Lovevirusb/`.
4. The trigger UI exists in source but is not rendered or not reachable in the deployed page state.
5. Mobile browsers reject the current playback flow even when the file itself is available.

## Status

- Session initialized.
- No business-logic changes made in this debugging session yet.
