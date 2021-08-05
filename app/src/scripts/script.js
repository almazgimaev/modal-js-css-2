
// const addList = $.modal({
  //   title: 'Добавить задание',
  //   content: `<textarea class="input" placeholder="Введите задачу" style="width: 100%; padding: 5px 10px"></textarea>`,
  //   footerButtons: [
    //     {text: 'Добавить', type: 'primary', handler() {
      //       // TODO:
      //       console.log('здесь код дял добавления задачи в DOM');
      //     }},
      //     {text: 'Отмена', type: 'secondary', handler() {
        //       addList.close()
        //     }}
        //   ]
        // })
        


const toHtml = task => `
  <div class="form-check"  id="id${task.idCheck}">
    <input class="form-check-input" type="checkbox" id="${task.idCheck}">
    <label class="form-check-label" for="flexCheckDefault">
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

