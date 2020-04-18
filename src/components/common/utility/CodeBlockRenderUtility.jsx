import React, { Component } from "react"
import hljs from "highlight.js"

class CodeBlockRenderUtility extends Component {
  constructor(props) {
    super(props)
    this.setRef = this.setRef.bind(this)
  }

  setRef(element) {
    this.codeElement = element
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeElement)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

export default CodeBlockRenderUtility;