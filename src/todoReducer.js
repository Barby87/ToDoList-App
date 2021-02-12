// Función reducer
export const todoReducer = (state = [], action) => {

    switch (action.type) {
        case 'add':
            return [ ...state, action.payload ]
            // El break no es necesario porque hace un return inmediatamente después del case
            // break;
        
        case 'delete':
            // Método filter regresa un nuevo arreglo
            return state.filter( todo => todo.id !== action.payload )

        case 'toggle':
            return state.map( todo =>
                // return implícito con operador ternario
                ( todo.id === action.payload )
                    ? { ...todo, done: !todo.done }
                    : todo
            )

        case 'toggle-old':
            return state.map( todo => {

                if( todo.id === action.payload) {
                    return {
                        // Extraer todos los elementos del 'todo' específico
                        ...todo,
                        // Pero se cambia la propiedad 'done'
                        done: !todo.done
                    }
                } else {
                    return todo
                }
            })

        default:
            return state
    }
}