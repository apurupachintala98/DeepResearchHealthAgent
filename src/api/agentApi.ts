"use client"
import axios from 'axios';

const agentApi = axios.create({ 
  baseURL: 'http://10.126.192.183:8028/', 
  // baseURL: 'http://10.126.192.183:3000/', 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default agentApi;
