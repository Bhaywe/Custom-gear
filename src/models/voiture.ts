import Appointment  from "./appointment";

export default interface Voiture{
    IdVoiture: string
    IdClient: string
    Modele?: string | undefined
    Marque?: string | undefined
    Annee?: string | undefined
    Telephone?: string | undefined
    Historique?: string | undefined
    Reparations?: string | undefined
    DateReparation?: Date | undefined
    Commentaires?: string | undefined
    Appointments?: Array<Appointment> | undefined
}