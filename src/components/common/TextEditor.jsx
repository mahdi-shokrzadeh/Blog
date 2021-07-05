// import React, { Component } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from "draft-js";
// import { Fragment } from "react";
// import { convertToHTML } from "draft-convert";

// class TextEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//       convertedContent: "",
//     };
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });

//     this.convertContentToHTML();

//     console.log(this.state);
//   };

//   convertContentToHTML = () => {
//     let currentContentAsHTML = convertToHTML(
//       this.state.editorState.getCurrentContent()
//     );
//     this.setState({
//       convertedContent: currentContentAsHTML,
//     });
//   };

//   render() {
//     return (
//       <Fragment>
//         <div>
//           <div className="mt-1">
//             <Editor
//               editorState={this.state.editorState}
//               wrapperClassName="wrapper-class"
//               editorClassName="editor-class"
//               toolbarClassName="toolbar-class"
//               onEditorStateChange={this.onEditorStateChange}
//             />
//           </div>
//         </div>
//       </Fragment>
//     );
//   }
// }

// export default TextEditor;
import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Fragment } from "react";
import { convertToHTML } from "draft-convert";

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      convertedContent: "",
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

    this.convertContentToHTML();

    console.log(this.state);
  };

  convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(
      this.state.editorState.getCurrentContent()
    );
    this.setState({
      convertedContent: currentContentAsHTML,
    });
  };

  render() {
    return (
      <Fragment>
        <div>
          <div className="mt-1">
            <Editor
              editorState={this.props.editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={this.props.onEditorStateChange}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TextEditor;
