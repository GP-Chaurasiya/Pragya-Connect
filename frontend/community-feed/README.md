# Pragya Connect - Community Feed

A production-quality community feed component built with React, TypeScript, Tailwind CSS, Lucide React, and Framer Motion. Inspired by LinkedIn's design with Pragya Connect's green theme (#2E7D32).

## Features

- **Create Post Section**
  - Text input with placeholder
  - Image upload with preview
  - Emoji picker with common emojis
  - Remove image functionality

- **News Feed**
  - Realistic mock posts with avatars, names, roles, and timestamps
  - Optional post images
  - Like/unlike with animated heart icon
  - Comment count and expandable comments
  - Share counter

- **Post Cards**
  - User avatar, name, role, and timestamp
  - Post content with text and optional image
  - Three-dot menu with options (save, hide, report)
  - Like button with animation and count
  - Comment button with expandable section
  - Share button with counter

- **Comment System**
  - Add new comments
  - Edit existing comments
  - Delete comments
  - Like/unlike comments
  - Expandable comment sections

- **Loading States**
  - Skeleton loaders for posts and create post section
  - Smooth loading animations

- **Empty & Error States**
  - Empty state when no posts exist
  - Error state with retry functionality
  - Custom icons and messaging

- **Animations**
  - Framer Motion animations throughout
  - Smooth transitions on hover and tap
  - Staggered post animations
  - Heart animation on like

- **Responsive Design**
  - Mobile-first approach
  - Responsive layouts for all screen sizes
  - Touch-friendly interactions

- **Accessibility**
  - ARIA labels on interactive elements
  - Keyboard navigation support
  - Semantic HTML structure

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with Pragya Connect green theme
- **Lucide React** - Icon library
- **Framer Motion** - Animations
- **Vite** - Build tool

## Installation

1. Navigate to the community-feed directory:
```bash
cd community-feed
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
community-feed/
├── src/
│   ├── components/
│   │   ├── feed/
│   │   │   ├── CreatePost.tsx      # Create post component
│   │   │   ├── PostCard.tsx        # Individual post card
│   │   │   └── CommunityFeed.tsx   # Main feed component
│   │   └── ui/
│   │       ├── Skeleton.tsx        # Loading skeletons
│   │       └── EmptyState.tsx     # Empty & error states
│   ├── data/
│   │   └── mockData.ts            # Mock posts and users
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
└── postcss.config.js              # PostCSS configuration
```

## Customization

### Theme Colors

The Pragya Connect green theme is configured in `tailwind.config.js`. To customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#e8f5e9',
        // ... more shades
        800: '#2e7d32', // Main brand color
        // ...
      },
    },
  },
}
```

### Mock Data

Edit `src/data/mockData.ts` to customize the sample posts and user data.

### Component Props

All components accept props for customization. See individual component files for available props.

## Usage

### Basic Usage

```tsx
import { CommunityFeed } from './components/feed/CommunityFeed';

function App() {
  return <CommunityFeed />;
}
```

### With Custom Props

```tsx
<CommunityFeed className="max-w-3xl mx-auto" />
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized with React 18 features
- Lazy loading support ready
- Code splitting ready
- Production build optimized with Vite

## Future Enhancements

- Backend API integration
- Real-time updates with WebSockets
- Image upload to cloud storage
- User authentication
- Post filtering and sorting
- Search functionality
- Notifications
- Direct messaging

## License

This project is part of Pragya Connect.

## Support

For issues or questions, please contact the development team.
