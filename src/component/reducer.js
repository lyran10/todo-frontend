const initState = {
  value : "",
  id : "",
  description : ""
}


export const reducer = (state=initState,action ={}) => {
  switch (action.type) {
      case "edit":
        return {...state,value : action.payload, id : action.id, description: action.description}
      case "empty":
        return {...state,value : "", id : "", description : ""}
    default:
      return {...state}
  }
}