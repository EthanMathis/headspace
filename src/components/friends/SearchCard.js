import React from "react"

export const SearchCard = ({result, handleAddFriend}) => {
    
    return (
        <article className="friendSearch">
           <>
            <h3>{result.name}</h3>
            <button type="button" className="btn btn-success" onClick={() => handleAddFriend(result.id)}>Add {result.name}</button>
           </>
        </article>
    )
}