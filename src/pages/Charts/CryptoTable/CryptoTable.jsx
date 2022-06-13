import { Skeleton, Table } from 'antd';
import { useHistory } from "react-router-dom";
import './CryptoTable.scss'

const columns = [
    {
        title: '24H TXNS:2,757,54924H VOLUME:$2.45B',
        fixed: 'left',
        children: [
            {
                title: 'TOKEN',
                dataIndex: 'token',
                fixed: 'left',
            },
            {
                title: 'PRICE $',
                dataIndex: 'price',
                align: "right",
                sorter: {
                    compare: (a, b) => a.price - b.price,
                    multiple: 3,
                },
            },
        ]
    },
    {
        title: 'ACTIVITY',
        children: [
            {
                title: 'TXNS',
                dataIndex: 'txns',
                align: "right",
                sorter: {
                    compare: (a, b) => a.txns - b.txns,
                    multiple: 2,
                },
            },
            {
                title: 'VOLUME',
                dataIndex: 'volume',
                align: "right",
                sorter: {
                    compare: (a, b) => a.volume - b.volume,
                    multiple: 1,
                },
            },
        ]
    },
    {
        title: 'PRICE CHANGE',
        children: [
            {
                title: '5M',
                dataIndex: 'fivem',
                align: "right",
                sorter: {
                    compare: (a, b) => a.fivem - b.fivem,
                    multiple: 1,
                },
                render: (tag) => {
                    const color = tag >= 0 ? 'Green' : 'Red';
                    return <p style={{ color: color }} key={tag}>{tag}%</p>
                }
            },
            {
                title: '1H',
                dataIndex: 'oneh',
                align: "right",
                sorter: {
                    compare: (a, b) => a.oneh - b.oneh,
                    multiple: 1,
                },
                render: (tag) => {
                    const color = tag >= 0 ? 'Green' : 'Red';
                    return <p style={{ color: color }} key={tag}>{tag}%</p>
                }
            },
            {
                title: '6H',
                dataIndex: 'sixh',
                align: "right",
                sorter: {
                    compare: (a, b) => a.sixh - b.sixh,
                    multiple: 1,
                },
                render: (tag) => {
                    const color = tag >= 0 ? 'Green' : 'Red';
                    return <p style={{ color: color }} key={tag}>{tag}%</p>
                }
            },
            {
                title: '24H',
                dataIndex: 'twofourh',
                align: "right",
                sorter: {
                    compare: (a, b) => a.twofourh - b.twofourh,
                    multiple: 1,
                },
                render: (tag) => {
                    const color = tag >= 0 ? 'Green' : 'Red';
                    return <p style={{ color: color }} key={tag}>{tag}%</p>
                }
            },
        ]
    },
    {
        title: '',
        children: [
            {
                title: 'LIQUIDITY',
                dataIndex: 'liquidity',
                align: "right",
                sorter: {
                    compare: (a, b) => a.liquidity - b.liquidity,
                    multiple: 1,
                },
            },
            {
                title: 'FDV',
                dataIndex: 'fdv',
                align: "right",
                sorter: {
                    compare: (a, b) => a.fdv - b.fdv,
                    multiple: 1,
                },
            },
        ]
    }
];

const data = [
    {
        key: 'c1',
        token: 'John Brown',
        price: 98,
        txns: 60,
        volume: 70,
        fivem: 1,
        oneh: 1,
        sixh: -1,
        twofourh: 1,
        liquidity: 1,
        fdv: 1,
    },
    {
        key: 'c2',
        token: 'Jim Green',
        price: 98,
        txns: 66,
        volume: 89,
        fivem: 0,
        oneh: -9,
        sixh: 2,
        twofourh: 4,
        liquidity: 0,
        fdv: 1,
    },
    {
        key: 'c3',
        token: 'Joe Black',
        price: 98,
        txns: 90,
        volume: 70,
        fivem: -3,
        oneh: 7,
        sixh: 5,
        twofourh: -3,
        liquidity: 2,
        fdv: 3,
    },
    {
        key: 'c4',
        token: 'Jim Red',
        price: 88,
        txns: 99,
        volume: 89,
        fivem: 5,
        oneh: -4,
        sixh: 4,
        twofourh: 7,
        liquidity: 0,
        fdv: 1,
    },
    {
        key: 'c5',
        token: 'Jim Red',
        price: 88,
        txns: 99,
        volume: 89,
        fivem: -4,
        oneh: -4,
        sixh: 0,
        twofourh: 5,
        liquidity: 2,
        fdv: 1,
    },
    {
        key: 'c6',
        token: 'Jim Red',
        price: 88,
        txns: 99,
        volume: 89,
        fivem: 0,
        oneh: -1,
        sixh: 0,
        twofourh: 4,
        liquidity: 2,
        fdv: 4,
    },
    {
        key: 'c7',
        token: 'Jim Red',
        price: 88,
        txns: 99,
        volume: 89,
        fivem: 5,
        oneh: 4,
        sixh: 2,
        twofourh: -2,
        liquidity: 4,
        fdv: 1,
    },
    {
        key: 'c8',
        token: 'Jim Red',
        price: 88,
        txns: 99,
        volume: 89,
        fivem: 1,
        oneh: 0,
        sixh: 2,
        twofourh: -1,
        liquidity: 2,
        fdv: 2,
    },
    {
        key: 'c9',
        token: 'Jim Red',
        price: 88,
        txns: 99,
        volume: 89,
        fivem: 2,
        oneh: -2,
        sixh: 3,
        twofourh: 0,
        liquidity: 1,
        fdv: 1,
    },
    {
        key: 'c10',
        token: 'Jim Red',
        price: 88,
        txns: 99,
        volume: 89,
        fivem: 0,
        oneh: 3,
        sixh: 1,
        twofourh: 2,
        liquidity: 4,
        fdv: 4,
    },
];

const CryptoTable = () => {
    const history = useHistory();

    return (
        <Skeleton loading={!data}>
            <Table
                rowKey="Cicd"
                className='cryptotable'
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                scroll={{
                    x: 1500,
                    y: 300,
                }}
                rowSelection={{
                    onSelect: (record) => {
                        history.push("");
                        console.log(record);
                    },
                    hideSelectAll: true
                }}
            />
        </Skeleton>
    )
}



export default CryptoTable;