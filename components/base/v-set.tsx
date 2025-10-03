import Image from 'next/image'
import placeholder2 from '@/assets/placeholder-2.png'

interface IBuyersTakeProps {
    title: string
}

export function V1(props: IBuyersTakeProps) {
    return (
        <div className="text-[#0F2A19] p-6 md:p-12">
            <main className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="flex justify-center order-1 md:order-none">
                    <div className="w-full border border-neutral-500 h-[500px] "></div>
                </div>

                {/* Text */}
                <div>
                    <h2 className="font-bold text-2xl sm:text-4xl md:text-5xl">{props.title}</h2>

                    <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo
                        diam libero vitae erat
                    </p>

                    <ul className="space-y-3 mt-6 text-sm sm:text-base md:text-lg list-disc pl-5">
                        <li>Benefit one of this feature</li>
                        <li>Benefit one of this feature</li>
                        <li>Benefit one of this feature</li>
                    </ul>
                </div>
            </main>
        </div>
    )
}

export function V2(props: IBuyersTakeProps) {
    return (
        <div className="text-[#0F2A19] p-6 md:p-12">
            <main className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <div>
                    <h2 className="font-bold text-2xl sm:text-4xl md:text-5xl">{props.title}</h2>

                    <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo
                        diam libero vitae erat
                    </p>

                    <ul className="space-y-3 mt-6 text-sm sm:text-base md:text-lg list-disc pl-5">
                        <li>Benefit one of this feature</li>
                        <li>Benefit one of this feature</li>
                        <li>Benefit one of this feature</li>
                    </ul>
                </div>
                {/* Image */}
                <div className="flex justify-center order-1 md:order-none">
                    <div className="w-full border border-neutral-500 h-[500px]"></div>
                </div>
            </main>
        </div>
    )
}
