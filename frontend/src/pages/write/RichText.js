import { useRef } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ setDescription, value }) => {
  const editor = useRef(null);

  const config = {
    buttons: [
      "bold",
      "|",
      "italic",
      "|",
      "underline",
      "|",
      "link",
      "|",
      "strikethrough",
      "|",
      "font",
      "|",
      "fontsize",
      "|",
      "brush",
      "|",
      "indent",
      "|",
      "outdent",
      "|",
      "ul",
      "|",
      "ol",
      "|",
      "table",
      "|",
      "fullsize",
      "|",
      "paragraph", // Enables <p>, <h1>, <h2>, etc.
    ],
    style: {
      allowInStyle: true, // Enables inline styles
    },
    enter: "BR", // Prevents block elements (like <p>) and keeps inline
    inline: true, // Enables inline editing
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      spellcheck={true}
      onBlur={() => setDescription(editor.current.value)} // Extracts value correctly
    />
  );
};

export default RichTextEditor;
