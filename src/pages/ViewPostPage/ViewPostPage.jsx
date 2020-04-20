import React, {Component}from "react";
import * as postAPI from "../../services/post-api";
import ReactMarkdown from "react-markdown"
import { Button, Comment, Container, Header, Placeholder, Segment } from "semantic-ui-react";
import CodeBlockRenderUtility from "../../components/common/utility/CodeBlockRenderUtility"
import DeleteButton from "../../components/common/DeleteButton/DeleteButton"

class ViewPostPage extends Component {
  state = {
    data: this.props.location.state.post,
    loaded: false
  };

  doDelete = (postId) => {
    this.props.handleDeletedPost(postId);
  }

  async componentDidMount() {
    const { state } = this.props.location
    console.log(this.props)
    this.setState({ loaded: true, data: state.post, user: this.props.user});
    console.log(this.state)
  }

  render() {
    const { data, user } = this.state
    return (
      this.state.loaded ? (
        <>
        <Container text>
      <Segment raised>
          <Header size="huge" className="ib">
            {data.title}
          </Header>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="https://i.imgur.com/ZIMoZ4P.jpg" />
            <Comment.Content>
              <Comment.Author as="span">{data.author}</Comment.Author>
              <Comment.Metadata>
                <span>{data.date}</span>
              </Comment.Metadata>
              <Comment.Text>{data.topicsString}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
        <ReactMarkdown
          source={data.content}
          renderers={{ code: CodeBlockRenderUtility }}
        />
        {user && (user.isAdmin || user._id === data.authorRef) && (
          <Button.Group widths="1" attached="bottom">
            <DeleteButton
              label="Delete Post"
              itemId={data._id}
              api={postAPI}
              doDelete={this.doDelete}
            />
          </Button.Group>
        )}
        </Segment>
        </Container>
      </>
      ) : (
        <Container text>
        <Segment raised>
          <Placeholder fluid>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      </Container>
      )
    );
  }
}

export default ViewPostPage;
