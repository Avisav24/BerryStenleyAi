import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Download, Eye, Search, X, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Json } from "@/integrations/supabase/types";

interface WorkshopRegistration {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  status: string;
  registration_status: string | null;
  registration_date: string | null;
  addons_selected: Json | null;
  addons_total_price: number | null;
  addons_selected_date: string | null;
  payment_status: string | null;
  payment_id: string | null;
  payment_mode: string | null;
  total_amount_paid: number | null;
  payment_date: string | null;
  created_at: string;
}

interface CourseEnrollment {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  country: string;
  status: string;
  course_name: string;
  course_fee: number;
  registration_status: string | null;
  registration_date: string | null;
  payment_status: string | null;
  payment_id: string | null;
  payment_mode: string | null;
  total_amount_paid: number | null;
  due_amount: number | null;
  payment_date: string | null;
  created_at: string;
}

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workshopData, setWorkshopData] = useState<WorkshopRegistration[]>([]);
  const [courseData, setCourseData] = useState<CourseEnrollment[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopRegistration | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseEnrollment | null>(null);
  const [workshopSearch, setWorkshopSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [workshopPaymentFilter, setWorkshopPaymentFilter] = useState<string>("all");
  const [coursePaymentFilter, setCoursePaymentFilter] = useState<string>("all");
  const [workshopDateFrom, setWorkshopDateFrom] = useState<Date | undefined>();
  const [workshopDateTo, setWorkshopDateTo] = useState<Date | undefined>();
  const [courseDateFrom, setCourseDateFrom] = useState<Date | undefined>();
  const [courseDateTo, setCourseDateTo] = useState<Date | undefined>();
  const [workshopPage, setWorkshopPage] = useState(1);
  const [coursePage, setCoursePage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();

  const filteredWorkshops = workshopData.filter(item => {
    const matchesSearch = workshopSearch === "" || 
      item.name.toLowerCase().includes(workshopSearch.toLowerCase()) ||
      item.email.toLowerCase().includes(workshopSearch.toLowerCase()) ||
      item.mobile.includes(workshopSearch);
    const matchesPayment = workshopPaymentFilter === "all" || item.payment_status === workshopPaymentFilter;
    const itemDate = item.registration_date ? new Date(item.registration_date) : null;
    const matchesDateFrom = !workshopDateFrom || (itemDate && itemDate >= workshopDateFrom);
    const matchesDateTo = !workshopDateTo || (itemDate && itemDate <= new Date(workshopDateTo.getTime() + 86400000));
    return matchesSearch && matchesPayment && matchesDateFrom && matchesDateTo;
  });

  const filteredCourses = courseData.filter(item => {
    const matchesSearch = courseSearch === "" || 
      item.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      item.email.toLowerCase().includes(courseSearch.toLowerCase()) ||
      item.course_name.toLowerCase().includes(courseSearch.toLowerCase());
    const matchesPayment = coursePaymentFilter === "all" || item.payment_status === coursePaymentFilter;
    const itemDate = item.registration_date ? new Date(item.registration_date) : null;
    const matchesDateFrom = !courseDateFrom || (itemDate && itemDate >= courseDateFrom);
    const matchesDateTo = !courseDateTo || (itemDate && itemDate <= new Date(courseDateTo.getTime() + 86400000));
    return matchesSearch && matchesPayment && matchesDateFrom && matchesDateTo;
  });

  // Pagination calculations
  const workshopTotalPages = Math.ceil(filteredWorkshops.length / itemsPerPage);
  const paginatedWorkshops = filteredWorkshops.slice((workshopPage - 1) * itemsPerPage, workshopPage * itemsPerPage);
  
  const courseTotalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((coursePage - 1) * itemsPerPage, coursePage * itemsPerPage);

  // Reset page when filters change
  useEffect(() => { setWorkshopPage(1); }, [workshopSearch, workshopPaymentFilter, workshopDateFrom, workshopDateTo]);
  useEffect(() => { setCoursePage(1); }, [courseSearch, coursePaymentFilter, courseDateFrom, courseDateTo]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        const { data } = await supabase.rpc('has_role', { _user_id: session.user.id, _role: 'admin' });
        setIsAdmin(!!data);
        if (data) fetchData();
      }
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        const { data } = await supabase.rpc('has_role', { _user_id: session.user.id, _role: 'admin' });
        setIsAdmin(!!data);
        if (data) fetchData();
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    const [workshopRes, courseRes] = await Promise.all([
      supabase.from('workshop_registrations').select('*').order('created_at', { ascending: false }),
      supabase.from('course_enrollments').select('*').order('created_at', { ascending: false })
    ]);
    if (workshopRes.data) setWorkshopData(workshopRes.data);
    if (courseRes.data) setCourseData(courseRes.data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(v => `"${v ?? ''}"`).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
  };

  const formatDate = (date: string | null) => date ? new Date(date).toLocaleString() : '-';

  const formatAddons = (addons: Json | null): string => {
    if (!addons || !Array.isArray(addons)) return '-';
    return (addons as { name: string; price: number }[]).map(a => `${a.name} (₹${a.price})`).join(', ');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle className="text-center">Admin Login</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-destructive">Access Denied. You don't have admin privileges.</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
        </div>

        <Tabs defaultValue="workshops" className="space-y-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="workshops" className="flex-1 sm:flex-none">Workshops ({filteredWorkshops.length})</TabsTrigger>
            <TabsTrigger value="courses" className="flex-1 sm:flex-none">Courses ({filteredCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="workshops">
            <Card>
              <CardHeader className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <CardTitle>Workshop Registrations</CardTitle>
                  <Button size="sm" onClick={() => exportToCSV(filteredWorkshops, 'workshop_registrations')}>
                    <Download className="w-4 h-4 mr-2" />Export CSV
                  </Button>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, mobile..." value={workshopSearch} onChange={e => setWorkshopSearch(e.target.value)} className="pl-9" />
                    {workshopSearch && <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0" onClick={() => setWorkshopSearch("")}><X className="w-4 h-4" /></Button>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className={cn("w-full sm:w-32 justify-start text-left font-normal", !workshopDateFrom && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {workshopDateFrom ? format(workshopDateFrom, "MMM dd") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={workshopDateFrom} onSelect={setWorkshopDateFrom} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className={cn("w-full sm:w-32 justify-start text-left font-normal", !workshopDateTo && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {workshopDateTo ? format(workshopDateTo, "MMM dd") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={workshopDateTo} onSelect={setWorkshopDateTo} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    {(workshopDateFrom || workshopDateTo) && (
                      <Button variant="ghost" size="sm" onClick={() => { setWorkshopDateFrom(undefined); setWorkshopDateTo(undefined); }}><X className="w-4 h-4" /></Button>
                    )}
                    <Select value={workshopPaymentFilter} onValueChange={setWorkshopPaymentFilter}>
                      <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Payment" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="not_paid">Not Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden sm:table-cell">Mobile</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedWorkshops.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No registrations found</TableCell></TableRow>
                    ) : paginatedWorkshops.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.email}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.mobile}</TableCell>
                        <TableCell><span className="text-xs px-2 py-1 rounded bg-muted">{item.registration_status}</span></TableCell>
                        <TableCell><span className={`text-xs px-2 py-1 rounded ${item.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.payment_status}</span></TableCell>
                        <TableCell><Button size="sm" variant="ghost" onClick={() => setSelectedWorkshop(item)}><Eye className="w-4 h-4" /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {workshopTotalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-sm text-muted-foreground">
                      Showing {(workshopPage - 1) * itemsPerPage + 1}-{Math.min(workshopPage * itemsPerPage, filteredWorkshops.length)} of {filteredWorkshops.length}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setWorkshopPage(p => p - 1)} disabled={workshopPage === 1}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="flex items-center px-2 text-sm">{workshopPage} / {workshopTotalPages}</span>
                      <Button variant="outline" size="sm" onClick={() => setWorkshopPage(p => p + 1)} disabled={workshopPage === workshopTotalPages}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <CardTitle>Course Enrollments</CardTitle>
                  <Button size="sm" onClick={() => exportToCSV(filteredCourses, 'course_enrollments')}>
                    <Download className="w-4 h-4 mr-2" />Export CSV
                  </Button>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, course..." value={courseSearch} onChange={e => setCourseSearch(e.target.value)} className="pl-9" />
                    {courseSearch && <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0" onClick={() => setCourseSearch("")}><X className="w-4 h-4" /></Button>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className={cn("w-full sm:w-32 justify-start text-left font-normal", !courseDateFrom && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {courseDateFrom ? format(courseDateFrom, "MMM dd") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={courseDateFrom} onSelect={setCourseDateFrom} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className={cn("w-full sm:w-32 justify-start text-left font-normal", !courseDateTo && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {courseDateTo ? format(courseDateTo, "MMM dd") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={courseDateTo} onSelect={setCourseDateTo} initialFocus className="p-3 pointer-events-auto" />
                      </PopoverContent>
                    </Popover>
                    {(courseDateFrom || courseDateTo) && (
                      <Button variant="ghost" size="sm" onClick={() => { setCourseDateFrom(undefined); setCourseDateTo(undefined); }}><X className="w-4 h-4" /></Button>
                    )}
                    <Select value={coursePaymentFilter} onValueChange={setCoursePaymentFilter}>
                      <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Payment" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="not_paid">Not Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden sm:table-cell">Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCourses.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No enrollments found</TableCell></TableRow>
                    ) : paginatedCourses.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.email}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.course_name}</TableCell>
                        <TableCell><span className="text-xs px-2 py-1 rounded bg-muted">{item.registration_status}</span></TableCell>
                        <TableCell><span className={`text-xs px-2 py-1 rounded ${item.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.payment_status}</span></TableCell>
                        <TableCell><Button size="sm" variant="ghost" onClick={() => setSelectedCourse(item)}><Eye className="w-4 h-4" /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {courseTotalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-sm text-muted-foreground">
                      Showing {(coursePage - 1) * itemsPerPage + 1}-{Math.min(coursePage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCoursePage(p => p - 1)} disabled={coursePage === 1}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="flex items-center px-2 text-sm">{coursePage} / {courseTotalPages}</span>
                      <Button variant="outline" size="sm" onClick={() => setCoursePage(p => p + 1)} disabled={coursePage === courseTotalPages}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Workshop Detail Dialog */}
      <Dialog open={!!selectedWorkshop} onOpenChange={() => setSelectedWorkshop(null)}>
        <DialogContent className="max-w-lg max-h-[90vh]">
          <DialogHeader><DialogTitle>Workshop Registration Details</DialogTitle></DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {selectedWorkshop && (
              <div className="space-y-3 text-sm">
                <div><strong>Name:</strong> {selectedWorkshop.name}</div>
                <div><strong>Email:</strong> {selectedWorkshop.email}</div>
                <div><strong>Mobile:</strong> {selectedWorkshop.mobile}</div>
                <div><strong>Location:</strong> {selectedWorkshop.city}, {selectedWorkshop.state}, {selectedWorkshop.country}</div>
                <hr />
                <div><strong>Registration Status:</strong> {selectedWorkshop.registration_status}</div>
                <div><strong>Registration Date:</strong> {formatDate(selectedWorkshop.registration_date)}</div>
                <hr />
                <div><strong>Add-ons Selected:</strong> {formatAddons(selectedWorkshop.addons_selected)}</div>
                <div><strong>Add-ons Total:</strong> ₹{selectedWorkshop.addons_total_price ?? 0}</div>
                <div><strong>Add-ons Selected Date:</strong> {formatDate(selectedWorkshop.addons_selected_date)}</div>
                <hr />
                <div><strong>Payment Status:</strong> {selectedWorkshop.payment_status}</div>
                <div><strong>Payment ID:</strong> {selectedWorkshop.payment_id ?? '-'}</div>
                <div><strong>Payment Mode:</strong> {selectedWorkshop.payment_mode ?? '-'}</div>
                <div><strong>Total Amount Paid:</strong> ₹{selectedWorkshop.total_amount_paid ?? 0}</div>
                <div><strong>Payment Date:</strong> {formatDate(selectedWorkshop.payment_date)}</div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Course Detail Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-lg max-h-[90vh]">
          <DialogHeader><DialogTitle>Course Enrollment Details</DialogTitle></DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {selectedCourse && (
              <div className="space-y-3 text-sm">
                <div><strong>Name:</strong> {selectedCourse.name}</div>
                <div><strong>Email:</strong> {selectedCourse.email}</div>
                <div><strong>Mobile:</strong> {selectedCourse.mobile}</div>
                <div><strong>Location:</strong> {selectedCourse.city}, {selectedCourse.state}, {selectedCourse.country}</div>
                <hr />
                <div><strong>Course:</strong> {selectedCourse.course_name}</div>
                <div><strong>Course Fee:</strong> ₹{selectedCourse.course_fee}</div>
                <div><strong>Registration Status:</strong> {selectedCourse.registration_status}</div>
                <div><strong>Registration Date:</strong> {formatDate(selectedCourse.registration_date)}</div>
                <hr />
                <div><strong>Payment Status:</strong> {selectedCourse.payment_status}</div>
                <div><strong>Payment ID:</strong> {selectedCourse.payment_id ?? '-'}</div>
                <div><strong>Payment Mode:</strong> {selectedCourse.payment_mode ?? '-'}</div>
                <div><strong>Total Amount Paid:</strong> ₹{selectedCourse.total_amount_paid ?? 0}</div>
                <div><strong>Due Amount:</strong> ₹{selectedCourse.due_amount ?? 0}</div>
                <div><strong>Payment Date:</strong> {formatDate(selectedCourse.payment_date)}</div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
