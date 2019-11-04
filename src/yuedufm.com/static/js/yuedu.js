(function($) {
    //弹出框
    $(document).on("click", "a[data-pop]", function(e) {
        e.preventDefault();
        var dom = $(this).data("pop");
        $("#"+dom).fadeIn(200, function() {
            $("body").css("overflow", "hidden");
            $(this).children(".pop-wp").animate({
                left: "50%"
            }, 200);
        });
    });
    //关闭弹出框
    $(document).on("click", ".pop-close", function(e) {
        e.preventDefault();
        var s = $(this);
        $("body").removeAttr("style");
        s.parent(".pop-wp").animate({
            left: "150%"
        }, 200, function() {
            s.parents(".pop").fadeOut(200, function() {
                s.parent(".pop-wp").css({"right": "auto", "left": "-50%"});
            });
        });
        clearInterval(intervalId);
    });
    //收集播放次数数据
    $(document).on("click", ".jp-play", function() {
        var pid = $(this).data("pid");
        if (pid) {
            $.post("/listen", {"podcast_id" : pid, _xsrf: getCookie("_xsrf")});
        }
    });
    //展开收起节目文字内容
    $(document).on("click", ".item-intro-more", function() {
        var $s = $(this),
            $intro = $s.prev();
        if ($intro.attr("style")) {
            $s.html('展开全文 <i class="fa fa-angle-down"></i>');
            $intro.removeAttr("style");
            $(".item-intro-hide").show();
        } else {
            $s.html('收起 <i class="fa fa-angle-up"></i>');
            $intro.css("height", "auto");
            $(".item-intro-hide").hide();
        }
    });
    //个人菜单
    $(document).on("click", ".my", function(e) {
        e.preventDefault();
        $(this).next().toggleClass("hide");
    });
    $(document).mouseup(function(e){
        if($(e.target).parent(".user-menu").length==0){
            $(".user-menu").addClass("hide");
        }
    });
    //用户退出
    $(document).on("click", "#signOut", function(e) {
        e.preventDefault();
        $.removeCookie("member", {path:'/'});
        $.removeCookie("username", {path:'/'});
        $.removeCookie("avatar", {path:'/'});
        $.get("/auth/signout", {_xsrf: getCookie("_xsrf")}, function() {
            writeUser("signout");
        });
    });
    function writeUser(t) {
        if (t == "signin") {
            userid = $.cookie("member");
            username = $.cookie("username");
            $(".mine").html('<div class="loged"><a href="javascript:;" class="my">'+username+' <i class="fa fa-angle-down"></i></a><div class="user-menu hide"><ul><li><a href="/user/'+userid+'/" target="_blank">个人主页</a></li><li><a href="/setting/base/" target="_blank">设置</a></li><li><a href="/auth/signout/" id="signOut" rel="nofollow">退出</a></li></ul></div></div>');
        } else if (t == "signout") {
            $(".mine").html('<div class="login"><a href="javascript:;" data-pop="login">登录</a><a href="javascript:;" data-pop="register">注册</a></div>');
        }
    }
    //赞节目
    $(document).on("click", "#item_digg", function(e) {
        e.preventDefault();
        var s = $(this);
        checkMember(function(c) {
            if (!c) {
                alert("请先登录！");
                return false;
            } else {
                var pid = s.data("pid"),
                    digg_count = parseInt(s.find("#digg_num").text());
                $.post("/podcast/digg", {item_id: pid, _xsrf: getCookie("_xsrf")}, function(data) {
                    if (!s.hasClass("cur")) { //赞
                        s.addClass("cur");
                        s.find(".item-s-tip").text("取消");
                        s.find("#digg_num").text(digg_count+1);
                    } else { //取消赞
                        s.removeClass("cur");
                        s.find(".item-s-tip").text("赞");
                        if (digg_count > 0) {
                            s.find("#digg_num").text(digg_count-1);
                        }
                    }
                });
            }
        });
    });
    //收藏节目
    $(document).on("click", "#item_collect", function(e) {
        e.preventDefault();
        var s = $(this);
        checkMember(function(c) {
            if (!c) {
                alert("请先登录！");
                return false;
            } else {
                var pid = s.data("pid"),
                    collect_count = parseInt(s.find("#collect_num").text());
                $.post("/podcast/collect", {item_id: pid, _xsrf: getCookie("_xsrf")}, function(data) {
                    if (!s.hasClass("cur")) { //收藏
                        s.addClass("cur");
                        s.find(".item-s-tip").text("取消");
                        s.find("#collect_num").text(collect_count+1);
                    } else { //取消赞
                        s.removeClass("cur");
                        s.find(".item-s-tip").text("收藏");
                        if (collect_count > 0) {
                            s.find("#collect_num").text(collect_count-1);
                        }
                    }
                });
            }
        });
    });
    //关注主播
    $(document).on("click", ".follow-link", function(e) {
        e.preventDefault();
        var s = $(this);
        checkMember(function(c) {
            if (!c) {
                alert("请先登录！");
                return false;
            } else {
                var uid = s.data("uid"),
                    fans = $(".fans-count"),
                    count = parseInt(fans.text());
                $.post("/follow", {author_id: uid, _xsrf: getCookie("_xsrf")}, function(data) {
                    if (!s.hasClass("followed")) {
                        s.addClass("followed").text("已关注");
                        fans.text(count+1);
                    } else {
                        s.removeClass("followed").text("关注");
                        if (count > 0) {
                            fans.text(count-1);
                        }
                    }
                });
            }
        });
    });
    //提交修改密码
    $(".getpwd-form").submit(function(e) {
        e.preventDefault();
        var s = $(this),
            url = s.attr("action"),
            btn = s.find("button"),
            mail = s.find("input[name='myemail']").val();
        if (mail) {
            var reg = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            if (!reg.test(mail)) {
                alert("请填写正确的邮箱格式。");
            } else {
                checkMail(mail, function(c) {
                    if (c == 1) {
                        $.post(url, {myemail: mail, _xsrf: getCookie("_xsrf")}, function(data) {
                            if (data) {
                                btn.attr("disabled", "disabled").text("重新提交(60)");
                                intervalId = setInterval("CountDown('resetpwd', '重新提交')",1000);
                                btn.after('<span> &nbsp; <i class="fa fa-check"></i>发送成功<span>');
                            }
                        });
                    } else {
                        alert("此邮箱尚未在悦读FM注册！");
                    }
                });
            }
        } else {
            alert("请填写您的注册邮箱。");
        }
        return false;
    })
    //重发激活邮件
    $(document).on("click", ".resend", function(e) {
        e.preventDefault();
        var s = $(this);
        $.post(s.data("url"), {_xsrf: getCookie("_xsrf")}, function(data) {
            if (data) {
                s.attr("disabled", "disabled");
                s.text("点此重发(60)");
                intervalId = setInterval("CountDown('resend', '点此重发')",1000);
                s.after('<span class="gray"> &nbsp; <i class="fa fa-check"></i>发送成功</span>');
            }
        });
    });
    //用户设置头图
    $(".set-toppic img").click(function() {
        var s = $(this),
            toutu = s.data("src");
        s.addClass("cur").siblings().removeClass("cur");
        s.siblings("input[name='toutu']").val(toutu);
    });
    //发表评论
    $(".comment-post").submit(function(e) {
        e.preventDefault();
        checkMember(function(c) {
            if (!c) {
                alert("请先登录！");
                return false;
            } else {
                var url = $(".comment-post").attr("action"),
                    comment = $(".comment-text").val(),
                    btn = $(".comment-btn");
                if (comment) {
                    btn.attr("disabled", "disabled").text("提交中…");
                    $.post(url, {detail: comment, _xsrf: getCookie("_xsrf")}, function(data) {
                        if (data) {
                            data = JSON.parse(data);
                            btn.removeAttr("disabled").text("评论");
                            $(".comment-text").val("");
                            var total = parseInt($(".comment-list").children(".tab").find("span").text());
                            $(".comment-list").children(".tab").find("span").text(total+1);
                            var htm = '<li><div class="comment-avatar fl"><a href="/user/'+data.userid+'/" target="_blank"><img src="'+data.avatar+'" /></a></div><div class="comment-c"><div class="comment-meta"><a href="/reply/delete?reply_id='+data.id+'" class="fr comment-delete"><i class="fa fa-remove"></i></a><a href="/user/'+data.userid+'/" class="comment-user" target="_blank">'+data.username+'</a>';
                            if (data.dj) {
                                htm += ' <a href="/join/" title="悦读FM主播" target="_blank" class="gray-link"><i class="fa fa-microphone"></i></a>';
                            }
                            if (data.qianming) {
                                htm += '<span>'+data.qianming+'</span>';
                            }
                            htm += '<span>'+data.postdate+'</span></div><div class="comment-p">'+data.detail+'</div></div></li>';
                            $(".comments-list").prepend(htm);
                            $(".comments-list").find(".no-comment").remove();
                        }
                    });
                } else {
                    alert("评论内容不能为空！");
                    return false;
                }
            }
        });
    });
    //删除评论
    $(document).on("click", ".comment-delete", function(e) {
        e.preventDefault();
        if (window.confirm("确定要删除您的这条评论吗？")) {
            var s = $(this);
            $.get(s.attr("href"), {_xsrf: getCookie("_xsrf")}, function() {
                s.parents("li").remove();
                var total = parseInt($(".comment-list").children(".tab").find("span").text());
                $(".comment-list").children(".tab").find("span").text(total-1);
                if ($(".comments-list li").length < 1) {
                    $(".comments-list").append('<div class="no-comment">暂无评论</div>');
                }
            });
        } else {
            return false;
        }
    });
    //评论翻页加载
    $(document).on("click", ".comment-pg a", function(e) {
        e.preventDefault();
        loadComments($(this).data("pg"));
    });
    $(document).on("click", ".signin-back", function() {
        $(this).parents(".reg-success").prev().show();
        $(this).parents(".reg-success").remove();
    });
    //修改个人信息检查用户昵称是否已被占用
    $(".setting-form").submit(function(e) {
        var s = $(this),
            input = s.find("#susername"),
            old = input.data("current"),
            now = input.val();
        if (now != old) {
            checkUsername(now, function(c) {
                if (c == 1) {
                    alert("此昵称已存在，请您选择其他昵称！");
                    e.preventDefault();
                    return false;
                }
            });
        }
    });
    //登录
    $("#loginForm").validate({
        errorPlacement: function(error, element) {
            $('#error_tip_'+ element[0].name).html(error);
        },
        errorElement: "span",
        onkeyup: false,
        focusInvalid: false,
        rules: {
            email: {
                required: true,
                email: true
            },
            lpassword: {
                required: true
            }
        },
        messages: {
            email: {
                required: "请输入注册邮箱",
                email: "请输入正确的邮箱格式"
            },
            lpassword: "请输入密码"
        },
        invalidHandler: function() {
            return false;
        },
        submitHandler: function(form) {
            var s = $(form),
                url = s.attr("action"),
                btn = s.children(".account-btn");
            btn.attr("disabled", "disabled").text("登录中…");
            var nextauto = s.find("input[name='nextauto']:checked").val(),
                lemail = s.find("input[name='email']").val(),
                lpwd = s.find("input[name='lpassword']").val();
            $.post(url, {lusername: lemail, lpassword: lpwd, _xsrf: getCookie("_xsrf")}, function(data) {
                if (data) {
                    data = JSON.parse(data);
                    btn.removeAttr("disabled").text("登 录");
                    if (data.exist == "a") {
                        $("#error_tip_email").html('<span class="error">此邮箱尚未注册</span>');
                    } else if (data.exist == "b") {
                        $("#error_tip_lpassword").html('<span class="error">密码错误</span>');
                    } else if (data.exist == "d") {
                        s.after('<div class="reg-success"><h3>您的邮箱尚未激活…</h3><p>请登录您的注册邮箱完成账号激活。</p><p>邮箱输错了？ <a href="javascript:;" class="signin-back red-link">点此返回</a></p><p>没收到邮件？ <button data-url="/rsendmail?email='+lemail+'" class="resend">点此重发</button></p></div>');
                        s.hide();
                    } else if (data.exist == "e") {
                        s.after('<div class="reg-success"><h3>抱歉，您的帐号已被管理员封禁</h3><p>如有疑问或需解封，请联系我们：<a href="http://yuedu.im/" target="_blank" class="red-link">yuedu.im</a></p></div>');
                        s.hide();
                    } else {
                        var exp;
                        if (nextauto) {
                            exp = 60;
                        } else {
                            exp = 2;
                        }
                        $.cookie("member", data.member, {expires: exp, path: '/'});
                        $.cookie("username", data.username, {expires: exp, path: '/'});
                        $.cookie("avatar", data.avatar, {expires: exp, path: '/'});
                        $("#error_tip_email").html('');
                        $("#error_tip_lpassword").html('');
                        s.siblings(".pop-close").trigger("click");
                        writeUser("signin");
                    }
                }
            });
            return false;
        }
    });
    //注册
    $("#registerForm").validate({
        errorPlacement: function(error, element) {
            $('#error_tip_'+ element[0].name).html(error);
        },
        errorElement: "span",
        onkeyup: false,
        focusInvalid: false,
        rules: {
            rusername: {
                required: true
            },
            remail: {
                required: true,
                email: true
            },
            rpassword: {
                required: true
            },
            repassword: {
                required: true,
                equalTo: "#rpassword"
            },
            angree: {
                required: true
            }
        },
        messages: {
            rusername: "请输入昵称",
            remail: {
                required: "请输入邮箱",
                email: "请输入正确的邮箱格式"
            },
            rpassword: "请输入密码",
            repassword: {
                required: "请再次输入密码",
                equalTo: "两次密码输入不一致"
            },
            angree: "请阅读并同意悦读FM使用协议"
        },
        submitHandler: function(form) {
            var s = $(form),
                url = s.attr("action"),
                btn = s.find(".account-btn"),
                uname = unescape(s.find("input[name='rusername']").val()),
                uemail = unescape(s.find("input[name='remail']").val()),
                upwd = s.find("input[name='rpassword']").val();
            btn.attr("disabled", "disabled").text("提交中…");
            checkUsername(uname, function(c) {
                if (c == 1) {
                    btn.removeAttr("disabled").text("注 册");
                    $("#error_tip_rusername").html('<span class="error">此昵称已被注册</span>');
                    return false;
                } else {
                    $("#error_tip_rusername").html('');
                    checkMail(uemail, function(c) {
                        if (c == 1) {
                            btn.removeAttr("disabled").text("注 册");
                            $("#error_tip_remail").html('<span class="error">此邮箱已被注册</span>');
                            return false;
                        } else {
                            $("#error_tip_remail").html('');
                            $.post("/auth/signup", {rusername: uname, remail: uemail, rpassword: upwd, _xsrf: getCookie("_xsrf")}, function(data) {
                                if (data) {
                                    btn.removeAttr("disabled").text("注 册");
                                    s.after('<div class="reg-success"><h3>注册成功，但是还差一步…</h3><p>请登录您的注册邮箱完成账号激活。</p><p>没收到邮件？ <button data-url="/rsendmail?email='+uemail+'" class="resend">点此重发</button></p></div>');
                                    s.hide();
                                }
                            });
                        }
                    });
                }
            });
            return false;
        }
    });
    //检测是否登录
    function checkMember(callback) {
        $.getJSON("/checkmember", function(data) {
            callback(data.exist);
        });
    }
    //检测用户名是否存在
    function checkUsername(uname, callback) {
        $.getJSON("/checkname", {name: uname}, function(data) {
            callback(data.exist);
        });
    }
    //检测邮箱是否存在
    function checkMail(mail, callback) {
        $.getJSON("/checkmail", {email: mail}, function(data) {
                callback(data.exist);
        });
    }
    function getCookie(name) {
        var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : undefined;
    }

    $.fn.citySelect=function(settings){
        if(this.length<1){return;};

        // 默认值
        settings=$.extend({
            url:null,
            prov:null,
            city:null,
            dist:null,
            nodata:null,
            required:true
        },settings);

        var box_obj=this;
        var prov_obj=box_obj.find(".prov");
        var city_obj=box_obj.find(".city");
        var dist_obj=box_obj.find(".dist");
        var prov_val=settings.prov;
        var city_val=settings.city;
        var dist_val=settings.dist;
        var select_prehtml=(settings.required) ? "" : "<option value=''>请选择</option>";
        var city_json;

        // 赋值市级函数
        var cityStart=function(){
            var prov_id=prov_obj.get(0).selectedIndex;
            if(!settings.required){
                prov_id--;
            };
            city_obj.empty().attr("disabled",true);
            dist_obj.empty().attr("disabled",true);

            if(prov_id<0||typeof(city_json.citylist[prov_id].c)=="undefined"){
                if(settings.nodata=="none"){
                    city_obj.css("display","none");
                    dist_obj.css("display","none");
                }else if(settings.nodata=="hidden"){
                    city_obj.css("visibility","hidden");
                    dist_obj.css("visibility","hidden");
                };
                return;
            };
            
            // 遍历赋值市级下拉列表
            temp_html=select_prehtml;
            $.each(city_json.citylist[prov_id].c,function(i,city){
                temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";
            });
            city_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
            distStart();
        };
        

        // 赋值地区（县）函数
        var distStart=function(){
            var prov_id=prov_obj.get(0).selectedIndex;
            var city_id=city_obj.get(0).selectedIndex;
            if(!settings.required){
                prov_id--;
                city_id--;
            };
            dist_obj.empty().attr("disabled",true);

            if(prov_id<0||city_id<0||typeof(city_json.citylist[prov_id].c[city_id].a)=="undefined"){
                if(settings.nodata=="none"){
                    dist_obj.css("display","none");
                }else if(settings.nodata=="hidden"){
                    dist_obj.css("visibility","hidden");
                };
                return;
            };
            
            // 遍历赋值市级下拉列表
            temp_html=select_prehtml;
            $.each(city_json.citylist[prov_id].c[city_id].a,function(i,dist){
                temp_html+="<option value='"+dist.s+"'>"+dist.s+"</option>";
            });
            dist_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
        };

        var init=function(){
            // 遍历赋值省份下拉列表
            temp_html=select_prehtml;
            $.each(city_json.citylist,function(i,prov){
                temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";
            });
            prov_obj.html(temp_html);

            // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
            setTimeout(function(){
                if(settings.prov!=null){
                    prov_obj.val(settings.prov);
                    cityStart();
                    setTimeout(function(){
                        if(settings.city!=null){
                            city_obj.val(settings.city);
                            distStart();
                            setTimeout(function(){
                                if(settings.dist!=null){
                                    dist_obj.val(settings.dist);
                                };
                            },1);
                        };
                    },1);
                };
            },1);

            // 选择省份时发生事件
            prov_obj.bind("change",function(){
                cityStart();
            });

            // 选择市级时发生事件
            city_obj.bind("change",function(){
                distStart();
            });
        };

        // 设置省市json数据
        if(typeof(settings.url)=="string"){
            $.getJSON(settings.url,function(json){
                city_json=json;
                init();
            });
        }else{
            city_json=settings.url;
            init();
        };
    };
    //相关节目
    Scroll(330);
    function Scroll(prew) {
        var $prev = $(".scroll-prev"),
            $next = $(".scroll-next"),
            $wp = $(".scroll-wp"),
            totalw = $wp.width();
            num = totalw/prew;
        $prev.addClass("none");
        if (num<=1) {
            $next.addClass("none");
        }
        $prev.click(function() {
            var $s = $(this);
            if (!$s.hasClass("none")) {
                var ml = parseInt($wp.css("margin-left"));
                if (!$wp.is(":animated")) {
                    $wp.animate({
                        marginLeft: ml+prew
                    }, 200, function() {
                        if (parseInt($wp.css("margin-left")) == 0) {
                            $s.addClass("none");
                        }
                    });
                }
                $next.removeClass("none");
            }
        });
        $next.click(function() {
            var $s = $(this);
            if (!$s.hasClass("none")) {
                    var ml = parseInt($wp.css("margin-left"));
                if (!$wp.is(":animated")) {
                    $wp.animate({
                        marginLeft: ml-prew
                    }, 200, function() {
                        if (totalw + (parseInt($wp.css("margin-left"))-prew) == 0) {
                            $s.addClass("none");
                        }
                    });
                }
                $prev.removeClass("none");
            }
        });
    };
    loadfm();
    //载入广告
    function loadfm(){
        var wrap = $(".fmad");
        $.getJSON("http://qingwenyi.com/fmadvertise/?jsoncallback=?",function(data) {
            if(data){
                var pimg=data.pimg,
                    purl=data.purl,
                    htm="";
                htm='<a href="'+purl+'" target="_blank"><img src="'+pimg+'" width="360px" height="236px"></a>';
                wrap.html(htm);
            };
        });
    };

    loadComments(1);
    //评论加载
    function loadComments(p) {
        var wrap = $(".comment-list"),
            listdom = wrap.find(".comments-list"),
            loading = $(".comments-loading");
        loading.fadeIn(100);
        $.getJSON("/reply/list", {item_id: wrap.data("pid"), pg: p, _xsrf: getCookie("_xsrf")}, function(data) {
            if (data) {
                var htm = "",
                    i,
                    j,
                    total = data.total,
                    pglen = data.pages,
                    current = data.current,
                    list = data.list,
                    len = list.length,
                    pghtm = "";
                wrap.children(".tab").find("span").text(total);
                if (total>0) {
                    for (i=0; i<len; i++) {
                        htm += '<li><div class="comment-avatar fl"><a href="/user/'+list[i].user_id+'/" target="_blank"><img src="'+list[i].user_avatar+'" /></a></div><div class="comment-c"><div class="comment-meta">';
                        if (getCookie("member") == list[i].user_id) {
                            htm += '<a href="/reply/delete?reply_id='+list[i].id+'" class="fr comment-delete"><i class="fa fa-remove"></i></a>';
                        }
                        htm += '<a href="/user/'+list[i].user_id+'/" class="comment-user" target="_blank">'+list[i].user+'</a>';
                        if (list[i].dj) {
                            htm += ' <a href="/join/" title="悦读FM主播" target="_blank" class="gray-link"><i class="fa fa-microphone"></i></a>';
                        }
                        if (list[i].qianming) {
                            htm += '<span>'+list[i].qianming+'</span>';
                        }
                        htm += '<span>'+list[i].postdate+'</span></div><div class="comment-p">'+list[i].detail+'</div></div></li>';
                    }
                    //添加上一页
                    if (p > 1) {
                        pghtm += '<a href="/comment/page/'+(current-1)+'" data-pg="'+(current-1)+'"><i class="fa fa-angle-left"></i> 上一页</a>';
                    }
                    //设置分页格式
                    var interval = 3,
                        start = Math.max(1, p - interval),
                        end = Math.min(p + interval, pglen);
                    if (p < (interval + 1)) {
                        end = (2 * interval + 1) > pglen ? pglen : (2 * interval + 1);
                    }
                    if ((p + interval) > pglen) {
                        start = (pglen - 2 * interval) < 1 ? 1 : (pglen - 2 * interval);
                    }
                    //生成页码
                    for (j=start; j<end+1; j++) {
                        if (j == p) {
                            pghtm += '<span class="cur">'+ p +'</span>';
                        } else {
                            pghtm += '<a href="/comment/page/'+j+'" data-pg="'+j+'">'+j+'</a>';
                        }
                    }
                    //添加下一页
                    if (p < pglen) {
                        pghtm += '<a href="/comment/page/'+(current+1)+'" data-pg="'+(current+1)+'">下一页 <i class="fa fa-angle-right"></i></a>';
                    }
                    listdom.html(htm);
                    if (pglen>1) {
                        if ($(".pg").length > 0) {
                            $(".pg").html(pghtm);
                        } else {
                            listdom.after('<div class="pg comment-pg">'+pghtm+'</div>');
                        }
                    }
                } else {
                    listdom.html('<div class="no-comment">暂无评论</div>');
                }
                loading.fadeOut(100);
            }
        });
    }
})(jQuery);
var leftSeconds = 60,
    intervalId;
