import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const Portrait = () => {
	const registration = useSelector((state: RootState) => state.registration);
	console.log(registration);
	return (<p>Portrait</p>);
};
