import React, { PureComponent } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

class CodeBlockRenderUtility extends PureComponent {
  static defaultProps = {
    language: null
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter language={language} style={ okaidia }>
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlockRenderUtility;