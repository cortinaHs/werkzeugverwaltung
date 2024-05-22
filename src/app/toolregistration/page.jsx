"use client"
import React, { useState } from 'react';

const ToolManagementPage = () => {
    const [toolName, setToolName] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState(null);
    const [tools, setTools] = useState([]);

    const handleToolNameChange = (e) => {
        setToolName(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleRegisterTool = () => {
        const newTool = {
            name: toolName,
            category: category,
            photo: photo,
            owner: 'CurrentUser' // Placeholder for the current user, you may replace it with the actual user ID
        };
        setTools([...tools, newTool]);
        // Here you can send the new tool data to your backend for storage
        // For simplicity, we're just adding it to the local state
    };

    return (
        <div>
            <h1>Werkzeugverwaltung</h1>
            <div>
                <label htmlFor="toolName">Bezeichnung des Geräts:</label>
                <input type="text" id="toolName" value={toolName} onChange={handleToolNameChange} />
            </div>
            <div>
                <label htmlFor="category">Werkzeugkategorie:</label>
                <input type="text" id="category" value={category} onChange={handleCategoryChange} />
            </div>
            <div>
                <label htmlFor="photo">Foto des Geräts (optional):</label>
                <input type="file" id="photo" onChange={handlePhotoChange} />
            </div>
            <button onClick={handleRegisterTool}>Gerät registrieren</button>
            <div>
                <h2>Registrierte Geräte:</h2>
                <ul>
                    {tools.map((tool, index) => (
                        <li key={index}>
                            <div>{tool.name}</div>
                            <div>{tool.category}</div>
                            {tool.photo && <img src={URL.createObjectURL(tool.photo)} alt="Gerätefoto" />}
                            <div>Besitzer: {tool.owner}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToolManagementPage;