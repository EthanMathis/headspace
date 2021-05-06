import React, { useEffect, useState } from "react"
import { FriendCard } from "./FriendCard"
import { getUserFriends, addFriend, deleteFriend } from "../../modules/friendsManager"
import { SearchCard } from "./SearchCard";
import { getAllUsers } from "../../modules/userManager";
import { FriendCollection } from "../myCollection/FriendCollectionList";

export const FriendsList = () => {

    const [friends, setFriends] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [friendsObj, setFriendsObj] = useState([])
    const [allUsersNotFriends, setAllUsersNotFriends] = useState([])
    const [friendId, setFriendId] = useState(0)
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
                return setAllUsers(response)
            })
    }

    const notFriends = () => {
        let notMyFriends = [...allUsers]

        for (var i = 0, len = friendsObj.length; i < len; i++) {
            for (var j = 0, len2 = notMyFriends.length; j < len2; j++) {
                if (friendsObj[i].id === notMyFriends[j].id) {
                    notMyFriends.splice(j, 1);
                    len2 = notMyFriends.length;
                }
            }
        }
        return setAllUsersNotFriends(notMyFriends)
    }

    const searchResult = (searchString) => {
        if (searchString.length > 0) {
            let matchingUsers = allUsersNotFriends.filter(user => {
                if (user.name.toLowerCase().includes(searchString) && user.id !== loggedInUser) {
                    return true
                }
            })
            
            setResult(matchingUsers)

        }
        else setResult([])
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

    // const handleViewChange = () => {
    //     setViewChange(!viewChange)
    // }

    
    useEffect(() => {
        getAllTheUsers()
        getLoggedInUserFriends()
        // notFriends()
    }, [])
    
    // useEffect(() => {
    //     getLoggedInUserFriends()
    // }, [])

    useEffect(() => {
        searchResult(search)
        notFriends()
    }, [search])

    return (
        <>
        {friendId === 0 ?
        <section className="d-flex flex-column">
            <div className="searchBox">
                <div className="text-center m-2">
                    <input type="text"
                        id="search"
                        className="friendSearch"
                        required
                        autoComplete="off"
                        onChange={handleInputChange}
                        placeholder="Search For a New Friend" />
                </div>

                <div className="d-flex flex-column m-2 p-1">
                    {result.length === 0 ? <div></div> :
                        result.map(result =>
                            <SearchCard key={result.id}
                                result={result}
                                friends={friends}
                                handleAddFriend={handleAddFriend} />
                        )}
                </div>
            </div>

            <div className="d-flex flex-column mx-auto">
                <h2 className="font-weight-bold text-center">Friends List</h2>
                {friends.map(friend =>
                    <FriendCard key={friend.id}
                        friend={friend}
                        handleDelete={handleDelete}
                        setFriendId={setFriendId} />
                )}
            </div>
        </section> : <FriendCollection friendId={friendId}
                                       setFriendId={setFriendId} />  }
        </>
    )
}