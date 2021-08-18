$(function() {

    var form = layui.form

    function getArt() {

        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success: function(res) {
                console.log(res);

                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }

    getArt()


    var addindex = null
    $('#addBtn').on('click', function() {
        addindex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#addContent').html()
        });
    })

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/cate/add ',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg('添加失败')
                }
                getArt()
                layer.close(addindex)
            }
        })
    })


    var indexchange = null
    $('tbody').on('click', '#changeAdd', function(e) {
        indexchange = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#change').html()
        });

        var id = $(this).attr('data-id')
        console.log(id);

        $.ajax({
            method: 'get',
            url: '/my/cate/info?id=' + id,

            success: function(res) {
                console.log(res);



                return form.val('form-change', res.data)

            }
        })


    })


    $('body').on('submit', '#form-change', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'put',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                layer.close(indexchange)
                getArt()
            }
        })

    })


    $('body').on('click', '#delete', function() {

        var id = $(this).attr('data-id')

        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "delete",
                url: "/my/cate/del?id=" + id,


                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    getArt()
                }
            });


        });
    })


})