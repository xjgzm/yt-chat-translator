# YouTube Live Chat Translator

[English](./README-en.md) | 日本語

自分の言語以外で書かれたYouTube Liveのチャットコメントを自動で翻訳して、元のコメントの下に表示するChrome拡張機能です。

## 特徴

- YouTube Liveのチャット欄（配信中・アーカイブのリプレイ両対応）を監視し、新しいコメントが流れてくるたびに自動翻訳
- 自分の言語と一致するコメントはそのまま
- 翻訳エンジンを選択可能
  - **Google翻訳**（無料・APIキー不要、デフォルト）
  - **DeepL**（要APIキー、高精度）
  - **OpenRouter**（要APIキー、モデルを自由に選択できるBYOK方式）
- ポップアップから有効/無効・翻訳先言語をワンタッチ切り替え

## インストール方法

1. `chrome://extensions` を開く
2. 右上の「デベロッパーモード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このフォルダ（`yt-chat-translator`）を選択

Chrome系ブラウザ（Edge, Brave等）でも同様の手順で動作します。

## 使い方

1. 拡張機能アイコンをクリックして、翻訳先の言語を選ぶ
2. YouTubeで配信中のライブに行き、チャット欄を開く（別ウィンドウのチャットでもOK）
3. 自分の言語以外のコメントに、翻訳文が自動で追加表示されます

## 詳細設定

拡張機能アイコン → オプション画面 から、翻訳エンジンとAPIキーを設定できます。

- **DeepL**: [DeepL API](https://www.deepl.com/pro-api) で無料キーを取得（無料キーは末尾が `:fx`）
- **OpenRouter**: [OpenRouter](https://openrouter.ai/) のAPIキーを使用。任意のモデルを指定可能（例: `openai/gpt-4o-mini`, `anthropic/claude-3.5-haiku` など）

## 注意事項

- Google翻訳エンドポイントは非公式のため、将来的に仕様変更で動作しなくなる可能性があります。その場合はDeepLまたはOpenRouterへの切り替えをお試しください
- APIキーは `chrome.storage.sync` に保存され、ログインしているChromeアカウント間で同期されます

## プライバシーポリシー

[こちら](https://xjgzm.github.io/pages/yt-chat-translator/privacy/privacy-ja.html) を参照してください<br>
English Version:[here](https://xjgzm.github.io/pages/yt-chat-translator/privacy/privacy-en.html)

## 更新履歴

[CHANGELOG.md](./CHANGELOG.md) を参照してください。

## 謝辞

このプロジェクトのコードはAnthropicのClaudeの支援を受けて作成されました。
