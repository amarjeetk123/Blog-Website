import React, {useRef} from "react"
import JoditEditor from 'jodit-react';
import "../../App.css"


const RichTextEditor = ({setDescription,value}) => {
    const editor = useRef(null)
    editor.value = value
    const config = {
        buttons : ["bold","italic","underline","link", "strikethrough", "font", "|", "fontsize", "|", "brush", "indent","outdent", "ul", "table", "fullsize"   ],
      }

      
  return (
    <JoditEditor spellcheck={true} ref={editor} value={value}  onBlur={newContent => setDescription(newContent)}  config={config} />
//     <div className="App">
//     <RichTextEditorComponent>
//         <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p>
//         <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
//     </RichTextEditorComponent>
// </div>
  )
}

export default RichTextEditor

// import {
//   FaBold,
//   FaHeading,
//   FaItalic,
//   FaListOl,
//   FaListUl,
//   FaQuoteLeft,
//   FaRedo,
//   FaStrikethrough,
//   FaUnderline,
//   FaUndo,
// } from "react-icons/fa";

// import './editor.css'

// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import React from 'react'

// const TextEditor = ({ editor }) => {
  
//   if (!editor) {
//     return null
//   }

//   return (
//     <div className="menuBar">
//       <div>
//         <button
//           onClick={(e) =>{
//             e.preventDefault();
//             editor.chain().focus().toggleBold().run()
//           } }
//           className={editor.isActive("bold") ? "is_active" : ""}
//         >
//           <FaBold />
//         </button>
//         <button
//           onClick={(e) =>{
//             e.preventDefault();
//             editor.chain().focus().toggleItalic().run()
//           } }
//           className={editor.isActive("italic") ? "is_active" : ""}
//         >
//           <FaItalic />
//         </button>
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleUnderline().run()
//           }}
//           className={editor.isActive("underline") ? "is_active" : ""}
//         >
//           <FaUnderline />
//         </button>
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleStrike().run()
//           }}
//           className={editor.isActive("strike") ? "is_active" : ""}
//         >
//           <FaStrikethrough />
//         </button>
//         <button
//           onClick={(e) =>    
//             {
//               e.preventDefault()
//               editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           }
//           className={
//             editor.isActive("heading", { level: 2 }) ? "is_active" : ""
//           }
//         >
//           <FaHeading />
//         </button>
//         <button
//           onClick={(e) =>
//             {
//               e.preventDefault();
//               editor.chain().focus().toggleHeading({ level: 3 }).run()
//             }
//           }
//           className={
//             editor.isActive("heading", { level: 3 }) ? "is_active" : ""
//           }
//         >
//           <FaHeading className="heading3" />
//         </button>
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleBulletList().run()
//           }}
//           className={editor.isActive("bulletList") ? "is_active" : ""}
//         >
//           <FaListUl />
//         </button>
//         <button
//           onClick={(e) => {
//             e.preventDefault()
//             editor.chain().focus().toggleOrderedList().run()}
//           }
//           className={editor.isActive("orderedList") ? "is_active" : ""}
//         >
//           <FaListOl />
//         </button>
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             editor.chain().focus().toggleBlockquote().run()
//           }}
//           className={editor.isActive("blockquote") ? "is_active" : ""}
//         >
//           <FaQuoteLeft />
//         </button>
//       </div>
//       <div>
//         <button onClick={(e) => {
//           e.preventDefault();
//           editor.chain().focus().undo().run()
//         }}>
//           <FaUndo />
//         </button>
//         <button onClick={(e) => {
//           e.preventDefault();
//           editor.chain().focus().redo().run()
//         }}>
//           <FaRedo />
//         </button>
//       </div>
//     </div>
//   )
// }

//  const TipTop = ({ setDescription }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: ``,

//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       setDescription(html);
//     },
//   });

//   return (
//     <div>
//       <TextEditor editor={editor} />
//       <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default TipTop;