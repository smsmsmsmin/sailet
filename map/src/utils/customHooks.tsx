import React, { useEffect, useRef } from 'react';

export const usePrevious = (value: null | string) => {
  const ref = useRef<null | string>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};