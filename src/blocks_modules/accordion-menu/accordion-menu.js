// import * as $ from 'jquery';
// TODO реализовать выпадание меню при нажатии на стрелку
// TODO Оптимизировать навешивание обработчика событий на стрелки
// TODO Закрытие аккордиона при нажатии в любое место
// $(function () {
//     var Accordion = function (el, multiple) {
//         this.el = el || {};
//         // more then one submenu open?
//         this.multiple = multiple || false;

//         var dropdownlink = this.el.find('.dropdownlink');
//         dropdownlink.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
//     };

//     Accordion.prototype.dropdown = function (e) {
//         var $el = e.data.el,
//             $this = $(this),
//             //this is the ul.submenuItems
//             $next = $this.next();
//         $next.slideToggle();

//         if (!e.data.multiple) {
//             //show only one menu at the same time
//             $el.find('.submenuItems').not($next).slideUp();
//         }
//     };

//     var accordion = new Accordion($('.accordion-menu'), false);
// });

let nontarget, nontarget2;
let dropdownlink = document.querySelectorAll('.dropdownlink');

dropdownlink.forEach((elem) => {
    elem.addEventListener('click', (event) => {
        let arrow = event.target.previousSibling;
        let submenuItems = event.target.nextSibling;
        // submenuItems.style.display = 'block';

        if (nontarget) {
            if (nontarget === arrow) {
                arrow.classList.toggle('_reverse_arrow');
                submenuItems.classList.toggle('visibility');
            } else {
                if (nontarget.classList.contains('_reverse_arrow')) {
                    nontarget.classList.toggle('_reverse_arrow');
                    nontarget2.classList.toggle('visibility');
                }
                arrow.classList.toggle('_reverse_arrow');
                submenuItems.classList.toggle('visibility');
            }
        } else {
            arrow.classList.toggle('_reverse_arrow');
            submenuItems.classList.toggle('visibility');
        }

        nontarget = arrow;
        nontarget2 = submenuItems;
    });
});
