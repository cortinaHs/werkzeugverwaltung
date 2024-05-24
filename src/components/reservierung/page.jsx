'use client'; // Dies macht die gesamte Datei zur Client-Komponente

import { useState } from 'react';

const ReservierungPage = () => {
  const [view, setView] = useState('category');

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Gerätereservierung</h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setView('category')}
            className={`px-4 py-2 rounded-l-lg ${view === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Nach Kategorie
          </button>
          <button
            onClick={() => setView('name')}
            className={`px-4 py-2 rounded-r-lg ${view === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Nach Bezeichnung
          </button>
        </div>

        {view === 'category' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Gerät nach Kategorie und Zeitraum auswählen</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="kategorie" className="block text-gray-700 mb-2">Werkzeugkategorie</label>
                <select
                  id="kategorie"
                  className="w-full p-2 border border-gray-300 rounded text-gray-900"
                  required
                >
                  <option value="" className="text-gray-500">Kategorie auswählen</option>
                  <option value="Gartengeräte">Gartengeräte</option>
                  <option value="Gartenwerkzeug">Gartenwerkzeug</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="startdatum" className="block text-gray-700 mb-2">Startdatum</label>
                <input
                  type="date"
                  id="startdatum"
                  className="w-full p-2 border border-gray-300 rounded text-gray-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="enddatum" className="block text-gray-700 mb-2">Enddatum</label>
                <input
                  type="date"
                  id="enddatum"
                  className="w-full p-2 border border-gray-300 rounded text-gray-900"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Gerät suchen</button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Gerät nach Bezeichnung auswählen</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="bezeichnung" className="block text-gray-700 mb-2">Bezeichnung</label>
                <input
                  type="text"
                  id="bezeichnung"
                  className="w-full p-2 border border-gray-300 rounded text-gray-900"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="kalender" className="block text-gray-700 mb-2">Kalenderansicht</label>
                <input
                  type="date"
                  id="kalender"
                  className="w-full p-2 border border-gray-300 rounded text-gray-900"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Gerät suchen</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservierungPage;
