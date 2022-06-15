import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './MarketPlacePage.scss'

const MarketPlacePage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState([]);

    const fetchSingleCoin = async () => {
        try {
            const url = `https://api.coingecko.com/api/v3/coins/${id}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
            const response = await axios.get(url);
            setCoin(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchSingleCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h2>{coin.id}</h2>
        </div>
    )
}

export default MarketPlacePage