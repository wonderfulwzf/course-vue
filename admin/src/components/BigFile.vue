<template>
 <div>
  <button
   type="button"
   class="btn btn-white btn-default btn-round"
   @click="selectFile()"
  >
   <i class="ace-icon fa fa-upload"></i>{{ text }}
  </button>
  <input
   v-bind:id="inputId + '-input'"
   type="file"
   ref="file"
   class="form-control file-upload-input hidden"
   placeholder="头像"
   v-on:change="uploadFile()"
  />
 </div>
</template>
<script>
export default {
 name: "bigfile",
 props: {
  text: {
   default: "上传a",
  },
  inputId: {
   default: "file-upload",
  },
  afterUpload: {
   type: Function,
   default: null,
  },
  suffixs: {
   default: [],
  },
  use: {
   default: "",
  },
 },
 data: function () {
  return {};
 },
 methods: {
  //选择上传文件
  selectFile() {
   let _this = this;
   $("#" + _this.inputId + "-input").trigger("click");
  },
  //修改文件上传
  uploadFile() {
   let _this = this;
   //传输表单.file-upload-input
   let formData = new window.FormData();
   //获取files
   let file = _this.$refs.file.files[0];
   //文件格式判断
   let suffixs = _this.suffixs;
   let fileName = file.name;
   let suffix = fileName
    .substring(fileName.lastIndexOf(".") + 1, fileName.length)
    .toLowerCase();
   let validateSuffix = false;
   for (let i = 0; i < suffixs.length; i++) {
    if (suffixs[i].toLowerCase() == suffix) {
     validateSuffix = true;
     break;
    }
   }
   if (!validateSuffix) {
    $("#" + _this.inputId + "-input").val("");
    ToastMax.warning("上传文件格式不支持,只支持" + suffixs.join(","));
    return;
   }
   console.log("3231");
   //文件分
   let shardIndex = 1; //分片索引
   let shardSize = 20 * 1024 * 1024; //分片大小
   let start = (shardIndex - 1) * shardSize; //当前分片起始位置
   let end = Math.min(file.size, start + shardSize); //当前分片结束位置
   let fileShard = file.slice(start, end); //从文件中截取当前的分片数据

   //文件大小
   let size = file.size;
   //总分片数
   let shardTotal = Math.ceil(size / shardSize);
   //文件标识
   let key = hex_md5(file);
   //穿参
   formData.append("file", fileShard);
   formData.append("use", _this.use);
   formData.append("shardIndex", shardIndex);
   formData.append("shardSize", shardSize);
   formData.append("shardTotal", shardTotal);
   formData.append("name", file.name);
   formData.append("suffix", suffix);
   formData.append("size", size);
   formData.append("key", key);

   Loading.show();
   //文件上传
   _this.$ajax
    .post(process.env.VUE_APP_SERVER + "/file/admin/upload", formData)
    .then(
     //响应结果
     (response) => {
      Loading.hide();
      let resp = response.data;
      $("#" + _this.inputId + "-input").val("");
      //保存成功
      if (resp.success) {
       //刷新列表
       ToastMin.success("上传文件成功！");
       _this.afterUpload(resp);
      }
     }
    );
  },
 },
};
</script>
<style>
</style>