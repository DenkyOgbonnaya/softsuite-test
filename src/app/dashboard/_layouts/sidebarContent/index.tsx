import { ChartIcon, ChevronDown, ChevronUp, DasboardIcon, SettingsIcon, SwitchIcon } from "@/assets";
import { DropDown } from "@/components";
import styles from "./sidebarContent.module.scss";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DASHBOARD_ROUTE, ELEMENTS_ROUTE } from "@/contstants/routes";

export type SidebarMenuItem = {
  title: string;
  route: string;
  Icon: any;
};
export type SidebarMenu = {
  groupName: string;
  groupIcon: any;
  route: string;
  items: SidebarMenuItem[];
};

const sidebarContent: SidebarMenu[] = [
  {
    groupName: "Dashboard",
    groupIcon: <DasboardIcon />,
    route: DASHBOARD_ROUTE,
    items: [],
  },
  {
    groupName: "Payroll Activities",
    groupIcon: <ChartIcon />,
    route: "",
    items: [
      {
        title: "Payroll Settings",
        route: DASHBOARD_ROUTE,
        Icon: <SettingsIcon />,
      },
    ],
  },
  {
    groupName: "Element Setup",
    groupIcon: <ChartIcon />,
    route: "",
    items: [
      {
        title: "Element",
        route: ELEMENTS_ROUTE,
        Icon: <SettingsIcon />,
      },
      {
        title: "Balances",
        route: DASHBOARD_ROUTE,
        Icon: <SettingsIcon />,
      },
    ],
  },
];

export default function SidebarContent() {
  const [activeGroup, setActiveGroup] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  const activeLink = (url: string, pathname: string) => {
    return pathname === url ? styles.activeLink : "";
  };

  const handleActiveGroup = (groupName: string) => {
    setActiveGroup(groupName);
  };

  return (
    <>
      <div className={styles.sidebarContent}>
        {sidebarContent.map((group) => (
          <div key={group.groupName}>
            {group.items.length ? (
              <DropDown>
                <div
                  className={`${styles.menu} ${
                    activeGroup === group.groupName ? styles.activeGroup : ""
                  }`}
                >
                  <div
                    className={`${styles.hstack}`}
                    onClick={() => handleActiveGroup(group.groupName)}
                  >
                    {group.groupIcon}
                    <div className={styles.vstack}>
                      <p
                        className={`${styles.label} ${
                          activeGroup === group.groupName
                            ? styles.activeLabel
                            : ""
                        }`}
                      >
                        {group.groupName}
                      </p>
                    </div>
                  </div>
                  <span
                    className={` ${
                      activeGroup === group.groupName ? styles.activeLabel : ""
                    }`}
                  >
                    {activeGroup === group.groupName ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </span>
                </div>

                {group.items.map((item) => (
                  <Link
                    href={item.route}
                    key={item.title}
                    className={`${styles.hstack} ${activeLink(
                      group.route,
                      pathName
                    )} `}
                  >
                    <span className={styles.label}>{item.title}</span>
                  </Link>
                ))}
              </DropDown>
            ) : (
              <>
                <Link
                  href={group.route}
                  className={`${styles.hstack} ${activeLink(
                    group.route,
                    pathName
                  )} `}
                >
                  {group.groupIcon}
                  <span className={styles.label}>{group.groupName}</span>
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
