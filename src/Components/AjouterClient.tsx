import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Client from "../models/client";
import { postClient } from '../service/api';

function AjouterClient() {
    const [client, setClient] = useState<Client>();

    const history = useHistory();
    var aguid = require('aguid');

    const onValueChangeClient = (e:any) =>
    {
        setClient({...client!, [e.target.name]: e.target.value});
    }

    const creerDetailsClient = async () =>{
        var guid = aguid()
        setClient({...client!, IdClient: guid, id: guid});
        await postClient(client!);
        history.push(`/modifier/${client!.IdClient}`);
    }

    return (
        <div>
            <form>
                <label>
                Prenom:
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Prenom" value={client?.Prenom} /><br/>
                </label>
                <label>
                Nom:
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Nom" value={client?.Nom} /><br/>
                </label>
                <label>
                Courriel:
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Courriel" value={client?.Courriel} /><br/>
                </label>
                <label>
                Téléphone:
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Telephone" value={client?.Telephone} /><br/>
                </label>
            </form>
            <button onClick={() => creerDetailsClient()}>Ajouter</button>
            <button onClick={() => history.push("/all")}>Cancel</button>
        </div>
    )
}

export default AjouterClient;