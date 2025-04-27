// middleware.ts
import { withAuth }          from 'next-auth/middleware';
import { NextResponse }      from 'next/server';

// this function runs *before* your pages
export default withAuth({
  callbacks: {
    // `authorized` is called on every matching request
    authorized({ token, req }) {
      const roles = (token as any)?.roles as string[] || [];
      const { pathname } = req.nextUrl;

      // SuperAdmin pages
      if (pathname.startsWith('/pages/superadmin')) {
        return roles.includes('SuperAdmin');
      }
      // OrgAdmin pages (OrgAdmin *or* SuperAdmin allowed)
      if (pathname.startsWith('/pages/organization')) {
        return (
          roles.includes('OrgAdmin') ||
          roles.includes('SuperAdmin')
        );
      }
      // CommAdmin pages (CommAdmin, OrgAdmin, or SuperAdmin)
      if (pathname.startsWith('/pages/community')) {
        return (
          roles.includes('CommunityAdmin') ||
          roles.includes('OrgAdmin')   ||
          roles.includes('SuperAdmin')
        );
      }
      // all other pages (public) are allowed
      return true;
    }
  },
});

// only run this middleware on those protected routes
export const config = {
  matcher: [
    '/pages/superadmin/:path*',
    '/pages/organization/:path*',
    '/pages/community/:path*',
  ],
};
