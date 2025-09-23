import TopNav from "../components/TopNav";

export default function LayoutPublic({ children }) {
  return (
    <div>
      <TopNav />
      <main>{children}</main>
    </div>
  );
}
