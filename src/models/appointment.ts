export default interface Appointment{
    IdAppointment: string
    IdVoiture: string;
    IdClient: string
    Status?: string | undefined
    Date?: string | undefined
    ReparationsPrevu?:string  | undefined
}