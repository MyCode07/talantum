
/*
   на странице листинга показывем/скрываем кнопку 'Найти' 
   при полном/пустом поле ввода 
*/
const searchUniversityInputs = document.querySelectorAll('.search__university-search input');
if (searchUniversityInputs) {
    searchUniversityInputs.forEach(input => {
        input.addEventListener('input', function () {
            if (input.value == '') {
                input.closest('form').querySelector('button').style.opacity = 0;
                input.closest('form').querySelector('button').style.pointerEvents = 'none';
            }
            else {
                input.closest('form').querySelector('button').style.opacity = 1;
                input.closest('form').querySelector('button').style.pointerEvents = 'all';
            }
        })
    });
}


/*
    работа с селектами по общему классу ._select
*/
const selects = document.querySelectorAll('._select');
let openTab = false;
let height = 0;
if (selects) {
    selects.forEach(sct => {
        const selectsBody = sct.querySelector('._select-body');
        const a = selectsBody.querySelectorAll('a');
        a.forEach(item => {
            height += item.getBoundingClientRect().height;
        })

        sct.addEventListener('click', function () {
            if (openTab == false) {
                sct.classList.add('_active');
                selectsBody.style.maxHeight = height + 10 + 'px';
                openTab = true;
            }
            else {
                sct.classList.remove('_active');
                selectsBody.style.maxHeight = 0;
                openTab = false;
            }
        })
    });

}

/*
   на стрниаце справочника развернут/свернуть расширенный поиск 
*/
const advensedSearchBtn = document.querySelector('.univer__search-advenced button');
const advancedSearch = document.querySelector('.univer__search-advenced-selects');
if (advensedSearchBtn) {
    advensedSearchBtn.addEventListener('click', function () {
        advensedSearchBtn.classList.toggle('_rotate')
        advancedSearch.classList.toggle('_active')
    })
}

/*
   на странице справочника при скролле фиксируем внизу страницы
   панель со сылкмани .univer__actions-horizontal
*/
const stickyUniverActions = document.querySelector('.univer__actions-horizontal');
const stickyUniverActionsParent = document.querySelector('.univer__actions-scroll-fix');
const footer = document.querySelector('footer');
window.addEventListener('scroll', function () {
    if (stickyUniverActions) {
        const stickyUniverActionsTop = stickyUniverActionsParent.getBoundingClientRect().top;
        const footerTop = footer.getBoundingClientRect().top

        if (stickyUniverActionsTop <= window.innerHeight) {
            stickyUniverActions.classList.add('_fixed');
        }
        else {
            stickyUniverActions.classList.remove('_fixed');
        }

        if (footerTop <= window.innerHeight) {
            stickyUniverActions.style.opacity = 0;
            stickyUniverActions.style.zIndex = -100;
        }
        else {
            stickyUniverActions.style.opacity = 1;
            stickyUniverActions.style.zIndex = 100;
        }
    }
})


/*
    на странице калькулятора маски полей ввода,
*/
const subjectPoints = document.querySelectorAll('.subject-grid input');
const totalpoints = document.querySelector('.total-points');
const maxSubjects = 4
if (subjectPoints) {
    subjectPoints.forEach(subject => {
        subject.addEventListener('input', function () {
            maskInputNumber(subject, true)

            // до 4-х предметов старт
            if (subject.value != '') {
                subject.classList.add('_full')
            }
            else {
                subject.classList.remove('_full')
            }

            const fullInputs = document.querySelectorAll('.subject-grid input._full');
            if (fullInputs.length >= maxSubjects) {
                subjectPoints.forEach(inp => {
                    if (!inp.classList.contains('_full')) {
                        inp.setAttribute('readonly', true)
                    }
                })
            }
            else {
                subjectPoints.forEach(inp => {
                    if (inp.hasAttribute('readonly')) {
                        inp.removeAttribute('readonly')
                    }
                })
            }

            calcTotalPoints(subjectPoints, dviPoints)
        })
    });
}

// суммирование баллов
function calcTotalPoints(subjectPoints, dviPoints) {
    let total = 0;
    let dviValue = +dviPoints.value
    total = total + dviValue

    totalpoints.value = total
    subjectPoints.forEach(inp => {
        if (inp.classList.contains('_full')) {
            total += +inp.value
        }
    })
    totalpoints.value = total
}

// считать баллы при воде в после ДВИ баллов
const dviPoints = document.querySelector('.subjects__results-form input[name="dvi-points"]');
if (dviPoints) {
    dviPoints.addEventListener('input', function () {
        calcTotalPoints(subjectPoints, dviPoints)
    })
}

