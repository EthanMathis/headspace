import React from "react"

export const SearchCard = ({result, handleAddFriend}) => {
    
    return (
        <article className="d-flex">
           <>
            <h3>{result.name}</h3>
            <div>
                <button type="button" className="btn btn-success" onClick={() => handleAddFriend(result.id)}>Add {result.name}</button>
            </div>
           </>
        </article>
    )
}