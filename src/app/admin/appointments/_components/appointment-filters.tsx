
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Suspense } from 'react';

const services = [
  { value: 'educational-consultation', label: 'Educational Consultation' },
  { value: 'visa-assistance', label: 'Visa Application Assistance' },
  { value: 'travel-coordination', label: 'Travel Coordination' },
  { value: 'general-inquiry', label: 'General Inquiry' },
];

const statuses = ['Pending', 'Confirmed', 'Completed'];

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const serviceFilter = searchParams.get('service') || 'all';
  const statusFilter = searchParams.get('status') || 'all';

  const handleFilterChange = (type: 'service' | 'status', value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (value && value !== 'all') {
      current.set(type, value);
    } else {
      current.delete(type);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return (
    <Card className="mb-6">
        <CardContent className="p-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="service-filter" className="text-sm font-medium text-muted-foreground">Filter by Service</label>
                    <Select value={serviceFilter} onValueChange={(value) => handleFilterChange('service', value)}>
                        <SelectTrigger id="service-filter">
                            <SelectValue placeholder="All Services" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Services</SelectItem>
                            {services.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                    {service.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="status-filter" className="text-sm font-medium text-muted-foreground">Filter by Status</label>
                    <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                        <SelectTrigger id="status-filter">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            {statuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}


export function AppointmentFilters() {
    return (
        <Suspense fallback={<div>Loading filters...</div>}>
            <Filters />
        </Suspense>
    )
}
