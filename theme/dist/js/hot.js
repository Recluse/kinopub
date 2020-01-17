function get_access_token(code, user_code, interval, notify) {
    interval = typeof interval !== 'undefined' ? interval : null;
    notify = typeof notify !== 'undefined' ? notify : false;
    console.log('getting access_token')
    $.ajax({
        method: "POST",
        url: endpoint + "/oauth2/device?grant_type=device_token&client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + code,
        success: function (data) {
            if (data.access_token) {
                localStorage.code = code
                localStorage.user_code = user_code
                localStorage.access_token = data.access_token
                localStorage.refresh_token = data.refresh_token
                localStorage.token_expires_in = parseInt($.now() / 1000) + parseInt(data.expires_in)

                if (interval) {
                    clearInterval(interval)
                }

                $('.device-modal-close').click()
                home()

                if (notify) {
                    $.ajax({
                        method: "POST",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + data.access_token);
                        },
                        url: endpoint + "/v1/device/notify",
                        success: function (data) {
                            console.log(data)
                        }
                    })
                }
            }
        }
    })
}

$(document).ready(function () {
    client_id = 'xbmc'
    client_secret = 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
    endpoint = 'https://api.service-kp.com'

    if (!localStorage.access_token) {
        $('.device-overlay').click()
        $.ajax({
            method: "POST",
            url: endpoint + "/oauth2/device?grant_type=device_code&client_id=" + client_id + "&client_secret=" + client_secret + "",
            success: function (data) {
                $('.device-modal-body h1').html(data.user_code)
                expires = parseInt(data.expires_in)
                timer = 0
                code = data.code
                user_code = data.user_code
                interval = setInterval(function () {
                    get_access_token(code, user_code, interval, true)
                    timer += parseInt(data.interval) * 1000
                    if (timer > expires * 1000) {
                        clearInterval(interval)
                        console.log('clear')
                    }
                }, parseInt(data.interval) * 1000)
            }
        })
    } else {
        if (localStorage.token_expires_in < parseInt($.now()/1000)) {
            if (localStorage.refresh_token) {
                console.log('refreshing access_token')
                $.ajax({
                    method: "POST",
                    url: endpoint + "/oauth2/device?grant_type=refresh_token&client_id=" + client_id + "&client_secret=" + client_secret + "&refresh_token=" + localStorage.refresh_token,
                    success: function (data) {
                        if (data.access_token) {
                            localStorage.access_token = data.access_token
                            localStorage.refresh_token = data.refresh_token
                            localStorage.token_expires_in = parseInt($.now() / 1000) + parseInt(data.expires_in)
                        }
                    }
                })
            }
        } else {
            hot()

            console.log(window.location.href)
        }
    }
})

function hot() {
    $.ajax({
        method: "GET",
        url: "https://api.service-kp.com/v1/items/hot?type=movie",
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.access_token);
        },
        success: function (data) {
            $.each(data.items, function (k, v) {
                if  (k < 18) {
                    var item = $('.content-item-tpl').clone()
                    item.removeClass('d-none')
                    item.removeClass('content-item-tpl')
                    item.find('.img').attr('src', v.posters.medium)
                    item.find('.title').html(v.title)
                    item.find('.info').html(v.year + ' ' + $.map(v.genres, function (obj) {
                        return obj.title
                    }).join(', '))
                    item.find('.thumbs-rate').html(v.rating_percentage)
                    item.find('.imbd-rate').html(v.imdb_rating)
                    item.find('.kp-rate').html(v.kinopoisk_rating)
                    item.find('a.arrow-nav').attr('tabindex', Math.floor(k / 6))
                    item.find('a.arrow-nav').attr('tabcolumn', k - Math.floor(k / 6) * 6)

                    $('.content-item-tpl').before(item)
                }
            })
            console.log(data)
        },
        error: function (data) {
        }
    })
}