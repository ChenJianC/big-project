$('#link_reg').on('click',function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $('.login-box').hide()
    $('.reg-box').show()
})

$('#link_login').on('click',function () {
    // 点击去登录让 注册框隐藏，登录框显示
    $('.reg-box').hide()
    $('.login-box').show()
})

// 从 LayUI 中获取 form 对象
const form = layui.form

// 设置请求根路径
// const baseUrl = 'http://www.liulongbin.top:3007'

// 获取 layui 弹窗
const layer = layui.layer

form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: (val) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        const pwd = $(".reg-box [name=password").val();
        if(pwd !== val) return "两次密码不一致"
    },
});

// 监听注册表单，发送注册请求
$('#form_reg').on('submit',function (e) {
    // 阻止默认提交行为
    e.preventDefault()

    const data = $(this).serialize()

    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data,
        success: res => {
            const {message, status} = res
            if (status !== 0) return layer.msg(message)
            // 注册成功后跳转到登录界面
            $("#link_login").click()
        },
    })
})

// 监听登录表单，发送登录请求
$('#form_login').on('submit',function (e) {
    // 阻止默认提交行为
    e.preventDefault()

    const data = $(this).serialize()

    $.ajax({
        type: 'POST',
        url: '/api/login',
        data,
        success: res => {
            const {message, status, token} = res

            if (status !== 0) return layer.msg(message)
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem("token", res.token)
            // 跳转到主页
            location.href = "/index.html"
        },
    })
})