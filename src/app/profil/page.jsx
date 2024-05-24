'use client';

import { useState } from 'react';

const BenutzerPage = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Benutzerprofil</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">E-Mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telefon" className="block text-gray-700 mb-2">Telefon</label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={user.telefon}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="strasse" className="block text-gray-700 mb-2">Straße</label>
              <input
                type="text"
                id="strasse"
                name="strasse"
                value={user.strasse}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="stadt" className="block text-gray-700 mb-2">Stadt</label>
              <input
                type="text"
                id="stadt"
                name="stadt"
                value={user.stadt}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postleitzahl" className="block text-gray-700 mb-2">Postleitzahl</label>
              <input
                type="text"
                id="postleitzahl"
                name="postleitzahl"
                value={user.postleitzahl}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-gray-700 mb-2">Biografie</label>
              <textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-900"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Speichern</button>
          </form>
        ) : (
          <div>
            <p className="text-gray-700 mb-4"><span className="font-bold">Name:</span> {user.name}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">E-Mail:</span> {user.email}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Telefon:</span> {user.telefon}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Straße:</span> {user.strasse}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Stadt:</span> {user.stadt}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Postleitzahl:</span> {user.postleitzahl}</p>
            <p className="text-gray-700 mb-4"><span className="font-bold">Biografie:</span> {user.bio}</p>
            <button onClick={() => setIsEditing(true)} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Bearbeiten</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenutzerPage;
