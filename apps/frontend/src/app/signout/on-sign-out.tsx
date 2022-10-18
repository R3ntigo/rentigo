import axios from 'axios';

const onSignOut = async () => axios.get('/api/sign-out');
export { onSignOut };
