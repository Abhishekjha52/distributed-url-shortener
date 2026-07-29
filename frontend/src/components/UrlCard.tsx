import { useEffect, useState } from "react";
import { getUrlDetails } from "../services/urlService";
import { UrlResponse } from "../types/url";
import toast from "react-hot-toast";
type Props = {
  data: UrlResponse;
  onClear: () => void;
};

export default function UrlCard({ data, onClear }: Props) {
  const [urlData, setUrlData] = useState(data);

  // Backend URL from environment
  const backendUrl = import.meta.env.VITE_API_URL;

  // Complete short URL
  const shortUrl = `${backendUrl}/${urlData.shortCode}`;

  useEffect(() => {
    async function fetchDetails() {
      try {
        const latest = await getUrlDetails(data.shortCode);
        setUrlData(latest);
      } catch (error) {
        console.error("Failed to fetch URL details:", error);
      }
    }

    fetchDetails();
  }, [data.shortCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      toast.success("Short URL copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy URL");
    }
  };

  const handleRefresh = async () => {
    try {
      const latest = await getUrlDetails(urlData.shortCode);
      setUrlData(latest);
      toast.success("Statistics refreshed!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    localStorage.removeItem("lastShortUrl");
    onClear();
    toast.success("History cleared!");
  };

  return (
    <div className="mt-10 bg-slate-800 rounded-xl p-6 text-white">

      <h2 className="text-xl font-bold mb-4">
        Short URL Created 🎉
      </h2>

      <div className="space-y-3">

        <div>
          <p className="text-gray-400">Original URL</p>

          <a
            href={urlData.originalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 break-all"
          >
            {urlData.originalUrl}
          </a>
        </div>

        <div>
          <p className="text-gray-400">Short URL</p>

          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-green-400"
          >
            {shortUrl}
          </a>
        </div>

        <div>
          <p className="text-gray-400">Clicks</p>

          <p>{urlData.clicks}</p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            📋 Copy
          </button>

          <button
            onClick={handleRefresh}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
          >
            🔄 Refresh Stats
          </button>

          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            🗑 Clear
          </button>
        </div>

      </div>
    </div>
  );
}