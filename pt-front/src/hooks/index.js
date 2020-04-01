import { useState, useEffect } from 'react'

/**
 * Custom hook designed to work as a general component that handles all communication
 * with a REST-API
 * HAS BEEN MODIFIED TO WORK WITH THE 'RESTFUL' API OF THE PT FINAL
 * @param {*} baseUrl is the URL of the API
 */

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState({})

    useEffect(() => {
        const getAll = async () => {
            const response = await fetch(baseUrl)
            const data = await response.json()
            setResources(data)
        }
        getAll()
    }, [baseUrl])

    //test service provided for debugging
    const logBase = () => {
        console.log(baseUrl)
    }

    const addResource = async (object) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json()
            setResources({ ...resources, content: resources.content.concat(data) })
        } catch (error) {
            console.log(error)
        }
    }

    const updateResource = async (object) => {
        const url = object.links.filter(link => link.rel === 'self')[0].href
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json()
            setResources({
                ...resources,
                content: resources.content.map(resource => resource.links.filter(link => link.rel === 'self')[0].href !== url ? resource : data )
            })
        } catch (error) {
            console.log(error)
        }
    }

    const service = {
        logBase,
        addResource,
        updateResource
    }

    return [
        resources, service
    ]
}

export default useResource