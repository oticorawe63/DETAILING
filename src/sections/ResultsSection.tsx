"use client";

import { Slider } from "@/components/Slider";

const RESULTS = [
  {
    id: "wheel",
    title: "Wheel Restoration",
    description: "Deep iron decontamination and ceramic coating.",
    beforeImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfzP3xg_pY04AndTJZbFxnf-ocyTY2CXxx5ghob-c2mdEAOYjm3dtpRDbXHbDkpG9hAdVfhYO0dvnu2U5YQoLVnRJXZituuOmqOHTn-E9ng6d7NICwJ4IB6QFeI25KSrl734sLxlnWvuVmF-APOBvagBqf_fYj1hatVVEz2HkKaFgQ4UCrayINin4VSQCQrjhLv5NdWsi3nuDaSRTGeOd8UhtPE8ijyLOCAd3W-gbaNh4uEwleiJ7CpdcE_0E5gtVhrv5xuV_fM0cP",
    afterImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWoVXhfhf43Ll-ijwKYJBMxqBoZXoIIq3T7GtE-GVcvgG3oSK-opSi2IdTJIvbmC1E7gpPTkrMyn9ORip-Mhl8EwUCyHay2jLKdoowyDIwaJTXeBk5Hv3xseGfIaOlsLJoJd02WiKA4nq4p2TPl-drCwFq7MH-YYcj8ec_A55YEUqtIcq_TtIN3Bqb0lSNXajcnTX8bKYSLUuszqUtIm5y77WMXlO_kWuBlrENoW8UO9Ofi7B3CXkYchJf9bEf2SbLDqTRIyiQHoW7",
  },
  {
    id: "paint",
    title: "Paint Correction",
    description: "Multi-stage polish removing swirls and scratches.",
    beforeImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWIauDffpONdnCWl32Aia_WEdxTjKzPB-RPQT8sLK0c8tVS_ivepGLTMtJjEe9wBU9xL6RGSTuvsnPej-hAi8CscxqcvWuJTh2-xht3GXurEYPRZNHDHR5y9AWzjTurlqpjUOUlyJKbdv05rrYFmKZdXepmU5k0u1j6kdaJ1366CLb1CSxMh6GFJ9XH_oGHsqFc2O8FM41dQ1MUvaWFXg0Pk52NUCsvc7FVkxhwZObDOeB288wJnSTu1jOrMSet6j16UjRZmQm1z4-",
    afterImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBInjQn093ZH-WDLWpF7VbVTvDzlRm_vmmh3hXA_qgSFFXBWaSUe3BOo_fsotgbjkrxP3tFRduOJ1YPEJyjqYmeZaXAalxhpcv_00hHMzYCozH0xBPy-09vOfqasbjEwdoiNyD_9JqWHaurL93fuYWGcfZBe2b6SX7jnvyWNsQB_F3s_lUwsfmx8R7HL0bCnYCCJwjQFol4ja92QlhwoCc5ankU7VcBqDJh6GwJWLJW3SVGVudChjKTs79Dyo5jEbqXj7ZDXvR5EZWO",
  },
  {
    id: "interior",
    title: "Interior Detail",
    description: "Leather conditioning and deep stain removal.",
    beforeImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuADbHiFHAcD-9Ueffq265THP32VMQA_MCcZs6ViuWrBsMtGiLIqaK-lexhuX4m-v45OBk1zDjyZeTCop0p9GyyxZYA8ltk4dJjQfHbacot_-OKMlBu1EPgkUFcTERDoZu4YOm3JMVibblE9SU1kwX9aFvSLLLgsSFNlLqHAyH8CiEGwHSxa2osN7fdyxSelRpChXQFhL17nrWJcgwpyOZaeDRiPVjwNktRQ8d0bs0f9xKBbe5uwfim8pvr8iHQwOuT0HtHUBLl7Xs95",
    afterImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYwqvV32GeQeGbrx0jdkfCQyx0fDT8QIUeLxb1vM5g2R2ydLupl3Kc-n7srNGsfqPnWrlgA7ZeLh9h99-10m1o2kmQ7BwyZzeMroK8RtYXLU23VyKNg5RHVqPYOHFtc1mm644PiU2j5r0R1jGRY68eKoNObB61DL88m90vLPuGootog5JrT7Yj7NnPSpW_AL8RX4SA7Pa5x6sfcb5ZG37GZ9XAzOxF8ArfFK7e7NPFqWcagrqxRxFljwRu7zykIqoIJrTXL_lByrdM",
  },
];

export function ResultsSection() {
  return (
    <section className="flex flex-col px-6 md:px-12 lg:px-20 py-24 min-h-screen justify-center">
      <div className="flex justify-between mb-10 md:mb-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-slate-900 dark:text-white mb-2">
            Результат
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide text-primary">
            РАБОТЫ DETAILING23
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-[1600px] mx-auto">
        {RESULTS.map((result) => (
          <div
            key={result.id}
            className="bg-white dark:bg-card-dark rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden relative">
              <Slider
                beforeImage={result.beforeImage}
                afterImage={result.afterImage}
              />
            </div>

            <div className="mt-6 px-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {result.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {result.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
