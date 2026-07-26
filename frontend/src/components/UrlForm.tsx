import { useState } from "react";
import toast from "react-hot-toast";
import { shortenUrl } from "../services/urlService";
import { UrlResponse } from "../types/url";

type Props = {
  onUrlCreated: (data: UrlResponse) => void;
};

export default function UrlForm({ onUrlCreated }: Props) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!originalUrl.trim()) {
      toast.error("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);

      const data = await shortenUrl(originalUrl);

      onUrlCreated(data);

      toast.success("Short URL created successfully!");

      setOriginalUrl("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex gap-4 justify-center"
    >
      <input
        type="url"
        placeholder="Paste your long URL..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        disabled={loading}
        className="w-full max-w-2xl px-4 py-3 rounded-lg text-black disabled:bg-gray-200 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 rounded-lg font-semibold text-white transition-all duration-200"
      >
        {loading ? "⏳ Shortening..." : "🚀 Shorten"}
      </button>
    </form>
  );
}