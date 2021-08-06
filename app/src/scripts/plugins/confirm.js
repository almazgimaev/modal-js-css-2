function _findCurrentCheckboxes() {
  let allCheckboxes = document.getElementsByClassName('form-check-input')
  let currentCheckboxesId = []
  for (let i = 0; i < allCheckboxes.length; i++) {
    if (allCheckboxes[i].checked) {
      currentCheckboxesId.push(allCheckboxes[i].id)
    }
  }
  console.log(+currentCheckboxesId);
  for (let i = 0; i < tasks.length; i++) {
    for (let b = 0; b < currentCheckboxesId.length; b++) {
      if(tasks[i].idCheck === +currentCheckboxesId[b]) {
        tasks.splice(i,1)
      }
    } 
  }
}



$.deleteList = function(options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: 'Удаление задачи',
      content: 'Вы точно хотите удалить задачу?',
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {text: 'Удалить', type: 'danger', dataset: '', handler() {
          _findCurrentCheckboxes()
          console.log(tasks);
          render()
          resolve()
          modal.close()
        }},
        {text: 'Отмена', type: 'secondary', dataset: 'true', handler() {
          modal.close()
          reject()
        }}
      ]
    })


    setTimeout(() => {
      modal.open()
    }, 100);
  })  
}