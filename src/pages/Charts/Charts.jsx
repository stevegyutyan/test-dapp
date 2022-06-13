import React from 'react'
import CryptoTable from './CryptoTable/CryptoTable'
import Sidebar from './Sidebar/Sidebar'
import './Charts.scss'
import { Layout } from 'antd'

const { Content, Sider } = Layout;

const Charts = () => {
    return (
        <Layout >
            <Sider>
                <Sidebar />
            </Sider>
            <Content >
                <CryptoTable />
            </Content>
        </Layout>
    )
}

export default Charts