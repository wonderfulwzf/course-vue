Validator = {
  require: function (value, text) {
    if (Tool.isEmpty(value)) {
      ToastMax.warning(text + "不能为空");
      return false;
    } else {
      return true
    }
  },

  length: function (value, text, min, max) {
    if (Tool.isEmpty(value)) {
      ToastMax.warning(text + "不能为空");
      return false;
    }
    if (!Tool.isLength(value, min, max)) {
      ToastMax.warning(text + "长度" + min + "~" + max + "位");
      return false;
    } else {
      return true
    }
  }
};