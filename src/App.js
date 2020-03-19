import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import JsonClassicEditor, { config } from './jsonDataProcessor'
import './App.css'

const initialData = JSON.stringify([
  {
    name: 'ul',
    text: 'hello',
    children: [
      {
        name: 'li',
        children: [
          {
            text: 'foo'
          }
        ]
      }
    ]
  }
])

const App = () => {
  let Ckeditor

  return (
    <div className='App'>
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={JsonClassicEditor}
        config={config}
        data={initialData} //'<p>Hello from CKEditor 5!</p>'
        onInit={editor => {
          Ckeditor = editor
          editor.conversion.for('dataDowncast').add(dispatcher => {
            console.log('dispatcher', dispatcher)
            return { sasa: 2 }
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
      <button onClick={() => console.log(Ckeditor.getData())}>Click me</button>
    </div>
  )
}

export default App
