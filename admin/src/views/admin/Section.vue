<template>
 <div>
  <p>
   <!-- 去课程页面 -->
   <button class="btn btn-white btn-default btn-round" @click="toCourse()">
    <i class="ace-icon fa fa-arrow-left icon-on-letf"></i>课程
   </button>
   <!-- 去大章页面 -->
   <button class="btn btn-white btn-default btn-round" @click="toChapter()">
    <i class="ace-icon fa fa-arrow-left icon-on-letf"></i>大章
   </button>

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
     <th>ID</th>
     <th>标题</th>
     <th>课程</th>
     <th>大章</th>
     <!-- <th>视频</th> -->
     <th>时长</th>
     <th>收费:C收费F免费</th>
     <th>顺序</th>
     <th>VOD</th>
     <th>创建时间</th>
     <th>修改时间</th>
     <th class="hidden-480">操作</th>
    </tr>
   </thead>

   <tbody>
    <tr v-for="section in sections" v-bind:key="section.id">
     <td>{{ section.id }}</td>
     <td>{{ section.title }}</td>
     <td>{{ section.courseId }}</td>
     <td>{{ section.chapterId }}</td>
     <!-- <td>{{ section.video }}</td> -->
     <td>{{ section.time | formatSecond }}</td>
     <td>{{ CHARGE | optionKV(section.charge) }}</td>
     <td>{{ section.sort }}</td>
     <td>{{ section.vod }}</td>
     <td>{{ section.createdAt }}</td>
     <td>{{ section.updatedAt }}</td>
     <td>
      <div class="hidden-sm hidden-xs btn-group">
       <!-- 编辑 -->
       <button class="btn btn-xs btn-info" @click="toupdate(section)">
        <i class="ace-icon fa fa-pencil bigger-120"></i>
       </button>
       <!-- 删除 -->
       <button class="btn btn-xs btn-danger" @click="del(section.id)">
        <i class="ace-icon fa fa-trash-o bigger-120"></i>
       </button>
        <!-- 预览 -->
       <button class="btn btn-xs btn-info" @click="play(section)">
        <i class="ace-icon fa fa-video-camera bigger-120"></i>
       </button>
      </div>
     </td>
    </tr>
   </tbody>
  </table>
  <!-- 新增模态框 -->
  <div id="section-add-model" class="modal fade" tabindex="-1" role="dialog">
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
        <label class="col-sm-2 control-label">ID</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="ID"
          v-model="section.id"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">标题</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="标题"
          v-model="section.title"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">课程</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="课程"
          v-model="section.courseId"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">大章</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="大章"
          v-model="section.chapterId"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">视频</label>
        <div class="col-sm-10">
         <!-- 上传组件 -->
         <big-file
          v-bind:use="FILE_USE.COURSE.value"
          v-bind:text="'上传视频'"
          v-bind:after-upload="afterUpload"
          v-bind:id="'section-add'"
          v-bind:suffixs="['mp4']"
         ></big-file>
         <div v-if="section.video" class="row">
          <div class="col-md-4">
           <video v-bind:src="section.video" controls="controls"></video>
          </div>
         </div>
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">VOD</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="vod"
          disabled
          v-model="section.vod"
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
          v-model="section.time"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">收费:C收费F免费</label>
        <div class="col-sm-10">
         <select v-model="section.charge" class="form-control">
          <option
           v-for="(o, index) in CHARGE"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
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
  <div id="section-update-model" class="modal fade" tabindex="-1" role="dialog">
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
        <label class="col-sm-2 control-label">标题</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="标题"
          v-model="section.title"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">课程</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="课程"
          v-model="section.courseId"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">大章</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="大章"
          v-model="section.chapterId"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">视频</label>
        <div class="col-sm-10">
         <!-- 上传组件 -->
         <vod
          v-bind:use="FILE_USE.COURSE.value"
          v-bind:after-upload="afterUpload"
          v-bind:id="'section-update'"
          v-bind:suffixs="['mp4']"
         ></vod>
         <div v-show="section.video" class="row">
          <div class="col-md-9">
           <!-- <video
            v-bind:src="section.video"
            controls="controls"
            id="video1"
           ></video> -->
           <player ref="player" v-bind:playerId="'form-player-dev'"></player>
          </div>
         </div>
        </div>
       </div>
       <!-- 视频地址太长不展示 -->
       <div class="form-group">
        <label class="col-sm-2 control-label">视频</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="视频"
          disabled
          v-model="section.video"
         />
        </div>
       </div> 
       <div class="form-group">
        <label class="col-sm-2 control-label">VOD</label>
        <div class="col-sm-10">
         <input
          type="text"
          class="form-control"
          placeholder="vod"
          disabled
          v-model="section.vod"
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
          v-model="section.time"
         />
        </div>
       </div>
       <div class="form-group">
        <label class="col-sm-2 control-label">收费:C收费F免费</label>
        <div class="col-sm-10">
         <select v-model="section.charge" class="form-control">
          <option
           v-for="(o, index) in CHARGE"
           v-bind:key="index"
           v-bind:value="o.key"
          >
           {{ o.value }}
          </option>
         </select>
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
   <modal-player ref="modelPlayer"></modal-player>
  </div>
 <div id="player-modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
        <h4 class="modal-title">表单</h4>
        <player v-bind:player-id="'modal-player-div'"
                ref="modalPlayer"></player>
        </div>
      </div>
    </div>
  </div>
  
  
    

  
 </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";

