import { useState } from 'react';

export type AuthType = 'register' | 'auth';
type UseAuthTypeProps = AuthType | null;

export function useAuthType(initialValue: UseAuthTypeProps = null) {
  const [authType, setAuthType] = useState(initialValue);

  const switchAuthType = (newAuthType: UseAuthTypeProps = null) => {
    setAuthType(
      newAuthType ? newAuthType : authType === 'register' ? 'auth' : 'register',
    );
  };

  return { authType, setAuthType, switchAuthType } as const;
}
