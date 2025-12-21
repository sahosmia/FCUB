import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, User, ArrowLeft, Pencil } from 'lucide-react';

export default function Show({ course }) {
    return (
        <AppLayout>
            <Head title={`Course: ${course.title}`} />

            <div className="p-6 max-w-4xl mx-auto space-y-6">

                {/* Top Action Bar */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" asChild className="gap-2">
                        <Link href="/courses">
                            <ArrowLeft className="h-4 w-4" /> Back to Courses
                        </Link>
                    </Button>
                    <Button asChild className="gap-2">
                        <Link href={`/courses/${course.id}/edit`}>
                            <Pencil className="h-4 w-4" /> Edit Course
                        </Link>
                    </Button>
                </div>

                <Card className="overflow-hidden">
                    {/* Header with Status Badge */}
                    <CardHeader className="bg-muted/30 pb-8">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
                                <div className="flex items-center text-muted-foreground gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Instructor: <span className="font-medium text-foreground">{course.user?.name ?? 'N/A'}</span></span>
                                </div>
                            </div>
                            <Badge variant={course.is_active ? "success" : "destructive"} className="px-3 py-1">
                                {course.is_active ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-8">
                        {/* Course Stats Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card shadow-sm">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">Duration</p>
                                    <p className="text-sm font-medium">{course.duration ? `${course.duration} Hours` : '—'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card shadow-sm">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <CalendarDays className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">Semester</p>
                                    <p className="text-sm font-medium">{course.semester ?? 'Not Assigned'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card shadow-sm">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">Created By</p>
                                    <p className="text-sm font-medium">{course.user?.name ?? 'Admin'}</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Description Section */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                Course Description
                            </h3>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {course.description || "No description provided for this course."}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
