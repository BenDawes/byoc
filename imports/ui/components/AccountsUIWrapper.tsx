import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
 
export default class AccountsUIWrapper extends React.Component<{},{}> {
  private view: Blaze.View;
  public componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  public componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  public render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}