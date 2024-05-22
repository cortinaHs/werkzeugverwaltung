const GeraetPage = () => {
    const geraete = [
      {
        id: 1,
        bezeichnung: "John Deere Aufsitz-Rasenmäher",
        beschreibung: "Ein leistungsstarker Aufsitz-Rasenmäher für große Gärten.",
        preis: 20,
        bild: "https://cdn.pixabay.com/photo/2018/05/26/18/16/john-deere-3431937_1280.jpg",
      },
      {
        id: 2,
        bezeichnung: "Stihl Benzin-Kettensäge",
        beschreibung: "Ideal zum Schneiden und Fällen von Bäumen.",
        preis: 15,
        bild: "https://cdn.pixabay.com/photo/2014/09/03/11/57/chainsaw-434326_1280.jpg",
      },
      {
        id: 3,
        bezeichnung: "Einhell Benzin-Rasenmäher",
        beschreibung: "Perfekt für mittelgroße bis große Gärten.",
        preis: 10,
        bild: "https://cdn.pixabay.com/photo/2016/08/14/20/06/lawn-mower-1593898_1280.jpg",
      },
    ];
  
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Verfügbare Geräte</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {geraete.map((geraet) => (
              <div key={geraet.id} className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src={geraet.bild} 
                  alt={geraet.bezeichnung} 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold mb-2 text-gray-900">{geraet.bezeichnung}</h2>
                <p className="text-gray-700 mb-4">{geraet.beschreibung}</p>
                <p className="text-lg font-semibold text-gray-900 mb-2">Preis pro Stunde: €{geraet.preis}</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Jetzt mieten</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default GeraetPage;
  