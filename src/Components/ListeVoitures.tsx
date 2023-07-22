
import Voiture from '../models/voiture';

interface IListeVoituresProps{
    voitures: Array<Voiture>
}

function ListeVoitures(props: IListeVoituresProps) {
    return (
        <div>
            {/* transformer en array */}
             {
                props.voitures?.map((voiture, i) => (
                    <ul key={i}>
                        <li>{voiture.Marque}</li>
                        <li>{voiture.Modele}</li>
                        <li>{voiture.Annee}</li>
                        <li>{voiture.Historique}</li>
                        <li>{voiture.DateReparation}</li>
                        <li>{voiture.Commentaires}</li>
                    </ul>
                ))
            }
        </div>
    )
}


export default ListeVoitures;