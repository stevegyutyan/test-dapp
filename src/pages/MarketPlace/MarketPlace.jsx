import React, { useEffect, useState } from 'react'
import { Skeleton, Table } from 'antd'
import axios from 'axios'
// import { AiOutlineStar } from 'react-icons/ai';
import './MarketPlace.scss'
import { moneyFormater } from 'helpers/formatters'
import { useHistory } from "react-router-dom"

const MarketPlace = () => {
    let history = useHistory();
    const [coins, setCoins] = useState([]);

    const fetchCoin = async () => {
        try {
            const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d';
            const response = await axios.get(url);
            setCoins(response.data);
            // console.log(response.data);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchCoin();
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: 'marketRank',
            fixed: 'left',
            align: 'right',
            key: 'm1',
            // render: (tag) => {
            //     return <div style={{ display: "flex", alignItems: "center", gap: "5px" }} key={tag}><AiOutlineStar />{tag}</div>
            // }
        },
        {
            title: 'Coin',
            dataIndex: 'coin',
            fixed: 'left',
            align: 'left',
            key: 'm2',
        },
        {
            title: '',
            dataIndex: 'symbol',
            align: 'left',
            key: 'm3',
        },
        {
            title: 'Price',
            dataIndex: 'currentPrice',
            align: 'right',
            key: 'm4',
        },
        {
            title: '1h',
            dataIndex: 'fixedPrice1',
            align: 'right',
            key: 'm5',
            render: (tag) => {
                const color = tag >= 0 ? 'Green' : 'Red';
                return <p style={{ color: color }} key={tag}>{tag}%</p>
            }
        },
        {
            title: '24h',
            dataIndex: 'fixedPrice24',
            align: 'right',
            key: 'm6',
            render: (tag) => {
                const color = tag >= 0 ? 'Green' : 'Red';
                return <p style={{ color: color }} key={tag}>{tag}%</p>
            }
        },
        {
            title: '7d',
            dataIndex: 'fixedPrice7',
            align: 'right',
            key: 'm7',
            render: (tag) => {
                const color = tag >= 0 ? 'Green' : 'Red';
                return <p style={{ color: color }} key={tag}>{tag}%</p>
            }
        },
        {
            title: '24h Volume',
            dataIndex: 'fixedVolume24',
            align: 'right',
            key: 'm8',
        },
        {
            title: 'Mkt Cap',
            dataIndex: 'mktCap',
            align: 'right',
            key: 'm9',
        },
        {
            title: 'Last 7 Days',
            dataIndex: 'lastDays7',
            align: 'right',
            key: 'm10',
        },
    ];

    // const modifiedCoinsData = coins.map(({ body, ...item }) => ({
    const modifiedCoinsData = coins.map((item) => ({
        key: item.id,
        marketRank: item.market_cap_rank,
        coin:
            <div onClick={() => history.push(`/marketplace/${item.id}`)} style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                <img width="20px" src={item.image} alt="Coin_img" />
                <h3>{item.name}</h3>
            </div>,
        symbol: <h5>{item.symbol.toUpperCase()}</h5>,
        currentPrice: moneyFormater(item.current_price),
        fixedPrice1: Number(item.price_change_percentage_1h_in_currency).toFixed(1),
        fixedPrice24: Number(item.price_change_percentage_24h_in_currency).toFixed(1),
        fixedPrice7: Number(item.price_change_percentage_7d_in_currency).toFixed(1),
        fixedVolume24: moneyFormater(item.total_volume),
        mktCap: moneyFormater(item.market_cap),
        // message: body
    }));

    return (
        <section>
            <Skeleton loading={!coins}>
                <Table
                    // className='cryptotable'
                    rowKey="Mid"
                    columns={columns}
                    dataSource={modifiedCoinsData}
                    pagination={false}
                // rowSelection={{
                //     onSelect: (record) => {
                //         history.push("/:id");
                //         console.log(record);
                //     },
                //     hideSelectAll: true
                // }}
                // expandedRowRender
                // bordered
                // scroll={{
                //     x: 1500,
                //     y: 555,
                // }}
                />
            </Skeleton>
        </section>
    )
}

export default MarketPlace