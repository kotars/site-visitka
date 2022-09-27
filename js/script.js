window.addEventListener("DOMContentLoaded", () => {
    let u = document.querySelector(".form__elements").querySelector('input[type="tel"]');
    new Inputmask("+7 (999) 999-99-99").mask(u), new JustValidate(".form__elements").addField("#name", [{
        rule: "minLength",
        value: 2,
        errorMessage: "Количество символов меньше 2!"
    }, {
        rule: "maxLength",
        value: 30,
        errorMessage: "Количество символов больше 30!"
    }, {
        rule: "required",
        value: !0,
        errorMessage: "Введите имя"
    }]).addField("#telephone", [{
        rule: "required",
        value: !0,
        errorMessage: "Введите номер телефона"
    }, {
        rule: "function",
        validator: function () {
            return 10 === u.inputmask.unmaskedvalue().length
        },
        errorMessage: "Введите корректный номер телефона"
    }]).onSuccess(e => {
        if (document.querySelector("#check").checked) {
            let t = e => fetch("mail.php", {
                    method: "POST",
                    body: JSON.stringify(e),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(e => e.json()),
                l = new FormData(e.target),
                o = {};
            l.forEach((e, t) => {
                o[t] = e
            }), t(o).then(e => {
                console.log("Письмо отправилось")
            }), e.target.reset(), document.querySelector("#item").classList.remove("form__item--active")
        } else document.querySelector("#item").classList.add("form__item--active")
    });
});