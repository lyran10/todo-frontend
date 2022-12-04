import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"
import axios from "axios"
import { useEffect,useState } from "react"
import List from "./list.js"

// this function is to display all the list
export const Displaytodo = (props) => {
  const {task} = props// this porps is from todo component and is used in the dependencies of use effect so that it will render the updated data when tasks is updated
  const [to_do_data,setto_do_data] = useState("")
  const [boolean,setBoolean] = useState(false)
  const [id,setid] = useState()
  const [checkArray,setcheckArray] = useState([])

// function to get the data from the database
  const fetching = async () => {
    return await axios.get("http://localhost:4000/todo/getdata")
  }

  // fetch the updated data and store in to_do_data so that it will render whenever updated
  useEffect(() => {
    fetching()
      .then(data =>setto_do_data(data.data))
      .catch(error => console.log(`Could not fetch :${error}`))
  },[task])

  
// function to delete from the database by using the id
  const handleDelete = (id) => {
    let body = {task : parseInt(id)}
    axios.delete("http://localhost:4000/todo/delete",{data : body})
    .then(() => fetching().then(res => setto_do_data(res.data)))
    .catch(error =>console.log(error))
  }

 // handleDes function is when the task is clicked it will toggle the boolean and it setid to the id of the element and it will check if boolean is true and and id is equal to index it will display the description of that element *
  const handleDes = (e) => {
    setBoolean(!boolean)
    setid(e.target.id)
  }

  // if the e.target is checked it will store it inside checkArray and if unchecked it will remove from the array
  const handleCheck = (e) => { 
    if(e.target.checked){
      setcheckArray((prev) => {
        return [...prev,parseInt(e.target.id)]
      })
    }else{
      let filtered = checkArray.filter(ele => ele !== parseInt(e.target.id))
      setcheckArray(filtered)
    }
}

// if any checkbox is checked than a button will appear if click on that button it go to the data base and delete all the ones which are checked
const handleCheckList = () => {
  if(checkArray.length === 0){alert("no checked")}
  else{
    console.log(checkArray)
    axios.delete("http://localhost:4000/todo/checked",{data : {checkedBoxList : checkArray}})
    .then(() => fetching().then(res => setto_do_data(res.data)))
    .catch(error =>console.log(error))
    setcheckArray([])
  }
}
  return(
  <div>
    {to_do_data.length >= 1?<p className="text-center">Click on the task for Description</p>:null}
    <div className="d-flex justify-content-center gap-5 mt-5">
      <ul className="ul d-flex flex-column">
        <List to_do_data = {to_do_data} handleDelete = {handleDelete} handleCheck={handleCheck} handleDes={handleDes} id={id} boolean={boolean} setBoolean = {setBoolean} checkArray={checkArray}/>
      </ul>
    </div>
    <div className="d-flex justify-content-center">
    {checkArray.length >= 1?<button onClick={handleCheckList} className="text-dark">Remove Checked</button>:null}
    </div>
  </div>
  )
}