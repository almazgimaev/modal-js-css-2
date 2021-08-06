let tasks = [
  {idCheck: 1, text: "Задача №1. Помыть полы"},
  {idCheck: 2, text: "Задача №2. Вынести мусор"},
  {idCheck: 3, text: "Задача №3. Помыть посуду"},
  {idCheck: 4, text: "Задача №4. Завершить задачу с модальными окнамии на JS"},
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
