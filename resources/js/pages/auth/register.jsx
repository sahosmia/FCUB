import { login } from '@/routes';
import { Head, useForm } from '@inertiajs/react';

import FormField from '@/components/form/form-field';
import SelectForm from '@/components/form/SelectForm';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { genders } from '@/constants';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        date_of_birth: '',
        gender: '',
        admission_document: null,
        phone: '',
        course_fee: '',
        admission_fee: '',
        student_id: '',
        semester: '',
        batch: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post('/register');
    };

    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <FormField label="Name" error={form.errors.name}>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            autoComplete="name"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            placeholder="Full name"
                        />
                    </FormField>

                    <FormField label="Email address" error={form.errors.email}>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                            placeholder="email@example.com"
                        />
                    </FormField>

                    <FormField label="Password" error={form.errors.password}>
                        <Input
                            id="password"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={form.data.password}
                            onChange={(e) =>
                                form.setData('password', e.target.value)
                            }
                            placeholder="Password"
                        />
                    </FormField>

                    <FormField
                        label="Confirm password"
                        error={form.errors.password_confirmation}
                    >
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={form.data.password_confirmation}
                            onChange={(e) =>
                                form.setData(
                                    'password_confirmation',
                                    e.target.value,
                                )
                            }
                            placeholder="Confirm password"
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
                                form.setData('date_of_birth', e.target.value)
                            }
                        />
                    </FormField>

                    <SelectForm
                        label="Gender"
                        error={form.errors.gender}
                        value={form.data.gender}
                        onValueChange={(value) => form.setData('gender', value)}
                        placeholder="Select Gender"
                        options={genders}
                    />

                    <FormField
                        label="Admission Document"
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
                    <FormField label="Phone Number" error={form.errors.phone}>
                        <Input
                            id="phone"
                            type="text"
                            required
                            autoFocus
                            autoComplete="phone"
                            value={form.data.phone}
                            onChange={(e) =>
                                form.setData('phone', e.target.value)
                            }
                            placeholder="Phone number"
                        />
                    </FormField>
                    <FormField
                        label="Course Fee"
                        error={form.errors.course_fee}
                    >
                        <Input
                            id="course_fee"
                            type="number"
                            required
                            autoFocus
                            autoComplete="phone"
                            value={form.data.course_fee}
                            onChange={(e) =>
                                form.setData('course_fee', e.target.value)
                            }
                            placeholder="Course fee"
                        />
                    </FormField>
                    <FormField
                        label="Admission Fee"
                        error={form.errors.admission_fee}
                    >
                        <Input
                            id="admission_fee"
                            type="number"
                            required
                            autoFocus
                            autoComplete="admission_fee"
                            value={form.data.admission_fee}
                            onChange={(e) =>
                                form.setData('admission_fee', e.target.value)
                            }
                            placeholder="Admission fee"
                        />
                    </FormField>
                    <FormField
                        label="Student  Id"
                        error={form.errors.student_id}
                    >
                        <Input
                            id="student_id"
                            type="number"
                            required
                            autoFocus
                            autoComplete="student_id"
                            value={form.data.student_id}
                            onChange={(e) =>
                                form.setData('student_id', e.target.value)
                            }
                            placeholder="Student ID"
                        />
                    </FormField>
                    <FormField label="Semester" error={form.errors.semester}>
                        <Input
                            id="semester"
                            type="number"
                            required
                            autoFocus
                            autoComplete="semester"
                            value={form.data.semester}
                            onChange={(e) =>
                                form.setData('semester', e.target.value)
                            }
                            placeholder="Semester"
                        />
                    </FormField>
                    <FormField label="Batch" error={form.errors.batch}>
                        <Input
                            id="batch"
                            type="number"
                            required
                            autoFocus
                            autoComplete="batch"
                            value={form.data.batch}
                            onChange={(e) =>
                                form.setData('batch', e.target.value)
                            }
                            placeholder="Batch"
                        />
                    </FormField>
                    <FormField label="Session" error={form.errors.session}>
                        <Input
                            id="session"
                            type="text"
                            required
                            autoFocus
                            autoComplete="session"
                            value={form.data.session}
                            onChange={(e) =>
                                form.setData('session', e.target.value)
                            }
                            placeholder="Session"
                        />
                    </FormField>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        disabled={form.processing}
                    >
                        {form.processing && <Spinner />}
                        Create account
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={login()}>Log in</TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
