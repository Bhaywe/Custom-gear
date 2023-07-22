import axios from 'axios';
import Client from '../models/client';
import('../models/client')

const urlClient = "http://127.0.0.1:3003/clients";
const urlVoiture = "http://127.0.0.1:3003/voitures";
var aguid = require('aguid');

//#region client
export const getClients = async (id: string) => {
    id = id || '';
    return await axios.get(`${urlClient}/${id}`);
}

export const postClient = async (user: any) => {
    var guid = aguid()
    user.IdClient = guid
    user.id = guid
    return await axios.post(urlClient, user);
}

export const putClient = async (id: string, user: Client) => {
    return await axios.put(`${urlClient}/${id}`,user);
}

export const deleteClient = async (id: string) => {
    return await axios.delete(`${urlClient}/${id}`);
}
//#endregion

//#region voiture
export const postVoiture= async (voiture: any, idClient: string) => {
    var guid = aguid()
    voiture.id = guid
    voiture.IdVoiture = guid

    voiture.IdClient = idClient
    return await axios.post(urlVoiture, voiture);
}

export const getVoituresClient= async (voiture: any, idClient: string) => {
    var guid = aguid()
    voiture.id = guid
    voiture.IdVoiture = guid

    voiture.IdClient = idClient
    return await axios.get(urlVoiture, voiture);
}
//#endregion