import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class Landing implements OnInit {
  features = [
    {
      icon: 'mic',
      title: 'Voice AI Agent Framework',
      description: 'Leverage advanced AI-powered voice agents to automate customer interactions, qualify leads, and provide 24/7 support with natural conversation capabilities.'
    },
    {
      icon: 'phone',
      title: 'Cloud Telephony Integration',
      description: 'Seamlessly integrate with leading cloud telephony providers. Make and receive calls directly from the platform with automatic call logging and recording.'
    },
    {
      icon: 'chat',
      title: 'Conversation Management',
      description: 'Track, analyze, and optimize every conversation. Get real-time insights, sentiment analysis, and actionable data to improve your lead conversion rates.'
    },
    {
      icon: 'analytics',
      title: 'Advanced Analytics',
      description: 'Gain deep insights into your lead pipeline with comprehensive analytics, conversion tracking, and performance metrics to make data-driven decisions.'
    },
    {
      icon: 'integration_instructions',
      title: 'CRM Integration',
      description: 'Connect seamlessly with your existing CRM systems. Sync leads, update records, and maintain a unified view of your customer relationships.'
    },
    {
      icon: 'security',
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, compliance with GDPR and data protection regulations, ensuring your lead data is always secure and protected.'
    }
  ];

  benefits = [
    { value: '10x', label: 'Faster Lead Response' },
    { value: '85%', label: 'Lead Qualification Rate' },
    { value: '24/7', label: 'Availability' },
    { value: '60%', label: 'Cost Reduction' }
  ];

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // SEO Optimization
    this.titleService.setTitle('Genisso - AI-Powered Lead Management & Cloud Telephony Platform');
    
    this.meta.addTags([
      { name: 'description', content: 'Transform your lead management with Genisso\'s AI-powered voice agents, cloud telephony integration, and intelligent conversation management. Automate follow-ups and boost conversions.' },
      { name: 'keywords', content: 'lead management, AI voice agents, cloud telephony, conversation management, CRM integration, sales automation' },
      { name: 'author', content: 'Genisso' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Genisso - AI-Powered Lead Management Platform' },
      { property: 'og:description', content: 'Transform your lead management with AI-powered voice agents and cloud telephony integration.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://genisso.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Genisso - AI-Powered Lead Management Platform' },
      { name: 'twitter:description', content: 'Transform your lead management with AI-powered voice agents and cloud telephony integration.' }
    ]);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onContactSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', form.value);
      // Handle form submission
      alert('Thank you for your interest! We will get back to you soon.');
      form.reset();
    }
  }
}