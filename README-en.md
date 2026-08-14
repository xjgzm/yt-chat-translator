# YouTube Live Chat Translator

English | [日本語](./README.md)

A Chrome extension that automatically translates YouTube Live chat messages that aren't in your language, and displays the translation right below the original comment.

## Features

- Watches the YouTube Live chat panel (both live streams and archived replays) and translates new comments as they come in
- Comments already in your language are left untouched
- Choice of translation engine
  - **Google Translate** (free, no API key required, default)
  - **DeepL** (API key required, high accuracy)
  - **OpenRouter** (API key required, BYOK-style with your choice of model)
- One-tap enable/disable and target-language switching from the popup

## Installation

1. Open `chrome://extensions`
2. Turn on "Developer mode" in the top right
3. Click "Load unpacked"
4. Select this folder (`yt-chat-translator`)

The same steps work on other Chromium-based browsers (Edge, Brave, etc.).

## Usage

1. Click the extension icon and choose your target language
2. Go to a live YouTube stream and open the chat panel (a popped-out chat window works too)
3. Comments not in your language will automatically get a translation added underneath

## Advanced Settings

Open the extension icon → Options page to configure the translation engine and API key.

- **DeepL**: Get a free key from the [DeepL API](https://www.deepl.com/pro-api) (free-tier keys end in `:fx`)
- **OpenRouter**: Use your [OpenRouter](https://openrouter.ai/) API key. Any model can be specified (e.g. `openai/gpt-4o-mini`, `anthropic/claude-3.5-haiku`)

## Notes

- The Google Translate endpoint used here is unofficial, so it may stop working without notice if Google changes it. If that happens, try switching to DeepL or OpenRouter
- API keys are stored in `chrome.storage.sync` and sync across Chrome accounts you're signed into

## Privacy Policy

See [privacy](https://xjgzm.github.io/yt-chat-translator/privacy-en.html) for details.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details.

## Acknowledgments

The code for this project was created with the assistance of Anthropic's Claude.
