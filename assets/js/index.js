$(function() {

    getdata()
})

function getdata() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.code !== 0) {
                return layui.msg('获取数据失败')
            }
            renderavatar(res.data)
        },

        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.code === 1 && res.responseJSON.message === '身份验证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = 'login.html'
        //     }

        // }
    })
}


function renderavatar(user) {



    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)


    var text = name[0].toUpperCase()
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(text).show()
    }


}



$('#close').on('click', function() {

    layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // console.log(11);
        localStorage.removeItem('token')
        location.href = 'login.html'

        layer.close(index);
    });

})