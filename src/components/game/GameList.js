import { useState, useEffect } from "react"
import { getAllGames } from "../../managers/GameManager"
import { Link, useNavigate } from "react-router-dom";


// component that renders a list of games in the database.  Per the sever code, the list is sorted alphabetically
export const GameList = () => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllGames().then(setGames)
    }, [])

    return (
        <>
            <header>
                <button onClick={(() => navigate(`create`))} >Create New Game</button>
                <h2>Game List</h2>
            </header>

            <article>
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <Link to={`${game.id}`}>{game.title}</Link>
                        </section>
                    })
                }
            </article>
        </>

    )
}