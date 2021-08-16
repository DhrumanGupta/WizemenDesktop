import {AiFillHome} from "react-icons/ai";
import {BsFillCameraVideoFill, BsFillPersonFill} from "react-icons/bs";
import Home from "../pages/Home";
import Meetings from "../pages/Meetings";
import Classes from "../pages/Classes";

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
	}
]