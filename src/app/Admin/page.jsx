import { auth } from "../auth";
 
//TODO: DB connetion

export  default async function Admin() {
  const session = await auth();
 
  if (session?.user.role != "admin") {
      redirect("/search")
}
    return (
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-3xl font-bold text-center">Administration</h1>
          
          <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Liste aller Benutzer</h2>
            <ul className="pl-5 text-gray-700 list-disc">
              <li className="py-2 border-b border-gray-200">Benutzer 1</li>
              <li className="py-2 border-b border-gray-200">Benutzer 2</li>
              <li className="py-2 border-b border-gray-200">Benutzer 3</li>
              {/* Fügen Sie hier die vollständige Liste der Benutzer hinzu */}
            </ul>
          </section>
  
          <section className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Werkzeugkategorien</h2>
            <ul className="pl-5 mb-4 text-gray-700 list-disc">
              <li className="py-2 border-b border-gray-200">Gartengeräte</li>
              <li className="py-2 border-b border-gray-200">Gartenwerkzeug</li>
              {/* Fügen Sie hier die vollständige Liste der Werkzeugkategorien hinzu */}
            </ul>
            <form className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Neue Kategorie hinzufügen"
              />
              <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Hinzufügen</button>
            </form>
          </section>
        </div>
      </div>
    );
  };
