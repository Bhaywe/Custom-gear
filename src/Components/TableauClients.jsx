import { useEffect, useState } from 'react';
import { deleteClient, getClients } from '../service/api';
import { NavLink } from 'react-router-dom';

const TableauClients = () => {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        obtenirClients();
    }, [])

    const obtenirClients = async () =>{
        const response = await getClients();
        setClients(response.data);
    }

    const deleteData = async (id) => {
        await deleteClient(id);
        obtenirClients();
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Prenom</th>
                    <th>Nom</th>
                    <th>Courriel</th>
                    <th>Téléphone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {
                clients.map((client) => (
                    <tr>
                        <td>{client.IdClient}</td>
                        <td>{client.Prenom}</td>
                        <td>{client.Nom}</td>
                        <td>{client.Courriel}</td>
                        <td>{client.Telephone}</td>
                        <td>
                        <NavLink to={`/modifier/${client.IdClient}`}> Modifier</NavLink> <br/>
                            <button onClick={() => deleteData(client.IdClient)}>Supprimer</button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default TableauClients;
