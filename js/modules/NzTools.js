/**
 * 工具
 */
define([
  'jquery',
], function ($) {
  var panelHeight = $("#nzui-layout-tabs .tabs-panels .panel").innerHeight();
  var NzTools = {
    /**
     * 计算表格的高度
     * @param el 要被减去的元素高度
     */
    tableHeight: function (el) {
      return panelHeight - $(el).height() - 48;
    }
  }
  return NzTools;
});