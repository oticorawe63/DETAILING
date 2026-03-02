import { MaterialIcon } from "@/components/MaterialIcon";

export function ConfiguratorSection() {
  return (
    <section className="relative flex flex-col w-full h-screen mx-auto px-4 sm:px-6 lg:px-8 justify-center py-24 overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Decorative Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square car-platform rounded-full -z-10" />

      <div className="w-full flex items-start z-10 justify-end max-w-7xl mx-auto mb-16">
        <div className="text-right">
          <h2 className="text-2xl md:text-3xl font-light text-slate-900 dark:text-white">
            25 250 780 ₽
          </h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-7xl mx-auto px-0 md:px-12">
        {/* Colors Panel */}
        <div className="glass-effect rounded-2xl shadow-soft transition-all duration-300 flex flex-col items-center p-6">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-6">
            Colors
          </h3>
          <div className="w-full flex items-center justify-between">
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors opacity-0 cursor-default">
              <MaterialIcon name="chevron_left" className="text-lg" />
            </button>
            <div className="grid grid-cols-3 gap-8">
              <button className="group relative w-12 h-12 rounded-full bg-green-200 shadow-sm transition-transform hover:scale-110 focus:outline-none ring-2 ring-transparent focus:ring-slate-300">
                <span className="absolute inset-0 rounded-full border border-black/10"></span>
              </button>
              <button className="group relative w-12 h-12 rounded-full bg-primary shadow-sm focus:outline-none ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
              </button>
              <button className="group relative w-12 h-12 rounded-full bg-slate-200 shadow-sm transition-transform hover:scale-110 focus:outline-none">
                <span className="absolute inset-0 rounded-full border border-black/10"></span>
              </button>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white mt-4">
            Guards Red
          </p>
        </div>

        {/* Wheels Panel */}
        <div className="glass-effect rounded-2xl shadow-soft transition-all duration-300 flex flex-col items-center p-6">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-6">
            Wheels
          </h3>
          <div className="w-full flex items-center justify-between">
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <MaterialIcon name="chevron_left" className="text-lg" />
            </button>
            <div className="grid grid-cols-3 items-center gap-8">
              <div className="w-14 h-14 p-1 hover:bg-black/5 rounded-full cursor-pointer transition-colors flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6JA2N1HdqM1hrYElXxzHL9G3wE0B5-BZJkrepj9jsreVzfoHvqluqtHUNXbhh2lJcxBel9NPtAu7dtqrSqRZkfsZVrbY7L47sFQpDcZLWMq-zY17DB2zJkV-mA8KuRrbCaPpsK7Lee74KyE0tGDaeD7tqTMgL8WmdnBuz5fHjdjrO5FvhLXDzcoLioFBrgNheHNCby4O4P8lgf81_1IaFUzTGwls_IP7O8TBtYicKNcrlzIM6Zk2l_GCBRjfcKGnLd_BR20qIt7gz"
                  alt="Standard alloy wheel icon"
                  className="w-full h-full object-contain opacity-40 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS8qLzZcuGq6deBonfSGR5BrhSJWUrYXPbH9IWgBwOCho28vi7JBlrKldiV8MXi4aL_hZ5FMjD6qa-Ifl6YJBlBEFJdeiD3V_jk03znp2Ztjz83Ol1--M3TBZWonJfOZu3JA4kQX_DzVE2croEvPxuZPC0SxenVcis0f6YLbI7Pfl8zyk0hdPhbhJ8QZzw98YBmrbT-A_r1YTSCV1_qmaqtOYk866tjT-QRC4k-rP7wuqXmtyaIqxurJuE2bpyMYhU41bTRxguWFsT"
                  alt="Sport alloy wheel icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-14 h-14 p-1 hover:bg-black/5 rounded-full cursor-pointer transition-colors flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1kDbNWQKrtxgPbudRC6eGvVLBt7vDqtMn9X2U72moSess0ny94T4a6UAZEPvqN-Ia4yccE2w_5C1VWAAOpXHN9yxSq3pcTFO2flcNsvNxoWYHOqIdSDIabLrphujSVfsMEZbgndYUSlw5X7xFp_MjYpKyCcCUBAREDGtDkOn0sta46FChadqSuNKhNYrNX6EV6o3RAsAUjO4xpFyXLAAhIRXZ_n5_OJqXdJ1ZCehmppskKohG5JN1gYN1SnW9U20z79loemfhxlKL"
                  alt="Track alloy wheel icon"
                  className="w-full h-full object-contain opacity-40 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white mt-4">
            20/21-inch GT3 RS Forged
          </p>
        </div>

        {/* Details Panel */}
        <div className="glass-effect rounded-2xl shadow-soft transition-all duration-300 flex flex-col items-center p-6">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-6">
            Details
          </h3>
          <div className="w-full flex items-center justify-between">
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors opacity-0 cursor-default">
              <MaterialIcon name="chevron_left" className="text-lg" />
            </button>
            <div className="grid grid-cols-3 items-center gap-8">
              <div className="w-14 h-14 rounded-full overflow-hidden cursor-pointer transition-all opacity-50 hover:opacity-100 hover:scale-105">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY7Que1CPCym3TYNBbSrYzcFrjkASzygGqLTBYSLmTsOuou4ZHf2Zj03Q4NLNUuo4ki6FIzi-o_1jBGj2S8EPkWIB4RcRL5745Q2xedd4_TeSCrjyxJ6ee-tXbDBpTpXUP0AmVrG4Q-KW2wcpocnTpVqkeguBKsddopjaWqocykoDVPZtpf71MdZ-zyKwLDzN54GhHoujTzAD9jjEHhBJpXQvglkPyNN3105Xr1ZZGxof1a4rJWi1dO00PPl4XbgznwXVAqXCW4-Uy"
                  alt="Car headlight detail"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXonsYLkYulwi-5jO5gAoLPX3A9LggEwM7GiylK1MTkOlfkDGvMQVnPyIXn3u7vlCajN7Y2UXnsInFNDseqVnXy0jfVmb_ZFqhp_Y-HbL8lKoGK0TF6Tw-JrlzVp3VS3B8SgUGX4VrB14PC65kEcLu56Ap2fD9ym6LHFcfv-m7AWWL2mq2rmU3UpOKnzi2bHvwgYk4SZz-TGoRnS_xYE2UVSPGhpR_2031OMXhSvECXDd-WLnnDl1Fhscv9YRBOJiXrFqc37nK1bj6"
                  alt="Red leather interior detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden cursor-pointer transition-all opacity-50 hover:opacity-100 hover:scale-105">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAoZ5fhEvyhLO8JHI4X1Rs7DPwqPLxK8NfTMIfym9j999OSTyD3KCQz_l8Tqb_e2Pk5KKM5VWzCtzsoLJtkLgVuOzA-37R4tETI6b7w5g2k0c1vH8xjr8XX4-HDsFNGDEH4gzkWRVSFb-lV7_8kyZ4DxJuQ-ZwNkzSUIrAEDf59WHjVs405AkpNx-0oNJc8hptAuhWtOPbxZ0JHBe-OGFGT0rdoddTHL-ZxsjcdQKBinWm-bgQJrDhcPz4CrO2bV5bYCYUV4f4RXYP"
                  alt="Carbon fiber texture detail"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white mt-4">
            Leather/Race-Tex, Black/Guards Red
          </p>
        </div>
      </div>
    </section>
  );
}
