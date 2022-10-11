import React from 'react';

interface IuseRefreshByUser {
  refetch: () => Promise<void>;
}
export const useRefreshByUser = ({refetch}: IuseRefreshByUser) => {
  const [isRefetchingByUser, setIsRefetchingByUser] = React.useState(false);

  async function refetchByUser() {
    setIsRefetchingByUser(true);

    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
};
