import Appointment  from "./appointment";

export default interface Voiture{
    id: string
    IdVoiture: string
    IdClient: string
    Modele?: string
    Marque?: string
    Annee?: string
    Historique?: string
    Reparations?: string
    DateReparation?: Date | undefined
    Commentaires?: string
    Appointments?: Array<Appointment>
}