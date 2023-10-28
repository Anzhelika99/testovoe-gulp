const form = document.getElementById("form");


const formValidate = (form) => {
  let error = 0; //Количество незаполненных полей

  let formReq = document.querySelectorAll("._req"); //собираю все необходимые поля
  const checkbox = document.querySelector(".checkbox__label");
  
  formReq.forEach((input) => {
    console.dir(input.id);
    removeErr(input); // сначала убираю стили

    if (input.classList.contains("_phone")) {
      //проверяю телефон регулярным выражением
      if (phoneTest(input)) {
        addErr(input);
        error++;
      }
    } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
      
      addErr(checkbox);
      error++;
    } else {
      if (input.value === "") {
        //проверяю, не пустое ли поле
        addErr(input);
        error++;
      }

    }
  });

  return error;
};

const formSend = async (e) => {
  e.preventDefault();

  let error = formValidate(form);

  if (error === 0) {
    //отправляю данные в php
    //let response = await fetch("send.php", {
    //  method: "POST",
    //  body: new FormData(form),
    //});

    //if (response.ok) {
      //const result = await response.json();

      form.reset();
    //}
  }
};

form.addEventListener("submit", formSend);

const phoneTest = (input) => {
  return !/^((\+7|7|8)+([0-9]){10})$/.test(input.value.trim());
};


const addErr = (elem) => {
  const label = document.querySelector(`label[for="${elem.id}"]`);

  if (label) {
    label.classList.add("_error-label");
    
  }

  elem.parentElement.classList.add("_error");
  elem.classList.add("_error");
};

const removeErr = (elem) => {
  const label = document.querySelector(`label[for="${elem.id}"]`);

  if (label) {
    label.classList.remove("_error-label");
  }
  elem.parentElement.classList.remove("_error");
  elem.classList.remove("_error");
};
