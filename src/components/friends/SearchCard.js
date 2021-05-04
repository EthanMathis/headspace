import React from "react"

export const SearchCard = ({result, handleAddFriend}) => {
    
    return (
        <article className="d-flex">
           <>
            <div>
                <button type="button" className="btn btn-success" onClick={() => handleAddFriend(result.id)}>Add</button>
            </div>
            <h3>{result.name}</h3>
           </>
        </article>
    )
}