import { createReducer, on, Action } from "@ngrx/store";
import { AuthStateInterface } from "src/app/auth/components/types/authState.interface";
import { actionRegister } from "src/app/auth/store/actions";

const initialState: AuthStateInterface = {
    isSubmitting: false,
}


const authReducer = createReducer(initialState, on(actionRegister, (state): AuthStateInterface =>({
    ...state, 
    isSubmitting:true
})))

export function btnFormRegisterSubmitStateReducer(state: AuthStateInterface, action: Action){
    return authReducer(state, action)
}