import { combineReducers } from "redux"
import {user} from './user'


const Redusers = combineReducers({
    userState:user
})

export default Redusers