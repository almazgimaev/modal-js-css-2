let $ = {}
let tasks = [
  {idCheck: 1, text: "dsfasfdsdafsfd"},
  {idCheck: 2, text: "ыыцук"},
  {idCheck: 3, text: "фыаыв"},
  {idCheck: 4, text: "цкк3а3а"},
]
let countTask = tasks[tasks.length - 1].idCheck || 0
console.log('🚀 ~ countTask', countTask);


Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }
  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')

  buttons.forEach(btn => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add('btn')
    $btn.classList.add(`btn-${btn.type || 'secondary'}`)
    $btn.onclick = btn.handler || noop
    
    wrap.appendChild($btn)
  })

  return wrap
}

function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('gmodal')
  modal.insertAdjacentHTML("afterbegin", `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window">
        <div class="modal-header">
          <span class="h3"> ${options.title || 'title'} </span>
          <span class="modal-close" data-close="true"> &times; </span>
        </div>
        <div class="modal-content" data-content>
          ${options.content || 'nothing'}
        </div>
      </div>
    </div>
  `)
  document.body.appendChild(modal)

  const footer = _createFooter(options.footerButtons)
  footer.appendAfter(modal.querySelector("[data-content]"))
  
  return modal
}



$.modal = function(options) {
  const $modal = _createModal(options)
  let destroyed = false
  let closing = false

  
  const modal = {
    open() {
      if (destroyed) {
        return console.log('modal is destroyed');
      }
      !closing && $modal.classList.add('open')
    },
    close() {
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      setTimeout(() => {
        closing = false
        if (typeof options.onClose === 'function') {
          options.onClose()
        }
        $modal.classList.remove('hide')
      }, 200);
    }
  }


  const listener = event => {
    if (event.target.dataset.close) {
      modal.close()
    }
  }
  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      destroyed = true
    }
  })
}


$.addList = function(options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: 'Добавление задачи',
      content: `<textarea id="inputTask" class="input" placeholder="Введите задачу" style="width: 100%; padding: 5px 10px"></textarea>`,
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {text: 'Добавить', type: 'primary', handler() {
          const  inputTask = document.querySelector('#inputTask')
          countTask++;
          
          const addTask = () => {
            const currentCount = countTask
            const newTask = {idCheck: currentCount, text: inputTask.value}
            tasks.push(newTask)
          }
          addTask()
          resolve()
          modal.close()
        }},
        {text: 'Отмена', type: 'secondary', handler() {
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
                  if(tasks[i].idCheck == currentCheckboxesId[b]) {
                    tasks.splice(i,1)
                  }
                } 
              }
          }
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

