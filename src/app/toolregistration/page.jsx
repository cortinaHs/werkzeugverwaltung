// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RegisterTool = ({ userId }) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [photo, setPhoto] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [categoryId, setCategoryId] = useState('');

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('/api/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//     }, []);

//     const handlePhotoChange = (e) => {
//         setPhoto(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('description', description);
//         formData.append('photo', photo);
//         formData.append('categoryId', categoryId);
//         formData.append('ownerId', userId);

//         try {
//             const response = await axios.post('/api/tools', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Tool registered:', response.data);
//         } catch (error) {
//             console.error('Error registering tool:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto mt-10 bg-white rounded-md shadow-md">
//             <div className="mb-4">
//                 <label className="block text-gray-700">Bezeichnung des Geräts</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700">Beschreibung</label>
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700">Foto</label>
//                 <input
//                     type="file"
//                     onChange={handlePhotoChange}
//                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700">Kategorie</label>
//                 <select
//                     value={categoryId}
//                     onChange={(e) => setCategoryId(e.target.value)}
//                     className="w-full p-2 mt-1 border border-gray-300 rounded"
//                 >
//                     <option value="">Wähle eine Kategorie</option>
//                     {categories.map(category => (
//                         <option key={category.id} value={category.id}>{category.name}</option>
//                     ))}
//                 </select>
//             </div>
//             <button type="submit" className="w-full p-2 mt-4 text-white bg-blue-500 rounded">Registrieren</button>
//         </form>
//     );
// };

const GeraetRegistrierungPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
			<div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
				<h1 className="mb-6 text-2xl font-bold text-center">
					Gerät registrieren
				</h1>
				<form>
					<div className="mb-4">
						<label htmlFor="bezeichnung" className="block mb-2 text-gray-700">
							Bezeichnung
						</label>
						<input
							type="text"
							id="bezeichnung"
							className="w-full p-2 text-gray-900 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="foto" className="block mb-2 text-gray-700">
							Foto (optional)
						</label>
						<input
							type="file"
							id="foto"
							className="w-full p-2 text-gray-900 border border-gray-300 rounded"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="kategorie" className="block mb-2 text-gray-700">
							Werkzeugkategorie
						</label>
						<select
							id="kategorie"
							className="w-full p-2 text-gray-900 border border-gray-300 rounded"
							required
						>
							<option value="" className="text-gray-500">
								Kategorie auswählen
							</option>
							<option value="Gartengeräte">Gartengeräte</option>
							<option value="Gartenwerkzeug">Gartenwerkzeug</option>
						</select>
					</div>
					<div className="mb-6">
						<label htmlFor="besitzer" className="block mb-2 text-gray-700">
							Besitzer (User)
						</label>
						<input
							type="text"
							id="besitzer"
							className="w-full p-2 text-gray-900 border border-gray-300 rounded"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
					>
						Registrieren
					</button>
				</form>
			</div>
		</div>
	);
};

export default GeraetRegistrierungPage;