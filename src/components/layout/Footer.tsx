import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-satin-700/30">
      <div className="absolute inset-0 bg-gradient-to-t from-satin-950 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-satin-800 border border-satin-700">
                <span className="text-lg font-bold gradient-text">W</span>
              </div>
              <span className="text-lg font-semibold text-satin-50 tracking-tight">
                Wave<span className="text-neon-cyan">Dev</span>
              </span>
            </div>
            <p className="text-xs text-satin-500 max-w-xs leading-relaxed">
              Design & Sviluppo di altissimo livello per business locali che non si accontentano.
            </p>
          </div>

          {/* Bottom Info */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[10px] text-satin-600 uppercase tracking-widest">
              © {currentYear} WaveDev Signature Project
            </p>
            <div className="flex items-center gap-1 text-[10px] text-satin-600 uppercase tracking-widest">
              <span>Handcrafted with </span>
              <span className="text-neon-cyan animate-pulse">♥</span>
              <span> by WaveDev_DC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
