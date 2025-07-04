# Adventurage Travel Website

## Overview

Adventurage is a frontend travel website that specializes in hut-to-hut trekking adventures and outdoor experiences. The project is built as a static website using vanilla HTML, CSS, and JavaScript, focusing on showcasing adventure tours and providing a seamless booking experience for outdoor enthusiasts.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript implementation without a backend
- **Multi-page Structure**: Separate HTML files for different sections (home, tours, about, contact, booking, payment, confirmation, login)
- **Responsive Design**: Mobile-first approach using Bootstrap 5 framework combined with custom CSS
- **Component-based Styling**: Modular CSS with custom properties for consistent theming
- **Progressive Enhancement**: JavaScript adds interactivity while maintaining core functionality without it

### Technology Stack
- **HTML5**: Semantic markup with modern standards
- **CSS3**: Custom properties, Bootstrap 5, flexbox, and responsive design
- **Vanilla JavaScript**: DOM manipulation, form validation, and interactive features
- **Bootstrap 5**: CSS framework for responsive grid and components
- **Google Fonts**: DM Sans and Dokdo font families for typography
- **CDN Resources**: Bootstrap and Google Fonts loaded via CDN

## Key Components

### Navigation System
- Sticky navigation bar with responsive Bootstrap design
- Mobile hamburger menu toggle functionality
- Active page highlighting with consistent styling
- User icon integration for login access

### Page Structure
1. **Home Page** (`index.html`): Hero section with adventure booking interface
2. **Tours Page** (`tour.html`): Tour listings with filters and search functionality
3. **About Page** (`about.html`): Company information and mission statement
4. **Contact Page** (`contact.html`): Contact information and support details
5. **Booking Page** (`booking.html`): Tour booking form and traveler details
6. **Payment Page** (`payment.html`): Payment processing and billing information
7. **Confirmation Page** (`confirmation.html`): Booking confirmation and receipt
8. **Login Page** (`login.html`): User authentication interface

### Interactive Features
- Traveler counter functionality with increment/decrement controls
- Form validation for email, card numbers, and expiry dates
- Responsive navigation with mobile menu toggle
- User login navigation system
- Dynamic content updates for booking flow

### Styling System
- CSS custom properties for consistent color theming
- Bootstrap 5 grid system for responsive layouts
- Custom CSS overrides for brand-specific styling
- Consistent spacing and typography system
- Mobile-first responsive design approach

## Data Flow

### Current Implementation
- **Static Content**: All content is hardcoded in HTML files
- **Client-side Validation**: JavaScript handles form validation and user interactions
- **No Backend**: Currently no server-side processing or database integration
- **Local Storage**: Potential for storing booking data temporarily in browser storage

### Booking Flow
1. User selects tour and traveler count on home page
2. Navigation to booking page for personal details
3. Payment page for billing information
4. Confirmation page showing booking summary
5. All data handled client-side without persistence

## External Dependencies

### CDN Resources
- **Bootstrap 5.3.0**: CSS framework for responsive design
- **Google Fonts**: DM Sans and Dokdo font families
- **Font Awesome**: Icons and visual elements

### Third-party Integrations
- **Google Fonts API**: Typography loading
- **Bootstrap CDN**: Framework resources
- **No payment processing**: Payment forms are UI-only without backend integration
- **No authentication system**: Login page is UI-only without backend validation

## Deployment Strategy

### Current State
- **Static Hosting**: Suitable for GitHub Pages, Netlify, or Vercel
- **No Build Process**: Direct deployment of HTML, CSS, and JavaScript files
- **Asset Management**: Images and resources served directly from project structure

### Future Considerations
- **Backend Integration**: Potential for adding Node.js/Express server
- **Database Integration**: Future implementation of user accounts and booking persistence
- **Payment Processing**: Integration with payment gateways (Stripe, PayPal)
- **API Development**: RESTful API for booking and user management

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Future Enhancement Opportunities

### Backend Development
- **Problem**: No data persistence or server-side processing
- **Solution**: Implement Node.js/Express backend with database integration
- **Benefits**: User accounts, booking persistence, payment processing
- **Considerations**: Will require migration from static to dynamic hosting

### Database Integration
- **Problem**: No storage for user data or bookings
- **Solution**: Implement database (PostgreSQL recommended) with proper schema design
- **Benefits**: Persistent user sessions, booking history, tour management
- **Architecture**: Consider using Drizzle ORM for type-safe database operations

### Authentication System
- **Problem**: Login page is non-functional
- **Solution**: Implement JWT-based authentication with secure session management
- **Benefits**: User accounts, personalized experiences, booking history
- **Security**: Password hashing, secure token storage, session management

### Payment Integration
- **Problem**: Payment forms are UI-only without processing
- **Solution**: Integrate with payment providers (Stripe recommended)
- **Benefits**: Real booking transactions, secure payment processing
- **Compliance**: PCI DSS compliance considerations for payment handling