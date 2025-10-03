import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
    return (
        <header className="border-b w-full border-gray-200 bg-white">
            <div className="w-full p-2  ">
                <div className="flex h-16 w-full items-center justify-between">
                    <Link href="/" className="flex ml-9 items-center gap-2 ">
                        <div className="flex p-1 items-center justify-center rounded-none bg-black text-white font-bold text-lg">
                            TrustBridge
                        </div>
                    </Link>
                    <div className="flex items-center">
                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                href="#features"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Features
                            </Link>
                            <Link
                                href="#benefits"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Benefits
                            </Link>
                            <Link
                                href="#tools"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Tools
                            </Link>
                            <Link
                                href="#testimonials"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Testimonials
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Pricing
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4 mr-12">
                        <Button variant="ghost" asChild className="text-gray-600 ">
                            <Link href="/main/auth/login">Log in</Link>
                        </Button>
                        <Button asChild className="bg-green-700 rounded-none hover:bg-green-700 text-white">
                            <Link href="/main/auth/signup">Get started now</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
