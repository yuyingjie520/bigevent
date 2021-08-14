$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://www.liulongbin.top:3008' + options.url



        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }

        }

        options.complete = function(res) {
            console.log(res);
            if (res.responseJSON.code === 1 && res.responseJSON.message === '身份验证失败！') {
                localStorage.removeItem('token');
                location.href = 'login.html'
            }

        }







    })







})