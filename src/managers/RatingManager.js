export const createRating = (rating) => {
    return fetch(`http://localhost:8000/ratings`, {
        method: "POST",
        headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rating)
        })
        .then(res => res.json())
}

export const getRatingsByGame = (gameId) => {
    return fetch(`http://localhost:8000/ratings?gameId=${gameId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}