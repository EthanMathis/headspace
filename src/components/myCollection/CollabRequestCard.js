import React from "react"

export const CollabRequestCard = ({collabRequest, handleCollabDeny, handleCollabApprove}) => {
    
    return (
        <>
        {collabRequest.canEdit === true ? <div></div> : 
        <div className="w-50 border border-success rounded m-2 p-2">
            <h4>{collabRequest.user.name} Would Like To Collaborate With You On This Song!</h4>
            <button type="button" className="btn btn-success" onClick={() => handleCollabApprove(collabRequest)}>Approve</button>
            <button type="button" className="btn btn-danger" onClick={() => handleCollabDeny(collabRequest.id)}>Deny</button>
        </div>
        }
        </>
    )
}