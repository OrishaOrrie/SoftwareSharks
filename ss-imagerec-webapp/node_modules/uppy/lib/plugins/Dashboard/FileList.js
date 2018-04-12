var FileItem = require('./FileItem');
var ActionBrowseTagline = require('./ActionBrowseTagline');

var _require = require('./icons'),
    dashboardBgIcon = _require.dashboardBgIcon;

var classNames = require('classnames');

var _require2 = require('preact'),
    h = _require2.h;

module.exports = function (props) {
  var noFiles = props.totalFileCount === 0;
  var dashboardFilesClass = classNames('uppy-Dashboard-files', { 'uppy-Dashboard-files--noFiles': noFiles });

  return h(
    'ul',
    { 'class': dashboardFilesClass },
    noFiles && h(
      'div',
      { 'class': 'uppy-Dashboard-bgIcon' },
      dashboardBgIcon(),
      h(
        'h3',
        { 'class': 'uppy-Dashboard-dropFilesTitle' },
        h(ActionBrowseTagline, {
          acquirers: props.acquirers,
          handleInputChange: props.handleInputChange,
          i18n: props.i18n
        })
      ),
      props.note && h(
        'p',
        { 'class': 'uppy-Dashboard-note' },
        props.note
      )
    ),
    Object.keys(props.files).map(function (fileID) {
      return FileItem({
        acquirers: props.acquirers,
        file: props.files[fileID],
        showFileCard: props.showFileCard,
        showProgressDetails: props.showProgressDetails,
        info: props.info,
        log: props.log,
        i18n: props.i18n,
        removeFile: props.removeFile,
        pauseUpload: props.pauseUpload,
        cancelUpload: props.cancelUpload,
        retryUpload: props.retryUpload,
        resumableUploads: props.resumableUploads,
        isWide: props.isWide
      });
    })
  );
};
//# sourceMappingURL=FileList.js.map