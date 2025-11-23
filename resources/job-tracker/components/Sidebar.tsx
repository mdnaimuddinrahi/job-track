"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { animate } from "@motionone/dom";

type SubItem = { href: string; label: string };
type MenuItem = {
  label: string;
  icon: any;
  href?: string;
  subItems?: SubItem[];
};

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const nav: MenuItem[] = [
    {
      label: "Users",
      icon: Users,
      subItems: [
        { href: "/users/list", label: "User List" },
        { href: "/users/add", label: "Add User" },
      ],
    },
    {
      label: "Companies",
      icon: Building2,
      subItems: [
        { href: "/companies/list", label: "Companies" },
        { href: "/settings/security", label: "Security" },
      ],
    },
    { label: "Home", icon: Home, href: "/home" },
    
  ];

  // ✅ Keep submenu open when route matches
  useEffect(() => {
    nav.forEach((menu) => {
      if (menu.subItems) {
        const isActive = menu.subItems.some((sub) =>
          pathname.startsWith(sub.href)
        );
        const submenu = submenuRefs.current[menu.label];
        const isAlreadyOpen = openMenus[menu.label];

        if (isActive && !isAlreadyOpen) {
          setOpenMenus((prev) => ({ ...prev, [menu.label]: true }));

          if (submenu) {
            animate(
              submenu,
              {
                height: ["0px", `${submenu.scrollHeight}px`],
                opacity: [0, 1],
              },
              { duration: 0.3, easing: "ease-out" }
            );
          }
        } else if (!isActive && isAlreadyOpen) {
          setOpenMenus((prev) => ({ ...prev, [menu.label]: false }));

          if (submenu) {
            animate(
              submenu,
              { height: [`${submenu.scrollHeight}px`, "0px"], opacity: [1, 0] },
              { duration: 0.3, easing: "ease-in-out" }
            );
          }
        }
      }
    });
  }, [pathname]); // 🔁 triggers every time route changes

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
    if (!sidebarRef.current) return;

    animate(
      sidebarRef.current,
      {
        width: [collapsed ? "3rem" : "16rem", collapsed ? "16rem" : "4rem"],
      },
      { duration: 0.3, easing: "ease-in-out" }
    );
  };

  const toggleMenu = (label: string) => {
    const submenu = submenuRefs.current[label];
    if (!submenu) return;

    const isOpen = openMenus[label];
    setOpenMenus((prev) => ({ ...prev, [label]: !isOpen }));

    if (!isOpen) {
      animate(
        submenu,
        {
          height: ["0px", `${submenu.scrollHeight}px`],
          opacity: [0, 1],
        },
        { duration: 0.3, easing: "ease-out" }
      );
    } else {
      animate(
        submenu,
        { height: [`${submenu.scrollHeight}px`, "0px"], opacity: [1, 0] },
        { duration: 0.3, easing: "ease-in-out" }
      );
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`bg-white  h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div
        onClick={toggleSidebar}
        className="flex items-center gap-2 p-6 font-bold text-lg border-gray-200 cursor-pointer"
      >
        <Home className="h-6 w-6" />
        {!collapsed && <span>Admin</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {nav.map((item) => {
          const isParentActive =
            item.href === pathname ||
            item.subItems?.some((sub) => pathname.startsWith(sub.href));

          return (
            <div key={item.label}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center justify-between w-full p-2 rounded-md transition ${
                      isParentActive
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed &&
                      (openMenus[item.label] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </button>

                  <div
                    ref={(el) => (submenuRefs.current[item.label] = el)}
                    className="ml-8 mt-1 space-y-1 overflow-hidden"
                    style={{
                      height: openMenus[item.label] ? "auto" : "0px",
                      opacity: openMenus[item.label] ? 1 : 0,
                    }}
                  >
                    {item.subItems.map((sub) => {
                      const isActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block p-2 rounded-md transition ${
                            isActive
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href!}
                  className={`flex items-center gap-3 p-2 rounded-md transition ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
