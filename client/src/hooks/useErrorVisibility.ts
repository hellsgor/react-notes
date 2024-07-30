import { useState } from 'react';

export function useErrorVisibility() {
  const [isErrorVisibility, setIsErrorVisibility] = useState(true);

  const hideError = () => setIsErrorVisibility(false);

  const showError = () => setIsErrorVisibility(true);

  return [isErrorVisibility, hideError, showError] as const;
}
