/*
   на странице листинга показывем/скрываем кнопку 'Найти' и список релузьтатов
   при полном/пустом поле ввода 
*/
const searchUniversityInputs = document.querySelectorAll('.search__university-search input');
if (searchUniversityInputs) {
    searchUniversityInputs.forEach(input => {

        // список результатов 
        const resultSelects = input.closest('.search__university-search').querySelector('.results-select')

        input.addEventListener('input', function () {
            if (input.value == '') {
                input.closest('form').querySelector('button').style.opacity = 0;
                input.closest('form').querySelector('button').style.pointerEvents = 'none';

                // при пустом поле поиска убираем атрибут
                if (input.hasAttribute('has-result')) {
                    input.removeAttribute('has-result')
                }

                resultSelects.style.display = 'none'
            }
            else {
                input.closest('form').querySelector('button').style.opacity = 1;
                input.closest('form').querySelector('button').style.pointerEvents = 'all';

                // что-то из списка выбрано у инпута есть этот атрибут и список больше не показываем
                if (input.hasAttribute('has-result')) {
                    resultSelects.style.display = 'none'
                }
                else {
                    resultSelects.style.display = 'block'
                }
            }
        })
    });
}

/*
     на странице листинга и на странице справочника
     при клике на пункт из выпадающего списка записываем его текст в поле поиска
*/

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('result-select__item')) {
        preventDefault(e);
        const input = targetEl.closest('div').querySelector('input');
        input.value = targetEl.textContent;
        input.setAttribute('has-result', true);

        targetEl.closest('.results-select').style.display = 'none';
    }
})

function preventDefault(e) {
    e.preventDefault();
}


/*
   на странице справочника показывем/скрываем список релузьтатов
   при полном/пустом поле ввода 
*/
const univerSearchInput = document.querySelector('.univer__search input');
if (univerSearchInput) {
    const resultSelects = document.querySelector('.univer__search').querySelector('.results-select')
    univerSearchInput.addEventListener('input', function () {
        if (univerSearchInput.value == '') {
            resultSelects.style.display = 'none'

            if (univerSearchInput.hasAttribute('has-result')) {
                univerSearchInput.removeAttribute('has-result')
            }
        }
        else {
            if (univerSearchInput.hasAttribute('has-result')) {
                resultSelects.style.display = 'none'
            }
            else {
                resultSelects.style.display = 'block'
            }
        }
    })
}



/*
   на странице листинга в мобильной версии
   в экран не помещаятся placeholder поэтому делаем кастомный вариант
*/

function customInutPlaceholder() {
    const customPlaceholder = document.querySelector('.search__university-search span.data-placeholder');
    const customPlaceholderInput = document.querySelector('.search__university-search input[name="university-profession"]');

    if (customPlaceholder && window.innerWidth <= 475) {
        const placeholderText = customPlaceholderInput.placeholder;
        customPlaceholder.textContent = placeholderText
        customPlaceholderInput.placeholder = ''

        customPlaceholderInput.addEventListener('input', function () {
            if (customPlaceholderInput.value == '') {
                customPlaceholder.style.display = 'block';
            }
            else {
                customPlaceholder.style.display = 'none';
            }
        })
    }

}
customInutPlaceholder();



/*
    работа с селектами (показать скрыть список селектов на странице спавочника) 
    по общему классу ._select
*/
function selectActionS() {
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
}
selectActionS()



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

    total = total + +dviValue

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

        // посчитать в пк версии
        if (window.innerWidth > 767.98) {
            calcTotalPoints(subjectPoints, dviPoints)
        }
        else {
            // посчитать в мобильной версии
            const allSubjectSelectInputs = document.querySelectorAll('.select-subjects .select-row input');
            calcTotalPoints(allSubjectSelectInputs, dviPoints)
        }
    })
}



