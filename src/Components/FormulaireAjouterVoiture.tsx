import Voiture from "../models/voiture";

interface IFormulaireAjouterVoiture{
    onValueChangeNouvelleVoiture: Function
    ajouterVoiture: Function
    fermerFormulaireCreationVoiture: Function
    voiture: Voiture | undefined | null
}

function FormulaireAjouterVoiture(props: IFormulaireAjouterVoiture) {
    return (
        <div>
            <form>
                <label>
                Marque:
                    <input type="text" onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="Marque" value={props.voiture?.Marque || ""} /><br/>
                </label>
                <label>
                Modele:
                    <input type="text" onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="Modele" value={props.voiture?.Modele || ""} /><br/>
                </label>
                <label>
                Annee:
                    <input type="text" onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="Annee" value={props.voiture?.Annee || ""} /><br/>
                </label>
                <label>
                Historique:
                    <input type="text" onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="Historique" value={props.voiture?.Historique || ""} /><br/>
                </label>
                <label>
                Reparations:
                    <input type="text" onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="Reparations" value={props.voiture?.Reparations || ""} /><br/>
                </label>
                <label>
                DateReparation:
                    <input type="date" min={Date.now()} onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="DateReparation" value={props.voiture?.DateReparation?.toString() || ""} /><br/>
                </label>
                <label>
                Commentaires:
                    <input type="text" onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="Commentaires" value={props.voiture?.Commentaires || ""} /><br/>
                </label>
                <label>
                Appointments:
                    <input type="text" onChange={(e) => props.onValueChangeNouvelleVoiture(e)} name="Appointments" value={"a venir"} /><br/>
                </label>
            </form>
            <button onClick={() => props.ajouterVoiture()}>Créer</button>
            <button onClick={() => props.fermerFormulaireCreationVoiture()}>Cancel</button>
        </div>
    )
}

export default FormulaireAjouterVoiture;