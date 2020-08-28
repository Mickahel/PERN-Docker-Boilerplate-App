import React, { useEffect, useContext } from "react";
import useFetch from 'hooks/useFetch'

function ComponentA(props) {
    const { fetch, data, loading } = useFetch()

    const loadData = async()=>{
        
        console.log("Started A")
        await fetch({
            addBaseUrl: true,
            url:"https://jsonplaceholder.typicode.com/posts"        
        })
        console.log("Done A")
    }
    useEffect(()=>{
        loadData()
    },[])

    if (loading) return (<div>LOADIIIING</div>)
    return (
            <ul>
                {data.map(post =><li key={post?.title+ "A"}>{post?.title}</li>)}
            </ul>
    )
}

export default ComponentA;