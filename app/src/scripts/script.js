

const toHtml = task => `
  <div class="form-check"  id="id${task.idCheck}">
    <input class="form-check-input" type="checkbox" id="${task.idCheck}">
    <label class="form-check-label" for="flexCheckDefault" data-btn="label${task.idCheck}">
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
  } 
})

let tasksList = document.getElementsByClassName('form-check-label')

for (let i = 0; i < tasksList.length; i++) {
  console.log(tasksList[i]);
  tasksList[i].addEventListener('click', el => {
    el.path[0].classList.toggle('line-through')
  })
}

