import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '<p>hello world</p>')
  const [css, setCss] = useLocalStorage('css', 'p {color:red}')
  const [js, setJs] = useLocalStorage('js', "document.body.style.background='blue'")
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