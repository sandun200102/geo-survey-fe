import axios from "axios";
import { useEffect, useState } from "react";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(`http://localhost:5000/api/auth/projects`);
    setProjects(res.data.projects);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="p-4 bg-white shadow rounded-lg border hover:shadow-lg transition-all"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {project}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
