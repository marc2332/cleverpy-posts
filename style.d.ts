import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    color: string;
    skeleton: {
      baseColor: string;
      highlightColor: string;
    };
    avatar: {
      background: string;
      border: string;
      color: string;
    };
    loginButton: {
      border: string;
      hover: {
        background: string;
      };
    };
    icon: {
      color: string;
    };
    title: {
      color: string;
      hover: {
        color: string;
      };
    };
    smallTitle: {
      color: string;
      border: string;
    };
    filledStar: {
      fill: string;
    };
    card: {
      background: string;
      title: {
        color: string;
      };
      body: {
        color: string;
      };
      author: {
        color: string;
      };
      border: string;
      hover: {
        border: string;
      };
    };
    button: {
      border: string;
      color: string;
      hover: {
        border: string;
        background: string;
      };
      background: string;
    };
    editarea: {
      background: string;
      outline: string;
    };
    dropdown: {
      background: string;
      border: string;
    };
    input: {
      background: string;
      color: string;
      border: string;
      focus: {
        border: string;
      };
    };
  }
}
