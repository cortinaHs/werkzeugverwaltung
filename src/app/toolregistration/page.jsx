// "use client"
// import React, { useState } from 'react';

// const ToolManagementPage = () => {
//     const [toolName, setToolName] = useState('');
//     const [category, setCategory] = useState('');
//     const [photo, setPhoto] = useState(null);
//     const [tools, setTools] = useState([]);

//     const handleToolNameChange = (e) => {
//         setToolName(e.target.value);
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handlePhotoChange = (e) => {
//         setPhoto(e.target.files[0]);
//     };

//     const handleRegisterTool = () => {
//         const newTool = {
//             name: toolName,
//             category: category,
//             photo: photo,
//             owner: 'CurrentUser' // Placeholder for the current user, you may replace it with the actual user ID
//         };
//         setTools([...tools, newTool]);
//         // Here you can send the new tool data to your backend for storage
//         // For simplicity, we're just adding it to the local state
//     };

//     return (
//         <div>
//             <h1>Werkzeugverwaltung</h1>
//             <div>
//                 <label htmlFor="toolName">Bezeichnung des Geräts:</label>
//                 <input type="text" id="toolName" value={toolName} onChange={handleToolNameChange} />
//             </div>
//             <div>
//                 <label htmlFor="category">Werkzeugkategorie:</label>
//                 <input type="text" id="category" value={category} onChange={handleCategoryChange} />
//             </div>
//             <div>
//                 <label htmlFor="photo">Foto des Geräts (optional):</label>
//                 <input type="file" id="photo" onChange={handlePhotoChange} />
//             </div>
//             <button onClick={handleRegisterTool}>Gerät registrieren</button>
//             <div>
//                 <h2>Registrierte Geräte:</h2>
//                 <ul>
//                     {tools.map((tool, index) => (
//                         <li key={index}>
//                             <div>{tool.name}</div>
//                             <div>{tool.category}</div>
//                             {tool.photo && <img src={URL.createObjectURL(tool.photo)} alt="Gerätefoto" />}
//                             <div>Besitzer: {tool.owner}</div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default ToolManagementPage;


const GeraetRegistrierungPage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-center">Gerät registrieren</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="bezeichnung" className="block mb-2 text-gray-700">Bezeichnung</label>
              <input
                type="text"
                id="bezeichnung"
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="foto" className="block mb-2 text-gray-700">Foto (optional)</label>
              <input
                type="file"
                id="foto"
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="kategorie" className="block mb-2 text-gray-700">Werkzeugkategorie</label>
              <select
                id="kategorie"
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
                required
              >
                <option value="" className="text-gray-500">Kategorie auswählen</option>
                <option value="Gartengeräte">Gartengeräte</option>
                <option value="Gartenwerkzeug">Gartenwerkzeug</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="besitzer" className="block mb-2 text-gray-700">Besitzer (User)</label>
              <input
                type="text"
                id="besitzer"
                className="w-full p-2 text-gray-900 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Registrieren</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default GeraetRegistrierungPage;
  