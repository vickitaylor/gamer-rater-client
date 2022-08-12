import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGame, deleteGame } from "../../managers/GameManager"
import { getRatingsByGame, createRating } from "../../managers/RatingManager";
import { getReviewsByGame } from "../../managers/ReviewManager";

// component that displays the game details and reviews it received. The edit and delete buttons will only appear if the game creator is the user logged in. Also there is a slider scale for users to rate the game 1-10.

export const GameDetails = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])

    // rating state, using 10 so if the slider is not changed 0 does not save
    const [rating, setRating] = useState({
        rating: 10
    })

    useEffect(() => {
        getSingleGame(gameId).then(setGame)
            .then(() => {
                getReviewsByGame(gameId).then(setReviews)
            })
    }, [gameId])

    // function for the delete button
    const deleteButton = (id) => {
        deleteGame(id).then(() => {
            navigate(`/games`)
        })
    }

    const renderPage = () => {
        getSingleGame(gameId).then(setGame)
            .then(() => {
                getReviewsByGame(gameId).then(setReviews)
            })
    }

    return (
        <>
            <header>
                <h2>{game.title}</h2>
            </header>

            <article>
                <div>Description: {game.description}</div>
                <div>Designer: {game.designer}</div>
                <div>Year Released: {game.year_released}</div>
                <div>Minimum Number of Players: {game.number_of_player}</div>
                <div>Estimated Time to Complete a Game: {game.est_time_to_play}</div>
                <div>Minimum Age to Play: {game.rec_age}</div> <br />
                {/* need the ? after game.categories otherwise will get an error when iterating thru the list*/}
                <div>Categories:
                    {
                        game.categories?.map(cat => {
                            return <div key={`cat--${cat?.id}`}>{cat?.name}</div>
                        })
                    }
                </div><br />
                <div>Reviews:
                    {
                        reviews?.map(review => {
                            return <div key={`review--${review.id}`}>{review.player.user.username} says: {review.review}</div>
                        })
                    }
                </div><br />
                <fieldset>
                    <div>
                        <div>Current Average Rating:</div>
                        <div>{game.average_rating}</div><br /><br />
                        <label htmlFor="rating">What did you think of the game from 1-10:</label><br />
                        <input type="range" name="rating" min='1' max='10' onChange={(evt) => {
                            const copy = { ...rating }
                            copy[evt.target.name] = parseInt(evt.target.value)
                            setRating(copy)
                        }}></input>
                        <button onClick={evt => {
                            evt.preventDefault()
                            const postRating = {
                                rating: rating.rating,
                                game: gameId
                            }
                            createRating(postRating)
                                .then(() => renderPage())
                        }}>Save Rating</button>
                    </div>
                </fieldset>

                <br />
                <button onClick={(() => navigate(`/games/${game.id}/review`))}>Review Game</button><br />
                {/* turnery statement to determine  if the current user logged in is the user who created the game. had to use == as === was returning everything as false.*/}

                {
                    localStorage.getItem("current_user") == game?.player?.user
                        ?
                        <>
                            <button onClick={(() => navigate(`/games/${game.id}/edit`))}>⚙️</button >
                            <button onClick={() => { deleteButton(game.id) }}>❌</button><br />
                        </>
                        : ""
                }
                <button onClick={(() => navigate(`/games`))}>Back to Full List</button>
            </article>
        </>
    )
}