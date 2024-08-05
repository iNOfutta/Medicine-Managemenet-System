import HNavbar from "./HNavbar/HNavbar";

export default function TopLayout(props) {
  return (
    <>
      <HNavbar />
      <main>{props.children}</main>
      <footer>
        <small>&copy; Copyright 2022, HRL (Hospital Regional do Lobito)</small>
      </footer>
    </>
  );
}
