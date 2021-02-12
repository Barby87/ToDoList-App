import React, { useEffect, useReducer } from 'react'
import './index.css'
import { TodoAdd } from './components/TodoAdd'
import { TodoList } from './components/TodoList'
import { todoReducer } from './todoReducer'

// Función inicial que retorna el estado inicial
// Cuando se recarga el navegador web, se obtiene lo que está guardado en localStorage
const init = () => {
    // Leer localStorage
    // JSON.parse transforma string a objeto
    // Si no hay todos, regresa null, entonces retorna un arreglo vacío
    return JSON.parse(localStorage.getItem('todos')) || []
}


export const TodoApp = () => {

    // init inicializa el state
    // El initialState se deja como un arreglo vacío
    const [ todos, dispatch ] = useReducer( todoReducer, [], init )

    // Grabar en localStorage cuando los todos cambian
    // localStorage sólo guarda strings, no objetos
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ))
    }, [todos])

    // Borrar todo
    const handleDelete = ( todoId ) => {
        console.log(todoId)

        const actionDelete = { 
            type: 'delete',
            payload: todoId
        }

        dispatch(actionDelete)
    }

    const handleToggle = ( todoId) => {
        dispatch({ 
            type: 'toggle',
            payload: todoId
        })
    }

    const handleAddTodo = ( newTodo ) => {
        // Enviando action a todoReducer
        dispatch( { 
            type: 'add',
            payload: newTodo
        } )
    }

    return (
        <div>
            <h1>TodoApp ( { todos.length } )</h1>
            <hr/>

            <div className="row">
                <div className="col-7">
                   <TodoList
                    todos={ todos }
                    handleDelete={ handleDelete }
                    handleToggle= { handleToggle }
                   />
                </div>

                <div className="col-5">
                   <TodoAdd
                        handleAddTodo= { handleAddTodo }
                   />
                </div>
            </div>
        </div>
    )
}
