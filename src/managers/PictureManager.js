export const createPicture = (picture) => {
    return fetch(`http://localhost:8000/pictures`, {
        method: "POST",
        headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(picture)
        })
        .then(res => res.json())
}

export const getPicturesByGame = (gameId) => {
    return fetch(`http://localhost:8000/pictures?gameId=${gameId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}
