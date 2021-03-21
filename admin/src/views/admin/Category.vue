<template>
 <div>
  <div class="row">
   <div class="col-md-6">
    <p>
     <!-- 新增按钮 -->
     <button class="btn btn-white btn-default btn-round" @click="toadd()">
      <i class="ace-icon fa fa-edit"></i>新 增
     </button>
     &nbsp;
     <!-- 刷新按钮 -->
     <button class="btn btn-white btn-default btn-round" @click="all()">
      <i class="ace-icon fa fa-refresh"></i>刷 新
     </button>
    </p>
    <!-- 表格 -->
    <table id="simple-table" class="table table-bordered table-hover">
     <thead>
      <tr>
       <th>id</th>
       <th>父id</th>
       <th>名称</th>
       <th></th>
       <th class="hidden-480">操作</th>
      </tr>
     </thead>

     <tbody>
      <tr
       v-for="category in level1"
       v-bind:key="category.id"
       v-on:click="onClickLevel1(category)"
       v-bind:class="{'active': category.id === active.id}"
      >
       <td>{{ category.id }}</td>
       <td>{{ category.parent }}</td>
       <td>{{ category.name }}</td>
       <td>{{ category.sort }}</td>
       <td>
        <div class="hidden-sm hidden-xs btn-group">
         <!-- 编辑 -->
         <button class="btn btn-xs btn-info" @click="toupdate(category)">
          <i class="ace-icon fa fa-pencil bigger-120"></i>
         </button>
         <!-- 删除 -->
         <button class="btn btn-xs btn-danger" @click="del(category.id)">
          <i class="ace-icon fa fa-trash-o bigger-120"></i>
         </button>
        </div>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
      <div class="col-md-6">
    <!-- 表格 -->
    <table id="simple-table" class="table table-bordered table-hover">
     <thead>
      <tr>
       <th>id</th>
       <th>父id</th>
       <th>名称</th>
       <th></th>
       <th class="hidden-480">操作</th>
      </tr>
     </thead>

     <tbody>
      <tr
       v-for="category in level2"
       v-bind:key="category.id"
      >
       <td>{{ category.id }}</td>
       <td>{{ category.parent }}</td>
       <td>{{ category.name }}</td>
       <td>{{ category.sort }}</td>
       <td>
        <div class="hidden-sm hidden-xs btn-group">
         <!-- 编辑 -->
         <button class="btn btn-xs btn-info" @click="toupdate(category)">
          <i class="ace-icon fa fa-pencil bigger-120"></i>
         </button>
         <!-- 删除 -->
         <button class="btn btn-xs btn-danger" @click="del(category.id)">
          <i class="ace-icon fa fa-trash-o bigger-120"></i>
         </button>
        </div>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
  <!-- 新增模态框 -->
  <div id="category-add-model" class="modal fade" tabindex="-1" role="dialog">
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
          v-model="category.id"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">父id</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="父id"
          v-model="category.parent"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">名称</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="名称"
          v-model="category.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">排序</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="名称"
          v-model="category.sort"
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
  <div
   id="category-update-model"
   class="modal fade"
   tabindex="-1"
   role="dialog"
  >
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
        <label class="col-sm-2 control-label">父id</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="父id"
          v-model="category.parent"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">名称</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="名称"
          v-model="category.name"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">排序</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="名称"
          v-model="category.sort"
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
export default {
 name: "category",
 //返回值
 data: function () {
  return {
   category: {},
   categorys: [],
   level1: [],
   level2: [],
   active: {}
  };
 },
 mounted: function () {
  let _this = this;
  _this.all();
 },
 methods: {
  //添加打开模态框
  toadd() {
   let _this = this;
   _this.category = {};
   $("#category-add-model").modal("show");
  },
  //
  //添加打开模态框
  toupdate(category) {
   let _this = this;
   //消除双向绑定，复制对象
   _this.category = $.extend({}, category);
   $("#category-update-model").modal("show");
  },
  //列表
  all() {
   let _this = this;
   Loading.show();
   _this.$ajax
    .get(process.env.VUE_APP_SERVER + "/business/admin/category/all")
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      console.log("查询列表", response);
      let resp = response.data;
      _this.categorys = resp.data;
      // 将所有记录格式化成树形结构
      _this.level1 = [];

      for (let i = 0; i < _this.categorys.length; i++) {
       let c = _this.categorys[i];
       if (c.parent === "00000000") {
        _this.level1.push(c);
        for (let j = 0; j < _this.categorys.length; j++) {
         let child = _this.categorys[j];
         if (child.parent === c.id) {
          if (Tool.isEmpty(c.children)) {
           c.children = [];
          }
          c.children.push(child);
         }
        }
       }
      }
     }
    );
  },
  //保存
  save() {
   let _this = this;
   // 保存校验
   if (
    1 != 1 ||
    !Validator.require(_this.category.parent, "父id") ||
    !Validator.require(_this.category.name, "名称") ||
    !Validator.length(_this.category.name, "名称", 1, 50)
   ) {
    return;
   }
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/category/save",
     //传参对象
     _this.category
    )
    .then(
     //响应结果
     (response) => {
      console.log("保存成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#category-add-model").modal("hide");
       //刷新列表
       _this.all();
       ToastMin.success("保存成功！");
      } else {
       ToastMax.warning(resp.message);
      }
     }
    );
  },
  //修改
  update() {
   let _this = this;
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/category/update",
     //传参对象
     _this.category
    )
    .then(
     //响应结果
     (response) => {
      console.log("修改成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#category-update-model").modal("hide");
       //刷新列表
       _this.all();
       ToastMin.success("保存成功！");
      }
     }
    );
  },
  //删除
  del(id) {
   let _this = this;
   //确认框
   Confirm.show("删除后将不可恢复！", function () {
    //确认删除
    _this.$ajax
     .delete(
      process.env.VUE_APP_SERVER + "/business/admin/category/delete/" + id
     )
     .then(
      //响应结果
      (response) => {
       console.log("删除成功", response);
       let resp = response.data;
       //保存成功
       if (resp.success) {
        //刷新列表
        _this.all();
        ToastMin.success("删除成功！");
       }
      }
     );
   });
  },
  onClickLevel1(category) {
   let _this = this;
   _this.level2 = category.children;
   _this.active = category;
  },
 },
};
</script>
<style scoped>
  .active td {
    background-color: #fce5cd !important;
  }
</style>

