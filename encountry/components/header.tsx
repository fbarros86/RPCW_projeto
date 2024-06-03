import React from "react"
import { Navbar } from "./ui/navbar"
import Title from "./ui/game-title"
import { ModeToggle } from "./ui/mode-toggle"

const Header = () => {
    return (
        <div className="flex flex-col rounded-b-[3.rem] pb-3">
            <div className="flex flex-col rounded-b-[4rem] bg-primary px-4 py-10 lg:px-10">
                <Title text="ENCOUNTRY" />
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <Navbar />
                <ModeToggle />
            </div>
        </div>
    )
}

export default Header