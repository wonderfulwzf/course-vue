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

      <h3 class="search-title">
       <a href="#" class="blue">{{ course.name }}</a>
      </h3>
      <p>{{ course.sunmary }}</p>
      
      <p>
         <span class="badge badge-info">时长：{{ course.time | formatSecond}}</span>
         <span class="badge badge-info">报名数：{{ course.enroll }}</span>
         <span class="badge badge-info">价格：{{ course.price }}￥</span>
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
          v-model="course.id"
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
          v-model="course.name"
         />
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
      <h4 class="modal-title">表单</h4>
     </div>
     <div class="modal-body">
      <!-- 修改表单 -->
      <form class="form-horizontal">
       <div class="form-group"></div>
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
  };
 },
 mounted: function () {
  let _this = this;
  _this.$refs.pagination.size = 5;
  _this.list(1);
 },
 methods: {
  //添加打开模态框
  toadd() {
   let _this = this;
   _this.course = {};
   $("#course-add-model").modal("show");
  },
  //
  //添加打开模态框
  toupdate(course) {
   let _this = this;
   //消除双向绑定，复制对象
   _this.course = $.extend({}, course);
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
    SessionStorage.set("course",course);
    _this.$router.push("/business/chapter");
  },

 },
};
</script>
<style scoped>
caption h3 {
 font-size: 20px;
}
</style>