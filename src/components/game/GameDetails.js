import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGame } from "../../managers/GameManager"


export const GameDetails = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [game, setGame] = useState({})

    useEffect(() => {
        getSingleGame(gameId).then(setGame)
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
                <div>Minimum Age to Play: {game.rec_age}</div>
                {/* need the ? after game.categories otherwise will get an error */}
                <div>Categories:
                    {
                        game.categories?.map(cat => {
                            return <div key={`cat--${cat?.id}`}>{cat?.name}</div>
                        })
                    }
                </div>
                {/* <div>Reviews:
                    {
                        game.categories?.map(cat => {
                            return <div key={`cat--${cat?.id}`}>{cat?.name}</div>
                        })
                    }
                </div> */}

                <br />
                <button onClick={(() => navigate(`/games`))}>Back to Full List</button>
            </article>
        </>
    )
}