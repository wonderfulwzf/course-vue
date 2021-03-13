<template>
  <div>
    <p>
      <!-- 新增按钮 -->
      <button class="btn btn-white btn-default btn-round" @click="add()">
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
              <button class="btn btn-xs btn-success">
                <i class="ace-icon fa fa-check bigger-120"></i>
              </button>

              <button class="btn btn-xs btn-info">
                <i class="ace-icon fa fa-pencil bigger-120"></i>
              </button>

              <button class="btn btn-xs btn-danger">
                <i class="ace-icon fa fa-trash-o bigger-120"></i>
              </button>

              <button class="btn btn-xs btn-warning">
                <i class="ace-icon fa fa-flag bigger-120"></i>
              </button>
            </div>

            <div class="hidden-md hidden-lg">
              <div class="inline pos-rel">
                <button
                  class="btn btn-minier btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  data-position="auto"
                >
                  <i class="ace-icon fa fa-cog icon-only bigger-110"></i>
                </button>

                <ul
                  class="dropdown-menu dropdown-only-icon dropdown-yellow dropdown-menu-right dropdown-caret dropdown-close"
                >
                  <li>
                    <a
                      href="#"
                      class="tooltip-info"
                      data-rel="tooltip"
                      title="View"
                    >
                      <span class="blue">
                        <i class="ace-icon fa fa-search-plus bigger-120"></i>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="tooltip-success"
                      data-rel="tooltip"
                      title="Edit"
                    >
                      <span class="green">
                        <i
                          class="ace-icon fa fa-pencil-square-o bigger-120"
                        ></i>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="tooltip-error"
                      data-rel="tooltip"
                      title="Delete"
                    >
                      <span class="red">
                        <i class="ace-icon fa fa-trash-o bigger-120"></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 模态框 -->
    <div class="modal fade" tabindex="-1" role="dialog">
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
                <label  class="col-sm-2 control-label"
                  >名称</label
                >
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
                <label  class="col-sm-2 control-label"
                  >课程ID</label
                >
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
            <button type="button" class="btn btn-primary" v-on:click="save()">保存</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /.modal -->
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue';
export default {
 components: { Pagination },
  name: "chapter",
  //返回值
  data: function() {
    return {
      chapter:{},
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
    add() {
      //let _this = this;
      $(".modal").modal("show");
    },
    //大章列表
    list(page) {
      let _this = this;
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
            console.log("查询大章列表", response);
            let resp = response.data;
            _this.chapters = resp.data.records;
            _this.$refs.pagination.render(page,resp.data.totalRecord);
          }
        );
    },
    //大章save
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
            if(resp.success){
              //关闭模态框
              $(".modal").modal("hide");
              //刷新列表
              _this.list(1);
            }
          }
        );
    },
  },
};
</script>
