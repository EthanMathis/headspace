import React from "react"

export const SearchCard = ({result, friend, handleAddFriend}) => {
    
    // let isNotFriends = friends.filter(friend => {
    //     if(friend.user.id !== result.id) {
    //         return true
    //     }
    // })
    // console.log("isNotFriends", isNotFriends)
    return (
        <article className="friendSearch">
           <>
            <h3>{result.name}</h3>
            <button type="button" className="btn btn-success" onClick={() => handleAddFriend(result.id)}>Add {result.name}</button>
           </>
        </article>
    )
}