<template>
 <div>
  <p>
   <!-- 刷新按钮 -->
   <button class="btn btn-white btn-default btn-round" @click="list(1)">
    <i class="ace-icon fa fa-refresh"></i>刷 新
   </button>
  </p>
  <!-- 格式化表格 -->
  <div class="row">
   <div class="col-md-6">
    <textarea
     id="resource-textarea"
     class="form-control"
     v-model="resourceStr"
     name="resource"
     rows="10"
    ></textarea>

    <br />
    <button
     id="save-btn"
     type="button"
     class="btn btn-primary"
     v-on:click="save()"
    >
     保存
    </button>
   </div>
   <div class="col-md-6">
    <ul id="tree" class="ztree"></ul>
   </div>
  </div>
  <br />
 </div>
</template>

<script>
export default {
 name: "resource",
 //返回值
 data: function () {
  return {
   resource: {},
   resources: [],
   resourceStr: "",
   tree: {},
  };
 },
 mounted: function () {
  let _this = this;
  _this.list();
 },
 methods: {
  //资源表列表
  list() {
   let _this = this;
   Loading.show();
   _this.$ajax
    .get(process.env.VUE_APP_SERVER + "/system/admin/resource/load_tree")
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      console.log("查询资源表列表", response);
      let resp = response.data;
      _this.resources = resp.data;
      //初始化树
      _this.initTree();
     }
    );
  },
  /**
   * 初始资源树
   */
  initTree() {
   let _this = this;
   let setting = {
    data: {
     simpleData: {
      idKey: "id",
      pIdKey: "parent",
      rootPId: "",
      // enable: true
     },
    },
   };

   _this.zTree = $.fn.zTree.init($("#tree"), setting, _this.resources);
   _this.zTree.expandAll(true);
  },
  //资源表保存
  save() {
   let _this = this;
   if (Tool.isEmpty(_this.resourceStr)) {
    ToastMax.warning("资源信息不能为空");
    return;
   }
   Loading.show();
   let jsonStr = JSON.parse(_this.resourceStr);
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/system/admin/resource/save",
     //传参对象
     jsonStr
    )
    .then(
     //响应结果
     (response) => {
      console.log("保存资源表成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //刷新列表
       _this.list();
       ToastMin.success("保存成功！");
      } else {
       ToastMax.warning(resp.message);
      }
     }
    );
  },
  //资源表修改
  update() {
   let _this = this;
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/system/admin/resource/update",
     //传参对象
     _this.resource
    )
    .then(
     //响应结果
     (response) => {
      console.log("修改资源表成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#resource-update-model").modal("hide");
       //刷新列表
       _this.list(1);
       ToastMin.success("保存成功！");
      }
     }
    );
  },
  //资源表删除
  del(id) {
   let _this = this;
   //确认框
   Confirm.show("删除资源表后将不可恢复！", function () {
    //确认删除
    _this.$ajax
     .delete(process.env.VUE_APP_SERVER + "/system/admin/resource/delete/" + id)
     .then(
      //响应结果
      (response) => {
       console.log("删除资源表成功", response);
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
