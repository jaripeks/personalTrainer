import React from 'react'
import SearchIcon from '@material-ui/icons/Search'

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    return (
        <>
            <SearchIcon />
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