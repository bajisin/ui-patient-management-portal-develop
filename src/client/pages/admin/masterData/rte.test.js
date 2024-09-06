import React, { Component } from "react";
import RichTextEditor from "react-rte";
const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS", "LINK_BUTTONS", "HISTORY_BUTTONS"],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "custom-css-class" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    {
      label: "Strikethrough",
      style: "STRIKETHROUGH"
    }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Blockquote", style: "blockquote" }
  ],
  LINK_BUTTONS: [
    { label: "Link", style: "LINK" },
    { label: "Remove Link", style: "REMOVE_LINK" }
  ],

  HISTORY_BUTTONS: [
    { label: "Undo", style: "UNDO" },
    { label: "Redo", style: "REDO" }
  ]
};
export default class MyStatefulEditor extends Component {
  value = RichTextEditor.createValueFromString(this.props.markup, "html");
  state = {
    value: this.value
  };

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString("html"));
    }
  };

  render() {
    return <RichTextEditor value={this.state.value} toolbarConfig={toolbarConfig} onChange={this.onChange} />;
  }
}
