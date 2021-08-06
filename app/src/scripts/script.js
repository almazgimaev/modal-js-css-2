

const toHtml = task => `
  <div class="form-check"  id="id${task.idCheck}">
    <input class="form-check-input" type="checkbox" id="${task.idCheck}">
    <label class="form-check-label" for="flexCheckDefault" data-label="label${task.idCheck}" style="text-decoration: ${task.textDecoration}">
      ${task.text}
    </label>
  </div>
`



function render() {
  const html = tasks.map(toHtml).join('')
  document.querySelector('#taskList').innerHTML = html
}

render()



document.addEventListener('click', event => {
  
  const btnType = event.target.dataset.btn
  const labelType = event.target.dataset.label
  
  if(btnType === 'add') {
    event.preventDefault()
    // addList.open()
    $.addList()
      .then(() => {
        render()
      })
      .catch(() => {
        // TODO:
        console.log('canceledff.');
      })
  } else if (btnType === "delete") {
    event.preventDefault()
    $.deleteList()
      .then(() => {
      })
      .catch(() => {
        // TODO:
        console.log('canceled.');
      })
  } else if (labelType && labelType.match('label')) { 
      const labelId = +labelType.split('').slice(5, labelType.split('').length)
      // FIXME: понять как написать нормально и читаемо, иначе черт ногу сломит 

      const filteredTask = tasks.filter(task => task.idCheck === labelId)
      const filteredId = filteredTask[0].idCheck
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].idCheck === filteredId) {
          if (tasks[i].textDecoration == "line-through") {
            tasks[i].textDecoration = ''
          } else {
            tasks[i].textDecoration = "line-through"
          }
        }
      }
    
      render()

  }
    
})
