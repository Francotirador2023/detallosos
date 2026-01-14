import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protejer todas las rutas bajo /admin EXCEPTO /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const session = request.cookies.get('admin_session');

        if (!session) {
            // Redirigir al login si no hay sesión
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
