var _require = require('preact'),
    h = _require.h;

var Breadcrumb = require('./Breadcrumb');

module.exports = function (props) {
  return h(
    'ul',
    { 'class': 'uppy-Provider-breadcrumbs' },
    props.directories.map(function (directory, i) {
      return Breadcrumb({
        getFolder: function getFolder() {
          return props.getFolder(directory.id);
        },
        title: i === 0 ? props.title : directory.title
      });
    })
  );
};
//# sourceMappingURL=Breadcrumbs.js.map