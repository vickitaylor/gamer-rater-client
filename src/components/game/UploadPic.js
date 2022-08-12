import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { createPicture } from "../../managers/PictureManager"

export const UploadPic = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [gamePhoto, setGamePhoto] = useState({
        picture: ""
    })

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            // upload a component state variable to the value of base64ImageString
            setGamePhoto(base64ImageString)
        })
    }


    return (

        <form>
            <h2>Upload a photo of you playing the game?</h2>
            <input type="file" id="game_image" onChange={createGameImageString} /><br />
            <input type="hidden" name="game_id"
                value={gameId}
            />
            <button onClick={evt => {
                evt.preventDefault()

                // upload the stringified image that is stored in state
                const postImage = {
                    game_id: gameId,
                    game_image: gamePhoto
                }
                // sending the POST request to API
                createPicture(postImage)
                    .then(() => navigate(`/games/${gameId}`))
            }} className="btn btn-primary">Upload</button>
        </form>
    )
}
