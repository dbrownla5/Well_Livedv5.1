import { Component, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "4rem 2rem", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#38302E" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Something went wrong.</h1>
          <p style={{ fontSize: "0.9rem", color: "#9A998C" }}>Please refresh the page or reach out at dayna@thewelllivedcitizen.com</p>
        </div>
      );
    }
    return this.props.children;
  }
}
