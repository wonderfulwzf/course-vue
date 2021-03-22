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

  <div class="row">
   <div class="col-md-4" v-for="course in courses" v-bind:key="course.id">
    <div class="thumbnail search-thumbnail">
     <img
      v-show="!course.image"
      class="media-object"
      src="/static/image/课程封面5.jpg"
     />
     <img
      v-show="course.image"
      class="media-object"
      v-bind:src="course.image"
     />
     <div class="caption">
      <div class="clearfix">
       <td class="hidden-480">
        <span class="label label-warning">{{
         COURSE_LEVEL | optionKV(course.level)
        }}</span>
       </td>
       <td class="hidden-480">
        <span class="label label-warning">{{
         COURSE_CHARGE | optionKV(course.charge)
        }}</span>
       </td>
       <td class="hidden-480">
        <span class="label label-warning">{{
         COURSE_STATUS | optionKV(course.status)
        }}</span>
       </td>
      </div>
      <h3 class="search-title" @click="toChapter(course)">
       <a class="blue">{{ course.name }}</a>
      </h3>
      <div
       v-bind:key="teacher.id"
       v-for="teacher in teachers.filter((t) => {
        return t.id === course.teacherId;
       })"
       class="profile-activity clearfix"
      >
       <div>
        <img
         v-show="!teacher.image"
         class="pull-left"
         src="/ace/assets/images/avatars/avatar5.png"
        />
        <img
         v-show="teacher.image"
         class="pull-left"
         v-bind:src="teacher.image"
        />
        <a class="user" href="#"> {{ teacher.name }} </a>
        <br />
        {{ teacher.position }}
       </div>
      </div>
      <p>{{ course.sunmary }}</p>

      <p>
       <span class="badge badge-info"
        >时长：{{ course.time | formatSecond }}</span
       >
       <span class="badge badge-info">报名数：{{ course.enroll }}</span>
       <span class="badge badge-info">价格：{{ course.price }}￥</span>
       <span class="badge badge-info">顺序：{{ course.sort }}</span>
      </p>

      <p>
       <!-- 编辑 -->
       <button class="btn btn-xs btn-info" @click="toupdate(course)">
        <i class="ace-icon fa fa-pencil bigger-120"></i>
       </button>
       <!-- 删除 -->
       <button class="btn btn-xs btn-danger" @click="del(course.id)">
        <i class="ace-icon fa fa-trash-o bigger-120"></i>
       </button>
       <!-- 去排序页面 -->
       <button class="btn btn-xs btn-warning" @click="openSortInput(course)">
        <i class="ace-icon fa fa-arrow-right icon-on-right">排序</i>
       </button>
       <!-- 去大章页面 -->
       <button class="btn btn-xs btn-warning" @click="toChapter(course)">
        <i class="ace-icon fa fa-arrow-right icon-on-right">大章</i>
       </button>
      </p>
     </div>
    </div>
   </div>
  </div>
  <!-- 新增模态框 -->
  <div id="course-add-model" class="modal fade" tabindex="-1" role="dialog">
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
      <h4 class="modal-title">新增</h4>
     </div>
     <div class="modal-body">
      <!-- 新增表单 -->
      <form class="form-horizontal">
       <div class="form-group">
        <label class="col-sm-2 control-label">分类</label>
        <div class="col-sm-10">
         <!-- ztree -->
         <div class="col-sm-10">
          <ul id="tree" class="ztree"></ul>
         </div>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">名称</label>
        <div class="col-sm-10">
         <input
          type="text"
          maxlength="6"
          class="form-control"
          placeholder="名称"
          v-model="course.name"
         />
        </div>
       </div>
       <!-- 讲师 -->
       <div class="form-group">
        <label class="col-sm-2 control-label">讲师</label>
        <div class="col-sm-10">
         <select v-model="course.teacherId" class="form-control">
          <option
           v-for="(o, index) in teachers"
           v-bind:key="index"
           v-bind:value="o.id"
          >
           {{ o.name }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">概述</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="概述"
          v-model="course.sunmary"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">时长</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="时长"
          v-model="course.time"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">价格(元)</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="价格(元)"
          v-model="course.price"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">封面</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="封面"
          v-model="course.image"
         />
        </div>
       </div>

       <div class="form-group">
        <label class="col-sm-2 control-label">级别</label>
        <div class="col-sm-10">
         <select v-model="course.level" class="form-control">
          <option
           v-for="(o, index) in COURSE_LEVEL"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">收费</label>
        <div class="col-sm-10">
         <select v-model="course.charge" class="form-control">
          <option
           v-for="(o, index) in COURSE_CHARGE"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">状态</label>
        <div class="col-sm-10">
         <select v-model="course.status" class="form-control">
          <option
           v-for="(o, index) in COURSE_STATUS"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">报名数</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="报名数"
          v-model="course.enroll"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">排序</label>
        <div class="col-sm-10">
         <input
          type="text"
          readonly
          class="form-control"
          placeholder="排序"
          v-model="course.sort"
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
  <div id="course-update-model" class="modal fade" tabindex="-1" role="dialog">
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
      <h4 class="modal-title">编辑</h4>
     </div>
     <div class="modal-body">
      <!-- 修改表单 -->
      <form class="form-horizontal">
       <div class="form-group">
        <label class="col-sm-2 control-label">分类</label>
        <div class="col-sm-10">
         <!-- ztree -->
         <div class="col-sm-10">
          <ul class="ztree"></ul>
         </div>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">名称</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="名称"
          v-model="course.name"
         />
        </div>
       </div>
       <!-- 讲师 -->
       <div class="form-group">
        <label class="col-sm-2 control-label">讲师</label>
        <div class="col-sm-10">
         <select v-model="course.teacherId" class="form-control">
          <option
           v-for="(o, index) in teachers"
           v-bind:key="index"
           v-bind:value="o.id"
          >
           {{ o.name }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">概述</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="概述"
          v-model="course.sunmary"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">时长</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="时长"
          v-model="course.time"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">价格(元)</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="价格(元)"
          v-model="course.price"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">封面</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="封面"
          v-model="course.image"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">级别</label>
        <div class="col-sm-10">
         <select v-model="course.level" class="form-control">
          <option
           v-for="(o, index) in COURSE_LEVEL"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">收费</label>
        <div class="col-sm-10">
         <select v-model="course.charge" class="form-control">
          <option
           v-for="(o, index) in COURSE_CHARGE"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">状态</label>
        <div class="col-sm-10">
         <select v-model="course.status" class="form-control">
          <option
           v-for="(o, index) in COURSE_STATUS"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">报名数</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="报名数"
          v-model="course.enroll"
         />
        </div>
       </div>
       <div class="form-group"></div>
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
  <!-- 排序模态框 -->
  <div id="course-sort-model" class="modal fade" tabindex="-1" role="dialog">
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
      <h4 class="modal-title">排序</h4>
     </div>
     <div class="modal-body">
      <!-- 修改表单 -->
      <form class="form-horizontal">
       <div class="form-group">
        <label class="col-sm-2 control-label">新排序</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="新排序"
          v-model="sort.newSort"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">当前排序</label>
        <div class="col-sm-10">
         <input
          type="text"
          v-model="sort.oldSort"
          readonly
          class="form-control"
          placeholder="当前排序"
         />
        </div>
       </div>
      </form>
     </div>
     <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">
       取消
      </button>
      <button type="button" class="btn btn-primary" v-on:click="updateSort()">
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
 name: "course",
 //返回值
 data: function () {
  return {
   course: {},
   courses: [],
   COURSE_CHARGE: COURSE_CHARGE,
   COURSE_LEVEL: COURSE_LEVEL,
   COURSE_STATUS: COURSE_STATUS,
   categorys: [],
   tree: {},
   //排序
   sort: {
    id: "",
    oldSort: 0,
    newSort: 0,
   },
   //老师数组
   teachers: [],
  };
 },
 mounted: function () {
  let _this = this;
  _this.$refs.pagination.size = 5;
  _this.allCategory();
  //初始加载所有老师
  _this.allTeacher();
  _this.list(1);
 },
 methods: {
  //添加打开模态框
  toadd() {
   let _this = this;
   _this.course = {
    sort: _this.$refs.pagination.total + 1,
   };
   $("#course-add-model").modal("show");
  },
  //
  //添加打开模态框
  toupdate(course) {
   let _this = this;
   //消除双向绑定，复制对象
   _this.course = $.extend({}, course);
   _this.listCategory(course.id);
   $("#course-update-model").modal("show");
  },
  //列表
  list(page) {
   let _this = this;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/course/list",
     //传参对象
     {
      pageSize: _this.$refs.pagination.size,
      pageNo: page,
     }
    )
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      console.log("查询列表", response);
      let resp = response.data;
      _this.courses = resp.data.records;
      _this.$refs.pagination.render(page, resp.data.totalRecord);
     }
    );
  },
  //保存
  save() {
   let _this = this;
   // 保存校验
   if (
    1 != 1 ||
    !Validator.length(_this.course.name, "名称", 2, 50) ||
    !Validator.length(_this.course.sunmary, "概述", 2, 200) ||
    !Validator.length(_this.course.image, "封面", 1, 100) ||
    !Validator.require(_this.course.level, "级别")
   ) {
    return;
   }
   let treemessage = _this.tree.getCheckedNodes();
   if (Tool.isEmpty(treemessage)) {
    Toast.warning("请选择分类！");
    return;
   }
   console.log(treemessage);
   _this.course.categorys = treemessage;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/course/save",
     //传参对象
     _this.course
    )
    .then(
     //响应结果
     (response) => {
      console.log("保存成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#course-add-model").modal("hide");
       //刷新列表
       _this.list(1);
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
   let treemessage = _this.tree.getCheckedNodes();
   if (Tool.isEmpty(treemessage)) {
    Toast.warning("请选择分类！");
    return;
   }
   console.log(treemessage);
   _this.course.categorys = treemessage;
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/course/update",
     //传参对象
     _this.course
    )
    .then(
     //响应结果
     (response) => {
      console.log("修改成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#course-update-model").modal("hide");
       //刷新列表
       _this.list(1);
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
     .delete(process.env.VUE_APP_SERVER + "/business/admin/course/delete/" + id)
     .then(
      //响应结果
      (response) => {
       console.log("删除成功", response);
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
  //课程跳转到大章
  toChapter(course) {
   let _this = this;
   SessionStorage.set(SESSION_KEY_COURSE, course);
   _this.$router.push("/business/chapter");
  },
  //种类列表
  allCategory() {
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
      _this.initTree();
     }
    );
  },
  //初始化树
  initTree() {
   let _this = this;
   var setting = {
    check: {
     enable: true,
    },
    data: {
     simpleData: {
      //对于数据库字段
      idKey: "id",
      pIdKey: "parent",
      rootPId: "00000000",
      enable: true,
     },
    },
   };
   var zNodes = _this.categorys;
   _this.tree = $.fn.zTree.init($(".ztree"), setting, zNodes);
   //默认展开所有节点
   _this.tree.expandAll(true);
  },
  listCategory(courseId) {
   let _this = this;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER +
      "/business/admin/course/category/list/" +
      courseId
    )
    .then((res) => {
     Loading.hide();
     console.log("查找课程下所有分类结果：", res);
     let response = res.data;
     console.log(response);
     let ca = response.data;
     console.log(ca);
     // 勾选查询到的分类
     _this.tree.checkAllNodes(false);
     for (let i = 0; i < ca.length; i++) {
      let node = _this.tree.getNodeByParam("id", ca[i].categoryId);
      _this.tree.checkNode(node, true);
     }
    });
  },
  //打开排序模态框
  openSortInput(course) {
   let _this = this;
   _this.sort = {
    id: course.id,
    oldSort: course.sort,
    newSort: course.sort,
   };
   $("#course-sort-model").modal("show");
  },
  /**
   * 排序
   */
  updateSort() {
   let _this = this;
   if (_this.sort.newSort === _this.sort.oldSort) {
    ToastMin.warning("排序没有变化");
    return;
   }
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/course/sort",
     _this.sort
    )
    .then((res) => {
     let response = res.data;

     if (response.success) {
      ToastMin.success("更新排序成功");
      $("#course-sort-model").modal("hide");
      _this.list(1);
     } else {
      ToastMin.error("更新排序失败");
     }
    });
  },
  //老师列表
  allTeacher() {
   let _this = this;
   Loading.show();
   _this.$ajax
    .get(process.env.VUE_APP_SERVER + "/business/admin/teacher/all")
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      console.log("老师列表", response);
      let resp = response.data;
      _this.teachers = resp.data;
     }
    );
  },
 },
};
</script>
<style scoped>
caption h3 {
 font-size: 20px;
}
</style>