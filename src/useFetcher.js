import { useState, useContext } from 'react';
import _ from 'lodash'
import axios from 'axios'
import qs from 'qs'
import UrlPattern from 'url-pattern'
import { useHistory }  from 'react-router-dom'

// ? https://www.npmjs.com/package/qs
// ? https://www.npmjs.com/package/url-pattern



function useFetcher(props){
    const history      = useHistory();


    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(_.get(props, 'initialLoading', true))
    const [firstLoading, setFirstLoading] = useState(true)
    const [data, setData] = useState()


    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers' : 'X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    }

    const fetch = async options =>{
        
        if(!options) options = props
        
        // ? Get UserToken if there is one and attach to Header
        if(_.get(options, 'useToken', true) && localStorage.userToken){ 
            headers['Authorization'] = `Bearer ${localStorage.userToken}`
        }
        

        // ? Create custom axios instance
        const axiosGateway = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            timeout: 30000,
            json: true,
            headers,
        })

        // ? attach global headers
        axiosGateway.defaults.headers.common = headers
        axiosGateway.defaults.headers.patch = headers
        axiosGateway.defaults.headers.post = headers
        axiosGateway.defaults.headers.put = headers

        let url = createUrl(options)

        const isSilent = _.get(options, 'silent')

        axiosGateway.interceptors.response.use(response => {
            // ? Do something with response data
            return response;
          }, (error) =>{
              if(error.response){
                    if(error.response.status === 401 && options.redirectToLogin){
                        console.log("Unauthorized", this.props)
                        // ? Gestiamolo al login
                        history.push("auth?returnUrl="+this.props.location.pathname)            
                    } else {
                        console.error("Client response", error.response, error.request.url)

                        try {
                            if(_.isEmpty(error.response.data)){
                            error.response.data = JSON.parse(error.response.request.response) 
                        }
                        } catch (e){}

                        if(!isSilent) console.log({err: error.response})

                    }
                } 
                else if (error.request) console.error("Client request", error.request,error.request.url)
                if(!isSilent) console.log({err: error.request})
                else {
                    console.error("Client", error)
                    if(!isSilent) console.log({err: error})
                  }
                  return Promise.reject(error);

            });
    
            setLoading(true)


            return axiosGateway({
                ...options,
                url,
            }).then(result =>{
                if(_.get(props, 'autoSetData', true)){
                    setSuccess(true)
                    setData(result.data)

                    if(!options.doNotInterruptLoadingOnSuccess){
                        setLoading(false)
                        setFirstLoading(false)
                      }
                      setError(undefined)

                }

                return result
            }).catch(err=>{
                setSuccess(false)
                setLoading(false)
                setError(err)
                throw err;
              });
    }


    const createUrl = axiosOptions =>{
        let uri = axiosOptions.url
        if(axiosOptions.urlParams){ 
          uri = new UrlPattern(axiosOptions.url).stringify(axiosOptions.urlParams)
        }
  
        let queryString = ""
        if(axiosOptions.query){
          Object.keys(axiosOptions.query).forEach(key => (axiosOptions.query[key] === null || axiosOptions.query[key] === undefined) && delete axiosOptions.query[key]);
          queryString = axiosOptions.query ? qs.stringify(axiosOptions.query, { addQueryPrefix: true, arrayFormat: 'repeat' }) : ""
        }
  
        return uri+queryString
      }
    
    return {
        loading,
        data,
        error,
        fetch,
        setLoading,
        setData,
        setError,
        setFirstLoading,
        firstLoading,
        success,
        setSuccess
    }

}


export default useFetcher