# Wedding Thank You Website

An elegant, natural-themed website to thank wedding guests and share memories.

## Features

- Section-based layout with snap scrolling
- Botanical elements with animations
- Photo display with path-based layout
- Thank you message with elegant styling
- Responsive design for all devices

## Getting Started

1. Clone this repository
2. Install dependencies

```bash
cd wedding-thank-you
npm install
```

3. Add your images:
   - Add your actual wedding photos to the `public/images` directory
   - Add a subtle grain texture named `texture-grain.png` to the `public/images` directory

4. Customize:
   - Update the names and wedding date in `ThankYouSection.tsx`
   - Update the thank you message in `MessageSection.tsx`
   - Update the welcome text in `WelcomeSection.tsx`

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

When you're ready to deploy the site to your NUC:

1. Build the project:

```bash
npm run build
```

2. Use Cloudflare tunneling to expose the site (instructions to be provided separately).

## Customization Options

The site is designed with the "Elegant Natural" aesthetic, featuring:
- Off-white/cream background with pastel accents
- Stylized typography combining serif headings with sans-serif body text
- Subtle grain texture for warmth
- Botanical/plant elements as visual highlights

You can easily modify the color palette by editing the CSS variables in `globals.css`.