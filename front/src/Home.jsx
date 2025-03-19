import React, { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateMessage, setUpdateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [country, setCountry] = useState('');
    const [countryfind, setCountryfind] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5100/get_data',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'  
                }); // Reemplaza con la URL de tu API
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        try {
          const response = fetch('http://localhost:5100/update_data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'  
          });
          if (!response.ok) {
            setUpdateMessage('Error en la petición');
          }

          setUpdateMessage('Datos actualizados');
          
        } catch (error) {
          setUpdateMessage(error.message);
        }

        
        window.location.href = '/';
    };

    const handleClickEliminar = (country) => {
       const response = fetch('http://localhost:5100/delete_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country: country }),
        credentials: 'include'  
      });
      
      if (!response.ok) {
        setDeleteMessage('Error en la petición');
      }

      setDeleteMessage('Datos eliminados');
      window.location.reload();

    };

    const handleClickfind = async(e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5100/get_data_country', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ country: country }),
            credentials: 'include'  
          });
          if (!response.ok) {
            const errorData = await response.json();
            setDeleteMessage(errorData.message || 'País no encontrado');
            setCountryfind([]); // Limpiar resultados previos
            return;
          }
          const result = await response.json();
          setCountryfind(result);
          console.log(countryfind);

        }
        catch (error) {
          setDeleteMessage(error.message);
          setCountryfind([]);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Estadísticas de Países</h1>
            <button onClick={() => handleClick()}>update data</button>
            {updateMessage && <p>{updateMessage}</p>}
            {deleteMessage && <p>{deleteMessage}</p>}
            <form onSubmit={(e) => handleClickfind(e)}>
                <input type="text" value = {country} onChange={(e) => setCountry(e.target.value)} placeholder="Buscar País" />
                <button type="submit">Buscar</button>
            </form>
            { countryfind && countryfind.map((country, index) => (
                <div key={index}>
                    <p>País: {country.country}</p>
                    <p>Población: {country.population}</p>
                    <p>Casos: {country.cases}</p>
                    <p>Muertos: {country.deaths}</p>
                    <p>Recuperados: {country.recovered}</p>
                </div>
            ))}
            <table>
                <thead>
                    <tr>
                        <th>País</th>
                        <th>Población</th>
                        <th>Casos</th>
                        <th>Muertos</th>
                        <th>Recuperados</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((country, index) => (
                        <tr key={index}>
                            <td>{country.country}</td>
                            <td>{country.population !== null ? country.population : 'N/A'}</td>
                            <td>{country.cases !== null ? country.cases : 'N/A'}</td>
                            <td>{country.deaths !== null ? country.deaths : 'N/A'}</td>
                            <td>{country.recovered !== null ? country.recovered : 'N/A'}</td>
                            <td><button onClick={(e) => handleClickEliminar(country.country)}>X</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
