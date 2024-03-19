import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const preset = {
    HTML:"<p class='up'>coding UP</p>\n<p class='down'>showing DOWN</p>\n<p>you can edit the code top of the page</p>\n<p>and it will show immediately down below</p>",
    CSS:"p {\n  color:red\n}\n\n.up {\n  color:yellow; \n  font-size: 50px;\n}\n\n.down {\n  font-size: 50px;\n}",
    JS:"document.body.style.background='blue'",
  }
  const [html, setHtml] = useLocalStorage('html', preset.HTML)
  const [css, setCss] = useLocalStorage('css', preset.CSS)
  const [js, setJs] = useLocalStorage('js', preset.JS)
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
    {/* three editor on the top */}
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>

      {/* live preview area of the code on the bottom */}
      <div className="pane">
        <iframe
          srcDoc={srcDoc} //srcDoc contain the tontent that iframe should display
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;