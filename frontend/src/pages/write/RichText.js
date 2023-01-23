import React, {useRef} from "react"
import JoditEditor from 'jodit-react';
import "../../App.css"

const RichTextEditor = ({setDescription,value}) => {
    const editor = useRef(null)
    editor.value = value
    const config = {
        buttons : ["bold", "|","italic", "|","underline", "|","link", "|", "strikethrough", "|", "font", "|", "fontsize", "|", "brush", "|", "indent", "|","outdent", "|", "ul", "|", "ol", "|", "table", "|", "fullsize"   ],
      }
      
  return (
    <JoditEditor spellcheck={true} ref={editor} value={value}  onBlur={newContent => setDescription(newContent)}  config={config} />
  )
}

export default RichTextEditor
