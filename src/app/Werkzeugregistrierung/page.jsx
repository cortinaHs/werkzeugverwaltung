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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700">Bezeichnung des Geräts</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Beschreibung</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Foto</label>
                <input
                    type="file"
                    onChange={handlePhotoChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Kategorie</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                    <option value="">Wähle eine Kategorie</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-4">Registrieren</button>
        </form>
    );
};

export default RegisterTool;
