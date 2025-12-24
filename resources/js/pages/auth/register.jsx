import { login } from '@/routes';
import { Head, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import FormField from '@/components/form/form-field';
import SelectForm from '@/components/form/SelectForm';
import { genders } from '@/constants';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        date_of_birth: '',
        gender: '',
        admission_document: null,
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
                            onChange={(e) => form.setData('name', e.target.value)}
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
                            onChange={(e) => form.setData('email', e.target.value)}
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
                            onChange={(e) => form.setData('password', e.target.value)}
                            placeholder="Password"
                        />
                    </FormField>

                    <FormField label="Confirm password" error={form.errors.password_confirmation}>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                            placeholder="Confirm password"
                        />
                    </FormField>

                    <FormField label="Date of Birth" error={form.errors.date_of_birth}>
                        <Input
                            type="date"
                            value={form.data.date_of_birth}
                            onChange={(e) => form.setData('date_of_birth', e.target.value)}
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

                    <FormField label="Admission Document" error={form.errors.admission_document}>
                        <Input
                            type="file"
                            onChange={(e) => form.setData('admission_document', e.target.files[0])}
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
                    <TextLink href={login()}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
