$(function() {


    var form = layui.form
    form.verify({

        nickname: function(value) {
            if (value.length > 6) {
                return '请输入1~6个字节'
            }
        }

    })


    getuser()

    function getuser() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(reg) {
                // console.log(res);
                if (reg.code !== 0) {
                    return layer.msg('获取信息错误')
                }

                form.val('formusername', reg.data)
            }
        })
    }

    $('#formreset').on('click', function(e) {
        e.preventDefault()
        getuser()
    })




    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'put',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(reg) {
                console.log(reg);

                if (reg.code !== 0) {
                    return layer.msg('更新失败')
                }

                layer.msg('更新成功！')
                window.parent.getdata()


            }
        })
    })


})