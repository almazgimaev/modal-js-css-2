$.addList = function(options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: 'Добавление задачи',
      content: `<textarea class="input" placeholder="Введите задачу" style="width: 100%; padding: 5px 10px"></textarea>`,
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {text: 'Добавить', type: 'primary', handler() {
          // TODO:
          console.log('здесь код дял добавления задачи в DOM');
          resolve()
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