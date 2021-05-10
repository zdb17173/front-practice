const path = require('path');

const vendorFolder = path.resolve(__dirname, '../../static/vendor');

module.exports = {
    // Replace modules with other modules or paths
    alias: {
        'jwplayer': path.resolve(vendorFolder, 'jwplayer-7.12.1/jwplayer.js'),
        'jquery-migrate': path.resolve(vendorFolder, 'global/plugins/jquery-migrate.min.js'),
        'jquery-ui': path.resolve(vendorFolder, 'global/plugins/jquery-ui/jquery-ui.min.js'),
        'jquery-ui-style': path.resolve(vendorFolder, 'global/plugins/jquery-ui/jquery-ui.min.css'),
       
        // 'jquery-slimscroll': path.resolve(vendorFolder, 'global/plugins/jquery-slimscroll/jquery.slimscroll.min.js'),
        'jquery.blockui': path.resolve(vendorFolder, 'global/plugins/jquery.blockui.min.js'),
        'jquery.cokie': path.resolve(vendorFolder, 'global/plugins/jquery.cokie.min.js'),
        'jquery.uniform': path.resolve(vendorFolder, 'global/plugins/uniform/jquery.uniform.min.js'),

        'jquery.vmap': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/jquery.vmap.js'),
        'jquery.vmap.russia': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js'),
        'jquery.vmap.world': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js'),
        'jquery.vmap.europe': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js'),
        'jquery.vmap.germany': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js'),
        'jquery.vmap.usa': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js'),
        'jquery.vmap.sampledata': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js'),
        'jquery.flot': path.resolve(vendorFolder, 'global/plugins/flot/jquery.flot.min.js'),
        'jquery.flot.resize': path.resolve(vendorFolder, 'global/plugins/flot/jquery.flot.resize.min.js'),
        'jquery.flot.categories': path.resolve(vendorFolder, 'global/plugins/flot/jquery.flot.categories.min.js'),
        'jquery.pulsate': path.resolve(vendorFolder, 'global/plugins/jquery.pulsate.min.js'),
        'jquery.codemirror': path.resolve(vendorFolder, 'global/plugins/jquery-diff/codemirror.min.js'),
        'jquery.mergely': path.resolve(vendorFolder, 'global/plugins/jquery-diff/mergely.min.js'),

        'fullcalendar': path.resolve(vendorFolder, 'global/plugins/fullcalendar/fullcalendar.min.js'),
        'jquery.easypiechart': path.resolve(vendorFolder, 'global/plugins/jquery-easypiechart/jquery.easypiechart.min.js'),
        'jquery.sparkline': path.resolve(vendorFolder, 'global/plugins/jquery.sparkline.min.js'),

        "bootstrap": path.resolve(vendorFolder, 'bootstrap/js/bootstrap.js'),
        "bootstrap-style": path.resolve(vendorFolder, 'bootstrap/css/bootstrap.css'),
        "bootstrap-datetimepicker": path.resolve(vendorFolder, 'bootstrap-datetimepicker/js/bootstrap-datetimepicker.js'),
        "bootstrap-datetimepicker-style": path.resolve(__dirname, 'bootstrap-datetimepicker/css/bootstrap-datetimepicker.css'),
        "bootstrap-modalmanager": path.resolve(vendorFolder, 'global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js'),
        "bootstrap-modal": path.resolve(vendorFolder, 'global/plugins/bootstrap-modal/js/bootstrap-modal.js'),
        "bootstrap-modal-bs3-style": path.resolve(vendorFolder, 'global/plugins/bootstrap-modal/css/bootstrap-modal-bs3patch.css'),
        "bootstrap-modal-style": path.resolve(vendorFolder, 'global/plugins/bootstrap-modal/css/bootstrap-modal.css'),


        'metronic': path.resolve(vendorFolder, 'global/scripts/metronic.js'),
        'admin-layout': path.resolve(vendorFolder, 'admin/layout4/scripts/layout.js'),
        'admin-quick-sidebar': path.resolve(vendorFolder, 'admin/layout4/scripts/quick-sidebar.js'),
        'admin-demo': path.resolve(vendorFolder, 'admin/layout4/scripts/demo.js'),
        'admin-index': path.resolve(vendorFolder, 'admin/pages/scripts/index.js'),
        'admin-tasks': path.resolve(vendorFolder, 'admin/pages/scripts/tasks.js'),
        'admin-calendar': path.resolve(vendorFolder, 'admin/pages/scripts/calendar.js'),
        "bootstrap-fileinput": path.resolve(vendorFolder, 'global/plugins/bootstrap-fileinput-4.3.3/js/fileinput.min.js'),
        "bootstrap-fileinput-style": path.resolve(vendorFolder, 'global/plugins/bootstrap-fileinput-4.3.3/css/fileinput.min.css'),
        'bootstrap-toastr': path.resolve(vendorFolder, 'global/plugins/bootstrap-toastr/toastr.min.js'),
        'bootstrap-toastr-style': path.resolve(vendorFolder, 'global/plugins/bootstrap-toastr/toastr.min.css'),
        'admin-spin': path.resolve(vendorFolder, 'admin/pages/scripts/spin.js'),
        'components-pickers': path.resolve(vendorFolder, 'admin/pages/scripts/components-pickers.js'),

        'umeditorConfig': path.resolve(vendorFolder, 'umeditor/umeditor.config.js'),
        'umeditor-config': path.resolve(vendorFolder, 'umeditor/umeditor.config.js'),
        'umeditor': path.resolve(vendorFolder, 'umeditor/umeditor.min.js'),
        'umeditorEN': path.resolve(vendorFolder, 'umeditor/lang/en/en.js'),
        'umeditor-en': path.resolve(vendorFolder, 'umeditor/lang/en/en.js'),

        'font-awesome': 'font-awesome/css/font-awesome.css',
        'simple-line-icons-style': path.resolve(vendorFolder, 'global/plugins/simple-line-icons/simple-line-icons.min.css'),
        'uniform-style': path.resolve(vendorFolder, 'global/plugins/uniform/css/uniform.default.css'),
        'fullcalendar-style': path.resolve(vendorFolder, 'global/plugins/fullcalendar/fullcalendar.min.css'),
        'jqvmap-style': path.resolve(vendorFolder, 'global/plugins/jqvmap/jqvmap/jqvmap.css'),
        'morris-style': path.resolve(vendorFolder, 'global/plugins/morris/morris.css'),
        'admin-tasks-style': path.resolve(vendorFolder, 'admin/pages/css/tasks.css'),
        'components-rounded-style': path.resolve(vendorFolder, 'global/css/components-rounded.css'),
        'plugins-style': path.resolve(vendorFolder, 'global/css/plugins.css'),
        'admin-layout-style': path.resolve(vendorFolder, 'admin/layout4/css/layout.css'),
        'admin-light-style': path.resolve(vendorFolder, 'admin/layout4/css/themes/light.css'),
        'umeditorStyle': path.resolve(vendorFolder, 'umeditor/themes/default/css/umeditor.css'),
        'umeditor-style': path.resolve(vendorFolder, 'umeditor/themes/default/css/umeditor.css'),
        'diff-codemirror-style': path.resolve(vendorFolder, 'global/plugins/jquery-diff/css/codemirror.css'),
        'diff-mergely-style': path.resolve(vendorFolder, 'global/plugins/jquery-diff/css/mergely.css'),

        'jstree': path.resolve(vendorFolder, 'jsTree/dist/jstree.js'),
        'jstree-style': path.resolve(vendorFolder, 'jsTree/dist/themes/default/style.min.css'),
        'jquery-dataTables': path.resolve(vendorFolder, 'global/plugins/datatables/media/js/jquery.dataTables.min.js'),
        'bootstrap-dataTables': path.resolve(vendorFolder, 'global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js'),
        'dataTables-style': path.resolve(vendorFolder, 'global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css'),
        'form-editable': path.resolve(vendorFolder, 'admin/pages/scripts/form-editable.js'),
        'jquery-mockjax': path.resolve(vendorFolder, 'global/plugins/jquery.mockjax.js'),
        'bootstrap-editable': path.resolve(vendorFolder, 'global/plugins/bootstrap-editable/bootstrap-editable/js/bootstrap-editable.js'),
        'bootstrap-editable-style': path.resolve(vendorFolder, 'global/plugins/bootstrap-editable/bootstrap-editable/css/bootstrap-editable.css'),

        'sina-emotion': path.resolve(vendorFolder, 'global/plugins/sina-emotion/jquery-sinaEmotion-2.1.0.min.js'),
        'sina-emotion-style': path.resolve(vendorFolder, 'global/plugins/sina-emotion/jquery-sinaEmotion-2.1.0.min.css'),
        'diff_match_patch': path.resolve(vendorFolder, 'global/plugins/diff_match_patch.js'),

        'iscroll-probe': path.resolve(vendorFolder, 'iscroll-5.2.0/build/iscroll-probe.js'),
        'iscroll': path.resolve(vendorFolder, 'iscroll-5.2.0/build/iscroll.js')
    },

    //extensions: ['.js', '.styl', '.css', '.jpg', '.gif', '.png'],
    extensions: ['.js'],

    modules: [
        path.resolve(__dirname, '../../react_sources/modules'),
        path.resolve(__dirname, '../../react_sources/stylus'),
        path.resolve(__dirname, '../../static/images'),
        path.resolve(__dirname, '../../node_modules')
    ]
}