import React from 'react';

import './Editor.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  onFileLoaderChange = event => {
    const file = event.target.files[0];
    console.log(file);
    this.readFile(file)
  }

  readFile = file => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div id="editor-page">
        <input type="file" onChange={this.onFileLoaderChange} />
        <hr />
      </div>
    );
  }
}

export default Editor;
