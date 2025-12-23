import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Pencil, User, Mail, Phone, CalendarDays, KeyRound, Briefcase, FileText, DollarSign, Building, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/DataTable/Pagination";

export default function Show({ user, payments }) {
    return (
        <AppLayout>
            <Head title={`User: ${user.name}`} />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                {/* Top Action Bar */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" asChild className="gap-2">
                        <Link href="/users">
                            <ArrowLeft className="h-4 w-4" /> Back to Users
                        </Link>
                    </Button>
                    <Button asChild className="gap-2">
                        <Link href={route('users.edit', user.id)}>
                            <Pencil className="h-4 w-4" /> Edit User
                        </Link>
                    </Button>
                </div>

                <Card className="overflow-hidden">
                    {/* Header with Status Badge */}
                    <CardHeader className="bg-muted/30 pb-8">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <CardTitle className="text-3xl font-bold">
                                    {user.name}
                                </CardTitle>
                                <div className="flex items-center text-muted-foreground gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                            <Badge
                                variant={
                                    user.status ? "success" : "destructive"
                                }
                                className="px-3 py-1"
                            >
                                {user.status ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-8">
                        {/* User Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem icon={<User />} label="Gender" value={user.gender} />
                            <DetailItem icon={<Phone />} label="Phone" value={user.phone} />
                            <DetailItem icon={<CalendarDays />} label="Date of Birth" value={user.date_of_birth} />
                            <DetailItem icon={<KeyRound />} label="Role" value={user.role} />
                            <DetailItem icon={<Briefcase />} label="Session" value={user.session} />
                            <DetailItem icon={<FileText />} label="Student ID" value={user.student_id} />
                            <DetailItem icon={<Building />} label="Batch" value={user.batch?.name} />
                            {user.admission_document && (
                                <DetailItem icon={<FileText />} label="Admission Document">
                                    <a href={`/storage/${user.admission_document}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                        View Document
                                    </a>
                                </DetailItem>
                            )}
                        </div>

                        <Separator />

                        {/* Financial Information */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                Financial Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <DetailItem icon={<DollarSign />} label="Course Fee" value={user.course_fee} />
                                <DetailItem icon={<DollarSign />} label="Paid Fee" value={user.paid_fee} />
                                <DetailItem icon={<DollarSign />} label="Due Fee" value={user.due_fee} />
                                <DetailItem icon={<DollarSign />} label="Admission Fee" value={user.admission_fee} />
                            </div>
                        </div>

                        <Separator />

                        {/* Payment History */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    Payment History
                                </h3>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={route('users.payments.create', user.id)}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Payment
                                    </Link>
                                </Button>
                            </div>
                            <div className="overflow-hidden rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Semester</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Payment Date</TableHead>
                                            <TableHead>Receipt</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payments.data.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell>{payment.semester}</TableCell>
                                                <TableCell>{payment.amount}</TableCell>
                                                <TableCell>{payment.payment_date}</TableCell>
                                                <TableCell>
                                                    {payment.receipt && (
                                                        <a href={`/storage/${payment.receipt}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                                            <FileText className="h-5 w-5" />
                                                        </a>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link href={route('payments.destroy', payment.id)} method="delete" as="button" className="text-red-500 hover:underline">
                                                        Delete
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <Pagination paginator={payments} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">
                {label}
            </p>
            <p className="text-sm font-medium">{value || "—"}</p>
        </div>
    </div>
);
