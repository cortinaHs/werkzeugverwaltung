// // `app/page.js` is the UI for the `/` URL
// export default function Admin() {
// 	return <h1>Hello, Home page!</h1>;
// }
const AdminPage = () => {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Administration</h1>
          
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Liste aller Benutzer</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="py-2 border-b border-gray-200">Benutzer 1</li>
              <li className="py-2 border-b border-gray-200">Benutzer 2</li>
              <li className="py-2 border-b border-gray-200">Benutzer 3</li>
              {/* Fügen Sie hier die vollständige Liste der Benutzer hinzu */}
            </ul>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Werkzeugkategorien</h2>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li className="py-2 border-b border-gray-200">Gartengeräte</li>
              <li className="py-2 border-b border-gray-200">Gartenwerkzeug</li>
              {/* Fügen Sie hier die vollständige Liste der Werkzeugkategorien hinzu */}
            </ul>
            <form className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Neue Kategorie hinzufügen"
              />
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Hinzufügen</button>
            </form>
          </section>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
  