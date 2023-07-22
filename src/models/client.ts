import Appointment  from "./appointment";
import Voiture from "./voiture";

export default interface Client{
    id: string
    IdClient: string
    Nom?: string | undefined
    Prenom?: string | undefined
    Courriel?: string | undefined
    Telephone?: string | undefined
    Appointments?: Array<Appointment> | undefined
    Voitures?: Array<Voiture> | undefined
}