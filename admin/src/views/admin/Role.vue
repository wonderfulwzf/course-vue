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
     <th>角色</th>
     <th>描述</th>
     <th class="hidden-480">操作</th>
    </tr>
   </thead>

   <tbody>
    <tr v-for="role in roles" v-bind:key="role.id">
     <td>{{ role.id }}</td>
     <td>{{ role.name }}</td>
     <td>{{ role.desc }}</td>
     <td>
      <div class="hidden-sm hidden-xs btn-group">
       <!-- 编辑 -->
       <button class="btn btn-xs btn-info" @click="toupdate(role)">
        <i class="ace-icon fa fa-pencil bigger-120"></i>
       </button>
       <!-- 删除 -->
       <button class="btn btn-xs btn-danger" @click="del(role.id)">
        <i class="ace-icon fa fa-trash-o bigger-120"></i>
       </button>
       <!-- 赋予权限 -->
       <button class="btn btn-xs btn-info" @click="editResource(role)">
        <i class="ace-icon fa fa-list bigger-120"></i>
       </button>
      </div>
     </td>
    </tr>
   </tbody>
  </table>
  <!-- 角色资源关联配置 -->
  <div id="resource-modal" class="modal fade" tabindex="-1" role="dialog">
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
      <h4 class="modal-title">角色资源关联配置</h4>
     </div>
     <div class="modal-body">
      <ul id="tree" class="ztree"></ul>
     </div>
     <div class="modal-footer">
      <button
       type="button"
       class="btn btn-white btn-default btn-round"
       data-dismiss="modal"
      >
       <i class="ace-icon fa fa-times"></i>
       关闭
      </button>
      <button
       type="button"
       class="btn btn-white btn-info btn-round"
       v-on:click="saveResource()"
      >
       <i class="ace-icon fa fa-plus blue"></i>
       保存
      </button>
     </div>
    </div>
    <!-- /.modal-content -->
   </div>
   <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
  <!-- 新增模态框 -->
  <div id="role-add-model" class="modal fade" tabindex="-1" role="dialog">
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
          v-model="role.id"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">角色</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="角色"
          v-model="role.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">描述</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="描述"
          v-model="role.desc"
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
  <div id="role-update-model" class="modal fade" tabindex="-1" role="dialog">
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
        <label class="col-sm-2 control-label">角色</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="角色"
          v-model="role.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">描述</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="描述"
          v-model="role.desc"
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
import Pagination from "../../components/Pagination.vue";
export default {
 components: { Pagination },
 name: "role",
 //返回值
 data: function () {
  return {
   role: {},
   roles: [],
   resources: [],
   zTree: {},
  };
 },
 mounted: function () {
  let _this = this;
  _this.$refs.pagination.size = 5;
  _this.list(1);
 },
 methods: {
  //添加角色表打开模态框
  toadd() {
   let _this = this;
   _this.role = {};
   $("#role-add-model").modal("show");
  },
  //
  //添加角色表打开模态框
  toupdate(role) {
   let _this = this;
   //消除双向绑定，复制对象
   _this.role = $.extend({}, role);
   $("#role-update-model").modal("show");
  },
  //角色表列表
  list(page) {
   let _this = this;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/system/admin/role/list",
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
      console.log("查询角色表列表", response);
      let resp = response.data;
      _this.roles = resp.data.records;
      _this.$refs.pagination.render(page, resp.data.totalRecord);
     }
    );
  },
  //角色表保存
  save() {
   let _this = this;
   // 保存校验
   if (
    1 != 1 ||
    !Validator.length(_this.role.name, "角色", 1, 50) ||
    !Validator.length(_this.role.desc, "描述", 1, 100)
   ) {
    return;
   }
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/system/admin/role/save",
     //传参对象
     _this.role
    )
    .then(
     //响应结果
     (response) => {
      console.log("保存角色表成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#role-add-model").modal("hide");
       //刷新列表
       _this.list(1);
       ToastMin.success("保存成功！");
      } else {
       ToastMax.warning(resp.message);
      }
     }
    );
  },
  //角色表修改
  update() {
   let _this = this;
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/system/admin/role/update",
     //传参对象
     _this.role
    )
    .then(
     //响应结果
     (response) => {
      console.log("修改角色表成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#role-update-model").modal("hide");
       //刷新列表
       _this.list(1);
       ToastMin.success("保存成功！");
      }
     }
    );
  },
  //角色表删除
  del(id) {
   let _this = this;
   //确认框
   Confirm.show("删除角色表后将不可恢复！", function () {
    //确认删除
    _this.$ajax
     .delete(process.env.VUE_APP_SERVER + "/system/admin/role/delete/" + id)
     .then(
      //响应结果
      (response) => {
       console.log("删除角色表成功", response);
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
  /**
   * 点击【编辑】
   */
  editResource(role) {
   let _this = this;
   _this.role = $.extend({}, role);
   _this.loadResource();
   $("#resource-modal").modal("show");
  },

  /**
   * 加载资源树
   */
  loadResource() {
   let _this = this;
   Loading.show();
   _this.$ajax
    .get(process.env.VUE_APP_SERVER + "/system/admin/resource/load_tree")
    .then((res) => {
     Loading.hide();
     let response = res.data;
     _this.resources = response.data;
     // 初始化树
     _this.initTree();
     //_this.listRoleResource();
    });
  },

  /**
   * 初始资源树
   */
  initTree() {
   let _this = this;
   let setting = {
    check: {
     enable: true,
    },
    data: {
     simpleData: {
      idKey: "id",
      pIdKey: "parent",
      rootPId: "",
      enable: true,
     },
    },
   };

   _this.zTree = $.fn.zTree.init($("#tree"), setting, _this.resources);
   _this.zTree.expandAll(true);
  },
 },
};
</script>
