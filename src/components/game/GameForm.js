import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { createGame } from "../../managers/GameManager"


export const GameForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    const [ currentGame, setCurrentGame ] = useState({
        title: "",
        designer: "",
        description: "",
        numberOfPlayers: 0,
        estTimeToPlay: 0,
        recAge: 0,
        yearReleased: 0,
        category: 0
    })

    const changeGameState = (domEvent) => {
        const newGame = { ...currentGame }
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" required autoFocus className="form-control" value={currentGame.title}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer:</label>
                    <input type="text" name="designer" required className="form-control" value={currentGame.designer}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" required className="form-control" value={currentGame.description}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players Needed:</label>
                    <input type="number" name="numberOfPlayers" required className="form-control" min="1" max="50" value={currentGame.numberOfPlayers}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estTimeToPlay">Estimated Time To Play:</label>
                    <input type="number" name="estTimeToPlay" required className="form-control" min="1" max="10" value={currentGame.estTimeToPlay}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="recAge">Recommend Age:</label>
                    <input type="number" name="recAge" required className="form-control" min="1" max="10" value={currentGame.recAge}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released:</label>
                    <input type="number" name="yearReleased" required className="form-control" min="1" max="10" value={currentGame.yearReleased}
                        onChange={changeGameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select className="form-control" name="category" value={currentGame.category} required onChange={changeGameState}>
                        <option value="0">Choose Game Type:</option>
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

                const game = {
                    title: currentGame.title,
                    designer: currentGame.designer,
                    description: currentGame.description,
                    number_of_players: parseInt(currentGame.numberOfPlayers),
                    est_time_to_play: parseInt(currentGame.estTimeToPlay),
                    rec_age: parseInt(currentGame.recAge),
                    year_released: parseInt(currentGame.yearReleased),
                    category: parseInt(currentGame.category),
                }
                // Send POST request to API
                createGame(game)
                    .then(() => navigate("/games"))
            }}
                className="btn btn-primary">Create</button>
        </form>
    )
}