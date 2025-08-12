import { useEffect, useState } from "react";

export default function GetOneImage({ imageKey }) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/get-image/${encodeURIComponent(imageKey)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch image");
        return res.json();
      })
      .then((data) => {
        setUrl(data.url);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [imageKey]);

  if (loading) return <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin items-center justify-center"></div>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!url) return <p>No image URL</p>;

  return (
    <img
      src={url}
      alt={imageKey}
      className="max-w-md rounded shadow"
    />
  );
}