/*
    маска для поля ввода: разрешено вводить только цыфры  и  нельзья начинать с 0
*/
function maskInputNumber(input, lenght_3 = false) {
    input.value = input.value.replace(/\D/gi, '')
    input.value = input.value.replace(/^[0]/gi, '')
    input.value = input.value.replace(/\s+/gi, '')

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



// суммирование баллов мобильная версия
function calcTotalPointsmobile(selectInputs) {
    if (selectInputs) {
        selectInputs.forEach(input => {
            input.addEventListener('input', function () {
                maskInputNumber(input, true)

                if (input.value != '') {
                    input.classList.add('_full')
                }
                else {
                    input.classList.remove('_full')
                }

                calcTotalPoints(selectInputs, dviPoints)
            })
        })
    }
}
const subjectSelectInputs = document.querySelectorAll('.select-subjects .select-row input');
calcTotalPointsmobile(subjectSelectInputs);



// добавление новых селектов предметов в калкуляторе 
function addNewSelecSubjects() {
    const subjectsSelectBody = document.querySelector('.select-subjects__body');
    const addSubjectsSelectRowBtn = document.querySelector('.select-subjects__add-select');
    let addSubjectsStart = 0;
    const addMaxSubjectsCount = 1;

    if (addSubjectsSelectRowBtn) {

        const newSelectRow =
            `<div class="select-row">
            <select>
                <option value="" disabled selected hidden>выберите предмет</option>
                <option value="Математика">Математика</option>
                <option value="Математика">Русский язык</option>
                <option value="Математика">История</option>
                <option value="Математика">Обществознание</option>
                <option value="Математика">Английский язык</option>
                <option value="Математика">Физика</option>
                <option value="Математика">Биология</option>
                <option value="Математика">Литература</option>
                <option value="Математика">География</option>
                <option value="Математика">Информатика</option>
                <option value="Математика">Химия</option>
            </select>
            <input type="text" placeholder="баллы">
        </div> `;

        addSubjectsSelectRowBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (!addSubjectsSelectRowBtn.hasAttribute('disabled')) {
                if (addSubjectsStart < addMaxSubjectsCount) {
                    subjectsSelectBody.insertAdjacentHTML('beforeend', newSelectRow)
                    addSubjectsStart++
                }
                setTimeout(() => {
                    if (addSubjectsStart == addMaxSubjectsCount) {
                        addSubjectsSelectRowBtn.setAttribute('disabled', 'disabled')
                    }
                }, 300);
                const allSubjectSelectInputs = document.querySelectorAll('.select-subjects .select-row input');
                calcTotalPointsmobile(allSubjectSelectInputs);
            }
        })
    }
}
addNewSelecSubjects()



// добавление новых селектов предметов в результатах калькулятора
function addNewSubjectsIntoResultsFilter() {
    const resultSubjectsSelectBody = document.querySelector('.change__result-points-row');
    const addResultSubjectsSelectRowBtn = document.querySelector('.select-row__add-row');
    let addResultSubjectsStart = 0;
    const addMaxResultSubjectsCount = 1;

    if (addResultSubjectsSelectRowBtn) {
        const newSelectRow =
            `<div class="select-row">
            <select>
                <option value="Математика selected">Математика</option>
                <option value="Математика">Русский язык</option>
                <option value="Математика">История</option>
                <option value="Математика">Обществознание</option>
                <option value="Математика">Английский язык</option>
                <option value="Математика">Физика</option>
                <option value="Математика">Биология</option>
                <option value="Математика">Литература</option>
                <option value="Математика">География</option>
                <option value="Математика">Информатика</option>
                <option value="Математика">Химия</option>
            </select>
            <input type="text" placeholder="77">
        </div> `;

        addResultSubjectsSelectRowBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (!addResultSubjectsSelectRowBtn.hasAttribute('disabled')) {
                if (addResultSubjectsStart < addMaxResultSubjectsCount) {
                    resultSubjectsSelectBody.insertAdjacentHTML('beforeend', newSelectRow)
                    addResultSubjectsStart++
                }
                setTimeout(() => {
                    if (addResultSubjectsStart == addMaxResultSubjectsCount) {
                        addResultSubjectsSelectRowBtn.setAttribute('disabled', 'disabled')
                    }
                }, 300);
                const allSubjectSelectInputs = document.querySelectorAll('.select-subjects .select-row input');
                calcTotalPointsmobile(allSubjectSelectInputs);
            }
        })
    }
}
addNewSubjectsIntoResultsFilter();



