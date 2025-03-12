function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
      <a href="/" className="btn btn-ghost text-xl">Redirector</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </div>
  </div>
  );
}

export default Navbar;
