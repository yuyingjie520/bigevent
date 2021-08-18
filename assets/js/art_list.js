$(function() {
    var layer = layui.layer
    var form = layui.form

    var laypage = layui.laypage; //获取分页方法

    //提交数据要的参数
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }


    inittable()
    initcate()

    //渲染表格
    function inittable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                console.log(res);
                if (res.code !== 0) {
                    return layer.msg('获取数据失败')
                }
                var str = template('tpl-table', res)
                $('tbody').html(str)

                //页面渲染完即调用渲染页面方法，获取total总页数，做到同步
                renserBox(res.total)
            }
        })
    }

    //模板字符格式化时间
    template.defaults.imports.dataForm = function(date) {
        var dai = new Date(date)

        var y = dai.getFullYear()
        var m = pddzero(dai.getMonth())
        var d = pddzero(dai.getDay())

        var hh = pddzero(dai.getHours())
        var mm = pddzero(dai.getMinutes())
        var ss = pddzero(dai.getSeconds())


        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    function pddzero(n) {
        return n = n <= 10 ? '0' + n : n
    }


    //选择框获取数据
    function initcate() {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            data: q,
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

    //选择框渲染表格
    $('#form-search').on('submit', function(e) {
        e.preventDefault()

        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        //获取填写的值，调用最新的数据要求
        q.cate_id = cate_id
        q.state = state

        //提交表单后渲染页面
        inittable()
    })


    //渲染分页
    function renserBox(total) {
        laypage.render({
            elem: 'boxpage' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页数据
            curr: q.pagenum, //默认选中的页面

            //自定义排版。可选值有：count（总条目输区域）
            //prev（上一页区域）
            //page（分页区域）
            //next（下一页区域）
            //limit（条目选项区域）
            //refresh（页面刷新区域。注意：layui 2.3.0 新增） 
            //skip（快捷跳页区域）
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],

            //每页条数的选择项。如果 layout 参数开启了 limit，则会出现每页条数的select选择框
            limits: [1, 2, 3, 5],

            //触发jump回调的方式有两种：
            //1.点击页码的时候，会触发jump回调
            //2.只要调用了laypage.render（）方法，就会触发jump回调
            jump: function(res, first) {

                //可以通过first的值，来判断是通过那种方式
                //如果first的值为true，证明是方法2触发的
                //否则就是方式1触发的

                q.pagenum = res.curr
                q.pagesize = res.limit
                console.log(q.pagenum);
                if (!first) {
                    inittable()
                }

            }
        });
    };


    //删除
    $('tbody').on('click', '.btn-del', function() {

        //根据删除按钮判断是否还有文章
        var len = $('.btn-del').length
        console.log(len);


        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something

            $.ajax({
                method: 'delete',
                url: '/my/article/info?id=' + id,
                success: function(res) {
                    if (res.code !== 0) {
                        return layer.msg('删除失败')
                    }


                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    layer.msg('删除成功')
                    inittable()
                    layer.close(index);
                }
            })


        });
    })


    //修改
    $('tbody').on('click', '.change', function() {



        var id = $(this).attr('data-id')
        console.log(id);

        //do something

        // $.ajax({
        //     method: 'delete',
        //     url: '/my/article/info?id=' + id,
        //     success: function(res) {
        //         if (res.code !== 0) {
        //             return layer.msg('删除失败')
        //         }

        //         layer.msg('删除成功')
        //         inittable()
        //         layer.close(index);
        //     }
        // })



    })

})