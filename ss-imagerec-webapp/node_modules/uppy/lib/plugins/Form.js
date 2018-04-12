var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plugin = require('../core/Plugin');

var _require = require('../core/Utils'),
    findDOMElement = _require.findDOMElement;
// Rollup uses get-form-data's ES modules build, and rollup-plugin-commonjs automatically resolves `.default`.
// So, if we are being built using rollup, this require() won't have a `.default` property.


var getFormData = require('get-form-data').default || require('get-form-data');

/**
 * Form
 */
module.exports = function (_Plugin) {
  _inherits(Form, _Plugin);

  function Form(uppy, opts) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, _Plugin.call(this, uppy, opts));

    _this.type = 'acquirer';
    _this.id = 'Form';
    _this.title = 'Form';

    // set default options
    var defaultOptions = {
      target: null,
      resultName: 'uppyResult',
      getMetaFromForm: true,
      addResultToForm: true,
      submitOnSuccess: false,
      triggerUploadOnSubmit: false

      // merge default options with the ones set by user
    };_this.opts = _extends({}, defaultOptions, opts);

    _this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
    _this.handleUploadStart = _this.handleUploadStart.bind(_this);
    _this.handleSuccess = _this.handleSuccess.bind(_this);
    _this.addResultToForm = _this.addResultToForm.bind(_this);
    _this.getMetaFromForm = _this.getMetaFromForm.bind(_this);
    return _this;
  }

  Form.prototype.handleUploadStart = function handleUploadStart() {
    if (this.opts.getMetaFromForm) {
      this.getMetaFromForm();
    }
  };

  Form.prototype.handleSuccess = function handleSuccess(result) {
    if (this.opts.addResultToForm) {
      this.addResultToForm(result);
    }

    if (this.opts.submitOnSuccess) {
      this.form.submit();
    }
  };

  Form.prototype.handleFormSubmit = function handleFormSubmit(ev) {
    if (this.opts.triggerUploadOnSubmit) {
      ev.preventDefault();
      this.uppy.upload();
    }
  };

  Form.prototype.addResultToForm = function addResultToForm(result) {
    this.uppy.log('[Form] Adding result to the original form:');
    this.uppy.log(result);

    var resultInput = this.form.querySelector('[name="' + this.opts.resultName + '"]');
    if (resultInput) {
      resultInput.value = JSON.stringify(result);
      return;
    }

    resultInput = document.createElement('input');
    resultInput.name = this.opts.resultName;
    resultInput.type = 'hidden';
    resultInput.value = JSON.stringify(result);
    this.form.appendChild(resultInput);
  };

  Form.prototype.getMetaFromForm = function getMetaFromForm() {
    var formMeta = getFormData(this.form);
    this.uppy.setMeta(formMeta);
  };

  Form.prototype.install = function install() {
    this.form = findDOMElement(this.opts.target);
    if (!this.form || !this.form.nodeName === 'FORM') {
      console.error('Form plugin requires a <form> target element passed in options to operate, none was found', 'error');
      return;
    }

    this.form.addEventListener('submit', this.handleFormSubmit);
    this.uppy.on('upload', this.handleUploadStart);
    this.uppy.on('complete', this.handleSuccess);
  };

  Form.prototype.uninstall = function uninstall() {
    this.form.removeEventListener('submit', this.handleFormSubmit);
    this.uppy.off('upload', this.handleUploadStart);
    this.uppy.off('complete', this.handleSuccess);
  };

  return Form;
}(Plugin);
//# sourceMappingURL=Form.js.map