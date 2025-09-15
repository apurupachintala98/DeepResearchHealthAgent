"use client"
import axios from 'axios';

const agentApi = axios.create({
  // baseURL: 'http://10.126.192.183:8018', 
  baseURL: 'http://10.126.192.183:8028/', 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default agentApi;
