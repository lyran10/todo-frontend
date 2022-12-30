import {FaTrashAlt,FaEdit,FaRegWindowClose} from "react-icons/fa"
import {edit} from "./action.js"
import {connect} from "react-redux"
import { Spinner } from "react-bootstrap"

// this is the list component where it will iterate in the array and display them in a list
const List = (props) => {
  const {to_do_data,handleCheck,handleDelete,handleDes,id,boolean,setBoolean,checkArray,isLoading} = props// getting all the props from displayTodo component

  return(
    <div>
    {to_do_data.length >= 1?to_do_data.map((ele,index) => {// if data in to_do_data use map to display it
      return(
          <li className="li d-flex justify-content-between" key= {index} style=
          {{textDecoration:checkArray.includes(ele.id) === true?"line-through":"none"}}>
              <form className="d-flex gap-2">
                <input id={ele.id} onClick={handleCheck} type="checkbox"/>
                <span id={index} className="task" onClick={handleDes}>
                  {ele.to_do}
                </span>
              </form>

              <div className="d-flex gap-3 position-relative">
                {/* //props.editing will send the data to the reducer and to edit and it will be used in the todo component then after clicking on the add button it will update in the data base. */}
                <span className="fa" onClick={() => props.editing(ele.to_do,ele.id,ele.description)}> <FaEdit /></span>
                {/* // to delete from the database */}
                {!isLoading ? 
                <span className="fa" onClick={() => handleDelete(ele.id)}><FaTrashAlt /></span>
                : <Spinner animation="border" size="sm" className="mt-1" />}
                {/* // used for the handleDes function */}
                {boolean && index === parseInt(id)?to_do_data.map((ele,index) => {
                    if(parseInt(id) === parseInt(index)){
                      return(
                    <p style={{width:"200px"}} key={index} className="description" >Description : {ele.description} <FaRegWindowClose 
                    className="desCloseButton" onClick={() => setBoolean(!boolean)}/></p>
                    // This button is to close the description message bubble.
                      )
                }
                }):null}
              </div>
          </li>
          )
        }): to_do_data?<p>No Tasks</p>:<p>Loading...</p>}
        </div>
  )
}

// using redux to send the values to todo component to display on the input and can be updated
const mapDispatchToStore = (dispatch) => {
  return {
    editing : (val,id,des) => dispatch(edit(val,id,des)),
  }
}


export default connect(null,mapDispatchToStore)(List)