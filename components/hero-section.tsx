import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900 text-balance">
                        Smart KPI Management for <span className='text-green-700'>Dev</span> Teams
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
                        Describe exactly what your product or service does and how it makes your customer's lives
                        better. Avoid using verbose words or phrases.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="bg-black hover:bg-green-700 text-white">
                            <Link href="/signup">Get started</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            asChild
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                            <Link href="#features">Learn more</Link>
                        </Button>
                    </div>
                    <div className='mt-6'>
                        <div className='border border-black w-[90%] h-[400px]'></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
