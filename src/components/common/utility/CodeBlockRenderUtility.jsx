import React, { PureComponent } from "react"

class CodeBlockRenderUtility extends PureComponent {
  static defaultProps = {
    language: null
  };

  render() {
    console.log("this happens")
    console.log(this.props)
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