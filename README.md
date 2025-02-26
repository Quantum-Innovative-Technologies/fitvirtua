# FitVirtua - Virtual Try-On Fashion Platform

FitVirtua is a modern e-commerce platform that combines traditional online shopping with innovative virtual try-on technology, allowing customers to visualize how clothing items will look on them before making a purchase.

## 🚀 Features

- **Virtual Try-On**: Advanced AR technology for trying clothes virtually
- **Smart Product Catalog**: Organized collection of fashion items with detailed descriptions
- **Dark/Light Mode**: Full theme support for comfortable viewing
- **Responsive Design**: Optimized for all device sizes
- **Newsletter Integration**: Keep customers updated with latest collections
- **Real-time Preview**: Instant visualization of clothing items
- **Interactive UI**: Modern and user-friendly interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Theme Management**: next-themes
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Type Safety**: TypeScript

## 📦 Project Structure

```
fitvirtua/
├── app/                # Next.js app directory
├── components/         # Reusable UI components
│   ├── virtual/       # Virtual try-on components
│   └── ui/            # Common UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── public/            # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fitvirtua.git
   ```

2. **Install dependencies**
   ```bash
   cd fitvirtua
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Components

- **Hero Section**: Landing page showcase
- **Products Section**: Display available products with filtering
- **Collections Section**: Featured collections display
- **Newsletter Section**: Email subscription component
- **Virtual Try-On**: AR-based clothing visualization
- **Preview Section**: Real-time clothing preview

## 🌙 Theme Support

The application supports both light and dark modes. The theme system is built using `next-themes` and can be toggled via the theme switcher in the navigation bar.

## 🔧 Configuration

- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - UI components configuration

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (320px to 767px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
