import { useState, useEffect } from 'react'

/**
 * Custom hook designed to work as a general component that handles all communication
 * with a REST-API
 * HAS BEEN MODIFIED TO WORK WITH THE 'RESTFUL' API OF THE PT FINAL
 * @param {*} baseUrl is the URL of the API
 */

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const getAll = async () => {
            const response = await fetch(baseUrl)
            const data = await response.json()
            setResources(data.content)
        }
        getAll()
    }, [baseUrl])

    const service = {

    }

    return [
        resources, service
    ]
}

export default useResource