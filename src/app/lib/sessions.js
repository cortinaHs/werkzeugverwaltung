import cookies from "next/headers";
import { prisma } from "./prisma";

export async function createSession(id) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	const sessionData = await prisma.user.create({
		data: {
			userId: id,
			expires: expiresAt,
		},
	});

	const sessionId = sessionData[0].id;

	// // 2. Encrypt the session ID
	// const session = await encrypt({ sessionId, expiresAt });

	// 3. Store the session in cookies for optimistic auth checks
	cookies().set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}
