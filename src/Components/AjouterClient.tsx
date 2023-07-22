import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Client from "../models/client";
import { postClient } from '../service/api';

function AjouterClient() {
    const [client, setUser] = useState<Client>();
    const history = useHistory();

    const onValueChange = (e:any) =>
    {
        setUser({...client!, [e.target.name]: e.target.value});
        console.log(client);
    }

    const creerDetailsClient = async () =>{
       await postClient(client!);
       history.push('/all');
    }

    return (
        <div>
            <form>
                <label>
                Prenom:
                    <input type="text" onChange={(e) => onValueChange(e)} name="Prenom" value={client?.Prenom} />
                </label>
                <label>
                Nom:
                    <input type="text" onChange={(e) => onValueChange(e)} name="Nom" value={client?.Nom} />
                </label>
                <label>
                Courriel:
                    <input type="text" onChange={(e) => onValueChange(e)} name="Courriel" value={client?.Courriel} />
                </label>
                <label>
                Téléphone:
                    <input type="text" onChange={(e) => onValueChange(e)} name="Telephone" value={client?.Telephone} />
                </label>
            </form>
            <button onClick={() => creerDetailsClient()}>Créer</button>
            <button onClick={() => history.push("/all")}>Cancel</button>
        </div>
    )
}

export default AjouterClient;