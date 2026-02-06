export default function Footer() {
    return (
        <footer className="bg-transparent border-t border-neutral-200/50">

        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 shadow-sm">
                🎨
              </div>
              <div>
                <p className="font-extrabold text-neutral-900">
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ColorWords
                  </span>
                </p>
                <p className="text-sm text-neutral-600">
                  Learn English, gently 🌈
                </p>
              </div>
            </div>
  
            {/* Links */}
            <nav className="flex gap-6 text-sm font-medium text-neutral-600">
              <a href="/" className="hover:text-neutral-900 transition">
                Home
              </a>
              <a href="/game" className="hover:text-neutral-900 transition">
                Play
              </a>
              <a href="/levels" className="hover:text-neutral-900 transition">
                Levels
              </a>
              <a href="/about" className="hover:text-neutral-900 transition">
                About
              </a>
            </nav>
          </div>
  
          {/* Bottom */}
          <div className="mt-8 flex flex-col items-center gap-2 text-center text-xs text-neutral-500 md:flex-row md:justify-between">
            <p>
              © {new Date().getFullYear()} ColorWords. All rights reserved.
            </p>
            <p>
              Made with 💖 for learners
            </p>
          </div>
        </div>
      </footer>
    );
  }
  