/*
    на странице калькулятора при активном чекбоксе 'Вы готовы сдавать экзамены в вузе?'
    активируем поле ввода балллов для ДВИ и наоборот
*/
const ekzamCheckbox = document.querySelector('.dop-ekzameni input');
const dvipoints = document.querySelector('.subjects__results-dvi');
const ekzamCheckboxMobile = document.querySelector('.dop-ekzameni__mobile input');
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

    ekzamCheckboxMobile.addEventListener('change', function () {
        if (!ekzamCheckboxMobile.checked) {
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
   на странице результатов в сайдбаре при выборе
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
   на странице результатов в мобильной версии
   открываем сайдбаре при клике на кнопку
*/

const openResultsFilterBtn = document.querySelector('.change__result-mobile-bar button');
const resultsFilterMobile = document.querySelector('.change__result-mobile-open');
if (openResultsFilterBtn) {
    openResultsFilterBtn.addEventListener('click', function () {
        openResultsFilterBtn.classList.toggle('_active');
        resultsFilterMobile.classList.toggle('_open');
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



// открыть мобильную попап форму при клике
const openPopopFormBnts = document.querySelectorAll('._open-popup-form');
const popupForm = document.querySelector('.popup__form');
const body = document.body;

if (popupForm) {
    let windowWidth = 767.98;
    openPopopFormBnts.forEach(btn => {
        btn.addEventListener('click', function (e) {

            if (btn.dataset.width) {
                windowWidth = 992
            }

            if (window.innerWidth <= windowWidth) {
                e.preventDefault();
                popupForm.classList.add('_open')
                body.classList.add('open-modal')
            }

        })
    })

    // закрыть мобильную попап форму при клике
    const popupFormClose = document.querySelector('.popup__form-close');
    const popupFormOverlay = document.querySelector('.popup__form-overlay');

    popupFormClose.addEventListener('click', function () {
        popupForm.classList.remove('_open')
        body.classList.remove('open-modal')
    })
    popupFormOverlay.addEventListener('click', function () {
        popupForm.classList.remove('_open')
        body.classList.remove('open-modal')
    })
}

// фильтр по годам на странице професии

const yearTabs = document.querySelectorAll('.univer__profession-years li a');
const professionSearchResults = document.querySelectorAll('.univer__search-results-year');
if (yearTabs) {
    yearTabs.forEach(year => {
        year.addEventListener('click', function (e) {
            e.preventDefault();

            let dataYear = year.dataset.year;

            yearTabs.forEach(year => {
                if (year.classList.contains('current-year')) {
                    year.classList.remove('current-year')
                }
            })
            year.classList.add('current-year')

            professionSearchResults.forEach(result => {
                if (result.dataset.year == dataYear) {
                    result.classList.add('current-year')
                }
                else {
                    result.classList.remove('current-year')
                }
            })
        })
    })
}

const windowHeight = window.innerHeight;
function changeElementsPlace() {
    /*  на странице калькулятора мяняем рассположение чекбокса и поле ввода
        ДВИ баллов только при определнных резрешениях и при горизонтальном изменении экран девайса
    */

    if (window.innerHeight == windowHeight) {
        const subjectSelctFormTitle = document.querySelector('.subjects__results-title');
        if (subjectSelctFormTitle && window.innerWidth <= 767.98) {
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
        if (univerItem && window.innerWidth <= 767.98) {
            univerItem.forEach(item => {
                item.querySelector('.univer__information').after(item.querySelector('.univer__item .univer__information-adress'));
            })
        }

        // на странице картоцйки профеции меням рассположение сайдбара ставим результатом
        const aside = document.querySelector('.univer__aside');
        if (aside && window.innerWidth <= 992) {
            document.querySelector('.profession__search-results').after(aside)
        }
    }
}
changeElementsPlace()

window.addEventListener('resize', () => {
    silderAdvantages();
    changeElementsPlace();
})


// меню пк версии
const openMenuButtons = document.querySelectorAll('.menu-js');
if (openMenuButtons) {
    openMenuButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelector('body').classList.toggle('menuopen');
        })
    })

}



// фиксация шапки при прокрутке
const header = document.querySelector('.header');
window.addEventListener('scroll', function () {
    if (header && window.innerWidth > 767.98) {

        const height = header.getBoundingClientRect().height;

        if (window.scrollY >= height) {
            header.classList.add('scroll')
        }
        else {
            header.classList.remove('scroll')
        }
    }
})


// табы на странице спаравочника

const searchUniverTabs = document.querySelectorAll('.univer__tabs a');
if (searchUniverTabs) {
    const selectMore = document.querySelector('.tab-select');
    const selectTitle = document.querySelector('.tab-select ._select-title');
    searchUniverTabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();


            searchUniverTabs.forEach(item => {
                if (item.classList.contains('_choosed')) {
                    item.classList.remove('_choosed')
                }
            })
            if (!tab.closest('.tab-select')) {
                if (selectMore.classList.contains('_active')) {
                    selectMore.classList.remove('_active')
                }
                if (selectMore.classList.contains('_choosed')) {
                    selectMore.classList.remove('_choosed')
                    selectTitle.textContent = selectTitle.dataset.title
                }
                tab.classList.add('_choosed')
            }
        })
    })
}

const selectTabs = document.querySelectorAll('._select a');
const reseFilter = document.querySelector('.univer__serach-reset');
if (selectTabs) {
    selectTabs.forEach(tab => {
        const select = tab.closest('._select')
        tab.addEventListener('click', function (e) {
            e.preventDefault();

            select.querySelectorAll('a').forEach(item => {
                if (item.classList.contains('_choosed')) {
                    item.classList.remove('_choosed')
                }
            })

            tab.classList.add('_choosed')
            select.querySelector('._select-title').textContent = tab.textContent
            select.classList.add('_choosed');

            // фильтр на странице справочника

            if (tab.closest('.univer__search-advenced-selects')) {
                reseFilter.classList.add('_active')
            }
        })
    })
}

// фильтр на странице справочника
const reseFilterBtn = document.querySelector('.reset-filter');
if (reseFilterBtn) {
    reseFilterBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const activeSelects = document.querySelectorAll('.advenced-select._choosed');

        if (activeSelects) {
            activeSelects.forEach(select => {
                select.classList.remove('_choosed')

                select.querySelectorAll('a._choosed').forEach(selectItem => {
                    selectItem.classList.remove('_choosed')
                })
            })

            setTimeout(() => {
                reseFilter.classList.remove('_active')
            }, 500);
        }
    })
}



// удалить - это для навигации по страницам
const closeNav = document.querySelector('.nav__close');
if (closeNav) {
    closeNav.addEventListener('click', function () {
        document.querySelector('.nav').classList.toggle('_close');
    })
}