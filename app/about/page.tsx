"use client";

import { useLanguage } from "@/lib/languageContext";

export default function AboutPage() {
  // Pegamos o 't' do contexto, que agora contém as categorias 'nav' e 'about'
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      {/* Main Card */}
      <div className="max-w-xl w-full bg-white rounded-[32px] p-10 shadow-sm text-center border border-gray-100">
        
        {/* Header */}
        <div className="mb-8">
          <span className="text-4xl">🚀</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            {t.about.why}
          </h1>
        </div>

        {/* Main Content */}
        <div className="text-left space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#d946ef] mb-2">
              {t.about.daily}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t.about.dailyTextNormal}
              <strong className="text-gray-900 font-bold">
                {t.about.dailyTextBold}
              </strong>
            </p>
          </section>

          {/* Subtle Divider */}
          <div className="border-t border-gray-100 pt-6">
            <section>
              <h2 className="text-xl font-bold text-[#6366f1] mb-2">
                🎨 {t.about.aesthetics}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t.about.aestheticsText}
              </p>
            </section>
          </div>
        </div>

        {/* Gradient Button */}
        <button className="mt-10 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#6366f1] text-white font-bold text-lg hover:opacity-90 transition-opacity">
          {t.about.button}
        </button>
      </div>
    </div>
  );
}