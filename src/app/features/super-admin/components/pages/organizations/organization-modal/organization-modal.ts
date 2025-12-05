import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { organizationService } from '../../../../services/organization.service';

export interface OrganizationModalData {
  mode: 'create' | 'edit';
  organization?: any; // Replace with your Organization interface
}


@Component({
  selector: 'app-organization-modal',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './organization-modal.html',
  styleUrl: './organization-modal.scss',
})
export class OrganizationModal {
  organizationForm!: FormGroup;
  isLoading = false;
  
  // Dropdown data
  countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India', 'China'];
  industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Hospitality', 'Construction', 'Transportation'];
  companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  plans = ['Starter', 'Professional', 'Enterprise'];
  billingCycles = ['monthly', 'quarterly', 'yearly'];
  
  mode: 'create' | 'edit' = 'create';
  
  private formValueChangesSub?: Subscription;
  private readonly PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  constructor(
    private fb: FormBuilder,
    private organizationService: organizationService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<OrganizationModal>,
    @Inject(MAT_DIALOG_DATA) public data: OrganizationModalData
  ) {
    this.mode = data.mode;
  }
  
  ngOnInit(): void {
    this.initializeForm();
    
    if (this.mode === 'edit' && this.data.organization) {
      this.patchFormValues();
    }
    
    // Monitor form changes for debugging or validation
    this.formValueChangesSub = this.organizationForm.valueChanges.subscribe(values => {
      console.log('Form values changed:', values);
    });
  }
  
  ngOnDestroy(): void {
    if (this.formValueChangesSub) {
      this.formValueChangesSub.unsubscribe();
    }
  }
  
  private initializeForm(): void {
    this.organizationForm = this.fb.group({
      // Organization Information
      organizationName: ['test', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      subdomain: ['first', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/), Validators.minLength(3), Validators.maxLength(50)]],
      email: ['subramanya@akrisso.com', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['1457895850', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      
      // Address Information
      address: ['12345 Mysore', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      city: ['Mysore', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      state: ['Karnataka', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      country: ['India', Validators.required],
      postalCode: ['570001', [Validators.required, Validators.pattern(/^[0-9A-Za-z\s-]{3,10}$/)]],
      
      // Company Details
      industry: ['Healthcare', Validators.required],
      companySize: ['1-10', Validators.required],
      
      // Admin Information
      firstName: ['subramanya', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['akrisso', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      adminEmail: ['subramanya@akrisso.com', [Validators.required, Validators.email, Validators.maxLength(100)]],
      adminPhone: ['1457895850', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      
      // Billing Information
      planName: ['Starter', Validators.required],
      billingCycle: ['monthly', Validators.required]
    });
  }
  
  private patchFormValues(): void {
    const organization = this.data.organization;
    
    // Map API response to form controls
    const formValues = {
      organizationName: organization.name || organization.organizationName || '',
      subdomain: organization.subdomain || '',
      email: organization.email || '',
      phone: organization.phone || '',
      address: organization.address || organization.addressLine1 || '',
      city: organization.city || '',
      state: organization.state || '',
      country: organization.country || '',
      postalCode: organization.postalCode || organization.zipCode || '',
      industry: organization.industry || '',
      companySize: organization.companySize || '',
      firstName: organization.admin?.firstName || '',
      lastName: organization.admin?.lastName || '',
      adminEmail: organization.admin?.email || '',
      adminPhone: organization.admin?.phone || '',
      planName: organization.plan?.name || organization.planName || '',
      billingCycle: organization.billingCycle || ''
    };
    
    this.organizationForm.patchValue(formValues);
    
    // Disable certain fields in edit mode if needed
    if (this.mode === 'edit') {
      const disableFields = ['subdomain', 'adminEmail'];
      disableFields.forEach(field => {
        const control = this.organizationForm.get(field);
        if (control) {
          control.disable();
        }
      });
    }
  }
  
  getControl(controlName: string): FormControl | null {
    return this.organizationForm.get(controlName) as FormControl;
  }
  
  getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);
    
    if (!control || !control.errors) return '';
    
    if (control.hasError('required')) {
      return 'This field is required';
    }
    
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (control.hasError('minlength')) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    
    if (control.hasError('maxlength')) {
      const maxLength = control.errors['maxlength'].requiredLength;
      return `Maximum ${maxLength} characters allowed`;
    }
    
    if (control.hasError('pattern')) {
      switch (controlName) {
        case 'subdomain':
          return 'Only lowercase letters, numbers and hyphens allowed';
        case 'phone':
        case 'adminPhone':
          return 'Please enter a valid phone number';
        case 'postalCode':
          return 'Please enter a valid postal/zip code';
        case 'password':
          return 'Password must be at least 8 characters with uppercase, lowercase, number & special character';
        default:
          return 'Invalid format';
      }
    }
    
    return 'Invalid value';
  }
  
  onSubmit(): void {
    if (this.organizationForm.invalid || this.isLoading) {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.organizationForm);
      return;
    }
    
    this.isLoading = true;
    
    // Prepare the data for submission
    const formValue = this.organizationForm.getRawValue();
    
    const organizationData = {
      // Organization Information
      organizationName: formValue.organizationName,
      subdomain: formValue.subdomain,
      email: formValue.email,
      phone: formValue.phone,
      
      // Address Information
      address: formValue.address,
      city: formValue.city,
      state: formValue.state,
      country: formValue.country,
      postalCode: formValue.postalCode,
      
      // Company Details
      industry: formValue.industry,
      companySize: formValue.companySize,
      
      // Admin Information
    
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      adminEmail: formValue.adminEmail,
      adminPhone: formValue.adminPhone,
        
      // Billing Information
      planName: formValue.planName,
      billingCycle: formValue.billingCycle
    };
    
    // In real implementation, you would call a service:
    if (this.mode === 'create') {
      this.organizationService.registerOrganization(organizationData).subscribe({
        next: (response) => this.handleSuccess(response),
        error: (error) => this.handleError(error)
      });
    } else {
      this.organizationService.updateOrganization(this.data.organization.id, organizationData).subscribe({
        next: (response) => this.handleSuccess(response),
        error: (error) => this.handleError(error)
      });
    }
  }
  
  private handleSuccess(response: any): void {
    this.isLoading = false;
    this.dialogRef.close({
      success: true,
      data: response.data,
      mode: this.mode
    });
  }
  
  private handleError(error: any): void {
    console.error('Error saving organization:', error);
    this.isLoading = false;
    
    // Handle specific errors
    if (error.status === 409) {
      // Conflict error (e.g., duplicate subdomain)
      const subdomainControl = this.organizationForm.get('subdomain');
      if (subdomainControl) {
        subdomainControl.setErrors({ conflict: true });
      }
    }
    
    // You could show a toast notification here
    this.snackBar.open('Failed to save organization. Please try again.', 'Close', { duration: 5000 });
  }
  
  onCancel(): void {
    if (this.organizationForm.dirty) {
      // Optional: Add confirmation dialog for unsaved changes
      // const confirm = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      // if (!confirm) return;
    }
    
    this.dialogRef.close({
      success: false,
      mode: this.mode
    });
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  verifyDomainAvailability(): void {
      const subdomainControl = this.organizationForm.get('subdomain');
      if (subdomainControl && subdomainControl.valid) {
        const subdomain = subdomainControl.value; 
        this.organizationService.verifyDomainAvailability(subdomain).subscribe({
          next: (isAvailable: boolean) => {
            if (!isAvailable) { 
              subdomainControl.setErrors({ conflict: true });
            }
          },
          error: () => {
            // Handle error if needed
          }
        });
      }
    }
  }