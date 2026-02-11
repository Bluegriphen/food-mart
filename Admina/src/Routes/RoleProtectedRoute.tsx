import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectPermissions = (state: { Login: { permissions: any } }) =>
  state.Login.permissions || [];

const selectPermissionData = createSelector(
  selectPermissions,
  (permissions) => ({
    permissions,
  }),
);

interface RoleProtectedRouteProps {
  requiredPermissions?: string[];
  children: React.ReactNode;
}

const RoleProtectedRoute = ({
  requiredPermissions,
  children,
}: RoleProtectedRouteProps) => {
  const { permissions } = useSelector(selectPermissionData);

  // Get user data from localStorage
  const storedUser = localStorage.getItem('authUser');
  let storedPermissions: string[] = [];

  try {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Handle both possible permission structures
      if (Array.isArray(parsedUser?.permissions)) {
        storedPermissions = parsedUser.permissions;
      } else if (Array.isArray(parsedUser?.roles?.[0]?.permissions)) {
        storedPermissions = parsedUser.roles[0].permissions.map(
          (p: { name: string }) => p.name,
        );
      }
    }
  } catch (error) {
    console.error('Error parsing authUser from localStorage', error);
  }

  // Use Redux permissions if available, otherwise fall back to localStorage
  const allPermissions =
    permissions?.length > 0 ? permissions : storedPermissions;

  // If no permissions found at all, might want to handle this case differently
  if (!allPermissions || allPermissions.length === 0) {
    return <Navigate to="/login" />; // or access-denied if preferred
  }

  // Check required permissions if they are specified
  if (
    requiredPermissions &&
    !requiredPermissions.some((perm) => allPermissions.includes(perm))
  ) {
    return <Navigate to="/access-denied" />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
