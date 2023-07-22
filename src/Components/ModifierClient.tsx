import { useEffect, useState } from 'react';
import { putClient, getClients } from '../service/api';
import { useHistory, useParams } from 'react-router-dom';
import Client from '../models/client';

function ModifierClient() {

    const [client, setUser] = useState<Client>();
    const {id}:any = useParams();

    useEffect(() => {
        const loadUserData = async () =>{
            const response = await getClients(id);
            setUser(response.data);
        }
        loadUserData();
    },[]);
    
    
    const onValueChange = (e:any) =>
    {
        setUser({...client!, [e.target.name]: e.target.value});
    }
    
    const history = useHistory();
    const modifierUserDetails = async () =>{
       await putClient(client!.IdClient, client!);
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
            <button onClick={() => modifierUserDetails()}>Modifier</button>
            <button onClick={() => history.push("/all")}>Cancel</button>
        </div>
    )
}


export default ModifierClient;