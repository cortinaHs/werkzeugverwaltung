import { SignInButton, SignUpButton, SignOutButton, ProfileButton } from "@/components/buttons";
import { auth } from "@/auth";

// `app/page.js` is the UI for the `/` URL
export default async function Page() {
	const session = await auth()
	return(
		<>
			<h1>Hello, Home page lala!</h1>;
			<p>Welcome {session?.user.name}!</p>
			<div>
				<SignInButton />
				<SignUpButton />
				<SignOutButton />
				<ProfileButton />

		</div>
	</>
)}
