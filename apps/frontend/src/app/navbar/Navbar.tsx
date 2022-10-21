import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { ReactElement } from 'react';

const SideBar = () => (
	<div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg"
	>

		<SideBarIcon icon={<FaFire size="28" />} />
		<Divider />
		<SideBarIcon icon={<BsPlus size="32" />} />
		<SideBarIcon icon={<BsFillLightningFill size="20" />} />
		<SideBarIcon icon={<FaPoo size="20" />} />
		<Divider />
		<SideBarIcon icon={<BsGearFill size="22" />} />
	</div>
);

interface SideBarIconProps {
	icon : ReactElement,
	text ? : string

}
const SideBarIcon = ({ icon, text }: SideBarIconProps) => (
	<div className="sidebar-icon group">
		{icon}
		<span className="sidebar-tooltip group-hover:scale-100">
			{text}
		</span>
	</div>
);
SideBarIcon.defaultProps = {
	text: 'tooltip 💡'
};
const Divider = () => <hr className="sidebar-hr" />;

export { SideBar };
