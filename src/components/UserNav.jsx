import React, { useEffect, useState, useRef } from 'react';
import Avatar from '../components/Avtar';
import { useAuthStore } from '../store/authStore';
import equipmentStore from '../store/equipStore';
import { IoNotificationsCircleSharp } from "react-icons/io5";

const UserNav = () => {

    const { allUsers, getAllUsers, user ,logout} = useAuthStore();
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        getAllUsers();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const permissionpending = allUsers.filter(u => u.permission === "pending").length;
    const pendingEquipments = equipmentStore.state.equipmentList.filter(e => e.status === "pending").length;

    return (
        <nav className="fixed top-0 right-4 w-full sm:w-2/3 lg:w-4/5 bg-gray-800/80 backdrop-blur-md py-2 px-8 shadow-xl border-b border-gray-700 z-50 rounded-b-xl">

            <div className="flex justify-between items-center text-white">

                <h1 className="text-lg sm:text-xl font-bold">
                    Hi {user.firstName}, Welcome to {user.role} Panel
                </h1>

                {/* Right Side */}
                <div className="flex justify-end items-center space-x-6">

                    {/* Notification Button */}
                    <button 
                        className={`relative p-2 rounded-full hover:bg-gray-700/70 
                        ${permissionpending > 0 || pendingEquipments > 0 ? 'animate-pulse' : 'hover:scale-110'}`}
                        title="Notifications"
                    >
                        <IoNotificationsCircleSharp size={30}/>
                        {(permissionpending > 0 || pendingEquipments > 0) && (
                            <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-gray-800 bg-red-500"></span>
                        )}
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative right-0" ref={menuRef}>
                        <button 
                            className="flex items-center space-x-2 p-1 pl-2 rounded-full hover:bg-gray-700/70 group "
                            onClick={() => setOpenMenu(prev => !prev)}
                        >
                            <Avatar
                                fname={user.firstName}
                                lname={user.lastName}
                                size={35}
                            />
                            <span className="hidden sm:inline text-sm font-semibold group-hover:text-blue-300">
                                {user.role}
                            </span>
                            <span className="hidden sm:inline text-xs ml-1 group-hover:rotate-180 transition-transform">
                                ▼
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {openMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700 py-2 animate-fadeIn">
                                <p className="px-4 py-1 text-sm text-gray-300">{user.firstName} {user.lastName}</p>
                                <p className="px-4 pb-2 text-xs text-gray-400">{user.role}</p>
                                <hr className="border-gray-700" />

                                <button 
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 hover:bg-red-600/40 transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default UserNav;
