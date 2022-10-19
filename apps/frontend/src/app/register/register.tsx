import { NIDPhoto } from './nid-photo';
import { ConfirmNID } from './confirm-nid';
import { Portrait } from './portrait';
import { Contact } from './contact';

const Register = () => (
	<>
		<h1>Register</h1>
		<NIDPhoto />
		<ConfirmNID />
		<Portrait />
		<Contact />
	</>
);

export { Register };
