import { createContext } from "react";   //create a context object
import { doctors } from '../assets/frontend/assets'

export const AppContext = createContext()   //create a context object

const AppContextProvider = (props) =>{

    const currencySymbol = '$'

    const value = {
        doctors,
        currencySymbol
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
export default AppContextProvider