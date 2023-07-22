export default interface Appointment{
    id: string
    IdAppointment: string
    IdVoiture: string
    IdClient: string
    Status?: string | undefined
    Date?: string | undefined
    ReparationsPrevu?:string  | undefined
}