'use client'; // Dies macht die gesamte Datei zur Client-Komponente

import { useState } from 'react';

const ReservierungsverwaltungPage = () => {
  const [reservierungen, setReservierungen] = useState([
    { id: 1, name: 'Rasenmäher', kategorie: 'Gartengeräte', startdatum: '2024-06-01', enddatum: '2024-06-07' },
    { id: 2, name: 'Heckenschere', kategorie: 'Gartenwerkzeug', startdatum: '2024-06-10', enddatum: '2024-06-14' },
    // Weitere Reservierungen hier hinzufügen
  ]);

  const handleDelete = (id) => {
    setReservierungen(reservierungen.filter(reservierung => reservierung.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Meine Reservierungen</h1>
        <div className="mb-6">
          {reservierungen.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-700">
              {reservierungen.map(reservierung => (
                <li key={reservierung.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{reservierung.name}</p>
                      <p className="text-sm">Kategorie: {reservierung.kategorie}</p>
                      <p className="text-sm">Zeitraum: {reservierung.startdatum} bis {reservierung.enddatum}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(reservierung.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Löschen
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">Keine Reservierungen vorhanden.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservierungsverwaltungPage;
