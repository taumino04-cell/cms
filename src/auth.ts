import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const LOGIN_URL =
  process.env.AUTH_API_LOGIN_URL || 'http://localhost:3001/auth/login';
const REFRESH_URL =
  process.env.AUTH_API_REFRESH_URL || 'http://localhost:3001/auth/refresh';

function nowMs() {
  return Date.now();
}

function computeExpiry(expiresIn?: any, expiresAt?: any): number | undefined {
  try {
    if (expiresAt) {
      const n = Number(expiresAt);
      if (!Number.isNaN(n)) {
        return n > 1e12 ? n : n * 1000;
      }
      const d = new Date(expiresAt);
      const t = d.getTime();
      if (!Number.isNaN(t)) return t;
    }
    const eIn = Number(expiresIn);
    if (!Number.isNaN(eIn) && eIn > 0) return nowMs() + eIn * 1000;
  } catch (_) {}
  return undefined;
}

async function refreshAccessToken(token: any) {
  try {
    if (!token?.refreshToken) throw new Error('Missing refresh token');
    const res = await fetch(REFRESH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token.refreshToken}`
      },
      body: JSON.stringify({ refresh_token: token.refreshToken })
    });

    if (!res.ok) {
      let message = 'Failed to refresh access token';
      try {
        const data = await res.json();
        message = data?.message || message;
      } catch (_) {}
      window.location.href = '/auth/sign-in';
      throw new Error(message);
    }

    const data = await res.json();
    const newAccess = data?.accessToken || data?.access_token || data?.token;
    const newRefresh =
      data?.refreshToken || data?.refresh_token || token.refreshToken;
    const accessTokenExpires =
      computeExpiry(
        data?.expiresIn ?? data?.expires_in,
        data?.expiresAt ?? data?.expires_at
      ) || nowMs() + 60 * 60 * 1000; // fallback 1h

    return {
      ...token,
      accessToken: newAccess ?? token.accessToken,
      refreshToken: newRefresh,
      accessTokenExpires,
      error: undefined
    };
  } catch (e: any) {
    window.location.href = '/auth/sign-in';
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  }
}

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null;
          console.log('Authorizing', { credentials, LOGIN_URL });

          const res = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          console.log('Login response', res);

          if (!res.ok) {
            let message = 'Invalid credentials';
            try {
              const data = await res.json();
              message = data?.message || message;
            } catch (_) {}
            throw new Error(message);
          }

          const data = await res.json();
          const user = data?.user || data;
          if (!user?.id && !user?.email) return null;

          const accessToken =
            data?.accessToken || data?.access_token || data?.token;
          const refreshToken =
            data?.refreshToken || data?.refresh_token || null;
          const accessTokenExpires = computeExpiry(
            data?.expiresIn ?? data?.expires_in,
            data?.expiresAt ?? data?.expires_at
          );

          return {
            id: String(user.id || user.email),
            name: user.name || user.fullName || null,
            email: user.email || null,
            image: user.image || user.avatar || null,
            accessToken,
            refreshToken,
            accessTokenExpires
          } as any;
        } catch (e: any) {
          throw new Error(e?.message || 'Login failed');
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, persist tokens
      console.log('JWT callback', { token, user });
      if (user) {
        token.user = {
          name: user.name || null,
          email: user.email || null,
          image: (user as any).image || null
        } as any;
        if ((user as any).accessToken)
          (token as any).accessToken = (user as any).accessToken;
        if ((user as any).refreshToken)
          (token as any).refreshToken = (user as any).refreshToken;
        if ((user as any).accessTokenExpires)
          (token as any).accessTokenExpires = (user as any).accessTokenExpires;
        else if (
          (token as any).accessToken &&
          !(token as any).accessTokenExpires
        ) {
          (token as any).accessTokenExpires = nowMs() + 60 * 60 * 1000; // default 1h
        }
        return token;
      }

      // If token has not expired, return it
      const expires = (token as any).accessTokenExpires as number | undefined;
      if (expires && nowMs() < expires - 30_000) {
        return token;
      }

      // Attempt to refresh
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as any;
      }
      if ((token as any).accessToken)
        (session as any).accessToken = (token as any).accessToken;
      if ((token as any).error) (session as any).error = (token as any).error;
      return session;
    }
  }
};

export default auth;
