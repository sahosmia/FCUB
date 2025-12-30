import { login } from '@/routes';
import { Head, useForm } from '@inertiajs/react';

import FormField from '@/components/form/form-field';
import SelectForm from '@/components/form/SelectForm';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import { genders, semesters } from '@/constants';
import AuthLayout from '@/layouts/auth-layout';

export default function Register({ batches }) {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        student_id: '',
        batch_id: '',
        semester: '',
        session: '',
        course_fee: '',
        admission_fee: '',
        admission_document: null,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post('/register');
    };

    return (
        <AuthLayout
            title="Create Student Account"
            description="Fill in the information below to register as a student"
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-8">
                {/* ===== BASIC INFORMATION ===== */}
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                        Basic Information
                    </h3>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormField label="Full Name" error={form.errors.name}>
                            <Input
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                placeholder="John Doe"
                            />
                        </FormField>

                        <FormField
                            label="Email Address"
                            error={form.errors.email}
                        >
                            <Input
                                type="email"
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData('email', e.target.value)
                                }
                                placeholder="student@email.com"
                            />
                        </FormField>

                        <FormField
                            label="Phone Number"
                            error={form.errors.phone}
                        >
                            <Input
                                value={form.data.phone}
                                onChange={(e) =>
                                    form.setData('phone', e.target.value)
                                }
                                placeholder="+8801XXXXXXXXX"
                            />
                        </FormField>

                        <FormField
                            label="Date of Birth"
                            error={form.errors.date_of_birth}
                        >
                            <Input
                                type="date"
                                value={form.data.date_of_birth}
                                onChange={(e) =>
                                    form.setData(
                                        'date_of_birth',
                                        e.target.value,
                                    )
                                }
                            />
                        </FormField>

                        <SelectForm
                            label="Gender"
                            error={form.errors.gender}
                            value={form.data.gender}
                            onValueChange={(v) => form.setData('gender', v)}
                            placeholder="Select gender"
                            options={genders}
                        />
                    </div>
                </div>

                {/* ===== ACADEMIC INFORMATION ===== */}
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                        Academic Information
                    </h3>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormField
                            label="Student ID"
                            error={form.errors.student_id}
                        >
                            <Input
                                value={form.data.student_id}
                                onChange={(e) =>
                                    form.setData('student_id', e.target.value)
                                }
                                placeholder="2024xxxx"
                            />
                        </FormField>

                        <FormField label="Session">
                            <Input
                                value={form.data.session}
                                onChange={(e) =>
                                    form.setData('session', e.target.value)
                                }
                                placeholder="2023–2024"
                            />
                        </FormField>

                        <SelectForm
                            label="Batch"
                            error={form.errors.batch_id}
                            value={form.data.batch_id}
                            onValueChange={(v) => form.setData('batch_id', v)}
                            placeholder="Select batch"
                            options={
                                batches?.map((b) => ({
                                    value: b.id,
                                    label: b.title,
                                })) || []
                            }
                        />

                        <SelectForm
                            label="Semester"
                            error={form.errors.semester}
                            value={form.data.semester}
                            onValueChange={(v) => form.setData('semester', v)}
                            placeholder="Select semester"
                            options={semesters}
                        />
                    </div>
                </div>

                {/* ===== FEES ===== */}
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                        Fees Information
                    </h3>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormField
                            label="Course Fee"
                            error={form.errors.course_fee}
                        >
                            <Input
                                type="number"
                                value={form.data.course_fee}
                                onChange={(e) =>
                                    form.setData('course_fee', e.target.value)
                                }
                                placeholder="Total course fee"
                            />
                        </FormField>

                        <FormField
                            label="Admission Fee"
                            error={form.errors.admission_fee}
                        >
                            <Input
                                type="number"
                                value={form.data.admission_fee}
                                onChange={(e) =>
                                    form.setData(
                                        'admission_fee',
                                        e.target.value,
                                    )
                                }
                                placeholder="Admission fee"
                            />
                        </FormField>
                    </div>
                </div>

                {/* ===== DOCUMENT ===== */}
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                        Documents
                    </h3>

                    <FormField
                        label="Admission Document (PDF / Image)"
                        error={form.errors.admission_document}
                    >
                        <Input
                            type="file"
                            onChange={(e) =>
                                form.setData(
                                    'admission_document',
                                    e.target.files[0],
                                )
                            }
                        />
                    </FormField>
                </div>

                {/* ===== SECURITY ===== */}
                <div>
                    <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                        Security
                    </h3>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <FormField
                            label="Password"
                            error={form.errors.password}
                        >
                            <Input
                                type="password"
                                value={form.data.password}
                                onChange={(e) =>
                                    form.setData('password', e.target.value)
                                }
                            />
                        </FormField>

                        <FormField
                            label="Confirm Password"
                            error={form.errors.password_confirmation}
                        >
                            <Input
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={(e) =>
                                    form.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                            />
                        </FormField>
                    </div>
                </div>

                {/* ===== ACTION ===== */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.processing}
                >
                    {form.processing && <Spinner />}
                    Create Account
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={login()}>Log in</TextLink>
                </p>
            </form>
        </AuthLayout>
    );
}
