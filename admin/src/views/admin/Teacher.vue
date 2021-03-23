<template>
 <div>
  <p>
   <!-- 新增按钮 -->
   <button class="btn btn-white btn-default btn-round" @click="toadd()">
    <i class="ace-icon fa fa-edit"></i>新 增
   </button>
   &nbsp;
   <!-- 刷新按钮 -->
   <button class="btn btn-white btn-default btn-round" @click="list(1)">
    <i class="ace-icon fa fa-refresh"></i>刷 新
   </button>
  </p>
  <!-- 分页 -->
  <pagination ref="pagination" v-bind:list="list"></pagination>
  <!-- 讲师展示 -->
  <div class="row">
   <div v-for="teacher in teachers" v-bind:key="teacher.id" class="col-md-3">
    <div>
     <span class="profile-picture">
      <img
       v-show="!teacher.image"
       class="editable img-responsive editable-click editable-empty"
       src="/static/image/讲师头像/头像1.jpg"
       v-bind:title="teacher.intro"
      />
      <img
       v-show="teacher.image"
       class="editable img-responsive editable-click editable-empty"
       v-bind:src="teacher.image"
       v-bind:title="teacher.intro"
      />
     </span>

     <div class="space-4"></div>

     <div
      class="width-85 label label-info label-xlg arrowed-in arrowed-in-right"
     >
      <div class="inline position-relative">
       <a
        href="javascript:;"
        class="user-title-label dropdown-toggle"
        data-toggle="dropdown"
       >
        <i class="ace-icon fa fa-circle light-green"></i>
        &nbsp;
        <span class="white">{{ teacher.position }}</span>
       </a>
      </div>
     </div>
    </div>

    <div class="space-6"></div>

    <div class="text-center">
     <a
      href="javascript:;"
      class="text-info bigger-110"
      v-bind:title="teacher.motto"
     >
      <i class="ace-icon fa fa-user"></i>
      {{ teacher.name }}【{{ teacher.nickname }}】
     </a>
    </div>

    <div class="space-6"></div>

    <div class="profile-social-links align-center">
     <button v-on:click="toupdate(teacher)" class="btn btn-xs btn-info">
      <i class="ace-icon fa fa-pencil bigger-120"></i>
     </button>
     &nbsp;
     <button v-on:click="del(teacher.id)" class="btn btn-xs btn-danger">
      <i class="ace-icon fa fa-trash-o bigger-120"></i>
     </button>
    </div>

    <div class="hr hr16 dotted"></div>
   </div>
  </div>
  <!-- 新增模态框 -->
  <div id="teacher-add-model" class="modal fade" tabindex="-1" role="dialog">
   <div class="modal-dialog" role="document">
    <div class="modal-content">
     <div class="modal-header">
      <button
       type="button"
       class="close"
       data-dismiss="modal"
       aria-label="Close"
      >
       <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title">表单</h4>
     </div>
     <div class="modal-body">
      <!-- 新增表单 -->
      <form class="form-horizontal">
       <div class="form-group">
        <label class="col-sm-2 control-label">id</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="id"
          v-model="teacher.id"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">姓名</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="姓名"
          v-model="teacher.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">昵称</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="昵称"
          v-model="teacher.nickname"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">头像</label>
        <div class="col-sm-10">
         <!-- 上传头像按钮 -->
         <button
          type="button"
          class="btn btn-white btn-default btn-round"
          @click="selectImage()"
         >
          <i class="ace-icon fa fa-upload"></i>上传头像
         </button>
         <input
          id="uploadImage1"
          type="file"
          class="form-control file-upload-input hidden"
          placeholder="头像"
          v-on:change="uploadImage1()"
         />
         <div v-show="teacher.image" class="row">
          <div class="col-md-4">
           <img v-bind:src="teacher.image" class="img-responsive" />
          </div>
         </div>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">职位</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="职位"
          v-model="teacher.position"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">座右铭</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="座右铭"
          v-model="teacher.motto"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">简介</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="简介"
          v-model="teacher.intro"
         />
        </div>
       </div>
      </form>
     </div>
     <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">
       取消
      </button>
      <button type="button" class="btn btn-primary" v-on:click="save()">
       保存
      </button>
     </div>
    </div>
   </div>
  </div>
  <!-- 编辑模态框 -->
  <div id="teacher-update-model" class="modal fade" tabindex="-1" role="dialog">
   <div class="modal-dialog" role="document">
    <div class="modal-content">
     <div class="modal-header">
      <button
       type="button"
       class="close"
       data-dismiss="modal"
       aria-label="Close"
      >
       <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title">表单</h4>
     </div>
     <div class="modal-body">
      <!-- 修改表单 -->
      <form class="form-horizontal">
       <div class="form-group"></div>
       <div class="form-group">
        <label class="col-sm-2 control-label">姓名</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="姓名"
          v-model="teacher.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">昵称</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="昵称"
          v-model="teacher.nickname"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">头像</label>
        <div class="col-sm-10">
         <!-- 上传组件 -->
         <file
          v-bind:text="'上传头像1'"
          v-bind:after-upload="afterUpload"
          v-bind:id="'teacher-update'"
          v-bind:suffixs="['jpg', 'jpeg', 'png']"
         ></file>
         <div v-show="teacher.image" class="row">
          <div class="col-md-4">
           <img v-bind:src="teacher.image" class="img-responsive" />
          </div>
         </div>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">职位</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="职位"
          v-model="teacher.position"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">座右铭</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="座右铭"
          v-model="teacher.motto"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">简介</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="简介"
          v-model="teacher.intro"
         />
        </div>
       </div>
      </form>
     </div>
     <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">
       取消
      </button>
      <button type="button" class="btn btn-primary" v-on:click="update()">
       保存
      </button>
     </div>
    </div>
   </div>
  </div>
  <!-- /.modal -->
 </div>
