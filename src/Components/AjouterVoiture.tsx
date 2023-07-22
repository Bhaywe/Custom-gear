import { NavLink } from "react-router-dom";
import Voiture from "../models/voiture";

interface IAjouterVoitureProps{
    onValueChangeVoiture: Function
    creerDetailsVoiture: Function
    fermerFormulaireVoiture: Function
    voiture: Voiture | undefined
}

function AjouterVoiture(props: IAjouterVoitureProps) {
    return (
        <div>
            <form>
                <label>
                Marque:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Marque" value={props.voiture?.Marque} /><br/>
                </label>
                <label>
                Modele:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Modele" value={props.voiture?.Modele} /><br/>
                </label>
                <label>
                Annee:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Annee" value={props.voiture?.Annee} /><br/>
                </label>
                <label>
                Historique:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Historique" value={props.voiture?.Historique} /><br/>
                </label>
                <label>
                Reparations:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Reparations" value={props.voiture?.Reparations} /><br/>
                </label>
                <label>
                DateReparation:
                    <input type="date" min={Date.now()} onChange={(e) => props.onValueChangeVoiture(e)} name="DateReparation" value={props.voiture?.DateReparation?.toString()} /><br/>
                </label>
                <label>
                Commentaires:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Commentaires" value={props.voiture?.Commentaires} /><br/>
                </label>
                <label>
                Appointments:
                    <input type="text" onChange={(e) => props.onValueChangeVoiture(e)} name="Appointments" value={"a venir"} /><br/>
                </label>
            </form>
            <button onClick={() => props.creerDetailsVoiture()}>Créer</button>
            <button onClick={() => props.fermerFormulaireVoiture()}>Cancel</button>
        </div>
    )
}

export default AjouterVoiture;