import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
    return (
        <section className="py-20 bg-green-600 text-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                        Ready to Transform? Elevate Your Team&apos;s Performance Today
                    </h2>
                    <p className="text-lg mb-8 text-blue-50 text-balance">
                        Join thousands of African development teams already using AfricaDev-Bridge to streamline
                        workflows, track progress, and achieve extraordinary results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            asChild
                            className="bg-white text-green-600 hover:bg-gray-100"
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                            asChild
                        >
                            <Link href="/signup">Get started now</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
