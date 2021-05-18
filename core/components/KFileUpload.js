import React from "react";

export default function KFileUpload({ onUpload, children, accept }) {
  const fileRef = React.useRef(null);

  const handleFileUpload = () => {
    const file = fileRef.current.files[0];
    onUpload(file);
  };

  return (
    <React.Fragment>
      <input
        accept={accept || "*"}
        type="file"
        onChange={handleFileUpload}
        ref={fileRef}
        style={{ display: "none" }}
      />
      <div
        style={{ display: "inline-block" }}
        onClick={() => fileRef.current.click()}
      >
        {children}
      </div>
    </React.Fragment>
  );
}
