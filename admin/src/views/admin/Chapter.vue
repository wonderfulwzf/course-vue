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
    <table id="simple-table" class="table  table-bordered table-hover">
      <thead>
        <tr>
          <th class="detail-col">ID</th>
          <th>名称</th>
          <th>课程ID</th>
          <th class="hidden-480">操作</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="chapter in chapters" v-bind:key="chapter.id">
          <td>{{ chapter.id }}</td>
          <td>{{ chapter.name }}</td>
          <td>{{ chapter.courseId }}</td>
          <td>
            <div class="hidden-sm hidden-xs btn-group">
              <!-- 编辑 -->
              <button class="btn btn-xs btn-info" @click="toupdate(chapter)">
                <i class="ace-icon fa fa-pencil bigger-120"></i>
              </button>
              <!-- 删除 -->
              <button class="btn btn-xs btn-danger" @click="del(chapter.id)">
                <i class="ace-icon fa fa-trash-o bigger-120"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 新增模态框 -->
    <div id="chapter-add-model" class="modal fade" tabindex="-1" role="dialog">
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
                <label class="col-sm-2 control-label">名称</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="名称"
                    v-model="chapter.name"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">课程ID</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="课程ID"
                    v-model="chapter.courseId"
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
      id="chapter-update-model"
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
              <div class="form-group">
                <label class="col-sm-2 control-label">ID</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="id"
                    v-model="chapter.id"
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
                    v-model="chapter.name"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">课程ID</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="课程ID"
                    v-model="chapter.courseId"
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
  name: "chapter",
  //返回值
  data: function() {
    return {
      chapter: {},
      chapters: [],
    };
  },
  mounted: function() {
    let _this = this;
    _this.$refs.pagination.size = 5;
    _this.list(1);
  },
  methods: {
    //添加大章打开模态框
    toadd() {
      let _this = this;
      _this.chapter = {};
      $("#chapter-add-model").modal("show");
    },
    //
    //添加大章打开模态框
    toupdate(chapter) {
      let _this = this;
      //消除双向绑定，复制对象
      _this.chapter = $.extend({}, chapter);
      $("#chapter-update-model").modal("show");
    },
    //大章列表
    list(page) {
      let _this = this;
      Loading.show();
      _this.$ajax
        .post(
          "http://127.0.0.1:9000/business/admin/chapter/list",
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
            console.log("查询大章列表", response);
            let resp = response.data;
            _this.chapters = resp.data.records;
            _this.$refs.pagination.render(page, resp.data.totalRecord);
          }
        );
    },
    //大章保存
    save() {
      let _this = this;
      _this.$ajax
        .post(
          "http://127.0.0.1:9000/business/admin/chapter/save",
          //传参对象
          _this.chapter
        )
        .then(
          //响应结果
          (response) => {
            console.log("保存大章成功", response);
            let resp = response.data;
            //保存成功
            if (resp.success) {
              //关闭模态框
              $("#chapter-add-model").modal("hide");
              //刷新列表
              _this.list(1);
              ToastMin.success("保存成功！");
            }
          }
        );
    },
    //大章修改
    update() {
      let _this = this;
      _this.$ajax
        .post(
          "http://127.0.0.1:9000/business/admin/chapter/update",
          //传参对象
          _this.chapter
        )
        .then(
          //响应结果
          (response) => {
            console.log("修改大章成功", response);
            let resp = response.data;
            //保存成功
            if (resp.success) {
              //关闭模态框
              $("#chapter-update-model").modal("hide");
              //刷新列表
              _this.list(1);
              ToastMin.success("保存成功！");
            }
          }
        );
    },
    //大章删除
    del(id) {
      let _this = this;

      Confirm.show("删除大章后将不可恢复！", function() {
        //确认删除
        _this.$ajax
          .delete("http://127.0.0.1:9000/business/admin/chapter/delete/" + id)
          .then(
            //响应结果
            (response) => {
              console.log("删除大章成功", response);
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
