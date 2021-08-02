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
          // TODO:
          console.log('здесь код для удаления задач из DOM');
          resolve()
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