import React from "react"
import { Route } from "react-router-dom"
import { FriendsList } from "./friends/FriendsList"
import { MyCollection } from "./myCollection/CollectionList"


export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <MyCollection />
        </Route>

        <Route path="/friends">
            <FriendsList />
        </Route>
        </>
    )
}