export const edit = (task,id,des) => {
  console.log(des)
  return {
    type : "edit",
    payload : task,
    id : id,
    description : des
  }
}

export const empty = () => {
  return {
    type : "empty",
}
}