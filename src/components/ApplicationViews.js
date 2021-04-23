import React from "react"
import { Route } from "react-router-dom"
import { FriendsList } from "./friends/FriendsList"
// import { MessageList } from "./messages/MessageList"
import { MyCollection } from "./myCollection/CollectionList"
import { NewSongInput } from "./myCollection/newSong"
import { SongEditForm } from "./myCollection/SongEditForm"

export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <MyCollection />
        </Route>

        <Route path="/friends">
            <FriendsList />
            {/* <MessageList /> */}
        </Route>

        <Route path="/song/createSong">
            <NewSongInput />
        </Route>

        <Route path="/song/:songId(\d+)/edit">
            <SongEditForm />
        </Route>
        </>
    )
}