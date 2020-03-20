import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import { config } from './jsonDataProcessor'
import XmlClassicEditor from './xmlDataProcessor'
import './App.css'

const JSONinitialData = JSON.stringify([
  {
    name: 'ul',
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

const XMLinitialData = `<section xmlns:pio="https://web.burza.hr/xmlns/podravkaio/embed">
    <title>The planets and stuff</title>
    <subtitle>A story of self-discovery</subtitle>
    <para>
        Et magnis dis parturient montes, nascetur ridiculus mus. Nullam porta sapien vitae
        semper rhoncus. Phasellus vehicula pellentesque eleifend. Aenean pharetra elementum
        imperdiet. <quote>This is an inline quote.</quote>
    </para>
    <orderedlist>
        <listitem>
            <para>Mercury</para>
        </listitem>
        <listitem>
            <para>Venus</para>
        </listitem>
        <listitem>
            <para>Earth</para>
        </listitem>
    </orderedlist>
    <para>
        The <abbrev>Assn.</abbrev> of Computing Machinery would probably never
        abbreviate "Association" like this. <acronym>NASA</acronym> stands for the
        <ulink url='https://www.nasa.gov/'>National Aeronautics and Space Administration</ulink>.
    </para>
    <itemizedlist>
        <listitem>
            <para>Lorem ipsum dolor sit amet.</para>
        </listitem>
        <listitem>
            <para>Fusce at dictum risus.</para>
        </listitem>
        <listitem>
            <para>Fusce vitae vestibulum ligula.</para>
        </listitem>
    </itemizedlist>
</section>`.replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2')

const App = () => {
  let Ckeditor

  return (
    <div className='App'>
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={XmlClassicEditor}
        config={config}
        data={XMLinitialData} //'<p>Hello from CKEditor 5!</p>'
        onInit={editor => {
          Ckeditor = editor
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
