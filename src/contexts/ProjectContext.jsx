/**
 * Project Context Provider
 * Manages the currently selected project
 * @module contexts/ProjectContext
 */

import { createContext, useContext, useState } from 'react';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);

  const selectProject = (project) => {
    setSelectedProject(project);
    // Store in session storage for persistence
    if (project) {
      sessionStorage.setItem('selectedProjectId', project.id);
    } else {
      sessionStorage.removeItem('selectedProjectId');
    }
  };

  const clearProject = () => {
    setSelectedProject(null);
    sessionStorage.removeItem('selectedProjectId');
  };

  const value = {
    selectedProject,
    projectLoading,
    setProjectLoading,
    selectProject,
    clearProject,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export default ProjectContext;

