var Core = require('./core');

// Parent
var Plugin = require('./core/Plugin');

// Acquirers
var Dashboard = require('./plugins/Dashboard');
var DragDrop = require('./plugins/DragDrop');
var FileInput = require('./plugins/FileInput');
var GoogleDrive = require('./plugins/GoogleDrive');
var Dropbox = require('./plugins/Dropbox');
var Instagram = require('./plugins/Instagram');
var Url = require('./plugins/Url');
var Webcam = require('./plugins/Webcam');

// Progressindicators
var StatusBar = require('./plugins/StatusBar');
var ProgressBar = require('./plugins/ProgressBar');
var Informer = require('./plugins/Informer');

// Uploaders
var Tus = require('./plugins/Tus');
var XHRUpload = require('./plugins/XHRUpload');
var Transloadit = require('./plugins/Transloadit');
var AwsS3 = require('./plugins/AwsS3');

// Helpers and utilities
var Form = require('./plugins/Form');
var ThumbnailGenerator = require('./plugins/ThumbnailGenerator');
var GoldenRetriever = require('./plugins/GoldenRetriever');
var ReduxDevTools = require('./plugins/ReduxDevTools');

module.exports = {
  Core: Core,
  Plugin: Plugin,
  StatusBar: StatusBar,
  ProgressBar: ProgressBar,
  Informer: Informer,
  DragDrop: DragDrop,
  GoogleDrive: GoogleDrive,
  Dropbox: Dropbox,
  Instagram: Instagram,
  Url: Url,
  FileInput: FileInput,
  Tus: Tus,
  XHRUpload: XHRUpload,
  Transloadit: Transloadit,
  AwsS3: AwsS3,
  Dashboard: Dashboard,
  Webcam: Webcam,
  Form: Form,
  ThumbnailGenerator: ThumbnailGenerator,
  GoldenRetriever: GoldenRetriever,
  ReduxDevTools: ReduxDevTools
};
//# sourceMappingURL=index.js.map