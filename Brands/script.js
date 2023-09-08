
window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.tel'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });


    /* добавление атрибута disable */
    /* Email */

    const buttons = document.querySelectorAll('.btn')
    const btnsChange = document.querySelectorAll('.btn_change')

    buttons.forEach(function (tabsBtn) {
        tabsBtn.addEventListener('click', function (e) {
            let path = e.target.dataset.path;

            buttons.forEach(function (btn) {
                btn.classList.add('btn.is-close')
                document.querySelector(`[data-target="${path}"]`).disabled = true;
                document.querySelector(`[data-change="${path}"]`).classList.add('is-active');
            });
            e.target.classList.add('is-close');
      
        })
    })

    btnsChange.forEach(function (tabsBtn) {
        tabsBtn.addEventListener('click', function (e) {
            let path = e.target.dataset.change;

            btnsChange.forEach(function (btn) {
                btn.classList.remove('btn_change.is-active')
                document.querySelector(`[data-target="${path}"]`).disabled = false;
                document.querySelector(`[data-path="${path}"]`).classList.remove('is-close');
            });
            e.target.classList.remove('is-active');
      
        })
    })


    /* открывание списка */

    const selectMenu = document.querySelector('.select_menu')
    const listSelect = document.querySelector('.select_list')
    const arrow = document.querySelector('.select_arrow')

    selectMenu.addEventListener('click', () => {
        listSelect.classList.toggle('select_list__open')
        arrow.classList.toggle('select_arrow__up')
    })

});

