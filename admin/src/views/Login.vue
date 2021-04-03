<template>
 <div class="main-container">
  <div class="main-content">
   <div class="row">
    <div class="col-sm-10 col-sm-offset-1">
     <div class="login-container">
      <div class="center">
       <h1>
        <i class="ace-icon fa fa-leaf green"></i>
        <span class="orange">To Have </span>
        <span class="orange" id="id-text2">Video</span>
       </h1>
       <h4 class="blue" id="id-company-text">欢迎登录</h4>
      </div>

      <div class="space-6"></div>

      <div class="position-relative">
       <div id="login-box" class="login-box visible widget-box no-border">
        <div class="widget-body">
         <div class="widget-main">
          <h4 class="header blue lighter bigger">
           <i class="ace-icon fa fa-coffee green"></i>
           请输入账户信息进行登录
          </h4>

          <div class="space-6"></div>

          <form>
           <fieldset>
            <label class="block clearfix">
             <span class="block input-icon input-icon-right">
              <input
               type="text"
               class="form-control"
               placeholder="用户名"
               v-model="user.loginName"
              />
              <i class="ace-icon fa fa-user"></i>
             </span>
            </label>

            <label class="block clearfix">
             <span class="block input-icon input-icon-right">
              <input
               type="password"
               class="form-control"
               placeholder="密码"
               v-model="user.password"
              />
              <i class="ace-icon fa fa-lock"></i>
             </span>
            </label>

            <label class="block clearfix">
             <span class="block input-icon input-icon-right">
              <div class="input-group">
               <input
                v-model="user.imageCode"
                type="text"
                class="form-control"
                placeholder="验证码"
               />
               <span class="input-group-addon" id="basic-addon2">
                <img
                 v-on:click="loadImageCode()"
                 id="image-code"
                 alt="验证码"
                />
               </span>
              </div>
             </span>
            </label>

            <div class="clearfix">
             <label class="inline">
              <input type="checkbox" class="ace" v-model="remember" />
              <span class="lbl"> 记住 密码</span>
             </label>

             <button
              type="button"
              class="width-35 pull-right btn btn-sm btn-primary"
              @click="login()"
             >
              <i class="ace-icon fa fa-key"></i>
              <span class="bigger-110">登录</span>
             </button>
            </div>

            <div class="space-4"></div>
           </fieldset>
          </form>
         </div>
         <!-- /.widget-main -->
        </div>
        <!-- /.widget-body -->
       </div>
       <!-- /.login-box -->
      </div>
      <!-- /.position-relative -->
     </div>
    </div>
    <!-- /.col -->
   </div>
   <!-- /.row -->
  </div>
  <!-- /.main-content -->
 </div>
 <!-- /.main-container -->
</template>

<script>
export default {
 name: "login",
 //返回值
 data: function () {
  return {
   user: {},
   remember: true,
   imageCodeToken: "",
  };
 },
 mounted: function () {
  let _this = this;
  $("body").removeClass("no-skin");
  $("body").attr("class", "login-layout light-login");
  let rememberUser = LocalStorage.get("loginUser");
  if (rememberUser) {
   _this.user = rememberUser;
  }
  // 初始时加载一次验证码图片
  _this.loadImageCode();
 },
 methods: {
  login() {
   let _this = this;
   let md5 = hex_md5(_this.user.password);
   let rememberUser = LocalStorage.get("loginUser") || {};
   if (md5 != rememberUser.md5) {
    //对密码进行加密
    _this.user.password = hex_md5(_this.user.password + KEY);
   }
   _this.user.imageCodeToken = _this.imageCodeToken;
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/system/admin/user/login",
     //传参对象
     _this.user
    )
    .then(
     //响应结果
     (response) => {
      let resp = response.data;
      //保存成功
      if (resp.success) {
       let loginuser = resp.data;
       Tool.setLoginUser(loginuser);
       if (_this.remember) {
        let md5 = hex_md5(_this.user.password);
        LocalStorage.set("loginUser", {
         loginName: loginuser.loginName,
         password: _this.user.password,
         md5: md5,
        });
       } else {
        LocalStorage.set("loginUser", null);
       }
       this.$router.push("/welcome");
      } else {
       ToastMax.error(resp.message);
       _this.user.password = "";
       _this.loadImageCode();
       _this.user.imageCode = "";
      }
     }
    );
  },
  /**
   * 加载图形验证码
   */
  loadImageCode: function () {
   let _this = this;
   _this.imageCodeToken = Tool.uuid(8);
   $("#image-code").attr(
    "src",
    process.env.VUE_APP_SERVER +
     "/system/admin/kaptcha/image-code/" +
     _this.imageCodeToken
   );
  },
 },
};
</script>

<style scoped>
.input-group-addon {
 padding: 0;
}
</style>
