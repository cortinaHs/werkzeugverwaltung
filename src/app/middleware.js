import  NextRequest, { NextResponse } from "next/server";
import { auth } from "../app/lib/auth.js";

export function middleware(request) {
	const isAuthenticated = auth(request);

	// If the user is authenticated, continue as normal
	if (isAuthenticated) {
		const url = request.nextUrl.clone();
		url.pathname = "/userprofile";
		return NextResponse.rewrite(url);
	}

	// Redirect to login page if not authenticated
	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: "/dashboard/:path*",
};



export default auth((req) => {
	if (!req.auth) {
		const url = req.url.replace(req.nextUrl.pathname, "/signin");
		return Response.redirect(url);
	}
});
