const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const app = express()

app.use(cors())

let currentId = 0;

app.get("/foodData", async (req, res) => {
    const {searchedData} = req.query 
    const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY_FOOD}&query=${searchedData}`)
    res.send(result.data.results)
})

app.post("/mintNft", async (req, res) => {
    const {encodedData, currentAccount} = req.query
    currentId++
    if(encodedData && currentAccount){
      const dataApi = await axios.post("https://thentic.tech/api/nfts/mint", {
        key: process.env.API_KEY_NFTS,
        contract: process.env.NFTS_CONTRACT_ADDRESS,
        chain_id: 3,
        nft_id: currentId,
        nft_data: encodedData,
        to: currentAccount
    })

    res.send(dataApi.data.transaction_url)
    } 
})

app.listen(8000, () => console.log(`Server is running on port ${PORT}`))