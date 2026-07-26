function Header() {
  return (
    <header className="text-center py-10">
      <h1 className="text-5xl font-extrabold text-white">
        🔗 Distributed URL Shortener
      </h1>

      <p className="mt-4 text-slate-400 text-lg">
        Fast • Secure • Redis Cached • Dockerized
      </p>
    </header>
  );
}

export default Header;