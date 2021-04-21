import React, { useEffect, useState } from "react"
import { FriendCard } from "./FriendCard"

export const FriendsList = () => {


    return (
        <section className="friendList">
            <div className="FriendCards">
                <FriendCard />
            </div>
        </section>
    )
}