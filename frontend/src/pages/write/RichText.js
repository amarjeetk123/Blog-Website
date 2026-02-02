import { useRef } from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ setDescription, value }) => {
  const editor = useRef(null);

 const config = {
  buttons: [
    "bold","|","italic","|","underline","|","link","|",
    "strikethrough","|","font","|","fontsize","|","brush","|",
    "indent","|","outdent","|","ul","|","ol","|","table","|",
    "fullsize","|","paragraph"
  ],
  enter: "P",        // ✅ create <p> on Enter
  inline: false,     // ✅ block editor (normal document mode)
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
