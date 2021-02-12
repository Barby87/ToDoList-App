import React from 'react'
import { useForm } from '../hooks/useForm'

export const TodoAdd = ({ handleAddTodo }) => {

    // Desestructurando arreglo que retorna useForm
    // Desestructurando objeto formValues como description
    const [ { description }, handleInputChange, reset ] = useForm({
        description: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if(description.trim().length < 1 ) {
            // No hace nada si el valor de descriptor es vacio
            return;
        }

        const newTodo = { 
            id: new Date().getTime(),
            desc: description,
            done: false
        }
        
        // Acción que se enviará al reducer
        const action = { 
            type: 'add',
            payload: newTodo
        }

        // Enviando action a todoReducer
        handleAddTodo( newTodo )
        // Resestear formulario
        reset()
    }

    return (
        <>
            <h4> Agregar TODO</h4>
            <hr/>

            <form onSubmit={ handleSubmit }>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Agrega una tarea"
                    autoComplete="off"
                    value={ description }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-outline-primary mt-1 btn-block"
                >
                    Agregar
                </button>
            </form>
        </>
    )
}
