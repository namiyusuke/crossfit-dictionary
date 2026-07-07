/**
 * 構造化データ(JSON-LD)を <script type="application/ld+json"> として出力する。
 * サーバーコンポーネントから呼び出す前提。data はそのまま JSON.stringify される。
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // 構造化データは信頼できるサーバー生成値のみ。XSS 防止のため < を無害化する。
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
