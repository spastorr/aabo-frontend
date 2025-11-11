# Landing Page Setup Guide

## Overview
Your project now includes a beautiful, animated landing page (`landing.html`) in addition to your React application.

## File Structure
- `landing.html` - Static landing page with animations and bilingual support (ES/EN)
- `index.html` - Entry point for your React application
- `vite.config.js` - Updated to support multiple entry points

## Development

### Running the Development Server
```bash
npm run dev
```

### Accessing Pages
- **Landing Page**: `http://localhost:5173/landing.html`
- **React App**: `http://localhost:5173/` or `http://localhost:5173/index.html`

## Production Build

### Building for Production
```bash
npm run build
```

This will generate both pages in the `dist` folder:
- `dist/landing.html` - Landing page
- `dist/index.html` - React app

### Deployment
When deploying, configure your web server to:
1. Serve `landing.html` as the entry point for marketing/public visitors
2. Serve `index.html` for the main application

## Landing Page Features

### 🎨 Design
- **Modern Industrial Theme**: Dark blue/slate color palette perfect for engineering projects
- **Animated Background**: SVG-based data flow animations
- **Floating Particles**: Subtle visual effects
- **Smooth Scrolling**: Seamless navigation between sections

### 🌍 Bilingual Support
- **Spanish** (Default)
- **English**
- Language preference is saved in localStorage
- Easy to extend with more languages

### 📱 Fully Responsive
- Desktop-optimized layouts
- Tablet-friendly
- Mobile-responsive with adjusted animations

### 🔗 Navigation
All "Acceder a la Plataforma" (Access Platform) buttons link to `/` which loads your React application.

## Customization

### Updating Links
To change where the platform access buttons point:
1. Open `landing.html`
2. Find all `<a href="/">` elements with the text "Acceder a la Plataforma"
3. Update the `href` attribute to your desired route

### Adding More Languages
1. In `landing.html`, find the `translations` object in the `<script>` section
2. Add a new language object following the same structure
3. Add the language option buttons in both desktop and mobile menus

### Modifying Colors
Update the CSS variables in the `:root` section:
```css
:root {
    --bg-dark: #0D1B2A;      /* Deep navy blue */
    --bg-medium: #1B263B;    /* Dark slate blue */
    --text-light: #E0E1DD;   /* Soft bone white */
    --text-medium: #A9B4C2;  /* Light slate gray */
    --accent-cyan: #48CAE4;  /* Vibrant cyan for KPIs */
    --accent-amber: #FF9F1C; /* Amber for alerts */
}
```

## Sections

1. **Hero Section** - Main introduction with CTA buttons
2. **Features** - 6 key platform features with icons
3. **Solution** - Detailed explanation with animated dashboard mockup
4. **Security** - On-premise deployment advantages
5. **Benefits** - ROI and business value
6. **Contact** - Contact form for demo requests

## Integration with React App

The landing page is a standalone HTML file and doesn't require React. When users click "Acceder a la Plataforma", they're redirected to your React application at `/`.

### Recommended Flow
```
Public Visitor → landing.html → (Click CTA) → index.html (React App) → Login → Dashboard
```

## Notes

- The landing page uses Tailwind CSS via CDN for styling
- Google Fonts (Inter) is loaded for typography
- All animations are CSS-based (no JavaScript animation libraries)
- The form in the contact section is currently non-functional (add backend integration as needed)

## Future Enhancements

Consider adding:
- Analytics tracking (Google Analytics, Mixpanel, etc.)
- Form submission handling (contact form backend)
- A/B testing capabilities
- SEO meta tags and Open Graph tags
- Video or demo embedding
- Customer testimonials section
- Pricing section

