import { Navigation } from "./Navigation";

export const AppBar = () => {
  return (
    <div className="appBar" data-testid="AppBar">
      <div className="logo">Logo</div>
      <Navigation />
    </div>
  );
};
