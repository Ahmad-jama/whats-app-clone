import React, {useReducer} from 'react'

export  const StateContext = React.createContext()

export  const StateProvider = ({children, reducer, initialState}) =>  (
    

    <StateContext.Provider 
    value={ useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>

)

export const useStateValue = () => React.useContext(StateContext)