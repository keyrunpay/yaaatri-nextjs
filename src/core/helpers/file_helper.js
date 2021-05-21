export const getUrlFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsDataURL(file);
  });
};

export const fixLink = (link, optional = "") => {
  if (!link) return optional;
  if (typeof link !== "string") return optional;
  if (link.includes("http")) return link;
  else return "https://yaaatri.s3.ap-south-1.amazonaws.com/" + link;
};

export const computeColor = (status) => {
  switch (status) {
    case "Approved":
      return "green";
    case "Published":
      return "green";
    case "In Review":
      return "var(--secondary)";
    case "Rejected":
      return "red";
    case "Draft":
      return "var(--primary)";
    default:
      return "var(--text-black)";
  }
};
