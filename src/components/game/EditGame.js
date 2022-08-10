import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { editGame, getSingleGame } from "../../managers/GameManager"

export const EditGame = (props) => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [categories, setCategories] = useState([])

    const [game, setGame] = useState({
})

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    useEffect(() => {
        getSingleGame(gameId).then(
            (res) => {
                let newGame = {
                    title: res.title,
                    designer: res.designer,
                    description: res.description,
                    numberOfPlayers: res.number_of_players,
                    estTimeToPlay: res.est_time_to_play,
                    recAge: res.rec_age,
                    yearReleased: res.year_released,
                    category: res.categories[0].id
                }
                setGame(newGame)
            })
    }, [gameId])

    const changeGameState = (domEvent) => {
        const newGame = { ...game }
        newGame[domEvent.target.name] = domEvent.target.value
        setGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit {game.title}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" required autoFocus className="form-control" value={game.title}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer:</label>
                    <input type="text" name="designer" required className="form-control" value={game.designer}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" required className="form-control" value={game.description}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players Needed:</label>
                    <input type="number" name="numberOfPlayers" required className="form-control" min="1" max="50" value={game.numberOfPlayers}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estTimeToPlay">Estimated Time To Play:</label>
                    <input type="number" name="estTimeToPlay" required className="form-control" min="1" max="10" value={game.estTimeToPlay}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recAge">Recommend Age:</label>
                    <input type="number" name="recAge" required className="form-control" min="1" max="10" value={game.recAge}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released:</label>
                    <input type="number" name="yearReleased" required className="form-control" min="1" max="10" value={game.yearReleased}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            {/* cat name does not appear, but some of them have multiple items selected, so that causing issues, since it is a select and not checkboxes*/}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categories">Category:</label>
                    <select className="form-control" name="categories" value={game.categories} required onChange={changeGameState}>
                        <option value="0">Choose Game Category:</option>
                        {
                            categories.map(cat => {
                                return <option value={cat.id} key={`cat--${cat.id}`}>{cat.name}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit" onClick={evt => {
                // prevents the form from being submitted
                evt.preventDefault()

                const updatedGame = {
                    title: game.title,
                    designer: game.designer,
                    description: game.description,
                    number_of_players: parseInt(game.numberOfPlayers),
                    est_time_to_play: parseInt(game.estTimeToPlay),
                    rec_age: parseInt(game.recAge),
                    year_released: parseInt(game.yearReleased),
                    category: parseInt(game.categories)
                }
                // Send POST request to API
                editGame(gameId, updatedGame)
                    .then(() => navigate(`/games/${gameId}`))
            }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
