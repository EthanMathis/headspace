import React, { useEffect, useState } from "react"
import { FriendCard } from "./FriendCard"
import { getUserFriends, addFriend, deleteFriend } from "../../modules/friendsManager"
import { SearchCard } from "./SearchCard";
import { getAllUsers } from "../../modules/userManager";

export const FriendsList = () => {

    const [friends, setFriends] = useState([]);
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([])

    // grabs the userId of the currently logged in user. returns as an integer
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    // queries the "friends" many2many table from database and returns an array of the loggedInUser friends. expands user to get their info
    // sets the state of "friends" to the result of the fetch call so we can loop over it later and create the list 
    const getLoggedInUserFriends = () => {
        return getUserFriends(loggedInUser)
        .then(friendsFromAPI => {
            // console.log("friends from API", friendsFromAPI)
            setFriends(friendsFromAPI)
        })
    }

    // handles deleting a friend by Id. RESETS STATE OF FRIENDS TO RENDER THE LIST AGAIN
    const handleDelete = (id) => {
        deleteFriend(id)
        .then(() => getLoggedInUserFriends())
    }

    // handles adding a friend by Id. RESETS STATE OF FRIENDS TO RENDER THE LIST AGAIN
    const handleAddFriend = (id) => {
        const newFriend = {
            currentUserId: loggedInUser,
            userId: id
        }
        addFriend(newFriend)
        .then(() => getLoggedInUserFriends())
    }

    const handleInputChange = (event) => {
        let selectedVal = event.target.value
        setSearch(selectedVal.toLowerCase())
    }

    const searchResult = (searchString) => {
        if(searchString.length > 0) {
            getAllUsers()
            .then(response => {
                let matchingUsers = response.filter(user => {
                    if(user.name.toLowerCase().includes(searchString) && user.id !== loggedInUser) {
                        return true
                    }
                })
                setResult(matchingUsers)
            })
        }
        else setResult([])
    }

    useEffect(() => {
        searchResult(search)
    }, [search])

    useEffect(() => {
        getLoggedInUserFriends()
    }, [])


    return (
        <section className="friendList">
            <div className="searchBox">
                <input type="text"
                       id="search"
                       className="friendSearch"
                       required
                       onChange={handleInputChange}
                       placeholder="Search For a Friend" />

                <div className="searchResults">
                    {result.length === 0 ? <div></div> :
                     result.map(result => 
                        <SearchCard key={result.id}
                                    result={result}
                                    friends={friends}
                                    handleAddFriend={handleAddFriend} />
                     )}
                </div>
            </div>

            <div className="FriendCards">
                {friends.map(friend => 
                    <FriendCard key={friend.id}
                                friend={friend}
                                handleDelete={handleDelete} />
                )}
            </div>
        </section>
    )
}