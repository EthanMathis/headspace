import React, { useEffect, useState } from "react"
import { FriendCard } from "./FriendCard"
import { getUserFriends, addFriend, deleteFriend } from "../../modules/friendsManager"
import { SearchCard } from "./SearchCard";
import { getAllUsers } from "../../modules/userManager";

export const FriendsList = () => {

    const [friends, setFriends] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [friendsObj, setFriendsObj] = useState([])
    const [allUsersNotFriends, setAllUsersNotFriends] = useState([])

    // grabs the userId of the currently logged in user. returns as an integer
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    // queries the "friends" many2many table from database and returns an array of the loggedInUser friends. expands user to get their info
    // sets the state of "friends" to the result of the fetch call so we can loop over it later and create the list 
    const getLoggedInUserFriends = () => {
        return getUserFriends(loggedInUser)
        .then(friendsFromAPI => {
            console.log("friends from API", friendsFromAPI)
            let friendsUserObj = friendsFromAPI.map(friend => friend.user)
            setFriendsObj(friendsUserObj)
            setFriends(friendsFromAPI)
        })
    }

    const getAllTheUsers = () => {
        getAllUsers()
        .then(response => { 
            console.log("allTheUser", response)
            return setAllUsers(response)})
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
                let matchingUsers = allUsersNotFriends.filter(user => {
                    if(user.name.toLowerCase().includes(searchString) && user.id !== loggedInUser) {
                        return true
                    }
                })
                setResult(matchingUsers)
            
        }
        else setResult([])
    }

    const notFriends = () => {
        let notMyFriends = [...allUsers]

        for (var i = 0, len = friendsObj.length; i < len; i++) { 
            for (var j = 0, len2 = notMyFriends.length; j < len2; j++) { 
                if (friendsObj[i].id === notMyFriends[j].id) {
                    notMyFriends.splice(j, 1);
                    len2=notMyFriends.length;
                }
            }
        } 
        return setAllUsersNotFriends(notMyFriends) 
    }

    useEffect(() => {
        searchResult(search)
    }, [search])

    useEffect(() => {
        getAllTheUsers()
        getLoggedInUserFriends()
        notFriends()
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

                <div className="d-flex flex-column align-items-center">
                    {result.length === 0 ? <div></div> :
                     result.map(result => 
                        <SearchCard key={result.id}
                                    result={result}
                                    friends={friends}
                                    handleAddFriend={handleAddFriend} />
                     )}
                </div>
            </div>

            <div className="d-flex justify-content-center">
                {friends.map(friend => 
                    <FriendCard key={friend.id}
                                friend={friend}
                                handleDelete={handleDelete} />
                )}
            </div>
        </section>
    )
}