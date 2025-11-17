import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    const defaultTitle = "Clean Community"; 
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
  }, [title]);
};

export default useDocumentTitle;
