import { useHistory } from 'react-router-dom';
import Voiture from '../models/voiture';

interface IListeVoituresProps{
    onValueChangeVoiture: Function
    modifierDetailsVoiture: Function
    voiture: Voiture | undefined | null
}

function ModifierVoiture(props: IListeVoituresProps) {
    const history = useHistory();
    return (
        <div>
            <form>
                <label>
                Marque:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Marque" value={props.voiture?.Marque || ""} /><br/>
                </label>
                <label>
                Modele:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Modele" value={props.voiture?.Modele || ""} /><br/>
                </label>
                <label>
                Annee:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Annee" value={props.voiture?.Annee || ""} /><br/>
                </label>
                <label>
                Historique:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Historique" value={props.voiture?.Historique || ""} /><br/>
                </label>
                <label>
                Reparations:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Reparations" value={props.voiture?.Reparations || ""} /><br/>
                </label>
                <label>
                DateReparation:
                    <input type="date" min={Date.now()} onChange={(e) => props.onValueChangeVoiture(e)} name="DateReparation" value={props.voiture?.DateReparation?.toString() || ""} /><br/>
                </label>
                <label>
                Commentaires:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Commentaires" value={props.voiture?.Commentaires || ""} /><br/>
                </label>
                <label>
                Appointments:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Appointments" value={"a venir"} /><br/>
                </label>
            </form>
            <button onClick={() => props.modifierDetailsVoiture()}>Modifier</button>
            <button onClick={() => history.push("/all")}>Cancel</button>
        </div>
    )
}


export default ModifierVoiture;