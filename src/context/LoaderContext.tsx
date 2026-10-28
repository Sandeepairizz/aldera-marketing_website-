'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface LoaderContextValue {
  curtainStarted: boolean;
  setCurtainStarted: (v: boolean) => void;
  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;
  registerCurtainCallback: (fn: () => void) => void;
  fireCurtainCallbacks: () => void;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [curtainStarted, setCurtainStarted] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const curtainFiredRef = useRef(false);
  const curtainCallbacks = useRef<(() => void)[]>([]);

  const registerCurtainCallback = useCallback((fn: () => void) => {
    if (curtainFiredRef.current) {
      try {
        fn();
      } catch (err) {
        console.error('Error executing curtain callback immediately:', err);
      }
    } else {
      curtainCallbacks.current.push(fn);
    }
  }, []);

  const fireCurtainCallbacks = useCallback(() => {
    curtainFiredRef.current = true;
    curtainCallbacks.current.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('Error executing curtain callback:', err);
      }
    });
    curtainCallbacks.current = [];
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        curtainStarted,
        setCurtainStarted,
        loaderDone,
        setLoaderDone,
        registerCurtainCallback,
        fireCurtainCallbacks,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

const fallbackLoaderContext: LoaderContextValue = {
  curtainStarted: true,
  setCurtainStarted: () => {},
  loaderDone: true,
  setLoaderDone: () => {},
  registerCurtainCallback: (fn: () => void) => {
    try {
      fn();
    } catch (e) {
      console.error('Error executing curtain callback fallback:', e);
    }
  },
  fireCurtainCallbacks: () => {},
};

export function useLoaderContext() {
  const ctx = useContext(LoaderContext);
  return ctx || fallbackLoaderContext;
}

