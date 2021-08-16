$(function() {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        samepwd: function(value) {
            if (value === $('[name=old_pwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=new_pwd]').val()) {
                return '两次密码不相同'
            }
        }
    })



    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'patch',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) {
                    return layer.msg('修改失败')
                }

                layer.msg('修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})