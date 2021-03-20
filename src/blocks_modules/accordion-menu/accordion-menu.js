import * as $ from 'jquery';
// TODO переписать ве на чистый JS
// TODO реализовать выпадание меню при нажатии на стрелку
// TODO Оптимизировать навешивание обработчика событий на стрелки
// TODO Закрытие аккордиона при нажатии в любое место
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        // more then one submenu open?
        this.multiple = multiple || false;

        var dropdownlink = this.el.find('.dropdownlink');
        dropdownlink.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el,
            $this = $(this),
            //this is the ul.submenuItems
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            //show only one menu at the same time
            $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
        }
    };

    var accordion = new Accordion($('.accordion-menu'), false);
});

let nontarget;

document.querySelectorAll('.dropdownlink').forEach((elem) => {
    elem.addEventListener('click', (event) => {
        let list = event.target.previousSibling.classList;

        if (nontarget) {
            if (nontarget === list) {
                list.toggle('_reverse_arrow');
            } else {
                if (nontarget.contains('_reverse_arrow')) nontarget.toggle('_reverse_arrow');
                list.toggle('_reverse_arrow');
            }
        } else {
            list.toggle('_reverse_arrow');
        }

        nontarget = list;
    });
});
