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
   //文件分
   let shardIndex = 1; //分片索引
   let shardSize = 20 * 1024 * 1024; //分片大小
   //文件大小
   let size = file.size;
   //总分片数
   let shardTotal = Math.ceil(size / shardSize);
   //文件标识
   let key = hex_md5(file);
   //穿参
   formData.append("use", _this.use);
   formData.append("shardIndex", shardIndex);
   formData.append("shardSize", shardSize);
   formData.append("shardTotal", shardTotal);
   formData.append("name", file.name);
   formData.append("suffix", suffix);
   formData.append("size", size);
   formData.append("key", key);

   //定义js文件对象
   let param = {
    shardIndex: shardIndex,
    shardSize: shardSize,
    shardTotal: shardTotal,
    use: _this.use,
    name: file.name,
    suffix: suffix,
    size: file.size,
    key: key,
   };
   _this.upload(param);
  },
  upload: function (param) {
   let _this = this;
   let shardIndex = param.shardIndex;
   let shardSize = param.shardSize;
   let shardTotal = param.shardTotal;
   //从文件中截取当前的分片数据
   let fileShard = _this.getfileShard(shardIndex, shardSize);
   //将图片转为base64进行传输
   let fileReader = new FileReader();
   fileReader.onload = function (e) {
    let base64 = e.target.result;
    param.shard = base64;
    Loading.show();
    //文件上传
    _this.$ajax
     .post(process.env.VUE_APP_SERVER + "/file/admin/upload", param)
     .then(
      //响应结果
      (response) => {
       Loading.hide();
       let resp = response.data;
       //保存成功
       if (resp.success) {
        console.log(shardIndex + 111111111);
        //判断是否全部上传成功
        if (shardIndex < shardTotal) {
         param.shardIndex = param.shardIndex + 1;
         //继续上传
         console.log(1);
         _this.upload(param);
        } else {
         _this.afterUpload(resp);
        }
        $("#" + _this.inputId + "-input").val("");
        ToastMin.success("上传文件成功！");
       }
      }
     );
   };
   fileReader.readAsDataURL(fileShard);
  },
  getfileShard: function (shardIndex, shardSize) {
   let _this = this;
   //获取files
   let file = _this.$refs.file.files[0];
   let start = (shardIndex - 1) * shardSize; //当前分片起始位置
   let size = file.size;
   let end = Math.min(size, start + shardSize); //当前分片结束位置
   let fileShard = file.slice(start, end); //从文件中截取当前的分片数据
   return fileShard;
  },
 },
};
</script>
<style>
</style>