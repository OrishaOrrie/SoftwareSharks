var Row = require('./TableRow');

var _require = require('preact'),
    h = _require.h;

module.exports = function (props) {
  // const headers = props.columns.map((column) => {
  //   return html`
  //     <th class="uppy-ProviderBrowserTable-headerColumn uppy-ProviderBrowserTable-column" onclick=${props.sortByTitle}>
  //       ${column.name}
  //     </th>
  //   `
  // })

  // <thead class="uppy-ProviderBrowserTable-header">
  //   <tr>${headers}</tr>
  // </thead>

  return h(
    'div',
    { 'class': 'uppy-ProviderBrowser-body' },
    h(
      'ul',
      { 'class': 'uppy-ProviderBrowser-list',
        onscroll: props.handleScroll,
        role: 'listbox',
        'aria-label': 'List of files from ' + props.title },
      props.folders.map(function (folder) {
        var isDisabled = false;
        var isChecked = props.isChecked(folder);
        if (isChecked) {
          isDisabled = isChecked.loading;
        }
        return Row({
          title: props.getItemName(folder),
          type: 'folder',
          // active: props.activeRow(folder),
          getItemIcon: function getItemIcon() {
            return props.getItemIcon(folder);
          },
          handleClick: function handleClick() {
            return props.handleFolderClick(folder);
          },
          isDisabled: isDisabled,
          isChecked: isChecked,
          handleCheckboxClick: function handleCheckboxClick(e) {
            return props.toggleCheckbox(e, folder);
          },
          columns: props.columns
        });
      }),
      props.files.map(function (file) {
        return Row({
          title: props.getItemName(file),
          type: 'file',
          // active: props.activeRow(file),
          getItemIcon: function getItemIcon() {
            return props.getItemIcon(file);
          },
          handleClick: function handleClick() {
            return props.handleFileClick(file);
          },
          isDisabled: false,
          isChecked: props.isChecked(file),
          handleCheckboxClick: function handleCheckboxClick(e) {
            return props.toggleCheckbox(e, file);
          },
          columns: props.columns
        });
      })
    )
  );
};
//# sourceMappingURL=Table.js.map