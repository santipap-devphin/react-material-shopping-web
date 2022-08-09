import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditorContent = ({initialContent = "", placeholder = "" ,  onChange }) => {

    const opt = {
        buttonList: [
          // default
          // ['undo', 'redo'],
          ['bold', 'underline', 'italic', 'list', 'fontColor', 'hiliteColor', 'align', 'blockquote'],
          ['fullScreen']
        ]
    }
    return (<div>
        <SunEditor
            autoFocus={false}
            width="100%"
            height="150px"
            setOptions={opt}
            setContents={initialContent}
            onChange={onChange}
            placeholder={placeholder}
        />
        {/* preview <div>{content}</div> */}
        </div>
     )
}

export default EditorContent