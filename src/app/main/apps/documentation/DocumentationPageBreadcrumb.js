import Breadcrumbs from '@mui/material/Breadcrumbs';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

const getPathTree = (departmentTree, url) => {
  function findPath(node, _url) {
    // If current node matches search node, return tail of path result
    if (node.url === _url) {
      return [];
    }
    // If current node not search node match, examine children. For first
    // child that returns an array (path), prepend current node to that
    // path result
    if (node.children) {
      // eslint-disable-next-line no-restricted-syntax
      for (const child of node.children) {
        const childPath = findPath(child, _url);
        if (Array.isArray(childPath)) {
          childPath.unshift(child);
          return childPath;
        }
      }
    }
    return false;
  }
  const response = findPath(departmentTree, url);
  return response || [];
};

function DocumentationPageBreadcrumb({ className }) {
  const { pathname } = useLocation();

  return (
    <div className={clsx('', className)}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          className="font-semibold hover:underline"
          color="secondary"
          to="/documentation"
          role="button"
        >
          Documentation
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default DocumentationPageBreadcrumb;
