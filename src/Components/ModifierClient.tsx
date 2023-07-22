import { useEffect, useState } from 'react';
import { putClient, getClients, postVoiture } from '../service/api';
import { useHistory, useParams } from 'react-router-dom';
import Client from '../models/client';
import Voiture from '../models/voiture';
import AjouterVoiture from './AjouterVoiture';

function ModifierClient() {
    const [client, setClient] = useState<Client>();
    const {id}:any = useParams();

    const [ajouterVoiture, setAjouterVoiture] = useState(false);
    const [voiture, setVoiture] = useState<Voiture>();

    var aguid = require('aguid');

    useEffect(() => {
        const loadUserData = async () =>{
            const response = await getClients(id);
            setClient(response.data);
        }
        loadUserData();
    },[]);
    
    const onValueChange = (e:any) =>
    {
        setClient({...client!, [e.target.name]: e.target.value});
    }
    
    const history = useHistory();
    const modifierUserDetails = async () =>{
       await putClient(client!.IdClient, client!);
       history.push('/all');
    }

    const onValueChangeVoiture = (e:any) =>
    {
        setVoiture({...voiture!, [e.target.name]: e.target.value});
    }
    
    const creerDetailsVoiture = async () =>{
        var guid = aguid()
        var ajoutVoiture:Voiture = {...voiture!}
        ajoutVoiture.IdClient = client!.IdClient!
        ajoutVoiture.IdVoiture = guid
        ajoutVoiture.id = guid

        var clientModifier:Client = {...client!}
        clientModifier.Voitures = [...client?.Voitures!, ajoutVoiture!]

        setClient({...client!, Voitures: [...client?.Voitures!, ajoutVoiture!]});
        await putClient(id, clientModifier!);
        fermerFormulaireVoiture()
    }
    
    const ouvrirFormulaireVoiture = () =>{
        setAjouterVoiture(true);
    }

    const fermerFormulaireVoiture = () => {
        setAjouterVoiture(false);
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

            <div>
                {console.log(client?.Voitures)}
            </div>

            <div>
                <p>Ajouter une voiture</p>
                <button onClick={() => ouvrirFormulaireVoiture()}>+</button>
                {ajouterVoiture? 
                    <AjouterVoiture 
                        onValueChangeVoiture={onValueChangeVoiture} 
                        creerDetailsVoiture={creerDetailsVoiture}
                        fermerFormulaireVoiture={fermerFormulaireVoiture}
                        voiture={voiture}/>
                    : <></>}
            </div>


            <button onClick={() => modifierUserDetails()}>Modifier</button>
            <button onClick={() => history.push("/all")}>Cancel</button>
        </div>
    )
}


export default ModifierClient;