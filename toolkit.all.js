(function(){
var current_script = document.currentScript || (function() { var a = document.getElementsByTagName('script'); return a[a.length - 1]; })();
var toolkit_base_dir = current_script.src;
toolkit_base_dir = toolkit_base_dir.split('/');
toolkit_base_dir = toolkit_base_dir.slice(0, toolkit_base_dir.length-1).join('/');
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/polyfill/raf.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/G.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/toolkit.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/base.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/audiomath.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/anchor.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/ranges.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/globalcursor.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/ranged.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/warning.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/gradient.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/implements/notes.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/widget.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/tooltips.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/grid.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/range.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/scale.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/scrollvalue.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/graph.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/circular.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/filter.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/resize.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/responsehandle.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/eqband.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/dragvalue.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/modules/drag.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/container.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/root.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/button.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/valuebutton.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/buttonarray.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/clock.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/state.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/pager.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/expander.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/meterbase.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/levelmeter.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/chart.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/dynamics.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/gauge.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/frequencyresponse.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/responsehandler.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/equalizer.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/fader.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/value.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/label.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/knob.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/valueknob.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/select.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/window.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/toggle.js'></script>");
document.writeln("<script src='" + toolkit_base_dir + "/toolkit/widgets/multimeter.js'></script>");
})();
