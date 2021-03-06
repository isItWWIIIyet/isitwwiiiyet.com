$(document).ready(function () {
    var $form = $('#mc-embedded-subscribe-form');
    if ($form.length > 0) {
        $form.find('input[type="submit"]').bind('click', function (event) {
            if (event) event.preventDefault();
            if (validate_input($form)) {
                $(this).attr('disabled', true)
                $form.find('.form-group.email').removeClass('has-warning')
                register($form);
            }
            else {
                $form.find('.form-group.email').addClass('has-warning')
            }
        });
    }
});

function validate_input($form) {
    return isEmail($form.find('input[type="email"]').val())
}

function isEmail(email) {
    // See http://rosskendall.com/blog/web/javascript-function-to-check-an-email-address-conforms-to-rfc822

    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
}

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'jsonp',
        jsonp: 'c',
        contentType: "application/json; charset=utf-8",
        error: function (err) { alert("Could not connect to the registration server. Please try again later."); },
        success: function (data) {
            if (data.result != "success") {
                $form.find('.form-group.email').addClass('has-danger')
            } else {
                $form.find('.form-group.email').addClass('has-success')
                $form.find('input[type="submit"]').attr('disabled', false);
                alert(data.msg);
                setTimeout(() => {
                    $form.find('.form-group.email #mce-EMAIL').val('');
                    $form.find('.form-group.email').removeClass('has-success')
                }, 1000);
            }
        }
    });
}