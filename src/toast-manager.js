import React, { Component } from "react";

const { Consumer, Provider } = React.createContext();

// Utils
// ==============================

function clone(arr) {
  return arr.slice(0);
}

// Styled Components
// ==============================

const ToastContainer = (props) => (
  <div
    style={{
      position: "fixed",
      right: "50%",
      top: 0,
      transform: "translate(50%)"
    }}
    {...props}
  />
);
const Toast = ({ children, onDismiss }) => (
  <div
    style={{
      background: "LemonChiffon",
      cursor: "pointer",
      fontSize: 14,
      margin: 10,
      padding: 10
    }}
    onClick={onDismiss}
  >
    {children}
  </div>
);

// Provider
// ==============================

export class ToastProvider extends Component {
  count = 0;
  state = { toasts: [] };

  add = (content) => {
    this.setState((state) => {
      const id = this.count++;
      const toasts = clone(state.toasts);
      toasts.push({ content, id });

      return { toasts };
    });
  };
  remove = (id) => {
    this.setState((state) => {
      const toasts = state.toasts.filter((t) => t.id !== id);
      return { toasts };
    });
  };
  // avoid creating a new fn on every render
  onDismiss = (id) => () => this.remove(id);

  render() {
    const context = {
      add: this.add,
      remove: this.remove
    };

    return (
      <Provider value={context}>
        {this.props.children}
        <ToastContainer>
          {this.state.toasts.map(({ content, id, ...rest }) => (
            <Toast
              key={id}
              Toast={Toast}
              onDismiss={this.onDismiss(id)}
              {...rest}
            >
              {id + 1} &mdash; {content}
            </Toast>
          ))}
        </ToastContainer>
      </Provider>
    );
  }
}

// Consumer
// ==============================

export const ToastConsumer = ({ children }) => (
  <Consumer>{(context) => children(context)}</Consumer>
);

export const withToastManager = (Comp) => (props) => (
  <ToastConsumer>
    {(context) => <Comp toastManager={context} {...props} />}
  </ToastConsumer>
);
