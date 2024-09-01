import { useState } from "react";

const FormQueryProcedure = ({ procedureQuery, setProcedureQuery }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      const result = procedureQuery.filter(p => p.Nom_Procedimiento.toLowerCase().includes(search.toLowerCase()));
      setProcedureQuery(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-800"
      >
        Buscar
      </button>
    </form>
  );
};

export default FormQueryProcedure;
