import { motion } from "framer-motion";
import CountUp from "react-countup";

function ProductHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D93835] rounded-full blur-[80px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D93835] rounded-full blur-[80px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <svg
              className="w-5 h-5 text-[#D93835]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="text-md font-bold font-dejavu text-[#D93835] tracking-wider uppercase tracking-wider">
              ოფიციალური პროდუქცია
            </span>
          </div>

          <h1 className="text-[45px] font-bold text-gray-900 mb-6 leading-tight font-bpg">
            ჩაიცვი შენი
            <span className="block text-[#D93835] mt-2">უთქმელი სიტყვები</span>
          </h1>

          <p className="text-base text-gray-600 mb-8 leading-relaxed max-w-xl">
            გაცხადე შენი უთქმელი სიტყვები ჩვენი სპეციალურად შერჩეული კოლექციით.
            თითოეული ნივთი ატარებს უთქმელი სიტყვების სიმძიმეს.
          </p>

          <div className="flex gap-4 mb-12">
            <button className="font-bpg bg-[#D93835] text-white px-8 py-4 rounded-full border-none text-base cursor-pointer flex items-center gap-2 shadow-xl hover:bg-[#c22f2c] transition-colors">
              დათვალიერება
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="font-bpg bg-transparent text-gray-700 px-8 py-4 rounded-full border-2 border-gray-300 text-base cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
              მეტის გაგება
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                <CountUp
                  end={36000}
                  duration={2}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </p>
              <p className="text-sm text-gray-500 mt-1">შეტყობინება</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                <CountUp
                  end={10000}
                  duration={2}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </p>
              <p className="text-sm text-gray-500 mt-1">მოწონება</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                <CountUp
                  end={1000}
                  duration={2}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                +
              </p>
              <p className="text-sm text-gray-500 mt-1">გაზიარება</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
              alt="Featured"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs"
          >
            <p className="text-sm font-medium text-gray-900 mb-1 font-bpg">
              ✨ ლიმიტირებული გამოშვება
            </p>
            <p className="text-xs text-gray-500 font-bpg">
              ექსკლუზიური დიზაინები მალე გამოჩნდება
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductHero;
