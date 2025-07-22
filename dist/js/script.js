/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */



document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: ["Логан", "Лига справедливости", "Ла-ла лэнд", "Одержимость", "Скотт Пилигрим против..."]
  };
  const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genr = poster.querySelector('.promo__genre'),
    listFilm = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    checkbox = addForm.querySelector('[type="checkbox"]'),
    promoDescr = document.querySelector('.promotion__descr');
  addForm.addEventListener('submit', event => {
    // addEventListener - позволяет реагировать на разные действия пользователя 
    //submit возникает, когда пользователь отправляет валидную форму

    event.preventDefault(); //  отменяет стандартное поведение браузера - перезагрузку

    let newFilm = addInput.value;
    const favorite = checkbox.checked;
    if (newFilm) {
      // чтобы в список не попадала пустая строка, создаем условие (если newFilm булиновое true, то выполняем след.действия:)

      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`; // если название больше чем 21 символ, вставляем троеточие
      }
      if (favorite) {
        console.log('Добавляем любимый фильм');
      }
      movieDB.movies.push(newFilm); // добавили к массиву (списку фильмов) фильм введеный пользователем.

      sortArr(movieDB.movies); /// Отсортировали полученный список

      createMoveList(movieDB.movies, listFilm);
    }
    event.target.reset(); // сброс клика (строки ввода)
  });

  // удаление блоков с рекламой
  const deleteAdv = () => {
    adv.forEach(item => {
      item.remove();
    });
  };
  deleteAdv(adv);
  // adv это псевдомассив, поэтому используем метод forEach

  // второй способ

  /* adv.forEach(function (item) {
      item.remove();
  }); */

  const makeChanges = () => {
    genr.textContent = 'драма'; // заменили "комедия" на "драма"

    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };
  makeChanges();
  const sortArr = arr => {
    arr.sort();
  };
  function createMoveList(films, parent) {
    parent.innerHTML = ""; // "" - пустая строка - вставили вместо кажного элемента
    sortArr(films);
    films.forEach((film, i) => {
      // при переборе массива movieDB.movies создаем колбек функцию с переменной  film и переменной i - номер фильма, который нужно добавить
      parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}.   ${film}  
                    <div class="delete"></div>
                </li>
            `;
    });

    // для удаления фильма из списка, при нажатии корзинки
    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createMoveList(films, parent);
      });
    });
  }
  createMoveList(movieDB.movies, listFilm);

  //Tabs

  const tabs = document.querySelectorAll('.promo__menu-item'),
    tabsContent = document.querySelectorAll('.promo__item'),
    tabsParent = document.querySelector('.promo__menu-list');
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('promo__menu-item_active');
    });
  }
  hideTabContent();
  showTabContent();
  function showTabContent(i = 0) {
    // (i)                    
    tabsContent[i].classList.add('show', 'fade'); //style.display = 'block';   //назначаем первому элементу tabsContent дисплей block
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('promo__menu-item_active'); //назначаем первому элементу tabs класс активности
  }

  //назначаем обработчик события клика
  tabsParent.addEventListener('click', event => {
    //передаем объект события event
    const target = event.target; // для сокращения кода создали переменную

    if (target && target.classList.contains('promo__menu-item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timert    

  const deadLine = '2025-12-31'; // дедлайн

  //функция разница между дедлайном и текущим временем

  function getTimeRemening(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / (1000 / 60) % 60), seconds = t / 1000 % 60;
    }
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  //функция установки часов на страницу   
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      //selector = .timer
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeIntarval = setInterval(updateClock, 1000);
    updateClock();

    //функция, которая обновляет таймер кажду секунду

    function updateClock() {
      const t = getTimeRemening(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeIntarval);
      }
    }
    ;
  }
  setClock('.timer', deadLine);

  //функция установки даты окончания акции

  function setDataDeadline(selector, deadlineStr) {
    const deadline = new Date(deadlineStr);
    const promoDescr = document.querySelector(selector);
    if (promoDescr) {
      const formattedDeadline = deadline.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long'
        //year: 'numeric'
      });
      promoDescr.innerHTML = promoDescr.innerHTML.replace(/Акция закончится[^<]*/, `Акция закончится ${formattedDeadline} в 00:00`);
    }
  }
  setDataDeadline('.promotion__descr', deadLine);

  //Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');
  //modalCloseBtn = document.querySelector('[data-close]');

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //убираем скролл страницы при открытом модальном окне    
    clearInterval(modalTimerId);
  }
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //добавляем скролл страницы при закрытии модального окна
  }

  //modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.hasAttribute('data-close')) {
      console.log('Закрываем модалку');
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimerId = setTimeout(openModal, 50000);
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  // window.addEventListener('scroll', showModalByScroll);

  // Forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    postData(item);
  });
  function postData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      //form.appendChild(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      fetch('server.php', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
          "Content-type": 'application/json'
        }
      }).then(data => data.text()).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>      
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  /* fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));
   */
  /* fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({name: "Alex"}),
      headers: {
          "Content-type": 'application/json'
      }
   })
    .then(response => response.json())
    .then(json => console.log(json))
  */
});

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
/******/ })()
;
//# sourceMappingURL=script.js.map