# Portfolio Website

A modern, world-class portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with dark mode support
- ⚡ Fast performance with Next.js 14
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive for all devices
- 🌙 Dark/Light theme toggle
- 🎯 SEO optimized
- ♿ Accessible design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Personal Information

1. **Contact Information**: Edit `components/sections/Contact.tsx` to update email, phone, and location.

2. **Social Links**: Update social media links in `components/Footer.tsx`.

3. **Projects**: Modify the `projects` array in `components/sections/Projects.tsx` with your actual projects.

4. **Experience**: Update the `experiences` array in `components/sections/Experience.tsx` with your work history.

5. **Skills**: Adjust skill levels and categories in `components/sections/Skills.tsx`.

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme. The primary color is currently set to blue.

### Contact Form

To enable the contact form, you'll need to:

1. Set up EmailJS or your own backend API
2. Update the form submission handler in `components/sections/Contact.tsx`

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This portfolio can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS** (using EC2, Amplify, or other services)
- Any platform that supports Next.js

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please reach out through the contact form on the website.
