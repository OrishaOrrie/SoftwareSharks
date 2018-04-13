function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getFileTypeIcon = require('./getFileTypeIcon');

var _require = require('./icons'),
    checkIcon = _require.checkIcon;

var _require2 = require('preact'),
    h = _require2.h,
    Component = _require2.Component;

module.exports = function (_Component) {
  _inherits(FileCard, _Component);

  function FileCard(props) {
    _classCallCheck(this, FileCard);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.meta = {};

    _this.tempStoreMetaOrSubmit = _this.tempStoreMetaOrSubmit.bind(_this);
    _this.renderMetaFields = _this.renderMetaFields.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  FileCard.prototype.tempStoreMetaOrSubmit = function tempStoreMetaOrSubmit(ev) {
    var file = this.props.files[this.props.fileCardFor];

    if (ev.keyCode === 13) {
      ev.stopPropagation();
      ev.preventDefault();
      this.props.fileCardDone(this.meta, file.id);
      return;
    }

    var value = ev.target.value;
    var name = ev.target.dataset.name;
    this.meta[name] = value;
  };

  FileCard.prototype.renderMetaFields = function renderMetaFields(file) {
    var _this2 = this;

    var metaFields = this.props.metaFields || [];
    return metaFields.map(function (field) {
      return h(
        'fieldset',
        { 'class': 'uppy-DashboardFileCard-fieldset' },
        h(
          'label',
          { 'class': 'uppy-DashboardFileCard-label' },
          field.name
        ),
        h('input', { 'class': 'uppy-DashboardFileCard-input',
          type: 'text',
          'data-name': field.id,
          value: file.meta[field.id],
          placeholder: field.placeholder,
          onkeyup: _this2.tempStoreMetaOrSubmit,
          onkeydown: _this2.tempStoreMetaOrSubmit,
          onkeypress: _this2.tempStoreMetaOrSubmit })
      );
    });
  };

  FileCard.prototype.handleClick = function handleClick(ev) {
    var file = this.props.files[this.props.fileCardFor];
    this.props.fileCardDone(this.meta, file.id);
  };

  FileCard.prototype.render = function render() {
    var file = this.props.files[this.props.fileCardFor];

    return h(
      'div',
      { 'class': 'uppy-DashboardFileCard', 'aria-hidden': !this.props.fileCardFor },
      this.props.fileCardFor && h(
        'div',
        { style: 'width: 100%; height: 100%;' },
        h(
          'div',
          { 'class': 'uppy-DashboardContent-bar' },
          h(
            'h2',
            { 'class': 'uppy-DashboardContent-title' },
            this.props.i18n('editing'),
            ' ',
            h(
              'span',
              { 'class': 'uppy-DashboardContent-titleFile' },
              file.meta ? file.meta.name : file.name
            )
          ),
          h(
            'button',
            { 'class': 'uppy-DashboardContent-back', type: 'button', title: this.props.i18n('finishEditingFile'),
              onclick: this.handleClick },
            this.props.i18n('done')
          )
        ),
        h(
          'div',
          { 'class': 'uppy-DashboardFileCard-inner' },
          h(
            'div',
            { 'class': 'uppy-DashboardFileCard-preview', style: { backgroundColor: getFileTypeIcon(file.type).color } },
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
            { 'class': 'uppy-DashboardFileCard-info' },
            h(
              'fieldset',
              { 'class': 'uppy-DashboardFileCard-fieldset' },
              h(
                'label',
                { 'class': 'uppy-DashboardFileCard-label' },
                this.props.i18n('name')
              ),
              h('input', { 'class': 'uppy-DashboardFileCard-input',
                type: 'text',
                'data-name': 'name',
                value: file.meta.name || '',
                placeholder: this.props.i18n('name'),
                onkeyup: this.tempStoreMetaOrSubmit,
                onkeydown: this.tempStoreMetaOrSubmit,
                onkeypress: this.tempStoreMetaOrSubmit })
            ),
            this.renderMetaFields(file)
          )
        ),
        h(
          'div',
          { 'class': 'uppy-Dashboard-actions' },
          h(
            'button',
            { 'class': 'UppyButton--circular UppyButton--blue uppy-DashboardFileCard-done',
              type: 'button',
              title: this.props.i18n('finishEditingFiles'),
              onclick: this.handleClick },
            checkIcon()
          )
        )
      )
    );
  };

  return FileCard;
}(Component);
//# sourceMappingURL=FileCard.js.map