import React, {useRef} from "react"
import JoditEditor from 'jodit-react';


const RichTextEditor = ({setDescription}) => {
    const editor = useRef(null)
    const config = {
        buttons : ["bold","italic","underline","link"   ],
      }
    
  return (
    <JoditEditor ref={editor}  onBlur={newContent => setDescription(newContent)}  config={config} />
  )
}

export default RichTextEditor