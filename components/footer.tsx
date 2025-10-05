import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="font-semibold text-lg text-gray-900">Trust Bridge</span>
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">
                            On A Mission To Boost Engineers&apos; Productivity.
                        </p>
                        <p className="text-sm text-gray-600">Created By Developers, For Developers.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900">Explore</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/integrations"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Integrations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/changelog"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Changelog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900">About</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/company"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Company
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Legal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/help"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Help
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">fin</p>
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://github.com"
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                GitHub
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full  h-[300px] flex items-center justify-center font-bold text-[200px]">
                Trust
                <span className="text-green-500">Bridge</span>
            </div>
        </footer>
    )
}
