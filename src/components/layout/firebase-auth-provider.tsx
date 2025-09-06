'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase/client';

type FirebaseAuthContextValue = {
  user: User | null | undefined; // undefined while loading
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const FirebaseAuthContext = createContext<FirebaseAuthContextValue | undefined>(
  undefined
);

const AUTH_COOKIE = 'fb_auth';
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function setAuthCookie(isAuthed: boolean) {
  if (typeof document === 'undefined') return;
  if (isAuthed) {
    document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE}`;
  } else {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
  }
}

export default function FirebaseAuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const auth = useMemo(() => getFirebaseAuth(), []);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthCookie(!!u);
    });
    return () => unsub();
  }, [auth]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(() => ({ user, signInWithGoogle, logout }), [user]);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const ctx = useContext(FirebaseAuthContext);
  if (!ctx)
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  return ctx;
}
