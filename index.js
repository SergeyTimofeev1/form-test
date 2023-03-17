// 'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form')

  const formSend = async e => {
    e.preventDefault()
    let error = formValidate(form)
    let formData = new FormData(form)

    if (error === 0) {
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        let result = await response.json()
        alert(result.message)
        form.reset()
      } else {
        alert('Ошибка')
      }
    } else {
      alert('Валидация не пройдена')
    }
  }

  const formValidate = form => {
    let error = 0
    let formReq = document.querySelectorAll('._req')

    formReq.forEach((input, i) => {
      formRemoveError(input)

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input)
          error++
        }
      } else {
        if (input.value == '') {
          formAddError(input)
          error++
        }
      }
    })
    return error
  }

  const formAddError = input => {
    input.classList.add('_error')
    input.parentElement.classList.add('_error')
  }

  const formRemoveError = input => {
    input.classList.remove('_error')
    input.parentElement.classList.remove('_error')
  }

  // проверка email
  const emailTest = input => {
    return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)
  }

  form.addEventListener('submit', formSend)
})
