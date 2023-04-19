const api = axios.create({
    baseURL: 'https://api-agenda.cyclic.app/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
  });