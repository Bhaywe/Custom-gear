import { useEffect, useState } from 'react';
import { putClient, getClients } from '../service/api';
import { useHistory, useParams } from 'react-router-dom';
import Client from '../models/client';
import Voiture from '../models/voiture';
import AjouterVoiture from './AjouterVoiture';
import ListeVoitures from './ListeVoitures';

function ModifierClient() {
    const [client, setClient] = useState<Client>();
    const {id}:any = useParams();

    const [ajouterVoiture, setAjouterVoiture] = useState(false);
    const [voiture, setVoiture] = useState<Voiture | null>();

    var aguid = require('aguid');

    const history = useHistory();

    useEffect(() => {
        const obtenirClient = async () =>{
            const response = await getClients(id);
            setClient(response.data);
        }
        obtenirClient();
    },[]);

    const modifierUserDetails = async () =>{
        await putClient(client!.IdClient, client!);
        history.push('/all');
    }

    const onValueChange = (e:any) =>
    {
        setClient({...client!, [e.target.name]: e.target.value});
    }

    const onValueChangeVoiture = (e:any) =>
    {
        setVoiture({...voiture!, [e.target.name]: e.target.value});
    }
    
    const creerDetailsVoiture = async () =>{
        var voiture:Voiture = creerVoiture()
        var clientModifier:Client = {...client!}
        clientModifier.Voitures = [...client?.Voitures!, voiture!]

        setClient({...client!, Voitures: [...client?.Voitures!, voiture!]});
        await putClient(id, clientModifier!);
        fermerFormulaireVoiture()
        setVoiture(null);
    }

    const creerVoiture = () =>{
        var guid = aguid()
        var voiture:Voiture = {...voiture!}
        voiture.IdClient = client!.IdClient!
        voiture.IdVoiture = guid
        voiture.id = guid
        return voiture
    }

    const modifierDetailsVoiture = async () =>{
        var voituresAJour:Array<Voiture> = miseAJourVoiture(client)
        var clientModifier: Client = {...client!}
        clientModifier.Voitures = voituresAJour

        setClient(clientModifier);
        await putClient(id, clientModifier!);
        fermerFormulaireVoiture()
    }

    const miseAJourVoiture = (client: Client | undefined) =>{
        var voitureUpdate:Voiture = {...voiture!}
        var client: Client | undefined = {...client!}
        var voitureIndex:number = client?.Voitures!.findIndex(x => x.IdVoiture === voitureUpdate.IdVoiture);
        var copyListeVoitures: Array<Voiture> = {...client?.Voitures!}
        copyListeVoitures[voitureIndex] = voitureUpdate
        return copyListeVoitures
    }

    const supprimerDetailsVoiture = async (idVoiture: string) => {
        const listeVoiture = client?.Voitures!.filter((item) => item.IdVoiture !== idVoiture);
        setClient({...client!, Voitures: listeVoiture});
        await putClient(id, client!);
        setVoiture(null);
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
                    <input type="text" onChange={(e) => onValueChange(e)} name="Prenom" value={client?.Prenom || ""} />
                </label>
                <label>
                Nom:
                    <input type="text" onChange={(e) => onValueChange(e)} name="Nom" value={client?.Nom || ""} />
                </label>
                <label>
                Courriel:
                    <input type="text" onChange={(e) => onValueChange(e)} name="Courriel" value={client?.Courriel || ""} />
                </label>
                <label>
                Téléphone:
                    <input type="text" onChange={(e) => onValueChange(e)} name="Telephone" value={client?.Telephone || ""} />
                </label>
            </form>

            <div>
                <p>Voitures</p>
                <ListeVoitures voiture={voiture} client={client!} setVoiture={setVoiture} supprimerDetailsVoiture={supprimerDetailsVoiture} modifierDetailsVoiture={modifierDetailsVoiture} onValueChangeVoiture={onValueChangeVoiture}/>
            </div>

            <div>
                {/* Transformer en modale */}
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