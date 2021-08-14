import {AiFillHome} from "react-icons/ai";
import {BsFillCameraVideoFill, BsFillPersonFill} from "react-icons/bs";

export const NavMenuData = [
	{
		title: "Home",
		path: "/",
		icon: <AiFillHome/>,
	},
	{
		title: "Meetings",
		path: "/meetings",
		icon: <BsFillCameraVideoFill/>,
	},
	{
		title: "Classes",
		path: "/classes",
		icon: <BsFillPersonFill/>,
	}
]