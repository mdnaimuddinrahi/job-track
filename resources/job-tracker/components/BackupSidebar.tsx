// "use client";
// import { useState, useRef } from "react";
// import Link from "next/link";
// import {
//   Home,
//   Users,
//   BarChart2,
//   Settings,
//   Receipt,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { animate } from "@motionone/dom";

// type SubItem = { href: string; label: string };
// type MenuItem = {
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
//   subItems?: SubItem[];
//   href?: string;
// };

// const Sidebar: React.FC = () => {
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
//   const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   const toggleMenu = (label: string) => {
//     const submenu = submenuRefs.current[label];
//     if (!submenu) return;

//     const isOpen = openMenus[label];
//     setOpenMenus((prev) => ({ ...prev, [label]: !isOpen }));

//     if (!isOpen) {
//     //   animate(
//     //     submenu,
//     //     { height: [0, submenu.scrollHeight], opacity: [0, 1] },
//     //     { duration: 300, easing: "ease-in-out" }
//     //   );
//     animate(
//         submenu,
//         { height: [`${submenu.scrollHeight}px`, "0px"], opacity: [1, 0] },
//         { duration: 300, easing: "ease-in-out" }
//     );
    
//     } else {
//     //   animate(
//     //     submenu,
//     //     { height: [submenu.scrollHeight, 0], opacity: [1, 0] },
//     //     { duration: 300, easing: "ease-in-out" }
//     //   );
//     animate(
//         submenu,
//         { height: [`0px`, `${submenu.scrollHeight}px`], opacity: [0, 1] },
//         { duration: 300, easing: "ease-in-out" }
//     );
//     }
//   };

//   const nav: MenuItem[] = [
//     { label: "Dashboard", icon: Home, href: "/" },
//     {
//       label: "Users",
//       icon: Users,
//       subItems: [
//         { href: "/users/list", label: "User List" },
//         { href: "/users/add", label: "Add User" },
//         { href: "/users/roles", label: "Roles" },
//       ],
//     },
//     {
//       label: "Analytics",
//       icon: BarChart2,
//       subItems: [
//         { href: "/analytics/sales", label: "Sales" },
//         { href: "/analytics/traffic", label: "Traffic" },
//         { href: "/analytics/reports", label: "Reports" },
//       ],
//     },
//     {
//       label: "Settings",
//       icon: Settings,
//       subItems: [
//         { href: "/settings/profile", label: "Profile" },
//         { href: "/settings/security", label: "Security" },
//         { href: "/settings/notifications", label: "Notifications" },
//       ],
//     },
//     { label: "Reports", icon: Receipt, href: "/reports" },
//   ];

//   return (
//     <aside className="w-64 bg-white text-gray-700 flex flex-col h-screen">
//       <div className="p-6 text-2xl font-bold border-b border-gray-200">Admin</div>
//       <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
//         {nav.map((item) => (
//           <div key={item.label}>
//             {item.subItems ? (
//               <>
//                 <button
//                   onClick={() => toggleMenu(item.label)}
//                   className="w-full flex items-center justify-between gap-3 p-2 rounded hover:bg-gray-100 transition"
//                 >
//                   <div className="flex items-center gap-3">
//                     <item.icon className="h-5 w-5" />
//                     <span>{item.label}</span>
//                   </div>
//                   {openMenus[item.label] ? (
//                     <ChevronUp className="h-4 w-4 transition-transform" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4 transition-transform" />
//                   )}
//                 </button>

//                 <div
//                   ref={(el) => (submenuRefs.current[item.label] = el)}
//                   className="overflow-hidden h-0 opacity-0 ml-8 mt-1 space-y-1"
//                 >
//                   {item.subItems.map((sub) => (
//                     <Link
//                       key={sub.href}
//                       href={sub.href}
//                       className="block p-2 rounded hover:bg-gray-200 transition"
//                     >
//                       {sub.label}
//                     </Link>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <Link
//                 href={item.href!}
//                 className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
//               >
//                 <item.icon className="h-5 w-5" />
//                 <span>{item.label}</span>
//               </Link>
//             )}
//           </div>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;



// "use client"
// import { useState, useRef } from "react";
// import Link from "next/link";
// import {
//   Users,
//   Settings,
//   ChevronDown,
//   ChevronUp,
//   BarChart2,
//     Home,
//     Receipt,
// } from "lucide-react";
// import { animate, spring } from "@motionone/dom";

// type SubItem = { href: string; label: string };

// const Sidebar: React.FC = () => {
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
//   const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   const toggleMenu = (label: string) => {
//     const submenu = submenuRefs.current[label];
//     if (!submenu) return;

//     const isOpen = openMenus[label];
//     setOpenMenus((prev) => ({ ...prev, [label]: !isOpen }));

