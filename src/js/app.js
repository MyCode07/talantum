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

const advensedSearchBtn = document.querySelector('.univer__search-advenced button');
const advancedSearch = document.querySelector('.univer__search-advenced-selects');
if (advensedSearchBtn) {
    advensedSearchBtn.addEventListener('click', function () {
        advensedSearchBtn.classList.toggle('_rotate')
        advancedSearch.classList.toggle('_active')
    })
}

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


const subjectPoints = document.querySelectorAll('.subject-grid input');
const totalpoints = document.querySelector('.total-points');
let total = 0;
if (subjectPoints) {
    subjectPoints.forEach(subject => {
        subject.addEventListener('input', function () {

            maskInputNumber(subject)

            if (+subject.value > 100) {
                subject.value = subject.value.slice(0, -1)
            }

        })
    });
}

function maskInputNumber(input) {
    if (!/[^0]/.test(input.value)) {
        input.value = ''
    }
    if (!/[0-9]/.test(input.value)) {
        input.value = ''
    }
}

const ekzamCheckbox = document.querySelector('.dop-ekzameni input');
const dvipoints = document.querySelector('input[name="dvi-points"]');
if (ekzamCheckbox) {
    ekzamCheckbox.addEventListener('change', function () {
        if (ekzamCheckbox.checked) {
            dvipoints.setAttribute('readonly', true)
        }
        else {
            dvipoints.removeAttribute('readonly')
        }
    })
}

const addProcentToTotalPoints = document.querySelector('.subjects__results-form input[name="add-procent"]')
if (addProcentToTotalPoints) {
    addProcentToTotalPoints.addEventListener('input', function () {
        maskInputNumber(this)
    })
}

const addPointsToTotalPoints = document.querySelector('.subjects__results-form input[name="dvi-points"]')
if (addPointsToTotalPoints) {
    addPointsToTotalPoints.addEventListener('input', function () {
        maskInputNumber(this)
    })
}
