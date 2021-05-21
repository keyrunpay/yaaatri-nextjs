import React from "react";
import { Spin } from "antd";
import { onFileUpload } from "../../services/file.service";

export default function CkEditor(props) {
  const editorRef = React.useRef();
  const [editorLoaded, setEditorLoaded] = React.useState(false);
  const { CKEditor, DecoupledEditor } = editorRef.current || {};

  React.useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
    };
    setEditorLoaded(true);
    return () => {
      editorRef.current = null;
    };
  }, []);

  return editorLoaded ? (
    <React.Fragment>
      <div id="toolbar-container"></div>
      <CKEditor
        editor={DecoupledEditor}
        data={props.body || "<p>Write Blog here</p>"}
        onInit={(editor) => {
          const toolbarContainer = document.querySelector("#toolbar-container");
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          window.editor = editor;
          editor.plugins.get("FileRepository").createUploadAdapter = function (
            loader
          ) {
            return new MyUploadAdapter(loader, props.name);
          };
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.setBody(data);
        }}
      />
      <br />
    </React.Fragment>
  ) : (
    <div className="flex jcc">
      <br />
      <Spin size="large" />
      <br />
    </div>
  );
}

class MyUploadAdapter {
  constructor(loader, name) {
    this.loader = loader;
    this.name = name || Date.now();
    // this.url = baseUrl + "/upload";
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          onFileUpload(
            file,
            "story_body",
            this.name + "_" + Date.now().toString().substr(-4)
          )
            .then((res) => {
              resolve({ default: res.url });
            })
            .catch((err) => {
              reject(err.message);
            });
        })
    );
  }

  // Aborts the upload process.
  abort() {
    return "";
  }
}
