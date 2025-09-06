'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { ActiveThemeProvider } from '../active-theme';
import FirebaseAuthProvider from './firebase-auth-provider';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
      </ActiveThemeProvider>
    </>
  );
}
