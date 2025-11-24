

// export default ProjectViewer;
import React, { useEffect, useCallback } from "react";
import { useProjectStore } from "../store/projectUploadStore";
import { useAuthStore } from "../store/authStore";

const ProjectViewer = () => {
  const {
    projects,
    loadingProjects,
    loadingFiles,
    error,
    modalProject,
    currentFileIndex,
    fetchProjects,
    loadFiles,
    setModalProject,
    setCurrentFileIndex,
  } = useProjectStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const renderThumbnail = (file) => {
    const ext = file?.fileName?.split(".").pop()?.toLowerCase();
    if (!ext) return <div className="text-gray-500 italic">Invalid file</div>;

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return (
        <img
          src={file?.url}
          alt={file?.fileName}
          className="w-full h-48 object-contain rounded cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setCurrentFileIndex(modalProject.files.indexOf(file))}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      );
    } else if (["mp4", "webm", "ogg"].includes(ext)) {
      return (
        <video
          src={file?.url}
          className="w-full h-48 object-contain rounded cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setCurrentFileIndex(modalProject.files.indexOf(file))}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
          muted
          loop
          playsInline
          controlsList="nodownload"
        />
      );
    } else {
      return <div className="text-gray-500 italic">Preview not available</div>;
    }
  };

  const prevFile = () => {
    if (currentFileIndex > 0) setCurrentFileIndex(currentFileIndex - 1);
  };
  const nextFile = () => {
    if (currentFileIndex < modalProject.files.length - 1)
      setCurrentFileIndex(currentFileIndex + 1);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!modalProject || currentFileIndex === null) return;

      if (e.key === "ArrowLeft") prevFile();
      if (e.key === "ArrowRight") nextFile();
      if (e.key === "Escape") {
        setCurrentFileIndex(null);
        setModalProject(null);
      }
    },
    [modalProject, currentFileIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Projects</h1>

      {/* POSTCARD VIEW */}
      {loadingProjects ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {projects.map((project) => (
            <div
              key={project.name}
              onClick={() => loadFiles(project.name)}
              className="cursor-pointer rounded-xl shadow-lg border bg-white hover:shadow-2xl transition overflow-hidden group"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={project.preview || "images/projectAcc.png"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-sm text-blue-600 underline mt-2">
                  Click to view project files
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROJECT MODAL FULLSCREEN */}
      {modalProject && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-80 flex justify-center items-center z-50 p-2"
          onClick={() => setModalProject(null)}
        >
          <div
            className="bg-white rounded w-full h-screen overflow-auto relative p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setCurrentFileIndex(null);
                setModalProject(null);
              }}
              className="absolute top-4 right-4 text-white bg-red-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6">{modalProject.name}</h2>

            {loadingFiles ? (
              <p>Loading files...</p>
            ) : modalProject.files.length === 0 ? (
              <p>No files in this project.</p>
            ) : currentFileIndex === null ? (
              // Thumbnail Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {modalProject.files.map((file, index) => (
                  <div
                    key={index}
                    className="border p-2 rounded flex flex-col items-center"
                    onClick={() => setCurrentFileIndex(index)}
                  >
                    {renderThumbnail(file)}
                    <span className="mt-2 text-sm truncate w-full text-center">
                      {file?.fileName}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              // Slider View
              <div className="flex flex-col items-center justify-center">
                <div className="w-full flex justify-between items-center mb-4">
                  <button
                    onClick={prevFile}
                    disabled={currentFileIndex === 0}
                    className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${
                      currentFileIndex === 0 && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    ◀ Prev
                  </button>
                  <span className="text-sm">
                    {currentFileIndex + 1}/{modalProject.files.length}
                  </span>
                  <button
                    onClick={nextFile}
                    disabled={currentFileIndex === modalProject.files.length - 1}
                    className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${
                      currentFileIndex === modalProject.files.length - 1 &&
                      "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Next ▶
                  </button>
                </div>

                {/* Current File */}
                {["jpg", "jpeg", "png", "gif", "webp"].includes(
                  modalProject.files[currentFileIndex]?.fileName
                    ?.split(".")
                    .pop()
                    ?.toLowerCase()
                ) ? (
                  <img
                    src={modalProject.files[currentFileIndex]?.url}
                    alt={modalProject.files[currentFileIndex]?.fileName}
                    className="max-w-full max-h-[95vh] object-contain rounded"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                  />
                ) : (
                  <video
                    src={modalProject.files[currentFileIndex]?.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[95vh] rounded"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                  />
                )}

                {user?.role === "super-admin" &&
                  modalProject.files[currentFileIndex]?.url && (
                    <a
                      href={modalProject.files[currentFileIndex].url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded mt-4"
                    >
                      Download / View
                    </a>
                  )}

                <button
                  onClick={() => setCurrentFileIndex(null)}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Back to Thumbnails
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectViewer;