import BigFile from "../../components/BigFile.vue";
import Vod from '../../components/Vod';
import Player from '../../components/Player.vue';
import ModalPlayer from '../../components/ModalPlayer.vue';
//import Vod from "../../components/Vod.vue";

export default {
 components: { Pagination,BigFile, Vod, Player, ModalPlayer },
 name: "business-section",
 //返回值
 data: function () {
  return {
   section: {},
   sections: [],
   CHARGE: SECTION_CHARGE,
   course: {},
   chapter: {},
   FILE_USE: FILE_USE,
  };
 },
 mounted: function () {
  let _this = this;
  _this.$refs.pagination.size = 5;
  let course = SessionStorage.get(SESSION_KEY_COURSE, course) || {};
  let chapter = SessionStorage.get(SESSION_KEY_CHAPTER, chapter) || {};
  if (Tool.isEmpty(course) || Tool.isEmpty(chapter)) {
   _this.$router.push("/welcome");
  }
  _this.course = course;
  _this.chapter = chapter;
  _this.list(1);
 },
 methods: {
  //添加打开模态框
  toadd() {
   let _this = this;
   _this.section = {
    video: "",
   };
   $("#section-add-model").modal("show");
  },
  //
  //添加打开模态框
  toupdate(section) {
   let _this = this;
   //消除双向绑定，复制对象
   _this.section = $.extend({}, section);
   $("#section-update-model").modal("show");
  },
  //列表
  list(page) {
   let _this = this;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/section/list",
     //传参对象
     {
      pageSize: _this.$refs.pagination.size,
      pageNo: page,
      courseId: _this.course.id,
      chapterId: _this.chapter.id,
     }
    )
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      console.log("查询列表", response);
      let resp = response.data;
      _this.sections = resp.data.records;
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
    !Validator.length(_this.section.title, "标题", 1, 50) ||
    !Validator.length(_this.section.video, "视频", 1, 200)
   ) {
    return;
   }
  _this.section.video = "";
   _this.section.courseId = _this.course.id;
   _this.section.chapterId = _this.chapter.id;
   Loading.show();
   _this.$ajax
    .post(
     process.env.VUE_APP_SERVER + "/business/admin/section/save",
     //传参对象
     _this.section
    )
    .then(
     //响应结果
     (response) => {
      console.log("保存成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#section-add-model").modal("hide");
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
     process.env.VUE_APP_SERVER + "/business/admin/section/update",
     //传参对象
     _this.section
    )
    .then(
     //响应结果
     (response) => {
      console.log("修改成功", response);
      let resp = response.data;
      //保存成功
      if (resp.success) {
       //关闭模态框
       $("#section-update-model").modal("hide");
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
     .delete(
      process.env.VUE_APP_SERVER + "/business/admin/section/delete/" + id
     )
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
  //去课程
  toCourse() {
   let _this = this;
   _this.$router.push("/business/course");
  },
  //去课程
  toChapter() {
   let _this = this;
   _this.$router.push("/business/chapter");
  },
  afterUpload(resp) {
   let _this = this;
   //图片返回地址
   let video = resp.data.path;
   let vod = resp.data.vod;
   _this.getTime("video1");
   _this.section.video = video;
   _this.section.vod = vod; 
   //播放视频
   _this.$refs.player.playUrl(video);
  },
  /**
   * 获取时长
   */
  getTime(id) {
   let _this = this;
   let ele = document.getElementById(id);
   setTimeout(function () {
    _this.section.time = parseInt(ele.duration, 10);
   }, 3000);
  },
  //播放视频
  play(section){
    let _this = this;

    _this.$refs.modalPlayer.playVod(section.vod);
    
    $("#player-modal").modal("show");
  }
 },
};
</script>
<style scoped>
video {
 width: 100%;
 height: auto;
 margin-top: 10px;
}
</style>
