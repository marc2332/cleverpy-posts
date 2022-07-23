import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    color: string;
    icon: {
      color: string;
    };
    title: {
      color: string;
      hover: {
        color: string;
      };
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
      background: string;
    };
  }
}