/*
    маска для поля ввода: разрешено вводить только цыфры  и  нельзья начинать с 0
*/
function maskInputNumber(input, lenght_3 = false) {
    if (!/[0-9]/.test(input.value)) {
        input.value = ''
    }
    if (!/[^0]/.test(input.value)) {
        input.value = ''
    }

    // вводе чисел не болше 100 : если вводимое больше 100 - срезаем последнюю цыфру 
    if (lenght_3 == true && +input.value > 100) {
        input.value = input.value.slice(0, -1)
    }
}

// поле с процентом на будущее улучщение баллов
const addProcentToTotalPoints = document.querySelector('.subjects__results-form input[name="add-procent"]')
if (addProcentToTotalPoints) {
    addProcentToTotalPoints.addEventListener('input', function () {
        maskInputNumber(this, true)
    })
}
// поле с ДВИ баллом
const addPointsToTotalPoints = document.querySelector('.subjects__results-form input[name="dvi-points"]')
if (addPointsToTotalPoints) {
    addPointsToTotalPoints.addEventListener('input', function () {
        maskInputNumber(this)
    })
}


/*
    на странице калькулятора при активном чекбоксе 'Вы готовы сдавать экзамены в вузе?'
    активируем поле ввода балллов для ДВИ и наоборот
*/
const ekzamCheckboxBlock = document.querySelector('.dop-ekzameni');
const ekzamCheckbox = document.querySelector('.dop-ekzameni input');
const dvipoints = document.querySelector('.subjects__results-dvi');
if (ekzamCheckbox) {
    const dviPointsInput = document.querySelector('input[name="dvi-points"]');

    ekzamCheckbox.addEventListener('change', function () {
        if (!ekzamCheckbox.checked) {
            dvipoints.classList.remove('_active')
            dviPointsInput.setAttribute('readonly', true)
        }
        else {
            dvipoints.classList.add('_active')
            dviPointsInput.removeAttribute('readonly')
            dviPointsInput.focus();
        }
    })
}



// на странице результатов калькулятора маска для полей ввода баллов
const maskResultPointInputs = document.querySelectorAll('.select-row input.subject-points');
if (maskResultPointInputs) {
    maskResultPointInputs.forEach(input => {
        input.addEventListener('input', function () {
            maskInputNumber(input, true)
        })
    })
}

/*
   на странице результатов в фильтре при выборе
   направления вуза активируем селект названия вуза 
*/
const selectUniverDirection = document.querySelector('select[name="select-univer-direction"]')
const selectUniverName = document.querySelector('select[name="select-univer-name"]')
if (selectUniverDirection) {
    selectUniverDirection.addEventListener('change', function () {
        for (let i = 0; i < selectUniverDirection.length; i++) {
            if (selectUniverDirection.options[i].selected == true && selectUniverName.disabled == true) {
                selectUniverName.disabled = false
            }
        }
    })
}


/*
    слайдер преимуществ менше 1440px
*/
const advantagesSlider = document.querySelector('.advantages .swiper');

function silderAdvantages() {
    if (advantagesSlider && window.innerWidth <= 1140) {
        new Swiper('.advantages .swiper', {
            loop: true,
            slidesPerView: 'auto',
        })
    }
}
silderAdvantages()



function changeElementsPlace() {

    // на странице калькулятора мяняем рассположение чекбокса и поле ввода ДВИ баллов
    const subjectSelctFormTitle = document.querySelector('.subjects__results-title');
    if (subjectSelctFormTitle && window.innerWidth <= 767.98) {
        subjectSelctFormTitle.before(ekzamCheckboxBlock)
        subjectSelctFormTitle.before(dvipoints)
    }

    // на странице карточки вуза меняем рассположение адреса вуза ставим ее под назавнием вуза
    const univerAddress = document.querySelector('.address-change-place');
    if (univerAddress && window.innerWidth <= 767.98) {
        document.querySelector('.univer__body h1').after(univerAddress);
    }

    // на странице карточки вуза меняем рассположение минимальных баллов
    const minimumPoints = document.querySelector('.univer__information-points');
    if (minimumPoints && window.innerWidth <= 767.98) {
        document.querySelector('.univer__information').after(minimumPoints);
    }

    // На странице справочника меняем рассположение адреса вуза ставим ее под назавнием вуза
    const univerItem = document.querySelectorAll('.univer__item');
    if (univerItem) {
        univerItem.forEach(item => {
            item.querySelector('.univer__information').after(item.querySelector('.univer__item .univer__information-adress')); 

        })
    }
}
changeElementsPlace()

window.addEventListener('resize', () => {
    silderAdvantages(); 3
    changeElementsPlace();
})
