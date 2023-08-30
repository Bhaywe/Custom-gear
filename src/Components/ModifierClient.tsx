import { useEffect, useState } from 'react';
import { putClient, getClients } from '../service/api';
import { useHistory, useParams } from 'react-router-dom';
import Client from '../models/client';
import Voiture from '../models/voiture';
import AjouterVoiture from './AjouterVoiture';
import ListeVoitures from './ListeVoitures';

var initialeClient: Client = {
    id: "",
    IdClient: "",
    Nom: "",
    Prenom: "",
    Courriel: "",
    Telephone: "",
    Appointments: [],
    Voitures: []
}

var initialeVoiture: Voiture = {
    id: "",
    IdVoiture: "",
    IdClient: "",
    Modele: "",
    Marque: "",
    Annee: "",
    Historique: "",
    Reparations: "",
    Commentaires: "",
}

function ModifierClient() {
    const {id}:any = useParams()
    const [ajouterVoiture, setAjouterVoiture] = useState(false);
    const [client, setClient] = useState<Client>(initialeClient);
    const [voiture, setVoiture] = useState<Voiture>(initialeVoiture);

    var aguid = require('aguid');

    const history = useHistory();

    useEffect(() => {
        const obtenirClient = async () =>{
            const response = await getClients(id);
            setClient(response.data);
        }
        obtenirClient();
    },[id]);

    const modifierUserDetails = async () =>{
        await putClient(client!.IdClient, client!);
        history.push('/all');
    }

    const onValueChangeClient = (e:any) =>
    {
        setClient({...client!, [e.target.name]: e.target.value});
    }

    const onValueChangeVoiture = (e:any) =>
    {
        setVoiture({...voiture!, [e.target.name]: e.target.value});
    }
    
    const creerDetailsVoiture = async () =>{
        var clientModifier:Client = {...client!}
        var voiture:Voiture = creerVoiture()
        clientModifier.Voitures! = [...clientModifier?.Voitures!, voiture!];

        setClient({...client!, Voitures: clientModifier.Voitures});
        await putClient(id, clientModifier!);
        setVoiture(initialeVoiture)
        fermerFormulaireVoiture()
    }

    const creerVoiture = () =>{
        var guid = aguid()
        var nouvelleVoiture:Voiture = {
            id: guid,
            IdVoiture: guid,
            IdClient: client!.IdClient!,
            Modele: voiture!.Modele,
            Marque: voiture?.Marque,
            Annee: voiture?.Annee,
            Historique: voiture?.Historique,
            Reparations: voiture?.Reparations,
            DateReparation: voiture?.DateReparation,
            Commentaires: voiture?.Commentaires,
            Appointments: []
        }
        return nouvelleVoiture
    }

    const modifierDetailsVoiture = async () =>{
        var clientAModifier: Client = {...client!}
        var listeVoitureMiseAJour = miseAJourVoiture(clientAModifier)

        setClient({...client!, Voitures: listeVoitureMiseAJour!.Voitures!});
        await putClient(id, listeVoitureMiseAJour!);
        fermerFormulaireVoiture()
        setVoiture(initialeVoiture)
    }

    const miseAJourVoiture = (client: Client | undefined) =>{
        var voitureUpdate:Voiture = {...voiture!}
        var clientUpdate = client;

        clientUpdate!.Voitures!.forEach((voiture: Voiture) => {
            if(voiture.IdVoiture === voitureUpdate.IdVoiture){
                voiture = voitureUpdate
                
            }
        });
        console.log(clientUpdate?.Voitures)
        return clientUpdate
    }

    const supprimerDetailsVoiture = async (idVoiture: string) => {
        var clientUpdtate = {...client}
        clientUpdtate.Voitures = clientUpdtate?.Voitures!.filter((item) => item.IdVoiture !== idVoiture);
        setClient({...clientUpdtate!, Voitures: clientUpdtate.Voitures});
        await putClient(id, clientUpdtate!);
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
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Prenom" value={client?.Prenom || ""} />
                </label>
                <label>
                Nom:
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Nom" value={client?.Nom || ""} />
                </label>
                <label>
                Courriel:
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Courriel" value={client?.Courriel || ""} />
                </label>
                <label>
                Téléphone:
                    <input type="text" onChange={(e) => onValueChangeClient(e)} name="Telephone" value={client?.Telephone || ""} />
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