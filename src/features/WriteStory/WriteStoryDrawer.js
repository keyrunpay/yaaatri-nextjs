import { Drawer } from "antd";
import React from "react";
import CkEditor from "../../core/components/CKEditor";
import KButtonBlue from "../../core/components/KButtonBlue";
import useMediaQuery from "../../core/hooks/useMediaQuery";

export default function WriteStoryDrawer({
  visible,
  onClose,
  onSave,
  title,
  body,
}) {
  const [editorBody, setEditorBody] = React.useState(body);
  const isMobile = useMediaQuery(767);

  return (
    <Drawer
      title={`Write  ${title || "Story"}`}
      placement={isMobile ? "bottom" : "right"}
      width="85%"
      height="90vh"
      visible={visible}
      onClose={onClose}
    >
      <CkEditor body={editorBody} setBody={setEditorBody} />
      <br />
      <KButtonBlue onClick={() => onSave(editorBody)} className="cta-blog-save">
        Save
      </KButtonBlue>
    </Drawer>
  );
}
