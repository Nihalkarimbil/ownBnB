import React, { useEffect, useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    HomeIcon,
    UserGroupIcon,
    CalendarIcon,
    Cog6ToothIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";


function Sidebar() {


    const [open, setOpen] = useState(0);
    const navigate = useNavigate();
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };



    const handlelogout = () => {
        try {
            localStorage.removeItem("activeUser");
            localStorage.removeItem("userToken");
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>

            <Card className="h-screen max-w-64 p-4 shadow-xl bg-white fixed">
                <div className="mb-4 p-4">
                    <Typography variant="h5" color="blue-gray" className="font-semibold">
                        Admin Panel
                    </Typography>
                </div>
                <List>

                    <Accordion
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                                    }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <HomeIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Listings
                                </Typography>
                            </AccordionHeader>
                        </ListItem>

                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link to={"/Admin-listing"}>
                                    <ListItem >

                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Active Listings
                                    </ListItem>
                                </Link>
                                <Link to={"/Admin-pendinglist"}>
                                    <ListItem >
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Pending Approvals
                                    </ListItem>
                                </Link>
                                <Link to={"/Create-listing"}>
                                    <ListItem >

                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Create New
                                    </ListItem>
                                </Link>

                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 2}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <UserGroupIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Users
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link to={"/Admin-User"}>
                                    <ListItem >
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        All Users
                                    </ListItem>

                                </Link>
                                <Link to={"/Blockedusers"}>
                                    <ListItem >
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Blocked Users
                                    </ListItem>
                                </Link>


                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 3} icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mr-3 h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                            />
                        }>
                        <ListItem className="p-0" selected={open === 3}>
                            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 ">
                                <ListItemPrefix color="blue-gray" className=" font-normal">
                                    <CalendarIcon className="h-5 w-5 ml-3" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Reservations
                                </Typography>
                            </AccordionHeader>

                        </ListItem>
                        <AccordionBody className="py-1">
                            <List>
                                <Link to={"/Admin-Reservation"}>
                                    <ListItem >
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        All Reservations
                                    </ListItem>
                                </Link>
                                <Link to={"/pendingreserv"}>
                                    <ListItem >
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Pending Reservations
                                    </ListItem>
                                </Link>

                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 4}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 4}>
                            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <Cog6ToothIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Hosts
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link to={"/Admin-hosts"}>
                                    <ListItem >
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        All Hosts
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <ListItem onClick={() => handlelogout()}>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>

        </>

    );
}

export default Sidebar;