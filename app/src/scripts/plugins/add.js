
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