function CountDown(dom, txt) {
    var s = $("."+dom);
    if(leftSeconds<=1){
        s.text(txt);
        s.removeAttr("disabled");
        s.siblings("span").remove();
        //clearInterval(intervalId);
        return;
    }
    leftSeconds--;
    s.text(txt+"("+leftSeconds+")");
}
function tipCheck(txt) {
    $("#checkFlash").fadeIn(200, function() {
        $(this).find(".pop-tip").html(txt+'，无法正常收听节目。<br /><a href="http://get.adobe.com/cn/flashplayer/" rel="nofollow" target="_blank" class="red-link">下载播放器</a> 或使用 <a href="http://rj.baidu.com/soft/detail/14744.html" rel="nofollow" target="_blank" class="red-link">谷歌浏览器</a> / <a href="http://se.360.cn/" rel="nofollow" target="_blank" class="red-link">360浏览器</a><br />Tip：此提示将一直存在，直到您能正常收听节目。');
        $("body").css("overflow", "hidden");
        $(this).children(".pop-wp").animate({
            left: "50%"
        }, 200);
    });
}
function flashChecker() {
    var hasFlash=0;　　　　//是否安装了flash
    var flashVersion=0;　　//flash版本
    if(document.all) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); 
        if(swf) {
            hasFlash=1;
            VSwf=swf.GetVariable("$version");
            flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]); 
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf=navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash=1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {f:hasFlash,v:flashVersion};
}