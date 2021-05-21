import { Drawer } from "antd";
import React from "react";
import CkEditor from "../../core/components/CKEditor";
import KButtonBlue from "../../core/components/KButtonBlue";

export default function WriteStoryDrawer({
  visible,
  onClose,
  onSave,
  body,
  name,
}) {
  const [editorBody, setEditorBody] = React.useState(body);

  return (
    <Drawer
      title="Write Story"
      placement="right"
      width="85%"
      visible={visible}
      onClose={onClose}
    >
      <CkEditor name={name} body={editorBody} setBody={setEditorBody} />
      <br />
      <KButtonBlue onClick={() => onSave(editorBody)} className="cta-blog-save">
        Save
      </KButtonBlue>
    </Drawer>
  );
}
