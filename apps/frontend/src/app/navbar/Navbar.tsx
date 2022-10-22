import { ReactElement } from 'react';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

const SideBar = () => {
	const classes = 33;
	// discord inspired sidebar
	return (
		<div className="flex">
			<div
				className="fixed top-0 left-0 h-screen
					w-16 m-0 flex flex-col bg-slate-500 text-yellow-500 shadow-lg"
			>
				<SideBarIcon icon={<BsPlus size="28" />} text="Home" />
				<SideBarIcon icon={<BsFillLightningFill size="28" />} text="Upload" />
				<SideBarIcon icon={<FaFire size="28" />} text="show" />
				<SideBarIcon icon={<FaPoo size="28" />} text="sign in" />
				<SideBarIcon icon={<BsGearFill size="28" />} text="Settings" />
			</div>
		</div>
	);
};
interface SideBarIconProps {
	icon : ReactElement,
	text ? : string

}
const SideBarIcon = ({ icon, text }: SideBarIconProps) => {
	const ll = 0;
	// <Link to="/">Home</Link>
	// 		<Link to="/upload">Product Upload</Link>
	// 		<Link to="/show">Product Show</Link>
	// 		<Link to="/sign-in">Sign In</Link>
	// creating a finction to navigate to the pages when clicked using the text params
	const navigator = () => {
		switch (text) {
		case 'Home':
			return window.location.href = '/';
		case 'Upload':
			return window.location.href = '/upload';
		case 'show':
			return window.location.href = '/show';
		case 'sign in':
			return window.location.href = '/sign-in2';
		default:
			return '/';
		}
	};
	return (
		// eslint-disable-next-line react/button-has-type
		<button onClick={(e) => { navigator(); }} className="sidebar-icon group">
			{icon}
			<span className="sidebar-tooltip group-hover:scale-100">
				{text}
			</span>
		</button>
	);
};
// className="sidebar-icon group"
SideBarIcon.defaultProps = {
	text: 'tooltip 💡'
};

export { SideBar };
