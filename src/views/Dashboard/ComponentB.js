import React, { useEffect, useContext } from "react";
import useFetch from 'hooks/useFetch'

function ComponentB(props) {
    const { fetch, data, loading } = useFetch()

    const loadData = async()=>{
        console.log("Started B")
        await fetch({
            addBaseUrl: true,
            url:"https://jsonplaceholder.typicode.com/posts"        
        })
        console.log("Done B")
    }
    useEffect(()=>{
        loadData()
    },[])

    if (loading) return (<div>LOADIIIING</div>)
    return (
            <ul>
                {data.map(post =><li key={post?.title+"B"}>{post?.title}</li>)}
            </ul>
    )
}

export default ComponentB;