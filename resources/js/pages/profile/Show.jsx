import Pagination from '@/components/DataTable/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Briefcase,
    Building,
    CalendarDays,
    DollarSign,
    FileText,
    KeyRound,
    Mail,
    Phone,
    Plus,
    User,
} from 'lucide-react';

export default function Show({ user, payments }) {
    console.log(user);

    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <Card className="overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-8">
                        <div className="space-y-1">
                            <CardTitle className="text-3xl font-bold">
                                {user.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8 pt-6">
                        {/* User Details */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <DetailItem
                                icon={<User />}
                                label="Gender"
                                value={user.gender}
                            />
                            <DetailItem
                                icon={<Phone />}
                                label="Phone"
                                value={user.phone}
                            />
                            <DetailItem
                                icon={<CalendarDays />}
                                label="Date of Birth"
                                value={user.date_of_birth}
                            />
                            <DetailItem
                                icon={<KeyRound />}
                                label="Role"
                                value={user.role}
                            />
                            <DetailItem
                                icon={<Briefcase />}
                                label="Session"
                                value={user.session}
                            />
                            <DetailItem
                                icon={<FileText />}
                                label="Student ID"
                                value={user.student_id}
                            />
                            <DetailItem
                                icon={<Building />}
                                label="Batch"
                                value={user.batch?.title}
                            />
                            {user.admission_document && (
                                <DetailItem
                                    icon={<FileText />}
                                    label="Admission Document"
                                >
                                    <a
                                        href={`/storage/${user.admission_document}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Document
                                    </a>
                                </DetailItem>
                            )}
                        </div>

                        {user.role === 'student' && (
                            <>
                                <Separator />

                                {/* Financial Information */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold">
                                        Financial Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <DetailItem
                                            icon={<DollarSign />}
                                            label="Course Fee"
                                            value={user.course_fee}
                                        />
                                        <DetailItem
                                            icon={<DollarSign />}
                                            label="Paid Fee"
                                            value={user.paid_fee}
                                        />
                                        <DetailItem
                                            icon={<DollarSign />}
                                            label="Due Fee"
                                            value={user.due_fee}
                                        />
                                        <DetailItem
                                            icon={<DollarSign />}
                                            label="Admission Fee"
                                            value={user.admission_fee}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                {/* Payment History */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">
                                            Payment History
                                        </h3>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Link
                                                href={`/users/${user.id}/payments/create`}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />{' '}
                                                Add Payment
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="overflow-hidden rounded-lg border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Semester
                                                    </TableHead>
                                                    <TableHead>
                                                        Amount
                                                    </TableHead>
                                                    <TableHead>
                                                        Payment Date
                                                    </TableHead>
                                                    <TableHead>
                                                        Receipt
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {payments.data.map(
                                                    (payment) => (
                                                        <TableRow
                                                            key={payment.id}
                                                        >
                                                            <TableCell>
                                                                {
                                                                    payment.semester
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {payment.amount}
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    payment.payment_date
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {payment.receipt && (
                                                                    <a
                                                                        href={`/storage/${payment.receipt}`}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="text-blue-500 hover:underline"
                                                                    >
                                                                        <FileText className="h-5 w-5" />
                                                                    </a>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Pagination paginator={payments} />
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-2">{icon}</div>
        <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">
                {label}
            </p>
            <p className="text-sm font-medium">{value || '—'}</p>
        </div>
    </div>
);
