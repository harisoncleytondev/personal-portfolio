import { Settings } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';

const useDashBoard = () => {
  const saveSettings = (data: Settings) => {
    return useMutation({
      mutationFn: () =>
        fetch('/api/settings/', {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
    });
  };

  const createProject = () => {
    
  }
};

export default useDashBoard;
