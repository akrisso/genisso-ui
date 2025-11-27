#!/bin/bash

echo "🚀 Setting up Cloud Telephony CRM as Single Application"
echo "======================================================"
echo ""

# Create a single application structure
echo "📦 Creating single application with feature modules..."


# Generate feature modules
echo "Creating feature modules..."
ng generate module core --routing
ng generate module shared

# Generate components for web
ng generate component features/web/pages/landing
ng generate component features/web/pages/features
ng generate component features/web/pages/pricing
ng generate component features/web/layouts/public-layout

# Generate components for auth
ng generate component features/auth/components/login
ng generate component features/auth/components/register
ng generate component features/auth/components/forgot-password

# Generate components for dashboard
ng generate component features/dashboard/layouts/dashboard-layout
ng generate component features/dashboard/pages/dashboard-main
ng generate component features/dashboard/pages/calls
ng generate component features/dashboard/pages/contacts
ng generate component features/dashboard/pages/analytics

# Generate services
ng generate service core/services/auth
ng generate service core/services/api
ng generate service features/dashboard/services/call

# Generate guards
ng generate guard core/guards/auth --implements CanActivate

echo "✅ Application structure created!"
echo ""
echo "This structure uses:"
echo "  - Single application (easier to manage)"
echo "  - Feature modules (organized code)"
echo "  - Lazy loading (performance)"
echo "  - No Module Federation complexity"
echo ""
echo "Run: npm start"