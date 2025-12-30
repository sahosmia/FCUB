import { dashboard, login, register } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    CreditCard,
    User,
} from 'lucide-react';

export default function Welcome({ canRegister = true }) {
    const { auth } = usePage().props;

    const features = [
        {
            title: 'Courses',
            desc: 'View your enrolled courses and academic structure.',
            icon: BookOpen,
        },
        {
            title: 'Payments',
            desc: 'Track fees, payments, and dues easily.',
            icon: CreditCard,
        },
        {
            title: 'Results',
            desc: 'Check your semester results and performance.',
            icon: BarChart3,
        },
        {
            title: 'Profile',
            desc: 'Manage your personal and academic profile.',
            icon: User,
        },
    ];

    return (
        <>
            <Head title="Welcome" />

            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-[#0a0a0a]/80">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <h1 className="text-lg font-semibold">Student Portal</h1>

                    <nav className="flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-lg px-4 py-2 text-sm hover:bg-muted"
                                >
                                    Login
                                </Link>

                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                                    >
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 lg:grid-cols-2">
                    {/* Text */}
                    <div>
                        <h2 className="text-4xl leading-tight font-extrabold sm:text-5xl">
                            Welcome to the <br />
                            Student Portal
                        </h2>

                        <p className="mt-6 max-w-xl text-lg text-slate-300">
                            Manage your academic journey with ease — Courses,
                            Payments, Results, Profile, and more.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90"
                            >
                                Get Started <ArrowRight className="h-4 w-4" />
                            </Link>

                            {canRegister && (
                                <Link
                                    href="/register"
                                    className="rounded-lg border border-white/30 px-6 py-3 text-sm hover:bg-white/10"
                                >
                                    Create Account
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="hidden lg:block">
                        <img
                            src="/cse.jpeg"
                            alt="Student portal"
                            className="rounded-2xl shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-slate-50 py-20 dark:bg-[#0f0f0f]">
                <div className="mx-auto max-w-6xl px-6">
                    <h3 className="mb-12 text-center text-3xl font-bold">
                        What You Can Do
                    </h3>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="rounded-xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md dark:bg-[#121212]"
                            >
                                <f.icon className="mx-auto mb-4 h-10 w-10 text-primary" />
                                <h4 className="mb-2 font-semibold">
                                    {f.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Section */}
            <section className="bg-white py-20 dark:bg-[#0a0a0a]">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h3 className="mb-6 text-2xl font-bold">
                        Built for Students & Admins
                    </h3>
                    <p className="text-muted-foreground">
                        Students can manage courses, payments, and results —
                        while admins control students, batches, routines, and
                        academic data in one secure system.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-slate-50 py-6 text-center text-sm text-muted-foreground dark:bg-[#0f0f0f]">
                © {new Date().getFullYear()} Student Portal. All rights
                reserved.
            </footer>
        </>
    );
}
