
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const globalReducerState = {
  tab: 'camelot',
  backgroundColor: '#ffffff',
  data: []
}

function globalReducer(state = globalReducerState, action){
  switch(action.type){
    case 'changeBackgroundColor':
      return {
        backgroundColor: action.payload
      }
    case 'changeTab':
      return {
        tab: action.payload
      }
    case 'addData':
      return {
        data: action.payload
      }
    default: 
      return state
  }
}

export function changeTab(tab){
  return {
      type: 'changeTab',
      payload: tab
  }
}

export function addData(data){
  return {
      type: 'addData',
      payload: data
  }
}

export default (history) => combineReducers({
  router: connectRouter(history),
  globalState: globalReducer,
  // rest of your reducers
})