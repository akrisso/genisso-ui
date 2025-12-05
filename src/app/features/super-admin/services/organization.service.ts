import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { config, ConfigKeys } from '../config/config';

export interface OrganizationData {
  id?: string
  organizationName: string;
  subdomain: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  industry: string;
  companySize: string;
  firstName: string;
  lastName: string;
  adminEmail: string;
  adminPhone: string;
  planName: string;
  billingCycle: string;
  status?: 'active' | 'inactive' | 'pending';
  createdAt?: string | Date;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class organizationService {
    private readonly ADMIN_AUTH_URL = config[ConfigKeys.ADMIN_AUTH_URL]
    private AUTH_URL = config[ConfigKeys.AUTH_URL];
    private ORGANIZATION_URL = config[ConfigKeys.ORGANIZATION_URL];
  

  constructor(private http: HttpClient) {}

   /**
    * Get all organizations with pagination
    */
  getOrganizations(page: number = 1, limit: number = 10): Observable<{ organizations: OrganizationData[]; total: number }> {   
    return this.http.get<ApiResponse>(`${this.ORGANIZATION_URL}?page=${page}&limit=${limit}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  } 

  /**
   * Register a new organization
   */
  registerOrganization(data: OrganizationData): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse>(
      `${this.AUTH_URL}/register`,
      this.transformToApiFormat(data),
      { headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get organization by ID
   */
  getOrganization(id: string): Observable<any> {
    return this.http.get<ApiResponse>(`${this.ADMIN_AUTH_URL}/organizations/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * Update organization
   */
  updateOrganization(id: string, data: Partial<OrganizationData>): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.ADMIN_AUTH_URL}/organizations/${id}`,
      this.transformToApiFormat(data)
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete organization
   */
  deleteOrganization(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.ADMIN_AUTH_URL}/organizations/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Transform form data to API format
   */
  private transformToApiFormat(data: Partial<OrganizationData>): any {
    return {
      name: data.organizationName,
      subdomain: data.subdomain,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
      industry: data.industry,
      companySize: data.companySize,
      firstName: data.firstName,
      lastName: data.lastName,
      adminEmail: data.adminEmail,
      adminPhone: data.adminPhone,
      planName: data.planName,
      billingCycle: data.billingCycle
    };
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || 
        `Server Error: ${error.status} - ${error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  } 

  verifyDomainAvailability(subdomain: string): Observable<boolean> {
    return this.http.post<{ available: boolean }>(
      `${this.AUTH_URL}/check-subdomain`,
      { subdomain : subdomain } as { subdomain: string;}
    ).pipe(
      map(response => response.available),
      catchError(() => {
        // In case of error, assume domain is not available
        return throwError(() => new Error('Could not verify domain availability'));
      })
    );
  }
}
