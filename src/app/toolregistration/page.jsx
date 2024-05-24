import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterTool = ({ userId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', photo);
        formData.append('categoryId', categoryId);
        formData.append('ownerId', userId);

        try {
            const response = await axios.post('/api/tools', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Tool registered:', response.data);
        } catch (error) {
            console.error('Error registering tool:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto mt-10 bg-white rounded-md shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700">Bezeichnung des Geräts</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Beschreibung</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Foto</label>
                <input
                    type="file"
                    onChange={handlePhotoChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Kategorie</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                >
                    <option value="">Wähle eine Kategorie</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="w-full p-2 mt-4 text-white bg-blue-500 rounded">Registrieren</button>
        </form>
    );
};

// export default RegisterTool;
//  50 changes: 50 additions & 0 deletions50  
// src/app/api/Werkzeugregistrierung/api.js
// @@ -0,0 +1,50 @@
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const app = express();
// app.use(express.json());
// const upload = multer({ dest: 'uploads/' });

// // Route zum Abrufen von Kategorien
// app.get('/api/categories', async (req, res) => {
//     try {
//         const categories = await prisma.category.findMany();
//         res.json(categories);
//     } catch (error) {
//         res.status(500).json({ error: 'Fehler beim Abrufen der Kategorien' });
//     }
// });

// // Route zum Registrieren eines Werkzeugs
// app.post('/api/tools', upload.single('photo'), async (req, res) => {
//     try {
//         const { name, description, categoryId, ownerId } = req.body;
//         const photo = req.file ? req.file.filename : null;

//         const tool = await prisma.tool.create({
//             data: {
//                 name,
//                 description,
//                 photo,
//                 categoryId: parseInt(categoryId),
//                 ownerId: parseInt(ownerId),
//             },
//         });

//         res.json(tool);
//     } catch (error) {
//         res.status(500).json({ error: 'Fehler beim Erstellen des Tools' });
//     }
// });

// // Statische Dateien bereitstellen
// app.use('/images', express.static(path.join(__dirname, 'uploads')));

// // Server starten
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server läuft auf Port ${PORT}`);
// });


// "use client"
// import React, { useState } from 'react';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import 'tailwindcss/tailwind.css'; // Import von Tailwind CSS

// const ToolManagementPage = () => {
//     const [toolName, setToolName] = useState('');
//     const [category, setCategory] = useState('');
//     const [photo, setPhoto] = useState(null);
//     const [tools, setTools] = useState([]);

//     const handleToolNameChange = (e) => {
//         setToolName(e.target.value);
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handlePhotoChange = (e) => {
//         setPhoto(e.target.files[0]);
//     };

//     const handleRegisterTool = () => {
//     const { register, handleSubmit, reset, watch } = useForm();
//     const [tools, setTools] = React.useState([]);

//     // Funktion zum Verarbeiten der Formularübermittlung
//     const onSubmit = (data) => {
//         const newTool = {
//             name: toolName,
//             category: category,
//             photo: photo,
//             owner: 'CurrentUser' // Placeholder for the current user, you may replace it with the actual user ID
//             ...data,
//             owner: 'CurrentUser' // Platzhalter für den aktuellen Benutzer, kann durch die tatsächliche Benutzer-ID ersetzt werden
//         };
//         setTools([...tools, newTool]);
//         // Here you can send the new tool data to your backend for storage
//         // For simplicity, we're just adding it to the local state
//         reset(); // Formular zurücksetzen
//         // Hier können Sie die neuen Werkzeugdaten an Ihr Backend zur Speicherung senden
//         // Der Einfachheit halber fügen wir es nur dem lokalen Zustand hinzu
//     };

//     // Überwachung des Foto-Uploads
//     const watchPhoto = watch('photo');

//     return (
//         <div>
//             <h1>Werkzeugverwaltung</h1>
//             <div>
//                 <label htmlFor="toolName">Bezeichnung des Geräts:</label>
//                 <input type="text" id="toolName" value={toolName} onChange={handleToolNameChange} />
//             </div>
//             <div>
//                 <label htmlFor="category">Werkzeugkategorie:</label>
//                 <input type="text" id="category" value={category} onChange={handleCategoryChange} />
//             </div>
//             <div>
//                 <label htmlFor="photo">Foto des Geräts (optional):</label>
//                 <input type="file" id="photo" onChange={handlePhotoChange} />
//             </div>
//             <button onClick={handleRegisterTool}>Gerät registrieren</button>
//             <div>
//                 <h2>Registrierte Geräte:</h2>
//                 <ul>
//         <div className="container p-4 mx-auto">
//             <h1 className="mb-4 text-2xl font-bold">Werkzeugverwaltung</h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div className="flex flex-col">
//                     <label htmlFor="toolName" className="mb-2">Bezeichnung des Geräts:</label>
//                     <input
//                         type="text"
//                         id="toolName"
//                         {...register('toolName')}
//                         className="p-2 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <div className="flex flex-col">
//                     <label htmlFor="category" className="mb-2">Werkzeugkategorie:</label>
//                     <input
//                         type="text"
//                         id="category"
//                         {...register('category')}
//                         className="p-2 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <div className="flex flex-col">
//                     <label htmlFor="photo" className="mb-2">Foto des Geräts (optional):</label>
//                     <input
//                         type="file"
//                         id="photo"
//                         {...register('photo')}
//                         className="p-2 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <button type="submit" className="p-2 text-white bg-blue-500 rounded">Gerät registrieren</button>
//             </form>
//             <div className="mt-8">
//                 <h2 className="text-xl font-bold">Registrierte Geräte:</h2>
//                 <ul className="space-y-4">
//                     {tools.map((tool, index) => (
//                         <li key={index}>
//                             <div>{tool.name}</div>
//                         <li key={index} className="p-4 border border-gray-300 rounded">
//                             <div className="font-bold">{tool.toolName}</div>
//                             <div>{tool.category}</div>
//                             {tool.photo && <img src={URL.createObjectURL(tool.photo)} alt="Gerätefoto" />}
//                             {tool.photo && (
//                                 <img
//                                     src={URL.createObjectURL(tool.photo[0])}
//                                     alt="Gerätefoto"
//                                     className="mt-2 max-h-40"
//                                 />
//                             )}
//                             <div>Besitzer: {tool.owner}</div>
//                         </li>
//                     ))}
// @@ -64,4 +77,4 @@ const ToolManagementPage = () => {
//     );
// };

// export default ToolManagementPage;
// export default ToolManagementPage;