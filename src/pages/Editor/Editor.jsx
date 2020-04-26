import React from 'react';
import { Toast } from 'antd-mobile';

import './Editor.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  onFileLoaderChange = event => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return Toast.fail('未选择任何文件！');
    if (!file.type.startsWith('image')) return Toast.fail('请选择图片类型文件！');
    this.readFile(file);
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
