import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react'
 import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'
import './App.css';




const App =()=>{
let Ckeditor



console.log(Ckeditor)
  return (
    <div className='App'>
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        
        data='<p>Hello from CKEditor 5!</p>'
        onInit={editor => {
          Ckeditor= editor
          editor.conversion.for('dataDowncast').add(dispatcher => {
console.log("dispatcher",dispatcher)  
return {sasa:2}
})
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />
      <button onClick= {()=>console.log(Ckeditor.getData())}>Click me</button>
    </div>
  )
}

export default App;
