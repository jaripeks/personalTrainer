import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'

const EditableCell = ({
    cell: { value: initialValue },
    row: {index },
    column: { id },
    updateData,
    editable
}) => {
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onBlur = () => {
        updateData(index, id, value)
    }

    if(!editable) {
        return(`${initialValue}`)
    }

    return (
        <TextField value={value} onChange={onChange} onBlur={onBlur} />
    )
}

export default EditableCell