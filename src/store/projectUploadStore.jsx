import { create } from "zustand";
import axios from "axios";

export const useProjectStore = create((set, get) => ({
  projects: [],
  loadingProjects: false,
  loadingFiles: false,
  error: "",
  modalProject: null,
  currentFileIndex: null,

  fetchProjects: async () => {
    set({ loadingProjects: true, error: "" });
    try {
      const res = await axios.get("http://localhost:5000/api/auth/projects");

      const enriched = await Promise.all(
        (res.data.projects || []).map(async (p) => {
          try {
            const f = await axios.get(
              `http://localhost:5000/api/auth/projects/${p}/files`
            );
            const firstImage = f.data.files.find((file) =>
              /\.(jpg|jpeg|png|webp|gif)$/i.test(file.fileName)
            );
            if (!firstImage) return { name: p, preview: null };
            const signed = await axios.get(
              `/api/files/${encodeURIComponent(firstImage.key)}`
            );
            return { name: p, preview: signed.data.url };
          } catch {
            return { name: p, preview: null };
          }
        })
      );

      set({ projects: enriched });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch projects" });
    } finally {
      set({ loadingProjects: false });
    }
  },

  loadFiles: async (project) => {
    set({ loadingFiles: true, error: "" });
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/projects/${encodeURIComponent(project)}/files`
      );

      const filesWithSignedUrls = await Promise.all(
        (res.data?.files || []).map(async (file) => {
          if (!file?.key) return file;
          try {
            const urlRes = await axios.get(
              `http://localhost:5000/api/auth/projects/${encodeURIComponent(
                file.key
              )}`
            );
            return { ...file, url: urlRes.data?.url || "" };
          } catch {
            return file;
          }
        })
      );

      set({ modalProject: { name: project, files: filesWithSignedUrls } });
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch files" });
    } finally {
      set({ loadingFiles: false });
    }
  },

  setModalProject: (modalProject) => set({ modalProject }),
  setCurrentFileIndex: (currentFileIndex) => set({ currentFileIndex }),
  setError: (error) => set({ error }),
}));
export default useProjectStore;