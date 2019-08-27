/**
 * http 请求工具
 */
define([
  'jquery',
  'layer'
], function ($, layer) {


  var NzHttp = {
    get: function (url, params, options = {}) {
      this.url = url; //请求地址
      this.contentType = options.contentType || 'application/json'; //发送的数据类型
      this.dataType = options.dataType || 'json'; //响应的数据类型
      this.method = options.method || 'GET'; //请求方式
      this.traditional = options.traditional || false;
      if (options.async != undefined) {
        this.async = false
      }
      return sendRequest(this, params)
    },
    post: function (url, params, options = {}) {
      var that = this;
      that.url = url;
      return sendRequest(url, params)
    }
  }

  /**
   * 发送请求
   * @param {*} url 请求url
   * @param {*} params  请求参数
   * @param {*} async 同步/异步  默认为异步请求 不会阻塞
   */
  function sendRequest(that, params) {
    //回调函数解决方案
    var dtd = $.Deferred();
    $.ajax({
      url: that.url,
      method: that.method,
      async: that.async,
      data: params,
      contentType: that.contentType,
      dataType: that.dataType
    }).then(function (data) {
      dtd.resolve(data);
    }, function (error) {
      dtd.reject(error);
    });

    return dtd.promise();
  }

  return NzHttp;

});