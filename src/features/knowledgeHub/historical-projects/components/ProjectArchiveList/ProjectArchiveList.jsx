/**
 * ProjectArchiveList - List of archived projects with cards
 * @module features/knowledgeHub/historical-projects/components/ProjectArchiveList
 */

import PropTypes from 'prop-types';
import ProjectArchiveCard from './ProjectArchiveCard';
import styles from './ProjectArchiveList.module.css';

const ProjectArchiveList = ({ projects, onProjectClick }) => {
  return (
    <div className={styles.list}>
      {projects.map((project) => (
        <ProjectArchiveCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
};

ProjectArchiveList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      client: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      completionDate: PropTypes.string.isRequired,
      duration: PropTypes.number,
      budget: PropTypes.number,
      documents: PropTypes.number,
      tags: PropTypes.arrayOf(PropTypes.string),
      disciplines: PropTypes.arrayOf(PropTypes.string),
      successRate: PropTypes.number
    })
  ).isRequired,
  onProjectClick: PropTypes.func.isRequired
};

export default ProjectArchiveList;

