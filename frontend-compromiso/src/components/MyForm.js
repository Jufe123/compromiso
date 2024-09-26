// frontend-compromiso/src/components/MyForm.js
import  { useState, useEffect } from 'react';
import { fetchData } from '../api';

const MyForm = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getData();
  }, []);

  return (
    <form>
      {/* Tu formulario aquí */}
    </form>
  );
};

export default MyForm;
