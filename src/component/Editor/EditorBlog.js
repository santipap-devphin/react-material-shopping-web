import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditorBlog = ({ initialContent = "", onChange , ImageUpload , ImageUploadBefore}) => {
    const opt = {
        buttonList: [
          // default
          // ['undo', 'redo'],
          ['bold', 'underline', 'italic', 'list', 'fontColor', 'hiliteColor', 'align', 'blockquote'],
          ['table', 'link', 'image'],
          ['fullScreen']
        ]
      }
  return (
    <div>
      <SunEditor
        autoFocus={false}
        width="100%"
        height="400px"
        setOptions={opt}
        setContents={initialContent}
        onChange={onChange}
        onImageUpload={ImageUpload}
        onImageUploadBefore={ImageUploadBefore}
        
      />
      {/* preview <div>{content}</div> */}
    </div>
  )
}

export default EditorBlog