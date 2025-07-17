import { useMemo } from 'react';

export default function useRole() {
  return useMemo(() => {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return {
      isAdmin: roles.includes('admin'),
      isViewer: roles.includes('viewer'),
    };
  }, []);
} 