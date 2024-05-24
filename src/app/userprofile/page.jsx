'use client';

import { useState } from 'react';

export default function BenutzerPage () {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Max Mustermann",
    email: "max@example.com",
    telefon: "01234 567890",
    strasse: "Musterstraße 1",
    stadt: "Musterstadt",
    postleitzahl: "12345",
    bio: "Hier ist eine kurze Biografie des Benutzers.",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Hier können Sie die Logik zum Speichern der Änderungen hinzufügen, z.B. API-Aufruf
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center">Benutzerprofil</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700">E-Mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telefon" className="block mb-2 text-gray-700">Telefon</label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={user.telefon}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="strasse" className="block mb-2 text-gray-700">Straße</label>
              <input
                type="text"
                id="strasse"
                name="strasse"
                value={user.strasse}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stadt" className="block mb-2 text-gray-700">Stadt</label>
              <input
                type="text"
                id="stadt"
                name="stadt"
                value={user.stadt}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postleitzahl" className="block mb-2 text-gray-700">Postleitzahl</label>
              <input
                type="text"
                id="postleitzahl"
                name="postleitzahl"
                value={user.postleitzahl}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block mb-2 text-gray-700">Biografie</label>
              <textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Speichern</button>
          </form>
        ) : (
          <div>
            <p className="mb-4 text-gray-700"><span className="font-bold">Name:</span> {user.name}</p>
            <p className="mb-4 text-gray-700"><span className="font-bold">E-Mail:</span> {user.email}</p>
            <p className="mb-4 text-gray-700"><span className="font-bold">Telefon:</span> {user.telefon}</p>
            <p className="mb-4 text-gray-700"><span className="font-bold">Straße:</span> {user.strasse}</p>
            <p className="mb-4 text-gray-700"><span className="font-bold">Stadt:</span> {user.stadt}</p>
            <p className="mb-4 text-gray-700"><span className="font-bold">Postleitzahl:</span> {user.postleitzahl}</p>
            <p className="mb-4 text-gray-700"><span className="font-bold">Biografie:</span> {user.bio}</p>
            <button onClick={() => setIsEditing(true)} className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600">Bearbeiten</button>
          </div>
        )}
      </div>
    </div>
  );
};
