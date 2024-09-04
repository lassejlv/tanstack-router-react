import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createRootRoute({
  component: function Root() {
    const location = useLocation();

    useEffect(() => {
      document.title = `${location.pathname.slice(1)}`;
    }, [location]);

    return (
      <>
        <Outlet />
      </>
    );
  },
});
