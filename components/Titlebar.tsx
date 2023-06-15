import React from "react";
import Image from "next/image";

import styles from "../styles/Titlebar.module.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
const listItems: { title: string; href: string; description: string }[] = [
  {
    title: "Events/Camps",
    href: "/events",
    description: "Events and camps that are happening.",
  },
  {
    title: "FAQS",
    href: "/faqs",
    description: "Frequently asked questions.",
  },
  {
    title: "Parties",
    href: "/parties",
    description: "Book a party or event at Virtue Movement.",
  },
  {
    title: "About Us",
    href: "/about-us",
    description: "Learn more about Virtue Movement.",
  },
  {
    title: "Member Info",
    href: "/members",
    description: "Become a member of Virtue Movement.",
  },
  {
    title: "Wellfare",
    href: "/wellfare",
    description: "Learn more about our wellfare program.",
  },
  {
    title: "External Hire",
    href: "/external-hire",
    description: "Hire Virtue Movement!",
  },
  {
    title: "Socials",
    href: "/socials",
    description: "Learn more about our socials.",
  },
];

const socials: { title: string; href: string }[] = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/virtuegymnastics/",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/virtuegymnastics/",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/virtuegymnastic",
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/channel/UCbsY0WKc8xcVGJAq3y_I7Vg",
  },
];

const Titlebar = () => {
  return (
    <section className={styles.titlebar}>
      <div className={styles.title}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={styles.background}>
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent className={styles.navMenu}>
                <ul className="grid w-[200px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[400px] ">
                  {listItems.map((listItem) => (
                    <ListItem
                      key={listItem.title}
                      title={listItem.title}
                      href={listItem.href}
                      className={styles.items}
                    >
                      {listItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className={styles.logo}>
        <Image
          src={"/virtue-icon.png"}
          alt={"Virtue Icon"}
          width={215}
          height={92}
        />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={styles.background}>
                Socials
              </NavigationMenuTrigger>
              <NavigationMenuContent className={styles.navMenu}>
                <ul className="grid w-[120px] gap-3 p-4">
                  {socials.map((social) => (
                    <ListItem
                      key={social.title}
                      title={social.title}
                      href={social.href}
                      className={styles.items}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </section>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Titlebar;
