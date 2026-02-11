import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

//Layouts
const NonAuthLayout = lazy(() => import('../Layouts/NonAuthLayout'));
const VerticalLayout = lazy(() => import('../Layouts/index'));

//routes
import { authProtectedRoutes, publicRoutes } from './routeConfig';
import LoadingScreen from 'components/LoadingScreen';
const AuthProtected = lazy(() => import('./AuthProtected'));
const RoleProtectedRoute = lazy(() => import('./RoleProtectedRoute'));

const Index = () => {
  return (
    <React.Fragment>
      {/* Suspense fallback for lazy-loaded components */}
      <Suspense fallback={<LoadingScreen message="Initializing AaravPOS…" />}>
        <Routes>
          <Route>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <NonAuthLayout>{route.component}</NonAuthLayout>
                }
                key={idx}
              />
            ))}
          </Route>

          {/* Auth Protected Routes */}
          <Route>
            {authProtectedRoutes.map((route, idx) => (
              <Route
                path={route.path}
                element={
                  <AuthProtected>
                    <VerticalLayout>
                      <RoleProtectedRoute
                        requiredPermissions={route.requiredPermissions}
                      >
                        {route.component}
                      </RoleProtectedRoute>
                    </VerticalLayout>
                  </AuthProtected>
                }
                key={idx}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default Index;
