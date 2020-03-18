import React from 'react'

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    return (
        <>
            <input
                value={globalFilter || ''}
                onChange={event => {
                    setGlobalFilter(event.target.value || undefined)
                }}
            >
            </input>
        </>
    )
}

export default GlobalFilter