import React from "react"
import { useSelector } from "react-redux"
import Layout from "./Layout"

const Home = () => {
    const state = useSelector(state => state)
    console.log(state)
    return (
        <Layout title = "Hubert's Store" subTitle="Enjoy Shopping">
            Home
        </Layout>
    )
}

export default Home