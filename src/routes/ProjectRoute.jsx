/**
 * Project Route HOC - ensures user has access to the project
 * @module routes/ProjectRoute
 */

import { Navigate, useParams } from 'react-router-dom';
import { usePermissions } from '../contexts/PermissionsContext';
import { useAuth } from '../contexts/AuthContext';

const ProjectRoute = ({ children }) => {
  const { id: projectId } = useParams();
  const { checkProjectAccess } = usePermissions();
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!checkProjectAccess(projectId)) {
    return <Navigate to="/projects" replace />;
  }

  return children;
};

export default ProjectRoute;

