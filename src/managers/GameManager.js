export const getAllGames = () => {
    return fetch(`http://localhost:8000/games`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}

export const createGame = (game) => {
    return fetch(`http://localhost:8000/games`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
        .then(res => res.json())
}