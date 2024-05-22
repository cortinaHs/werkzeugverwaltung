"use client"

import React from 'react';
import HeaderNotAuthenticated from '@/components/headerNotAuthenticated';


const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderNotAuthenticated/>
            <main className="container py-8 mx-auto">
                <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-md">
                <nav className="container mx-auto py-4 flex justify-between items-center">
                    <div className="text-4xl font-bold text-gray-800">Neighbortool</div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Anmelden</button>
                
                </nav>
            </header>
            <main className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <img src="https://cdn.pixabay.com/photo/2020/02/19/21/49/workshop-4863393_1280.jpg" alt="Werkzeug und Gartengeräte" className="rounded-full"/>
                    </div>
                    <div>
                        <h1 className="mb-4 text-3xl font-bold text-gray-800">Willkommen bei Neighbortool</h1>
                        <p className="text-gray-700">
                            Neighbortool sind dafür da, um Ihre Werkzeuge und Gartengeräte effizient zu verwalten und untereinander zu verleihen.
                            Das Hauptziel besteht darin, Ressourcen zu teilen und die Anschaffung redundanter Geräte zu minimieren.
                        </p>
                    </div>
                </div>
            </main>
            <div className="container py-8 mx-auto">
                <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Bereits registrierte Geräte</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-lg shadow-md">
                        <img src="https://cdn.pixabay.com/photo/2018/05/26/18/16/john-deere-3431937_1280.jpg" alt="Bild 1" className="object-cover w-full h-full"/>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-md">
                        <img src="https://cdn.pixabay.com/photo/2014/09/03/11/57/chainsaw-434326_1280.jpg" alt="Bild 2" className="object-cover w-full h-full"/>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-md">
                        <img src="https://cdn.pixabay.com/photo/2016/08/14/20/06/lawn-mower-1593898_1280.jpg" alt="Bild 3" className="object-cover w-full h-full"/>
                    </div>
                </div>
            </div>
            {/* <footer className="py-4 text-gray-300 bg-gray-800">
                <div className="container flex items-center justify-between mx-auto">
                    <p>&copy; 2024 Neighbortool. Alle Rechte vorbehalten.</p>
                    <div>
                        <a href="impressum.html" className="mr-4">Impressum</a>
                        <a href="datenschutz.html">Datenschutzerklärung</a>
                    </div>
                </div>
            </footer> */}
        </div>
    );
};

export default HomePage;
// import { SignInButton, SignUpButton, SignOutButton, ProfileButton } from "@/components/buttons";
// import { auth } from "@/auth";

// import { SignInButton, SignUpButton, SignOutButton, ProfileButton } from "@/components/buttons";
// import { auth } from "@/auth";

// // `app/page.js` is the UI for the `/` URL
// export default async function Page() {
// 	const session = await auth()
// 	return(
// 		<>
// 			<h1>Hello, Home page lala!</h1>;
// 			<p>Welcome {session?.user.name}!</p>
// 			<div>
// 				<SignInButton />
// 				<SignUpButton />
// 				<SignOutButton />
// 				<ProfileButton />
// // `app/page.js` is the UI for the `/` URL
// export default async function Page() {
// 	const session = await auth()
// 	return(
// 		<>
// 			<h1>Hello, Home page lala!</h1>;
// 			<p>Welcome {session?.user.name}!</p>
// 			<div>
// 				<SignInButton />
// 				<SignUpButton />
// 				<SignOutButton />
// 				<ProfileButton />

// 		</div>
// 	</>
// )}
// 		</div>
// 	</>
// )}
