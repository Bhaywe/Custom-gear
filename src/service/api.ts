import axios from 'axios';
import Client from '../models/client';
import('../models/client')

const url = "http://127.0.0.1:3003/client";
var aguid = require('aguid');

export const getClients = async (id: string) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const postClient = async (user: any) => {
    var guid = aguid()
    user.IdClient = guid
    user.id = guid
    return await axios.post(url, user);
}

export const putClient = async (id: string, user: Client) => {
    return await axios.put(`${url}/${id}`,user);
}

export const deleteClient = async (id: string) => {
    return await axios.delete(`${url}/${id}`);
}