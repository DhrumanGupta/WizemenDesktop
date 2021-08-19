import {AiFillHome} from "react-icons/ai";
import {BsFillCameraVideoFill, BsFillPersonFill} from "react-icons/bs";
import Home from "../pages/Home";
import Meetings from "../pages/Meetings";
import Classes from "../pages/Classes";
import Settings from "../pages/Settings";
import {FiSettings} from "react-icons/fi";

export const Routes = [
	{
		title: "Home",
		path: "/home",
		icon: AiFillHome,
		page: Home
	},
	{
		title: "Meetings",
		path: "/meetings",
		icon: BsFillCameraVideoFill,
		page: Meetings
	},
	{
		title: "Classes",
		path: "/classes",
		icon: BsFillPersonFill,
		page: Classes,
		sidebarExact: false
	},
	{
		title: "Settings",
		path: "/settings",
		icon: FiSettings,
		page: Settings,
		notAppExact: true,
		excludeLanding: true
	}
]