//     if (isOpen) {
//         animate(
//         submenu,
//         {
//           height: [`${submenu.scrollHeight}px`, "0px"],
//           opacity: [1, 0],
//         },
//         { duration: 0.5, easing: "ease-in" }
//       );
//       // Expand with spring/bounce effect
//     } else {
//       // Collapse
//       animate(
//         submenu,
//         {
//             height: [
//             "0px",
//             `${submenu.scrollHeight + 10}px`, // overshoot
//             `${submenu.scrollHeight}px`,       // settle
//             ],
//             opacity: [0, 0.8, 1],
//         },
//         {
//             duration: 0.5,
//             easing: "ease-out", // standard easing
//         }
//         );
//     }
//   };

//   const usersSubItems: SubItem[] = [
//     { href: "/users/list", label: "User List" },
//     { href: "/users/add", label: "Add User" },
//     { href: "/users/roles", label: "Roles" },
//   ];

//   const settingsSubItems: SubItem[] = [
//     { href: "/settings/profile", label: "Profile" },
//     { href: "/settings/security", label: "Security" },
//     { href: "/settings/notifications", label: "Notifications" },
//   ];
//   const analyticsSubItems: SubItem[] = [
//     { href: "/analytics/overview", label: "Overview" },
//     { href: "/analytics/reports", label: "Reports" },
//     { href: "/analytics/settings", label: "Settings" },
//   ];
//   const dashboardSubItems: SubItem[] = [
//     { href: "/dashboard/summary", label: "Summary" },
//     { href: "/dashboard/stats", label: "Stats" },
//     { href: "/dashboard/activities", label: "Activities" },
//   ];
//   const reportsSubItems: SubItem[] = [
//     { href: "/reports/daily", label: "Daily" },
//     { href: "/reports/weekly", label: "Weekly" },
//     { href: "/reports/monthly", label: "Monthly" },
//   ];

//   return (
//     <aside className="w-64 bg-white text-gray-700 flex flex-col h-screen">
//       <div className="p-6 text-2xl font-bold border-b border-gray-200">Admin</div>
//       <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
//         {/* Users Menu */}
//         <div>
//           <button
//             onClick={() => toggleMenu("users")}
//             className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 transition"
//           >
//             <div className="flex items-center gap-3">
//               <Users className="h-5 w-5" />
//               <span>Users</span>
//             </div>
//             {openMenus["users"] ? (
//               <ChevronUp className="h-4 w-4 transition-transform" />
//             ) : (
//               <ChevronDown className="h-4 w-4 transition-transform" />
//             )}
//           </button>

//           <div
//             ref={(el) => (submenuRefs.current["users"] = el)}
//             style={{ height: "0px", overflow: "hidden", opacity: 0 }}
//             className="ml-8 mt-1 space-y-1"
//           >
//             {usersSubItems.map((sub) => (
//               <Link
//                 key={sub.href}
//                 href={sub.href}
//                 className="block p-2 rounded hover:bg-gray-200 transition"
//               >
//                 {sub.label}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Settings Menu */}
//         <div>
//           <button
//             onClick={() => toggleMenu("settings")}
//             className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 transition"
//           >
//             <div className="flex items-center gap-3">
//               <Settings className="h-5 w-5" />
//               <span>Settings</span>
//             </div>
//             {openMenus["settings"] ? (
//               <ChevronUp className="h-4 w-4 transition-transform" />
//             ) : (
//               <ChevronDown className="h-4 w-4 transition-transform" />
//             )}
//           </button>

//           <div
//             ref={(el) => (submenuRefs.current["settings"] = el)}
//             style={{ height: "0px", overflow: "hidden", opacity: 0 }}
//             className="ml-8 mt-1 space-y-1"
//           >
//             {settingsSubItems.map((sub) => (
//               <Link
//                 key={sub.href}
//                 href={sub.href}
//                 className="block p-2 rounded hover:bg-gray-200 transition"
//               >
//                 {sub.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//         {/* Analytics Menu */}
//         <div>
//           <button
//             onClick={() => toggleMenu("analytics")}
//             className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-100 transition"
//           >
//             <div className="flex items-center gap-3">
//               <BarChart2 className="h-5 w-5" />
//               <span>Analytics</span>
//             </div>
//             {openMenus["analytics"] ? (
//               <ChevronUp className="h-4 w-4 transition-transform" />
//             ) : (
//               <ChevronDown className="h-4 w-4 transition-transform" />
//             )}
//           </button>

//           <div
//             ref={(el) => (submenuRefs.current["analytics"] = el)}
//             style={{ height: "0px", overflow: "hidden", opacity: 0 }}
//             className="ml-8 mt-1 space-y-1"
//           >
//             {analyticsSubItems.map((sub) => (
//               <Link
//                 key={sub.href}
//                 href={sub.href}
//                 className="block p-2 rounded hover:bg-gray-200 transition"
//               >
//                 {sub.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
