import React from 'react';
import Image from 'next/image';

import styles from '../styles/Titlebar.module.css';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const listItems: { title: string; href: string; description: string }[] = [
  {
    title: 'Home',
    href: '/',
    description: "Virtue's Home Page.",
  },
  {
    title: 'Events/Camps',
    href: '/events',
    description: 'Events and camps that are happening.',
  },
  {
    title: 'FAQS',
    href: '/faqs',
    description: 'Frequently asked questions.',
  },
  {
    title: 'Parties',
    href: '/parties',
    description: 'Book a party or event at Virtue Movement.',
  },
  {
    title: 'Member Info',
    href: '/members',
    description: 'Become a member of Virtue Movement.',
  },

  {
    title: 'External Hire',
    href: '/external-hire',
    description: 'Hire Virtue Movement!',
  },
  {
    title: 'Socials',
    href: '/socials',
    description: 'Learn more about our socials.',
  },
  {
    title: 'About Us',
    href: '/about-us',
    description: 'Learn more about Virtue Movement.',
  },
];

const Titlebar = () => {
  const { isSignedIn, user } = useUser();

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
          src={'/virtue-icon.png'}
          alt={'Virtue Icon'}
          width={215}
          height={92}
        />
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div>
          <Button>
            <SignInButton />
          </Button>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button>
            <SignUpButton />
          </Button>
        </div>
      )}
    </section>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
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
ListItem.displayName = 'ListItem';

export default Titlebar;
