import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"
import {useEffect,useState} from "react"
import axios from "axios"
import {Displaytodo} from "./displayTodo"
import {connect} from "react-redux"
import {empty} from "./action.js"
import {FaAngellist} from "react-icons/fa"
import { Button } from "react-bootstrap"

// this component is used to store the data in the database using post method and also edit by using update method
const Todo = (props) => {
  const {id,value,description} = props // this are from the reducer which is send from displaytodo to the reducer from updation
  const [tasks,settasks] = useState([])
  const [input,setInput] = useState("")
  const [dnone,setdnone] = useState("")
  const [descriptions,setdescription] = useState("")
  const [isLoading,setLoading] = useState(false)

  // this is used to update input and descriptions whenever value and description has a value
  useEffect(() => {
    setInput(value)
    setdescription(description)
    if(value !== ""){// if value is not empty than display the cancelEdit button
      setdnone("")
    }else{
      setdnone("dNone")
    }
  },[value,description])

// function to get the data from the database
  const fetching = async () => {
    return await axios.get(`${process.env.REACT_APP_URL}/todo/getdata`)
  }

// first check if the input is empty, if not then send the updated data to the data base and fetch the updated data and set to tasks
const handleclick = async(e) => {
  setLoading(true)
  e.preventDefault()
  if(input === ""){
    setLoading(false)
    return alert("input empty")
  }else if(value !== ""){
    let obj = {id : id, to_do : input, description : descriptions}
    await axios.put(`${process.env.REACT_APP_URL}/todo/update`,obj)
    .then(() => {
      fetching()
      .then(res => {
        settasks(res.data)
        setLoading(false)
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
    props.emptyS()// this function goes to the reducer so that it will empty the values and display none the cancelEdit button
  }else{// if values is empty means nothing to edit so it will store the new data
    let obj = {to_do : input,description : descriptions}
    axios.post(`${process.env.REACT_APP_URL}/todo/postdata`,obj)
    .then(data =>{
      settasks(data.data)
      setLoading(false)
    })
    .catch(error => console.log(error))
    setInput("")
    setdescription("")
}

}

// if clicked on the cancel edit button it it will remove the values from the value and input
const cancelEdit = (e) => {
  e.preventDefault()
  props.emptyS()
  setInput("")
}

return(
<div>
  <div className="d-flex align-items-center justify-content-center">
    <form className="d-flex align-items-center justify-content-center flex-column gap-2" style={{marginTop:"100px"}}>
        <h2>Add Your List Here <FaAngellist className="peaceIcon"/></h2>
        <div className="d-flex">
          <input onChange={(e) => setInput(e.target.value) } className="input text-dark" type="text" value={input} placeholder="Add items..."/>
        </div>
          <textarea onChange={(e) => setdescription(e.target.value) } className="text-dark input" rows="2" cols="50" placeholder="Description..." value={descriptions}></textarea>
        <div className="d-flex">
          <button onClick={cancelEdit} className={`text-dark ${dnone} me-4 button`} style={{width:"100px"}}>cancel edit</button>
          <Button disabled={isLoading} onClick={handleclick}>
            {!isLoading ? "Add" : "Adding..."}
            </Button>
        </div>
    </form>
  </div>
    <div>
        <Displaytodo task = {tasks}/>
    </div>
</div>

)
}

// getting the data from the state
const mapStateToProps = (state) => {
  return{
    value : state.value,
    id : state.id,
    description : state.description

  }
}

// empty the values from the state
const mapDispatchToStore = (dispatch) => {
  return {
    emptyS : () => dispatch(empty()),
  }
}

export default connect(mapStateToProps,mapDispatchToStore)(Todo)