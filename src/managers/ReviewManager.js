export const createReview = (review) => {
    return fetch(`http://localhost:8000/reviews`, {
        method: "POST",
        headers: {
                "Authorization": `Token ${localStorage.getItem("gr_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
        .then(res => res.json())
}

export const getReviewsByGame = (gameId) => {
    return fetch(`http://localhost:8000/reviews?gameId=${gameId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}