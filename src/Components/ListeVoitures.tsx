
import Client from '../models/client';
import { useState } from 'react';
import ModifierVoiture from './ModifierVoiture';
import Voiture from '../models/voiture';

interface IListeVoituresProps{
    client: Client
    voiture: Voiture | undefined | null
    setModifierVoiture: Function
    supprimerDetailsVoiture: Function
    modifierDetailsVoiture: Function
    fermerFormulaireVoiture: Function
    onValueChangeModifierVoiture: Function
}

function ListeVoitures(props: IListeVoituresProps) {
    const [ouvrirModifierVoiture, setOuvrirModifierVoiture] = useState(false);
 
    const ouvrirFormulaireModifierVoiture = (idVoiture: string) =>{
        var voiture = obtenirVoiture(idVoiture);
        props.setModifierVoiture(voiture);
        setOuvrirModifierVoiture(true)
    }

    function obtenirVoiture(idVoiture: string) {
        return props.client.Voitures!.find((voiture) => {
          return voiture.IdVoiture === idVoiture;
        })
      }

    return (
        <div>
             { ouvrirModifierVoiture? 
             <ModifierVoiture voiture={props.voiture} setOuvrirModifierVoiture={setOuvrirModifierVoiture} modifierDetailsVoiture={props.modifierDetailsVoiture} onValueChangeModifierVoiture={props.onValueChangeModifierVoiture}/>
                :
                props.client?.Voitures?.map((voiture, i) => (
                    <div key={i}>
                        <ul>
                            <li>{voiture.Marque}</li>
                            <li>{voiture.Modele}</li>
                            <li>{voiture.Annee}</li>
                            <li>{voiture.Historique}</li>
                            <li>{voiture.DateReparation}</li>
                            <li>{voiture.Commentaires}</li>
                        </ul>
                        <button onClick={() => ouvrirFormulaireModifierVoiture(voiture.IdVoiture)}>Modifier</button>
                        <button onClick={() => props.supprimerDetailsVoiture(voiture.IdVoiture)}>Supprimer</button>
                    </div>
                ))
            }
        </div>
    )
}


export default ListeVoitures;