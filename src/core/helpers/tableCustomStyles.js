const tableCustomStyles = {
  table: {
    style: {
      borderRadius: "var(--br)",
      overflow: "hidden",
      border: "1px solid #ddd",
    },
  },
  headRow: {
    style: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "rgba(0,0,0,0.09)",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: 600,
    },
  },
  rows: {
    style: {
      fontSize: "12px",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #FFFFFF",
      cursor: "pointer",
    },
  },
};

export default tableCustomStyles;
