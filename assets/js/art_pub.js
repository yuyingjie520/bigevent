$(function() {

    var layer = layui.layer
    var form = layui.form
    initcate()
    initEditor()

    // 获取数据渲染下拉选择框
    function initcate() {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            // data: q,
            success: function(res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg('获取数据失败')
                }
                var str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)

                //此时选项框没有内容，使用此方法渲染选项列表
                form.render()
            }
        })

    }


    // 1. 初始化图片裁剪器 
    var $image = $('#image')
        // 2. 裁剪选项 
    var options = { aspectRatio: 400 / 280, preview: '.img-preview' }
        // 3. 初始化裁剪区域
    $image.cropper(options)



    $('#choose').on('click', function() {
        $('#upload').click()
    })


    $('#upload').on('change', function(e) {
        // 获取到文件的列表数组
        var files = e.target.files
            // 判断用户是否选择了文件
        if (files.length === 0) {
            return layer.msg('请选择文件')
        }
        //图片地址
        var file = files[0]
            // 根据文件，创建对应的 URL 地址
        var imgurl = URL.createObjectURL(file)

        $image.cropper('destroy')
            // 销毁旧的裁剪区域 
            .attr('src', imgurl)
            // 重新设置图片路径
            .cropper(options)
            // 重新初始化裁剪区域 

    })



    var art_state = '已发布'
    $('#save').on('click', function() {
        art_state = '草稿'
    })


    // 表单的提交

    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
            //创建FormData对象   获取表单数据
        var fd = new FormData($(this)[0])
            //追加state请求
        fd.append('state', art_state)


        $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        }).toBlob(function(blob) {
            // 将 Canvas 画布上的内容，转化为文件对象 
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中 
            fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求 

            pubarticle(fd)
        })


    })



    function pubarticle(fd) {

        $.ajax({
            method: 'POST',
            url: '/my/article/add ',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('发布失败')

                }

                layer.msg('发布成功')
                location.href = 'art_list.html'
            }
        })
    }
})