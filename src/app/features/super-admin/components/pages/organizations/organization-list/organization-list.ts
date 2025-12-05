import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrganizationModal } from '../organization-modal/organization-modal';
import { organizationService } from '../../../../services/organization.service';
import { MaterialModule } from '../../../../../../shared/material.module';

interface Call {
  id: number;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  duration: string;
}


export interface Organization {
  id: string;
  name: string;
  subdomain: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  planName: string;
  billingCycle: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  adminEmail: string;
  adminPhone: string;
  status?: string;
  createdAt?: Date;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


@Component({
  selector: 'app-organization-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.scss',
})
export class OrganizationList {
  organizations = signal<Organization[]>([]);
  filteredOrganizations: Organization[] = [];
  displayedColumns: string[] = [
    'organizationName',
    'subdomain',
    'email',
    'industry',
    'companySize',
    'planName',
    'status',
    'actions'
  ];
  isLoading = false;
  searchTerm = '';

  pagination = signal<Pagination>({
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1
  });

  constructor(
    private dialog: MatDialog,
    private organizationService: organizationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrganizations();
  }

  /**
   * Load organizations (simulated data for UI demonstration)
   */
  loadOrganizations(page: number = 1): void {
    this.isLoading = true;
    this.organizationService.getOrganizations(page, this.pagination().limit).subscribe({
      next: (organizations: any) => {
        this.organizations.set(organizations);  
        this.filteredOrganizations = [...organizations];
        this.isLoading = false;
      },
      error: (error: any) => {
        this.showMessage(error.message || 'Failed to load organizations', 'error');
        this.isLoading = false;
      }
    });
  }

  /**
   * Filter organizations based on search term
   */
  filterOrganizations(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredOrganizations = [...this.organizations()];
      return;
    }
    
    this.filteredOrganizations = this.organizations().filter(org =>
      org.name.toLowerCase().includes(term) ||
      org.subdomain.toLowerCase().includes(term) ||
      org.email.toLowerCase().includes(term) ||
      org.industry.toLowerCase().includes(term)
    );
  }

  /**
   * Open modal to create new organization
   */
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(OrganizationModal, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.showMessage('Organization created successfully!', 'success');
        this.loadOrganizations();
      }
    });
  }

  /**
   * Open modal to edit organization
   */
  openEditDialog(organization: Organization): void {
    const dialogRef = this.dialog.open(OrganizationModal, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        mode: 'update',
        organization: organization
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.showMessage('Organization updated successfully!', 'success');
        this.loadOrganizations();
      }
    });
  }

  /**
   * Delete organization with confirmation
   */
  deleteOrganization(organization: Organization): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${organization.name}"? This action cannot be undone.`
    );

    if (!confirmDelete) {
      return;
    }

    this.isLoading = true;

    // Simulated deletion - replace with actual API call
    this.organizationService.deleteOrganization(organization.id).subscribe({
      next: (response: any) => {
        this.showMessage('Organization deleted successfully!', 'success');
        this.loadOrganizations();
      },
      error: (error: any) => {
        this.showMessage(error.message || 'Failed to delete organization', 'error');
        this.isLoading = false;
      }
    });
  }

  /**
   * View organization details
   */
  viewOrganization(organization: Organization): void {
    // Navigate to detail view or open detail modal
    console.log('View organization:', organization);
    this.showMessage('Detail view coming soon!', 'success');
  }

  /**
   * Resend verification email
   */
  resendVerificationEmail(organization: Organization): void {
    this.showMessage('Verification email sent!', 'success');
    // Implement actual email sending logic
  }

  /**
   * Get status chip color
   */
  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'primary';
      case 'inactive':
        return 'warn';
      case 'pending':
        return 'accent';
      default:
        return '';
    }
  }


  /**
   * Format date for display
   */
  formatDate(date: Date | string | null): string {
    if (date == null) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Show snackbar message
   */
  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByOrganizationId(index: number, org: Organization): string {
    return org.id;
  }
  

  getStatusClass(status: string): string {
  switch(status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'trial':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
}

  
  
  readonly calls = signal<Call[]>([
    { id: 1, name: 'Aarav Sharma', number: '+91 981****67', type: 'incoming', time: '10:45 AM', duration: '5m 12s' },
{ id: 2, name: 'Priya Nair', number: '+91 982****43', type: 'missed', time: '10:30 AM', duration: '0m 0s' },
{ id: 3, name: 'Internal Transfer', number: 'ext. 203', type: 'outgoing', time: '10:22 AM', duration: '12m 3s' },
{ id: 4, name: 'Rohan Mehta', number: '+91 983****78', type: 'incoming', time: '9:58 AM', duration: '2m 45s' },
{ id: 5, name: 'Support Inquiry', number: '+91 984****32', type: 'incoming', time: '9:41 AM', duration: '8m 30s' },
{ id: 6, name: 'Sneha Patel', number: '+91 985****89', type: 'outgoing', time: '9:30 AM', duration: '1m 15s' },
{ id: 7, name: 'Aarav Sharma', number: '+91 981****67', type: 'incoming', time: '10:45 AM', duration: '5m 12s' },
  ]);

  getCallIcon(type: Call['type']): string {
    switch (type) {
      case 'incoming': return 'fa-arrow-down-long text-green-500';
      case 'outgoing': return 'fa-arrow-up-long text-blue-500';
      case 'missed': return 'fa-phone-slash text-red-500';
      default: return '';
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination().totalPages) {
      // Here you would typically call your API with the new page
      console.log(`Navigating to page ${page}`);
      
      // Update pagination signal
      this.pagination.update(current => ({
        ...current,
        page: page
      }));
      
      // Fetch data for the new page (you would implement this)
      this.loadOrganizations(page);
    }
  }

  goToPreviousPage(): void {
    if (this.pagination().page > 1) {
      this.goToPage(this.pagination().page - 1);
    }
  }

  goToNextPage(): void {
    if (this.pagination().page < this.pagination().totalPages) {
      this.goToPage(this.pagination().page + 1);
    }
  }

  getDisplayRange(): string {
  const pagination = this.pagination();
  if (!pagination) return '0-0 of 0';
  
  const start = (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);
  
  return `${start} to ${end} of ${pagination.total}`;
}

// Or if you prefer individual methods:
getStartIndex(): number {
  const pagination = this.pagination();
  return (pagination.page - 1) * pagination.limit + 1;
}

getEndIndex(): number {
  const pagination = this.pagination();
  return Math.min(pagination.page * pagination.limit, pagination.total);
}

}
