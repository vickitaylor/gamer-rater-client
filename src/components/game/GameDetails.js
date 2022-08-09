import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGame } from "../../managers/GameManager"
import { getReviewsByGame } from "../../managers/ReviewManager";


export const GameDetails = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [game, setGame] = useState({})
    const [ reviews, setReviews ] = useState([])

    useEffect(() => {
        getSingleGame(gameId).then(setGame)
        .then(() => {
            getReviewsByGame(gameId).then(setReviews)
        })
    }, [gameId])


    return (
        <>
            <header>
                <h2>{game.title}</h2>
            </header>

            <article>
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
                </div>

                <br />
                <button onClick={(() => navigate(`/games/${game.id}/review`))}>Review Game</button><br />
                <button onClick={(() => navigate(`/games`))}>Back to Full List</button>
            </article>
        </>
    )
}