import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthStore } from "../../store/authStore";

const ProjectPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const [files, setFiles] = useState([]);
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name) return;

    const loadFiles = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/projects/${encodeURIComponent(
            name
          )}/files`
        );

        const enriched = await Promise.all(
          (res.data.files || []).map(async (file) => {
            try {
              const signed = await axios.get(
                `/api/files/${encodeURIComponent(file.key)}`
              );

              return { ...file, url: signed.data.url };
            } catch {
              return file;
            }
          })
        );

        setFiles(enriched);
      } catch (err) {
        console.error(err);
        setError("Failed to load files");
      }

      setLoading(false);
    };

    loadFiles();
  }, [name]);

  const renderPreview = (file) => {
    const ext = file?.fileName?.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return (
        <img
          src={file.url}
          alt={file.fileName}
          className="w-full h-48 object-contain rounded"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      );
    }

    if (["mp4", "webm", "ogg"].includes(ext)) {
      return (
        <video
          src={file.url}
          className="w-full h-48 rounded"
          controls
          controlsList={user?.role !== "super-admin" ? "nodownload" : ""}
          onContextMenu={(e) => e.preventDefault()}
        />
      );
    }

    return <div className="text-gray-600 italic">Preview not available</div>;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project: {name}</h1>

      {loading && <p>Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && files.length === 0 && <p>No files found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="border p-3 rounded shadow-sm bg-white flex flex-col items-center"
          >
            {renderPreview(file)}
            <p className="mt-2 text-sm">{file.fileName}</p>

            {user?.role === "super-admin" && file.url && (
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded text-sm"
              >
                Download / View
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
