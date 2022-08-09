import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { createReview } from "../../managers/ReviewManager"

// form for a user to put their review of the game. 

export const ReviewForm = () => {

    const navigate = useNavigate()
    const {gameId} = useParams()
    const [review, setReview] = useState({
        review: ""
    })

    const changeReviewState = (domEvent) => {
        const newReview = { ...review }
        newReview[domEvent.target.name] = domEvent.target.value
        setReview(newReview)
    }

    return (
        <form className="gameForm">
            <h2>What do you think of the game?</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review:</label>
                    <textarea name="review" required autoFocus className="form-control" value={review.review}
                        onChange={changeReviewState} />
                </div>
            </fieldset>

            <button type="submit" onClick={evt => {
                // prevents the form from being submitted
                evt.preventDefault()

                const postReview = {
                    review: review.review,
                    game: gameId
                }
                // Send POST request to API
                createReview(postReview)
                    .then(() => navigate(`/games/${gameId}`))
            }}
                className="btn btn-primary">Create</button>
        </form>
    )
}