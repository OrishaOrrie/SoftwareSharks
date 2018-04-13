var _require = require('../../core/Utils'),
    getETA = _require.getETA,
    getSpeed = _require.getSpeed,
    prettyETA = _require.prettyETA,
    getFileNameAndExtension = _require.getFileNameAndExtension,
    truncateString = _require.truncateString,
    copyToClipboard = _require.copyToClipboard;

var prettyBytes = require('prettier-bytes');
var FileItemProgress = require('./FileItemProgress');
var getFileTypeIcon = require('./getFileTypeIcon');

var _require2 = require('./icons'),
    iconEdit = _require2.iconEdit,
    iconCopy = _require2.iconCopy,
    iconRetry = _require2.iconRetry;

var classNames = require('classnames');

var _require3 = require('preact'),
    h = _require3.h;

module.exports = function fileItem(props) {
  var file = props.file;
  var acquirers = props.acquirers;

  var isProcessing = file.progress.preprocess || file.progress.postprocess;
  var isUploaded = file.progress.uploadComplete && !isProcessing && !file.error;
  var uploadInProgressOrComplete = file.progress.uploadStarted || isProcessing;
  var uploadInProgress = file.progress.uploadStarted && !file.progress.uploadComplete || isProcessing;
  var isPaused = file.isPaused || false;
  var error = file.error || false;

  var fileName = getFileNameAndExtension(file.meta.name).name;
  var truncatedFileName = props.isWide ? truncateString(fileName, 14) : fileName;

  var onPauseResumeCancelRetry = function onPauseResumeCancelRetry(ev) {
    if (isUploaded) return;
    if (error) {
      props.retryUpload(file.id);
      return;
    }
    if (props.resumableUploads) {
      props.pauseUpload(file.id);
    } else {
      props.cancelUpload(file.id);
    }
  };

  var dashboardItemClass = classNames('uppy-DashboardItem', { 'is-inprogress': uploadInProgress }, { 'is-processing': isProcessing }, { 'is-complete': isUploaded }, { 'is-paused': isPaused }, { 'is-error': error }, { 'is-resumable': props.resumableUploads });

  return h(
    'li',
    { 'class': dashboardItemClass, id: 'uppy_' + file.id, title: file.meta.name },
    h(
      'div',
      { 'class': 'uppy-DashboardItem-preview' },
      h(
        'div',
        { 'class': 'uppy-DashboardItem-previewInnerWrap', style: { backgroundColor: getFileTypeIcon(file.type).color } },
        file.preview ? h('img', { alt: file.name, src: file.preview }) : h(
          'div',
          { 'class': 'uppy-DashboardItem-previewIconWrap' },
          h(
            'span',
            { 'class': 'uppy-DashboardItem-previewIcon', style: { color: getFileTypeIcon(file.type).color } },
            getFileTypeIcon(file.type).icon
          ),
          h(
            'svg',
            { 'class': 'uppy-DashboardItem-previewIconBg', width: '72', height: '93', viewBox: '0 0 72 93' },
            h(
              'g',
              null,
              h('path', { d: 'M24.08 5h38.922A2.997 2.997 0 0 1 66 8.003v74.994A2.997 2.997 0 0 1 63.004 86H8.996A2.998 2.998 0 0 1 6 83.01V22.234L24.08 5z', fill: '#FFF' }),
              h('path', { d: 'M24 5L6 22.248h15.007A2.995 2.995 0 0 0 24 19.244V5z', fill: '#E4E4E4' })
            )
          )
        )
      ),
      h(
        'div',
        { 'class': 'uppy-DashboardItem-progress' },
        isUploaded ? h(
          'div',
          { 'class': 'uppy-DashboardItem-progressIndicator' },
          FileItemProgress({
            progress: file.progress.percentage,
            fileID: file.id
          })
        ) : h(
          'button',
          { 'class': 'uppy-DashboardItem-progressIndicator',
            type: 'button',
            title: isUploaded ? 'upload complete' : props.resumableUploads ? file.isPaused ? 'resume upload' : 'pause upload' : error ? 'retry upload' : 'cancel upload',
            onclick: onPauseResumeCancelRetry },
          error ? iconRetry() : FileItemProgress({
            progress: file.progress.percentage,
            fileID: file.id
          })
        ),
        props.showProgressDetails && h(
          'div',
          { 'class': 'uppy-DashboardItem-progressInfo',
            title: props.i18n('fileProgress'),
            'aria-label': props.i18n('fileProgress') },
          !file.isPaused && !isUploaded && h(
            'span',
            null,
            prettyETA(getETA(file.progress)),
            ' \u30FB \u2191 ',
            prettyBytes(getSpeed(file.progress)),
            '/s'
          )
        )
      )
    ),
    h(
      'div',
      { 'class': 'uppy-DashboardItem-info' },
      h(
        'h4',
        { 'class': 'uppy-DashboardItem-name', title: fileName },
        file.uploadURL ? h(
          'a',
          { href: file.uploadURL, target: '_blank' },
          file.extension ? truncatedFileName + '.' + file.extension : truncatedFileName
        ) : file.extension ? truncatedFileName + '.' + file.extension : truncatedFileName
      ),
      h(
        'div',
        { 'class': 'uppy-DashboardItem-status' },
        file.data.size && h(
          'div',
          { 'class': 'uppy-DashboardItem-statusSize' },
          prettyBytes(file.data.size)
        ),
        file.source && h(
          'div',
          { 'class': 'uppy-DashboardItem-sourceIcon' },
          acquirers.map(function (acquirer) {
            if (acquirer.id === file.source) return h(
              'span',
              { title: props.i18n('fileSource') + ': ' + acquirer.name },
              acquirer.icon()
            );
          })
        )
      ),
      !uploadInProgressOrComplete && h(
        'button',
        { 'class': 'uppy-DashboardItem-edit',
          type: 'button',
          'aria-label': props.i18n('editFile'),
          title: props.i18n('editFile'),
          onclick: function onclick(e) {
            return props.showFileCard(file.id);
          } },
        iconEdit()
      ),
      file.uploadURL && h(
        'button',
        { 'class': 'uppy-DashboardItem-copyLink',
          type: 'button',
          'aria-label': props.i18n('copyLink'),
          title: props.i18n('copyLink'),
          onclick: function onclick() {
            copyToClipboard(file.uploadURL, props.i18n('copyLinkToClipboardFallback')).then(function () {
              props.log('Link copied to clipboard.');
              props.info(props.i18n('copyLinkToClipboardSuccess'), 'info', 3000);
            }).catch(props.log);
          } },
        iconCopy()
      )
    ),
    h(
      'div',
      { 'class': 'uppy-DashboardItem-action' },
      !isUploaded && h(
        'button',
        { 'class': 'uppy-DashboardItem-remove',
          type: 'button',
          'aria-label': props.i18n('removeFile'),
          title: props.i18n('removeFile'),
          onclick: function onclick() {
            return props.removeFile(file.id);
          } },
        h(
          'svg',
          { 'aria-hidden': 'true', 'class': 'UppyIcon', width: '60', height: '60', viewBox: '0 0 60 60', xmlns: 'http://www.w3.org/2000/svg' },
          h('path', { stroke: '#FFF', 'stroke-width': '1', 'fill-rule': 'nonzero', 'vector-effect': 'non-scaling-stroke', d: 'M30 1C14 1 1 14 1 30s13 29 29 29 29-13 29-29S46 1 30 1z' }),
          h('path', { fill: '#FFF', 'vector-effect': 'non-scaling-stroke', d: 'M42 39.667L39.667 42 30 32.333 20.333 42 18 39.667 27.667 30 18 20.333 20.333 18 30 27.667 39.667 18 42 20.333 32.333 30z' })
        )
      )
    )
  );
};
//# sourceMappingURL=FileItem.js.map