import { useEffect, useState } from 'react';
import { putClient, getClients } from '../service/api';
import { useHistory, useParams } from 'react-router-dom';
import Client from '../models/client';
import Voiture from '../models/voiture';
import AjouterVoiture from './FormulaireAjouterVoiture';
import ListeVoitures from './ListeVoitures';
import FormulaireAjouterVoiture from './FormulaireAjouterVoiture';

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
    const [estFormulaireCreerVoitureOuvert, setEstFormulaireCreerVoitureOuvert] = useState(false);
    const [client, setClient] = useState<Client>(initialeClient);
    const [nouvelleVoiture, setNouvelleVoiture] = useState<Voiture>(initialeVoiture);
    const [modifierVoiture, setModifierVoiture] = useState<Voiture>(initialeVoiture);

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

    const onValueChangeModifierClient = (e:any) =>
    {
        setClient({...client!, [e.target.name]: e.target.value});
    }

    const onValueChangeNouvelleVoiture = (e:any) =>
    {
        setNouvelleVoiture({...nouvelleVoiture!, [e.target.name]: e.target.value});
    }

    const onValueChangeModifierVoiture = (e:any) =>
    {
        setModifierVoiture({...modifierVoiture!, [e.target.name]: e.target.value});
    }
    
    const ajouterVoiture = async () =>{
        var clientModifier:Client = {...client!}
        var voiture:Voiture = creerVoiture();
        clientModifier.Voitures! = [...clientModifier?.Voitures!, voiture!];

        setClient({...client!, Voitures: clientModifier.Voitures});
        await putClient(id, clientModifier!);
        fermerFormulaireCreationVoiture()
        setNouvelleVoiture(initialeVoiture)
    }

    const creerVoiture = () =>{
        var guid = aguid()
        return {
            id: guid,
            IdVoiture: guid,
            IdClient: client!.IdClient!,
            Modele: nouvelleVoiture!.Modele,
            Marque: nouvelleVoiture?.Marque,
            Annee: nouvelleVoiture?.Annee,
            Historique: nouvelleVoiture?.Historique,
            Reparations: nouvelleVoiture?.Reparations,
            DateReparation: nouvelleVoiture?.DateReparation,
            Commentaires: nouvelleVoiture?.Commentaires,
            Appointments: []
        }
    }

    const modifierDetailsVoiture = async () =>{
        var clientAModifier: Client = {...client!}
        var voitures = miseAJourDetailsVoiture(clientAModifier)
        clientAModifier.Voitures = voitures

        setClient({...client!, Voitures: voitures});
        await putClient(id, clientAModifier!);
        fermerFormulaireCreationVoiture()
    }

    const miseAJourDetailsVoiture = (client: Client | undefined) =>{
        var voitureUpdate:Voiture = {...modifierVoiture!}
        var voitures = client?.Voitures!;
        var voitureIndex = voitures!.findIndex(x => x.IdVoiture == modifierVoiture.IdVoiture);
        voitures[voitureIndex] = voitureUpdate
        return voitures
    }

    const supprimerDetailsVoiture = async (idVoiture: string) => {
        var clientUpdtate = {...client}
        clientUpdtate.Voitures = clientUpdtate?.Voitures!.filter((item) => item.IdVoiture !== idVoiture);
        setClient({...clientUpdtate!, Voitures: clientUpdtate.Voitures});
        await putClient(id, clientUpdtate!);
      }
    
    const ouvrirFormulaireCreationVoiture = () =>{
        setNouvelleVoiture(initialeVoiture)
        setEstFormulaireCreerVoitureOuvert(true);
    }

    const fermerFormulaireCreationVoiture = () => {
        setEstFormulaireCreerVoitureOuvert(false);
    }

    return (
        <div>
            <form>
                <label>
                Prenom:
                    <input type="text" onChange={(e) => onValueChangeModifierClient(e)} name="Prenom" value={client?.Prenom || ""} />
                </label>
                <label>
                Nom:
                    <input type="text" onChange={(e) => onValueChangeModifierClient(e)} name="Nom" value={client?.Nom || ""} />
                </label>
                <label>
                Courriel:
                    <input type="text" onChange={(e) => onValueChangeModifierClient(e)} name="Courriel" value={client?.Courriel || ""} />
                </label>
                <label>
                Téléphone:
                    <input type="text" onChange={(e) => onValueChangeModifierClient(e)} name="Telephone" value={client?.Telephone || ""} />
                </label>
            </form>

            <div>
                <p>Voitures</p>
                <ListeVoitures voiture={modifierVoiture} client={client!} setModifierVoiture={setModifierVoiture} fermerFormulaireVoiture={fermerFormulaireCreationVoiture} supprimerDetailsVoiture={supprimerDetailsVoiture} modifierDetailsVoiture={modifierDetailsVoiture} onValueChangeModifierVoiture={onValueChangeModifierVoiture}/>
            </div>

            <div>
                {/* Transformer en modale */}
                <p>Ajouter une voiture</p>
                <button onClick={() => ouvrirFormulaireCreationVoiture()}>+</button>
                {estFormulaireCreerVoitureOuvert? 
                    <FormulaireAjouterVoiture 
                        onValueChangeNouvelleVoiture={onValueChangeNouvelleVoiture} 
                        ajouterVoiture={ajouterVoiture}
                        fermerFormulaireCreationVoiture={fermerFormulaireCreationVoiture}
                        voiture={nouvelleVoiture}/>
                    : <></>}
            </div>
            <button onClick={() => modifierUserDetails()}>Modifier</button>
            <button onClick={() => history.push("/all")}>Cancel</button>
        </div>
    )
}


export default ModifierClient;