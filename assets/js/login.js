$(function() {
    //表单的切换
    $('#reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()

    })


    //表单验证
    var form = layui.form
    var layer = layui.layer //可直接使用不赋值
        //verify方法
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var psd = $('.reg-box [name=password]').val()

            if (value !== psd) {
                return '两次密码不一致'
            }
        }
    })


    //注册表单
    $('#reg-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reg',
            // data: {
            //     username: $('#reg-form [name=username]').val(),
            //     password: $('#reg-form [name=password]').val(),
            //     repassword: $('#reg-form [name=repassword]').val()
            // },
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {

                    return layer.msg(res.message)

                }
                layer.msg('注册成功,请登录')
                $('#login').click()

            }
        })
    })


    //登录表单
    $('#login-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);

                if (res.code !== 0) {

                    return layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)

                location.href = 'index.html'


            }
        })
    })



})