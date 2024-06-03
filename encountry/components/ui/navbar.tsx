"use client"

import React, { createContext } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export function Navbar() {
    return (
        <NavigationMenu className="flex list-none justify-items-center space-x-4">
            <NavigationMenuItem>
                <NavigationMenuTrigger>How to play</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid list-none gap-8 p-10 md:w-[600px] lg:w-[1000px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-4">
                            <NavigationMenuItem asChild>
                                <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-t from-primary to-sky-400 p-6 no-underline outline-none focus:shadow-md">
                                    <Icons.globe className="h-6 w-6" />
                                    <div className="mb-2 mt-4 text-4xl font-medium text-white">
                                        Find the Country!
                                    </div>
                                    <p className="p-4 text-sm leading-tight text-zinc-100">
                                        You get to guess the country based on
                                        hemisphere, continent, temperature, and
                                        more!
                                    </p>
                                </a>
                            </NavigationMenuItem>
                        </li>
                        <ListItem title="Pick a country">
                            Select a country from the map or search it by name
                            then confirm it.
                        </ListItem>
                        <ListItem title="Analyse your guess">
                            Based on the information provided about the country.
                            You can check if your guess is correct, hot or cold.
                        </ListItem>
                        <ListItem title="Keep trying until you guess it">
                            You have unlimited tries to guess the country. Keep
                            trying until you get it right.
                        </ListItem>
                        <ListItem
                            title="Great! You guessed it!"
                            className="hover:bg-yellow-200 hover:text-foreground dark:hover:bg-green-600 dark:hover:bg-opacity-30"
                        >
                            You will be rewarded with a fun fact about the
                            country you guessed.
                        </ListItem>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/countries" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                    >
                        Countries
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuItem asChild>
                <a
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                    {...props}
                >
                    <div className="text-lg font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuItem>
        </li>
    )
})
ListItem.displayName = "ListItem"