</template>

<script>
import File from "../../components/File.vue";
import Pagination from "../../components/Pagination.vue";
export default {
 components: { Pagination, File },
 name: "teacher",
 //返回值
 data: function () {
  return {
   teacher: {},
   teachers: [],
  };
 },
 mounted: function () {
  let _this = this;
  _this.$refs.pagination.size = 5;
  _this.list(1);
 },
 methods: {
  //添加老师打开模态框
  toadd() {
   let _this = this;
   _this.teacher = {};
   $("#teacher-add-model").modal("show");
  },
  //
  //添加老师打开模态框
  toupdate(teacher) {
   let _this = this;
   //消除双向绑定，复制对象
   _this.teacher = $.extend({}, teacher);
   $("#teacher-update-model").modal("show");
  },
  //老师列表
  list(page) {
   let _this = this;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/teacher/list",
     //传参对象
     {
      pageSize: _this.$refs.pagination.size,
      currentPage: page,
     }
    )
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      console.log("查询老师列表", response);
      let resp = response.data;
      _this.teachers = resp.data.records;
      _this.$refs.pagination.render(page, resp.data.totalRecord);
     }
    );
  },
  //老师保存
  save() {
   let _this = this;
   // 保存校验
   if (
    1 != 1 ||
    !Validator.require(_this.teacher.name, "姓名") ||
    !Validator.length(_this.teacher.name, "姓名", 1, 50) ||
    !Validator.require(_this.teacher.nickname, "昵称") ||
    !Validator.length(_this.teacher.nickname, "昵称", 1, 50) ||
    !Validator.length(_this.teacher.image, "头像", 1, 100) ||
    !Validator.length(_this.teacher.position, "职位", 1, 50) ||
    !Validator.length(_this.teacher.motto, "座右铭", 1, 50) ||
    !Validator.length(_this.teacher.intro, "简介", 1, 500)
   ) {
    return;
   }
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/teacher/save",
     //传参对象
     _this.teacher
    )
    .then(
     //响应结果
     (response) => {
      console.log("保存老师成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#teacher-add-model").modal("hide");
       //刷新列表
       _this.list(1);
       ToastMin.success("保存成功！");
      } else {
       ToastMax.warning(resp.message);
      }
     }
    );
  },
  //老师修改
  update() {
   let _this = this;
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/teacher/update",
     //传参对象
     _this.teacher
    )
    .then(
     //响应结果
     (response) => {
      console.log("修改老师成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#teacher-update-model").modal("hide");
       //刷新列表
       _this.list(1);
       ToastMin.success("保存成功！");
      }
     }
    );
  },
  //老师删除
  del(id) {
   let _this = this;
   //确认框
   Confirm.show("删除老师后将不可恢复！", function () {
    //确认删除
    _this.$ajax
     .delete(
      process.env.VUE_APP_SERVER + "/business/admin/teacher/delete/" + id
     )
     .then(
      //响应结果
      (response) => {
       console.log("删除老师成功", response);
       let resp = response.data;
       //保存成功
       if (resp.success) {
        //刷新列表
        _this.list(1);
        ToastMin.success("删除成功！");
       }
      }
     );
   });
  },
  //新增文件上传
  uploadImage1() {
   let _this = this;
   //传输表单.file-upload-input
   let formData = new window.FormData();
   formData.append("file", document.querySelector("#uploadImage1").files[0]);
   Loading.show();
   //确认删除
   _this.$ajax
    .post(process.env.VUE_APP_SERVER + "/file/admin/upload", formData)
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //刷新列表
       ToastMin.success("上传文件成功！");
       //图片返回地址
       let image = resp.data;
       _this.teacher.image = image;
      }
     }
    );
  },
  selectImage() {
   $("#uploadImage1").trigger("click");
  },
  afterUpload(resp) {
   let _this = this;
   //图片返回地址
   let image = resp.data;
   _this.teacher.image = image;
  },
 },
};
</script>
