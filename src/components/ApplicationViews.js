import React from "react"
import { Route } from "react-router-dom"
import { FriendsList } from "./friends/FriendsList"
import { MyCollection } from "./myCollection/CollectionList"
import { FriendCollection } from "./myCollection/FriendCollectionList"
import { FriendSongEditForm } from "./myCollection/FriendSongEditForm"
import { FriendSongView } from "./myCollection/FriendSongView"
import { MySongView } from "./myCollection/MySongView"
import { NewSongInput } from "./myCollection/newSong"
import { SongEditForm } from "./myCollection/SongEditForm"

export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <MyCollection />
        </Route>

        <Route path="/song/createSong">
            <NewSongInput />
        </Route>

        <Route path="/song/:songId(\d+)/edit">
            <SongEditForm />
        </Route>

        <Route path="/song/:songId(\d+)/view">
            <MySongView />
        </Route>

        <Route path="/friends">
            <FriendsList />
        </Route>

        <Route path="/friendCollection/:friendId(\d+)">
            <FriendCollection />
        </Route>

        <Route exact path="/friendSong/:songId(\d+)">
            <FriendSongView /> 
        </Route>

        <Route path="/friendSong/:songId(\d+)/edit">
            <FriendSongEditForm />
        </Route>
        </>
    )
}