
import React from "react";

export default async function Home() {

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="container py-8 mx-auto">
				<div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
					<div>
						<img
							src="https://cdn.pixabay.com/photo/2020/02/19/21/49/workshop-4863393_1280.jpg"
							alt="Werkzeug und Gartengeräte"
							className="rounded-full"
						/>
					</div>
					<div>
						<h1 className="mb-4 text-3xl font-bold text-gray-800">
							Willkommen bei Neighbortool
						</h1>
						<p className="text-gray-700">
							Neighbortool sind dafür da, um Ihre Werkzeuge und Gartengeräte
							effizient zu verwalten und untereinander zu verleihen. Das
							Hauptziel besteht darin, Ressourcen zu teilen und die Anschaffung
							redundanter Geräte zu minimieren.
						</p>
					</div>
				</div>
			</main>
			<div className="container py-8 mx-auto">
				<h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
					Bereits registrierte Geräte
				</h2>
				<div className="grid grid-cols-3 gap-4">
					<div className="overflow-hidden rounded-lg shadow-md">
						<img
							src="https://cdn.pixabay.com/photo/2018/05/26/18/16/john-deere-3431937_1280.jpg"
							alt="Bild 1"
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="overflow-hidden rounded-lg shadow-md">
						<img
							src="https://cdn.pixabay.com/photo/2014/09/03/11/57/chainsaw-434326_1280.jpg"
							alt="Bild 2"
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="overflow-hidden rounded-lg shadow-md">
						<img
							src="https://cdn.pixabay.com/photo/2016/08/14/20/06/lawn-mower-1593898_1280.jpg"
							alt="Bild 3"
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
