import { useEffect, useState } from "react";
import Header from "./components/Header";
import UrlForm from "./components/UrlForm";
import UrlCard from "./components/UrlCard";
import { UrlResponse } from "./types/url";
import Footer from "./components/Footer";

function App() {
  const [urlData, setUrlData] = useState<UrlResponse | null>(null);

  // Restore last shortened URL on page load
  useEffect(() => {
    const savedUrl = localStorage.getItem("lastShortUrl");

    if (savedUrl) {
      setUrlData(JSON.parse(savedUrl));
    }
  }, []);

  // Save latest shortened URL whenever it changes
  useEffect(() => {
    if (urlData) {
      localStorage.setItem(
        "lastShortUrl",
        JSON.stringify(urlData)
      );
    }
  }, [urlData]);

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Header />

        <UrlForm onUrlCreated={setUrlData} />

        {urlData && (
          <UrlCard
            data={urlData}
            onClear={() => setUrlData(null)}
          />
        )}

        <Footer />
      </div>
    </main>
  );
}

export default App;