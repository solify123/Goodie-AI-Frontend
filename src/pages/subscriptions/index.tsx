import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import createCharacterBanner1 from '../../assets/images/create-character-banner1.png'
import createCharacterBanner2 from '../../assets/images/create-character-banner2.png'
import createCharacterBanner3 from '../../assets/images/create-character-banner3.png'

const SubscriptionsPage = () => {
    const [activePlan, setActivePlan] = useState('1')
    const [timeLeft, setTimeLeft] = useState({
        hours: 20,
        minutes: 22,
        seconds: 30
    })

    const handlePlanSelect = (plan: string) => {
        setActivePlan(plan)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev

                if (seconds > 0) {
                    seconds--
                } else if (minutes > 0) {
                    minutes--
                    seconds = 59
                } else if (hours > 0) {
                    hours--
                    minutes = 59
                    seconds = 59
                } else {
                    // Timer ended
                    return { hours: 0, minutes: 0, seconds: 0 }
                }

                return { hours, minutes, seconds }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <Layout>
            {/* Halloween Sale Banner - 4 Divs Structure */}
            <div className="w-full mb-4 sm:mb-6 relative overflow-hidden" style={{ height: '56px', backgroundColor: '#1A0F33' }}>
                {/* Red line at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 z-10"></div>

                {/* Div 1: Left - banner1 - 30% */}
                <div className="absolute left-0 top-0 bottom-0 w-[180px] overflow-hidden z-0">
                    <img
                        src={createCharacterBanner1}
                        alt="Left Character"
                        className="w-full h-full"
                    />
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-full z-10 h-full flex justify-center items-center gap-3">
                    {/* Div 2: banner2 - 30% */}
                    <div className="py-2 h-full">
                        <img
                            src={createCharacterBanner2}
                            alt="Center Character"
                            className="w-full h-full aspect-12/1 hidden lg:block"
                        />
                        <img
                            src="https://candy.ai/assets/promotions/halloween/banner/free/en/mobile-central-8f4f50b434877c24895e7345f23100c60c06b3c7dd5605419a6f5d2926a59987.webp"
                            alt="Center Character"
                            className="w-full h-full block lg:hidden"
                        />
                    </div>

                    {/* Div 3: Timer - 10% */}
                    <div className="w-auto flex items-center justify-center max-w-[180px] gap-1 z-20">
                        {/* Countdown Timer Section */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {/* Hours */}
                            <div className="flex flex-col items-center border-r border-white/20 pr-1 sm:pr-2">
                                <span className="text-white font-bold text-[15px] leading-none">
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </span>
                                <span className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">Hrs</span>
                            </div>

                            {/* Minutes */}
                            <div className="flex flex-col items-center border-r border-white/20 pr-1 sm:pr-2">
                                <span className="text-white font-bold text-[15px] leading-none">
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </span>
                                <span className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">Min</span>
                            </div>

                            {/* Seconds */}
                            <div className="flex flex-col items-center">
                                <span className="text-white font-bold text-[15px] leading-none">
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </span>
                                <span className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">Sec</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Div 4: Right - banner4 - 30% */}
                <div className="absolute hidden 2xl:block left-[85%] top-0 bottom-0 w-[15%] overflow-hidden z-0">
                    <img
                        src={createCharacterBanner3}
                        alt="Right Character"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="mx-auto md:mt-6 px-[20px] md:px-0 md:max-w-[728px] lg:max-w-4xl w-full xl:max-w-[1010px]">
                <div className="lg:flex hidden relative  justify-center items-center gap-6">
                    <div className="lg:flex hidden flex-col justify-start items-center gap-4">
                        <div className="text-white text-3xl font-bold font-['Poppins'] leading-10">
                            Choose your Plan
                        </div>
                        <div className="text-neutral-400 text-sm font-medium font-['Poppins'] leading-tight">
                            100% anonymous. You can cancel anytime.
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="hidden lg:flex relative bg-zinc-900 rounded-lg border border-zinc-800 isolate mt-6 max-w-lg gap-10 md:max-w-3xl lg:max-w-5xl xl:mx-0 xl:max-w-none min-h-[720px]">
                        <div id="left-side" className="hidden lg:flex flex-col justify-between pt-[28px] pb-0 lg:pl-12 pl-[28px] min-w-[28%] lg:w-[312px] relative">
                            <div className="mb-6">
                                <span className="text-1xl md:text-3xl text-large-lang-md font-semibold text-[#009688]">
                                    Halloween Sale
                                </span>
                                <span className="hidden md:inline text-3xl text-large-lang-md font-semibold text-white">
                                    for New Users
                                </span>
                                <div className="text-white text-sm fr:text-xs mt-[10px]">
                                    Discount ends soon.&nbsp;
                                    <span className="text-[#009688] text-sm">
                                        Don't miss out!
                                    </span>
                                </div>
                            </div>

                            <div className="grow absolute bottom-0 justify-center">
                                <img className="object-cover origin-bottom w-full h-full scale-[1.2]" src="https://candy.ai/assets/promotions/halloween/subscription/male/left-8b1165a043a90379e5e244e9140c3d52320a31b1e31af0338cb69fbabdcc4d55.webp" alt="" />
                            </div>

                        </div>
                        <div id="middle" className="pt-8 pb-0 pr-0 pl-0 max-w-[360px] w-[360px]">
                            <div className="flex flex-col gap-3 md:gap-5" data-controller="subscription" data-subscription-current-plan-value="" data-subscription-is-free-or-inactive-value="true" id="subscription-controller">

                                <div onClick={() => handlePlanSelect('12')} className={`relative cursor-pointer ${activePlan === '12' ? 'sub-gradient-active' : 'sub-gradient'}`}>
                                    <div className="w-full px-4 pt-5 pb-5 h-[72px] sm:h-20  border-[#2A2A2A] border-2 rounded-lg justify-center items-center inline-flex relative">
                                        <div className="px-2 py-0.5 bg-primary rounded-[5px] justify-center items-center gap-2.5 flex absolute -top-[1px] left-4 transform -translate-y-1/2 z-10">
                                            <div className="whitespace-nowrap text-white text-xxs font-medium font-['Poppins'] leading-tight">
                                                BEST CHOICE
                                            </div>
                                        </div>
                                        <div className="w-full self-stretch justify-between items-center inline-flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="justify-start items-center gap-2 inline-flex">
                                                    <div className="whitespace-nowrap text-white text-sm md:text-[14px] font-medium font-['Poppins'] leading-normal">
                                                        12 months
                                                    </div>
                                                </div>
                                                <div className="text-[#009688] whitespace-nowrap text-3xs font-normal font-['Poppins'] leading-normal pt-[3px]">
                                                    70% OFF
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 pr-[10px]">
                                                <div className="relative flex items-center">
                                                    <div className="text-white/60 text-base  font-medium font-['Poppins'] leading-tight">
                                                        $12.99
                                                    </div>
                                                    <div className="absolute w-[110%] h-[1px] bg-primary top-1/2 left-[-5%] transform -translate-y-1/2 -rotate-[25deg]"></div>
                                                </div>
                                                <div className="flex items-center justify-center h-full">
                                                    <div className="flex flex-col ml-0 ">
                                                        <div className="text-right text-white text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-10 mr-1">
                                                            $3
                                                        </div>
                                                        <div className="self-end text-neutral-400 mr-1 text-3xs font-medium font-['Poppins'] leading-none mb-2 hidden">
                                                            month
                                                        </div>
                                                    </div>
                                                    <div className="flex-col justify-start items-start gap-0 inline-flex">
                                                        <div className="w-1/2 text-right text-white text-lg mt-2 font-semibold font-['Poppins'] leading-none block whitespace-nowrap">
                                                            .99
                                                        </div>
                                                        <div className="w-1/2 text-right text-neutral-400 text-3xs font-normal font-['Poppins'] leading-none mb-2  ">
                                                            /month
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => handlePlanSelect('3')} className={`relative cursor-pointer ${activePlan === '3' ? 'sub-gradient-active' : 'sub-gradient'}`}>
                                    <div className="w-full px-4 pt-5 pb-5 h-[72px] sm:h-20  border-[#2A2A2A] border-2 rounded-lg justify-center items-center inline-flex relative">
                                        <div className="w-full self-stretch justify-between items-center inline-flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="justify-start items-center gap-2 inline-flex">
                                                    <div className="whitespace-nowrap text-white text-sm md:text-[14px] font-medium font-['Poppins'] leading-normal">
                                                        3 months
                                                    </div>
                                                </div>
                                                <div className="text-[#009688] whitespace-nowrap text-3xs font-normal font-['Poppins'] leading-normal pt-[3px]">
                                                    40% OFF
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 pr-[10px]">
                                                <div className="relative flex items-center">
                                                    <div className="text-white/60 text-base  font-medium font-['Poppins'] leading-tight">
                                                        $12.99
                                                    </div>
                                                    <div className="absolute w-[110%] h-[1px] bg-primary top-1/2 left-[-5%] transform -translate-y-1/2 -rotate-[25deg]"></div>
                                                </div>
                                                <div className="flex items-center justify-center h-full">
                                                    <div className="flex flex-col ml-0 ">
                                                        <div className="text-right text-white text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-10 mr-1">
                                                            $7
                                                        </div>
                                                        <div className="self-end text-neutral-400 mr-1 text-3xs font-medium font-['Poppins'] leading-none mb-2 hidden">
                                                            month
                                                        </div>
                                                    </div>
                                                    <div className="flex-col justify-start items-start gap-0 inline-flex">
                                                        <div className="w-1/2 text-right text-white text-lg mt-2 font-semibold font-['Poppins'] leading-none block whitespace-nowrap">
                                                            .99
                                                        </div>
                                                        <div className="w-1/2 text-right text-neutral-400 text-3xs font-normal font-['Poppins'] leading-none mb-2  ">
                                                            /month
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div onClick={() => handlePlanSelect('1')} className={`relative cursor-pointer ${activePlan === '1' ? 'sub-gradient-active' : 'sub-gradient'}`}>
                                    <div className="w-full px-4 pt-5 pb-5 h-[72px] sm:h-20  border-[#2A2A2A] border-2 rounded-lg justify-center items-center inline-flex relative">
                                        <div className="w-full self-stretch justify-between items-center inline-flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="justify-start items-center gap-2 inline-flex">
                                                    <div className="whitespace-nowrap text-white text-sm md:text-[14px] font-medium font-['Poppins'] leading-normal">
                                                        1 month
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 pr-[10px]">
                                                <div className="flex items-center justify-center h-full">
                                                    <div className="flex flex-col ml-0 ">
                                                        <div className="text-right text-white text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-10 mr-1">
                                                            $12
                                                        </div>
                                                        <div className="self-end text-neutral-400 mr-1 text-3xs font-medium font-['Poppins'] leading-none mb-2 hidden">
                                                            month
                                                        </div>
                                                    </div>
                                                    <div className="flex-col justify-start items-start gap-0 inline-flex">
                                                        <div className="w-1/2 text-right text-white text-lg mt-2 font-semibold font-['Poppins'] leading-none block whitespace-nowrap">
                                                            .99
                                                        </div>
                                                        <div className="w-1/2 text-right text-neutral-400 text-3xs font-normal font-['Poppins'] leading-none mb-2  ">
                                                            /month
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex flex-col gap-[12px]">
                                    <div className="flex">
                                        <img src="https://candy.ai/assets/subscription/green_shield-f7397ac8fe4d87bb33e28e4e67e1a7c1620aa24f2802b6fbf8e4741f328d336b.svg" className="w-5 h-5 pr-1" alt="" />
                                        <div className="text-neutral-400 text-[11px] font-medium font-['Poppins'] leading-none pt-1 ml-0">
                                            No adult transaction in your bank statement
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <img src="https://candy.ai/assets/subscription/green_shield-f7397ac8fe4d87bb33e28e4e67e1a7c1620aa24f2802b6fbf8e4741f328d336b.svg" className="w-5 h-5 pr-1" alt="" />
                                        <div className="text-neutral-400 text-[11px] font-medium font-['Poppins'] leading-none pt-1 ml-0 whitespace-normal">
                                            No hidden fees • Cancel subscription at any time
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:mt-1 lg:mt-3" data-controller="pix-modal">
                                    {/* Pay with Credit /Debit Card */}
                                    <form className="button_to" method="post" action="#">
                                        <button className="w-full px-4 py-4 rounded-lg justify-center items-center gap-2 inline-flex mb-3 bg-primary md:min-w-[306px]" type="submit">
                                            <div className="text-white text-xs sm:text-sm font-medium leading-tight">
                                                Pay with Credit / Debit Card
                                            </div>
                                            <div className="flex gap-1">
                                                <img className="w-[32px] h-5 rounded-[5px] relative" src="https://candy.ai/assets/footer/visa-e1d8b03b25a5af3b8320ae609ba6331e0e1787c5d24d0bbcb9bfb8e88d5cdd42.svg" alt="" />
                                                <img className="w-[32px] h-5 rounded-[5px] relative" src="https://candy.ai/assets/footer/mastercard-a70ad911ccea0bdffda8287342443e4bb64898fecf51d8a4f86b1ecacf213e4a.svg" alt="" />
                                            </div>
                                        </button>
                                        <input type="hidden" name="authenticity_token" value="v80Ds-EWcqCZoh3VnNRwiKgQLGmGDfpRUhUez-5S92hU4XOIdXVRRts4MdC-u8kS3-nowLdniggyaxXAWn-0tQ" autoComplete="off" />
                                    </form>
                                    {/* Pay with crypto */}
                                    <form data-turbo="false" className="button_to" method="post" action="#">
                                        <button className="w-full px-4 py-4 bg-neutral-700 rounded-lg justify-center items-center gap-2 inline-flex mb-3" type="submit" style={{ display: 'flex' }}>
                                            <div className="text-white text-xs sm:text-sm font-medium leading-tight">
                                                Pay with
                                            </div>
                                            <div className="w-16 h-5 flex gap-[4px]">
                                                <img className="w-16 h-5" alt="Bitcoin" src="https://candy.ai/assets/subscription/bitcoin-eb1103743040983f739826c12ef909c787ed1e6104bb0f5eff7112d31fde0036.svg" />
                                                <img className="w-16 h-5" src="https://candy.ai/assets/subscription/eth-0f77f739edf37b7fc60d467b5fb8317f4467f3bfce952c865551f5d8f4953124.svg" alt="" />
                                                <img className="w-16 h-5" src="https://candy.ai/assets/subscription/litecoin-39b215ee717df466cd2599dc7a1f63ad0e05d619dca3a8b1a74be7112954086d.svg" alt="" />
                                            </div>
                                        </button>
                                        <input type="hidden" name="authenticity_token" value="HFaLKnrKfb96kVVoXxsI41EHKpQeXiw45OQIOcCq8jbWdg8YWiLbSJxebIhhYGPcaa7a5YBnMOSY3n8-YpLeFw" autoComplete="off" />
                                    </form>

                                    <div className="mt-1">
                                        <div data-subscription-target="annualBillingInfo" className="lg:block hidden font-roboto text-center text-neutral-400 text-[11px] font-light leading-tight gap-1" style={{ display: 'block' }}>
                                            Annual payment billed as $47.88
                                            <p className="pt-1"></p>
                                        </div>

                                        <div data-subscription-target="quarterBillingInfo" className="hidden font-roboto text-center text-neutral-400 text-[11px] font-light leading-tight gap-1" style={{ display: 'none' }}>
                                            Quarterly payment billed as $23.97
                                            <p className="pt-1"></p>
                                        </div>
                                        <div data-subscription-target="monthlyBillingInfo" className="hidden font-roboto text-center text-neutral-400 text-[11px] font-light leading-tight gap-1" style={{ display: 'none' }}>
                                            Monthly payment billed as $12.99
                                            <p className="pt-1"></p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div id="right" className="flex flex-col justify-between pt-[28px] md:pl-0 w-full lg:max-w-[270px] ">
                            <div>
                                <div className="text-neutral-400 text-[20px] font-semibold mb-3">Premium Benefits</div>
                                <div className="flex flex-col gap-4">
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium leading-tight flex">
                                            <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                            Create your own AI Boyfriend(s)
                                        </div>
                                    </div>
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium leading-tight flex">
                                            <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                            Unlimited text messages
                                        </div>
                                    </div>
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium leading-tight flex">
                                            <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                            Get 100 FREE tokens / month
                                        </div>
                                    </div>
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium leading-tight flex">
                                            <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                            Remove image blur
                                        </div>
                                    </div>
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium leading-tight flex">
                                            <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                            Generate images
                                        </div>
                                    </div>
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium leading-tight flex">
                                            <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                            Make AI phone calls
                                        </div>
                                    </div>
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium leading-tight flex">
                                            <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                            Fast response time
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="242" height="475" viewBox="0 0 242 475" fill="none">
                                        <path opacity="0.05" fillRule="evenodd" clipRule="evenodd" d="M134.444 107.556C134.444 48.1543 182.599 0 242 0C301.401 0 349.556 48.1543 349.556 107.556V134.444H376.444C435.846 134.444 484 182.599 484 242C484 301.401 435.846 349.556 376.444 349.556H349.556V376.444C349.556 435.846 301.401 484 242 484C182.599 484 134.444 435.846 134.444 376.444V349.556H107.556C48.1543 349.556 0 301.401 0 242C0 182.599 48.1543 134.444 107.556 134.444H134.444V107.556ZM127.722 245.361C171.211 255.655 229.151 318.599 242 369.722C254.849 318.599 312.789 255.655 356.278 245.361C312.789 235.067 254.849 172.123 242 121C229.151 172.123 171.211 235.067 127.722 245.361Z" fill="url(#paint0_radial_4541_28606)"></path>
                                        <defs>
                                            <radialGradient id="paint0_radial_4541_28606" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(242 242) rotate(90) scale(242)">
                                                <stop stopColor="white"></stop>
                                                <stop offset="0.457376" stopColor="white" stopOpacity="0.991115"></stop>
                                                <stop offset="1" stopColor="#131313"></stop>
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center mt-6 flex justify-center items-center">
                                <img className="object-cover origin-bottom scale-[1.15] mr-5" src="https://candy.ai/assets/promotions/halloween/subscription/male/right-468a641922b6c0c1337903aaee13be29951f39b781520ab006cef20fb44ccf20.webp" alt="" />
                            </div>

                        </div>
                    </div>

                    <div className="grid lg:hidden relative bg-zinc-900 rounded-lg border border-zinc-800 isolate mt-[20px] w-full grid-cols-1 gap-6">
                        <div id="left-side" className="px-6 pt-6">
                            <div className="mb-6">
                                <span className="text-1xl md:text-3xl text-large-lang-md font-semibold text-[#009688]">
                                    Halloween Sale
                                </span>
                                <span className="hidden md:inline text-3xl text-large-lang-md font-semibold text-white">
                                    for New Users
                                </span>
                                <div className="text-white text-sm fr:text-xs mt-[10px]">
                                    Discount ends soon.&nbsp;
                                    <span className="text-[#009688] text-sm">
                                        Don't miss out!
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pb-6">
                            <div className="flex flex-col gap-3 md:gap-5" data-controller="subscription" data-subscription-current-plan-value="" data-subscription-is-free-or-inactive-value="true" id="subscription-controller">
                                <div className="relative cursor-pointer sub-gradient-active" data-plan-price="47.88" data-action="click-&gt;subscription#setActive" data-plan-type="yearly">

                                    <div className="w-full px-4 pt-5 pb-5 h-[72px] sm:h-20  border-[#2A2A2A] border-2 rounded-lg justify-center items-center inline-flex relative">
                                        <div className="px-2 py-0.5 bg-primary rounded-[5px] justify-center items-center gap-2.5 flex absolute -top-[1px] left-4 transform -translate-y-1/2 z-10">
                                            <div className="whitespace-nowrap text-white text-xxs font-medium font-['Poppins'] leading-tight">
                                                BEST CHOICE
                                            </div>
                                        </div>
                                        <div className="w-full self-stretch justify-between items-center inline-flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="justify-start items-center gap-2 inline-flex">
                                                    <div className="whitespace-nowrap text-white text-sm md:text-[14px] font-medium font-['Poppins'] leading-normal">
                                                        12 months
                                                    </div>
                                                </div>
                                                <div className="text-[#009688] whitespace-nowrap text-3xs font-normal font-['Poppins'] leading-normal pt-[3px]">
                                                    70% OFF
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 pr-[10px]">
                                                <div className="relative flex items-center">
                                                    <div className="text-white/60 text-base  font-medium font-['Poppins'] leading-tight">
                                                        $12.99
                                                    </div>
                                                    <div className="absolute w-[110%] h-[1px] bg-primary top-1/2 left-[-5%] transform -translate-y-1/2 -rotate-[25deg]"></div>
                                                </div>
                                                <div className="flex items-center justify-center h-full">
                                                    <div className="flex flex-col ml-0 ">
                                                        <div className="text-right text-white text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-10 mr-1">
                                                            $3
                                                        </div>
                                                        <div className="self-end text-neutral-400 mr-1 text-3xs font-medium font-['Poppins'] leading-none mb-2 hidden">
                                                            month
                                                        </div>
                                                    </div>
                                                    <div className="flex-col justify-start items-start gap-0 inline-flex">
                                                        <div className="w-1/2 text-right text-white text-lg mt-2 font-semibold font-['Poppins'] leading-none block whitespace-nowrap">
                                                            .99
                                                        </div>
                                                        <div className="w-1/2 text-right text-neutral-400 text-3xs font-normal font-['Poppins'] leading-none mb-2  ">
                                                            /month
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>    <div className="relative cursor-pointer sub-gradient" data-plan-price="23.97" data-action="click-&gt;subscription#setActive" data-plan-type="quarterly">

                                    <div className="w-full px-4 pt-5 pb-5 h-[72px] sm:h-20  border-[#2A2A2A] border-2 rounded-lg justify-center items-center inline-flex relative">
                                        <div className="w-full self-stretch justify-between items-center inline-flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="justify-start items-center gap-2 inline-flex">
                                                    <div className="whitespace-nowrap text-white text-sm md:text-[14px] font-medium font-['Poppins'] leading-normal">
                                                        3 months
                                                    </div>
                                                </div>
                                                <div className="text-[#009688] whitespace-nowrap text-3xs font-normal font-['Poppins'] leading-normal pt-[3px]">
                                                    40% OFF
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 pr-[10px]">
                                                <div className="relative flex items-center">
                                                    <div className="text-white/60 text-base  font-medium font-['Poppins'] leading-tight">
                                                        $12.99
                                                    </div>
                                                    <div className="absolute w-[110%] h-[1px] bg-primary top-1/2 left-[-5%] transform -translate-y-1/2 -rotate-[25deg]"></div>
                                                </div>
                                                <div className="flex items-center justify-center h-full">
                                                    <div className="flex flex-col ml-0 ">
                                                        <div className="text-right text-white text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-10 mr-1">
                                                            $7
                                                        </div>
                                                        <div className="self-end text-neutral-400 mr-1 text-3xs font-medium font-['Poppins'] leading-none mb-2 hidden">
                                                            month
                                                        </div>
                                                    </div>
                                                    <div className="flex-col justify-start items-start gap-0 inline-flex">
                                                        <div className="w-1/2 text-right text-white text-lg mt-2 font-semibold font-['Poppins'] leading-none block whitespace-nowrap">
                                                            .99
                                                        </div>
                                                        <div className="w-1/2 text-right text-neutral-400 text-3xs font-normal font-['Poppins'] leading-none mb-2  ">
                                                            /month
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>    <div className="relative cursor-pointer sub-gradient" data-plan-price="12.99" data-action="click-&gt;subscription#setActive" data-plan-type="monthly">

                                    <div className="w-full px-4 pt-5 pb-5 h-[72px] sm:h-20  border-[#2A2A2A] border-2 rounded-lg justify-center items-center inline-flex relative">
                                        <div className="w-full self-stretch justify-between items-center inline-flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="justify-start items-center gap-2 inline-flex">
                                                    <div className="whitespace-nowrap text-white text-sm md:text-[14px] font-medium font-['Poppins'] leading-normal">
                                                        1 month
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 pr-[10px]">
                                                <div className="flex items-center justify-center h-full">
                                                    <div className="flex flex-col ml-0 ">
                                                        <div className="text-right text-white text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-10 mr-1">
                                                            $12
                                                        </div>
                                                        <div className="self-end text-neutral-400 mr-1 text-3xs font-medium font-['Poppins'] leading-none mb-2 hidden">
                                                            month
                                                        </div>
                                                    </div>
                                                    <div className="flex-col justify-start items-start gap-0 inline-flex">
                                                        <div className="w-1/2 text-right text-white text-lg mt-2 font-semibold font-['Poppins'] leading-none block whitespace-nowrap">
                                                            .99
                                                        </div>
                                                        <div className="w-1/2 text-right text-neutral-400 text-3xs font-normal font-['Poppins'] leading-none mb-2  ">
                                                            /month
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>  <div className="flex flex-col gap-[12px]">
                                    <div className="flex">
                                        <img src="https://candy.ai/assets/subscription/green_shield-f7397ac8fe4d87bb33e28e4e67e1a7c1620aa24f2802b6fbf8e4741f328d336b.svg" className="w-5 h-5 pr-1" alt="" />
                                        <div className="text-neutral-400 text-[11px] font-medium font-['Poppins'] leading-none pt-1 ml-0">
                                            No adult transaction in your bank statement
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <img src="https://candy.ai/assets/subscription/green_shield-f7397ac8fe4d87bb33e28e4e67e1a7c1620aa24f2802b6fbf8e4741f328d336b.svg" className="w-5 h-5 pr-1" alt="" />
                                        <div className="text-neutral-400 text-[11px] font-medium font-['Poppins'] leading-none pt-1 ml-0 whitespace-normal">
                                            No hidden fees • Cancel subscription at any time
                                        </div>
                                    </div>
                                </div>



                                <div className="flex flex-col md:mt-1 lg:mt-3" data-controller="pix-modal">


                                    <form className="button_to" method="post" action="https://candy.ai/create_checkout?plan_id=premium-yearly"><button data-controller="loading-button-state payment-gtm-tracker" data-loading-button-state-target="submit" data-action="loading-button-state#handleClick" data-plan-button="true" data-payment-gtm-tracker-user-email-value="senior.dev000309@gmail.com" data-payment-gtm-tracker-currency-value="USD" data-payment-gtm-tracker-enable-tracking-value="true" data-payment-gtm-tracker-subscription-outlet="#subscription-controller" className="w-full px-4 py-4 rounded-lg justify-center items-center gap-2 inline-flex mb-3 bg-primary md:min-w-[306px]" type="submit">
                                        <div className="text-white text-xs sm:text-sm font-medium leading-tight">
                                            Pay with Credit / Debit Card
                                        </div>
                                        <div className="flex gap-1">
                                            <img className="w-[32px] h-5 rounded-[5px] relative" src="https://candy.ai/assets/footer/visa-e1d8b03b25a5af3b8320ae609ba6331e0e1787c5d24d0bbcb9bfb8e88d5cdd42.svg" alt="" />
                                            <img className="w-[32px] h-5 rounded-[5px] relative" src="https://candy.ai/assets/footer/mastercard-a70ad911ccea0bdffda8287342443e4bb64898fecf51d8a4f86b1ecacf213e4a.svg" alt="" />
                                        </div>
                                    </button><input type="hidden" name="authenticity_token" value="z_oANR0FDZ50Z0MJJRjPrIhfNMJbswVA-TvMRo90Y8ck1nAOiWYueDb9bwwHd3Y2_6bwa2rZdRmZRcdJO1kgGg" autoComplete="off" /></form>


                                    <form data-turbo="false" className="button_to" method="post" action="https://candy.ai/coingate_subscription_checkout?plan_id=premium-yearly"><button data-controller="loading-button-state payment-gtm-tracker" data-loading-button-state-target="submit" data-action="loading-button-state#handleClick" data-plan-button="true" data-subscription-target="coingateBuyButton" data-payment-gtm-tracker-user-email-value="senior.dev000309@gmail.com" data-payment-gtm-tracker-currency-value="USD" data-payment-gtm-tracker-enable-tracking-value="true" data-payment-gtm-tracker-subscription-outlet="#subscription-controller" className="w-full px-4 py-4 bg-neutral-700 rounded-lg justify-center items-center gap-2 inline-flex mb-3" type="submit" style={{ display: 'flex' }}>
                                        <div className="text-white text-xs sm:text-sm font-medium leading-tight">
                                            Pay with
                                        </div>
                                        <div className="w-16 h-5 flex gap-[4px]">
                                            <img className="w-16 h-5" alt="Bitcoin" src="https://candy.ai/assets/subscription/bitcoin-eb1103743040983f739826c12ef909c787ed1e6104bb0f5eff7112d31fde0036.svg" />
                                            <img className="w-16 h-5" src="https://candy.ai/assets/subscription/eth-0f77f739edf37b7fc60d467b5fb8317f4467f3bfce952c865551f5d8f4953124.svg" alt="" />
                                            <img className="w-16 h-5" src="https://candy.ai/assets/subscription/litecoin-39b215ee717df466cd2599dc7a1f63ad0e05d619dca3a8b1a74be7112954086d.svg" alt="" />
                                        </div>
                                    </button><input type="hidden" name="authenticity_token" value="lNwyXGP9mPkYsfRgyccuUYlurEl7LXq3nfECk1ETrtBe_LZuQxU-Dv5-zYD3vEVuscdcOOUUZmvhy3WU8yuC8Q" autoComplete="off" /></form>





                                    <div className="mt-1">
                                        <div data-subscription-target="annualBillingInfo" className="lg:block hidden font-roboto text-center text-neutral-400 text-[11px] font-light leading-tight gap-1" style={{ display: 'block' }}>
                                            Annual payment billed as $47.88
                                            <p className="pt-1">

                                            </p>
                                        </div>

                                        <div data-subscription-target="quarterBillingInfo" className="hidden font-roboto text-center text-neutral-400 text-[11px] font-light leading-tight gap-1" style={{ display: 'none' }}>
                                            Quarterly payment billed as $23.97
                                            <p className="pt-1">

                                            </p>
                                        </div>
                                        <div data-subscription-target="monthlyBillingInfo" className="hidden font-roboto text-center text-neutral-400 text-[11px] font-light leading-tight gap-1" style={{ display: 'none' }}>
                                            Monthly payment billed as $12.99
                                            <p className="pt-1">

                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                        <div id="right" className="px-6 mb-5">
                            <div className="text-neutral-400 text-[16px] font-semibold mb-6">
                                Premium Benefits
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-white text-sm font-medium leading-tight flex">
                                        <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                        Create your own AI Boyfriend(s)
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-white text-sm font-medium leading-tight flex">
                                        <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                        Unlimited text messages
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-white text-sm font-medium leading-tight flex">
                                        <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                        Get 100 FREE tokens / month
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-white text-sm font-medium leading-tight flex">
                                        <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                        Remove image blur
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-white text-sm font-medium leading-tight flex">
                                        <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                        Generate images
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-white text-sm font-medium leading-tight flex">
                                        <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                        Make AI phone calls
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-white text-sm font-medium leading-tight flex">
                                        <img className="mr-2" src="https://candy.ai/assets/subscription/check_circle-8bef1807002524e283a697e23b0d49f656c8479fd4e1c273f584a6162da8ead1.svg" alt="" />
                                        Fast response time
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex justify-center mb-0 lg:mb-10">
                    <div className="relative  mt-10">
                        <div className="w-80 h-9 justify-center items-center gap-12 inline-flex">
                            <div className="justify-start items-center gap-1 inline-flex">
                                <img className="relative w-[30px] h-[36px]" src="https://candy.ai/assets/subscription/shield-190459758afcc6bb4c7df21968354540da03d7e833aa55cfc17d5acb07cbafd1.svg" alt="" />
                                <div className="text-neutral-400 text-base font-semibold leading-none">
                                    Antivirus<br /> Secured
                                </div>
                            </div>
                            <div className="justify-start items-center gap-1 inline-flex">
                                <img className="w-9 h-9 relative" src="https://candy.ai/assets/subscription/privacy-61b2a7b6428df84413d307fe745b05f137c9259c84e2b4fe1b844d06bfd8788f.svg" alt="" />
                                <div className="text-neutral-400 text-base font-semibold leading-none">
                                    Privacy in bank<br /> statement
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default SubscriptionsPage