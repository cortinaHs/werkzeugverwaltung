import React from 'react';
import { useForm } from 'react-hook-form';
import 'tailwindcss/tailwind.css'; // Import von Tailwind CSS

const ToolManagementPage = () => {
    const { register, handleSubmit, reset, watch } = useForm();
    const [tools, setTools] = React.useState([]);
    
    // Funktion zum Verarbeiten der Formularübermittlung
    const onSubmit = (data) => {
        const newTool = {
            ...data,
            owner: 'CurrentUser' // Platzhalter für den aktuellen Benutzer, kann durch die tatsächliche Benutzer-ID ersetzt werden
        };
        setTools([...tools, newTool]);
        reset(); // Formular zurücksetzen
        // Hier können Sie die neuen Werkzeugdaten an Ihr Backend zur Speicherung senden
        // Der Einfachheit halber fügen wir es nur dem lokalen Zustand hinzu
    };

    // Überwachung des Foto-Uploads
    const watchPhoto = watch('photo');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Werkzeugverwaltung</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="toolName" className="mb-2">Bezeichnung des Geräts:</label>
                    <input
                        type="text"
                        id="toolName"
                        {...register('toolName')}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="mb-2">Werkzeugkategorie:</label>
                    <input
                        type="text"
                        id="category"
                        {...register('category')}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="photo" className="mb-2">Foto des Geräts (optional):</label>
                    <input
                        type="file"
                        id="photo"
                        {...register('photo')}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Gerät registrieren</button>
            </form>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Registrierte Geräte:</h2>
                <ul className="space-y-4">
                    {tools.map((tool, index) => (
                        <li key={index} className="border border-gray-300 p-4 rounded">
                            <div className="font-bold">{tool.toolName}</div>
                            <div>{tool.category}</div>
                            {tool.photo && (
                                <img
                                    src={URL.createObjectURL(tool.photo[0])}
                                    alt="Gerätefoto"
                                    className="mt-2 max-h-40"
                                />
                            )}
                            <div>Besitzer: {tool.owner}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToolManagementPage;
