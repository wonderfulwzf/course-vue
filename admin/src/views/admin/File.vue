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
  <!-- 表格 -->
  <table id="simple-table" class="table table-bordered table-hover">
   <thead>
    <tr>
     <th>id</th>
     <th>相对路径</th>
     <th>文件名</th>
     <th>后缀</th>
     <th>大小</th>
     <th>用途</th>
     <th>创建时间</th>
     <th>修改时间</th>
     <th class="hidden-480">操作</th>
    </tr>
   </thead>

   <tbody>
    <tr v-for="file in files" v-bind:key="file.id">
     <td>{{ file.id }}</td>
     <td>{{ file.path }}</td>
     <td>{{ file.name }}</td>
     <td>{{ file.suffix }}</td>
     <td>{{ file.size }}</td>
     <td>{{ file.use }}</td>
     <td>{{ file.createdAt }}</td>
     <td>{{ file.updatedAt }}</td>
     <td>
      <div class="hidden-sm hidden-xs btn-group">
       <!-- 编辑 -->
       <button class="btn btn-xs btn-info" @click="toupdate(file)">
        <i class="ace-icon fa fa-pencil bigger-120"></i>
       </button>
       <!-- 删除 -->
       <button class="btn btn-xs btn-danger" @click="del(file.id)">
        <i class="ace-icon fa fa-trash-o bigger-120"></i>
       </button>
      </div>
     </td>
    </tr>
   </tbody>
  </table>
  <!-- 新增模态框 -->
  <div id="file-add-model" class="modal fade" tabindex="-1" role="dialog">
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
          v-model="file.id"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">相对路径</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="相对路径"
          v-model="file.path"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">文件名</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="文件名"
          v-model="file.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">后缀</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="后缀"
          v-model="file.suffix"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">大小</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="大小"
          v-model="file.size"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">用途</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="用途"
          v-model="file.use"
         />
        </div>
       </div>
       <div class="form-group"></div>
       <div class="form-group"></div>
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
  <div id="file-update-model" class="modal fade" tabindex="-1" role="dialog">
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
        <label class="col-sm-2 control-label">相对路径</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="相对路径"
          v-model="file.path"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">文件名</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="文件名"
          v-model="file.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">后缀</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="后缀"
          v-model="file.suffix"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">大小</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="大小"
          v-model="file.size"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">用途</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="用途"
          v-model="file.use"
         />
        </div>
       </div>
       <div class="form-group"></div>
       <div class="form-group"></div>
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
import Pagination from "../../components/Pagination.vue";
export default {
 components: { Pagination },
 name: "file",
 //返回值
 data: function () {
  return {
   file: {},
   files: [],
  };
 },
 mounted: function () {
  let _this = this;
  _this.$refs.pagination.size = 5;
  _this.list(1);
 },
 methods: {
  //添加文件打开模态框
  toadd() {
   let _this = this;
   _this.file = {};
   $("#file-add-model").modal("show");
  },
  //
  //添加文件打开模态框
  toupdate(file) {
   let _this = this;
   //消除双向绑定，复制对象
   _this.file = $.extend({}, file);
   $("#file-update-model").modal("show");
  },
  //文件列表
  list(page) {
   let _this = this;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/file/admin/file/list",
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
      console.log("查询文件列表", response);
      let resp = response.data;
      _this.files = resp.data.records;
      _this.$refs.pagination.render(page, resp.data.totalRecord);
     }
    );
  },
  //文件保存
  save() {
   let _this = this;
   // 保存校验
   if (
    1 != 1 ||
    !Validator.require(_this.file.path, "相对路径") ||
    !Validator.length(_this.file.path, "相对路径", 1, 100) ||
    !Validator.length(_this.file.name, "文件名", 1, 100) ||
    !Validator.length(_this.file.suffix, "后缀", 1, 10)
   ) {
    return;
   }
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/file/admin/file/save",
     //传参对象
     _this.file
    )
    .then(
     //响应结果
     (response) => {
      console.log("保存文件成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#file-add-model").modal("hide");
       //刷新列表
       _this.list(1);
       ToastMin.success("保存成功！");
      } else {
       ToastMax.warning(resp.message);
      }
     }
    );
  },
  //文件修改
  update() {
   let _this = this;
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/file/admin/file/update",
     //传参对象
     _this.file
    )
    .then(
     //响应结果
     (response) => {
      console.log("修改文件成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#file-update-model").modal("hide");
       //刷新列表
       _this.list(1);
       ToastMin.success("保存成功！");
      }
     }
    );
  },
  //文件删除
  del(id) {
   let _this = this;
   //确认框
   Confirm.show("删除文件后将不可恢复！", function () {
    //确认删除
    _this.$ajax
     .delete(process.env.VUE_APP_SERVER + "/file/admin/file/delete/" + id)
     .then(
      //响应结果
      (response) => {
       console.log("删除文件成功", response);
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
 },
};
</script>
