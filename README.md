---- RecipeFinder -----

RecipeFinder is a simple, responsive web application built with React using TheMealDB free API.

Live URL: `https://recipes.yasashrimedagedara.com`

Project overview

The main goal is to provide a clean, simple and user friendly way to discover recipes quickly.

Design focus:

- Simple navigation
- Clear recipe presentation
- Mobile-friendly browsing
- Easy recipe search
- Quick access to favorite recipes
- Warm and food-friendly visual styling

Why this design:

1. Visual style

The UI uses a warm cream background with green and orange accents to create a friendly, natural, and food-related feeling.
The cream background makes the interface feel softer than plain white, while the green primary color gives a fresh and healthy impression. 
Orange is used as an accent color because it works well for food-related calls to action and adds warmth to the design.


2. Layout

The layout uses a maximum container width of `1200px` to keep the content readable on large screens. 
On mobile screens, the content uses good side spacing so that the design does not feel crowded.

Reusable SCSS mixins used for:

- Consistent container width
- Section spacing
- Card styling
- Focus states

Design consistent across the application.

3. User Experience Choices

Search-first experience
Category browsing
Recipe cards
Favorites feature
Responsive design
Micro interactions

Features: 

- Home page with hero section
- Recipe search functionality
- Search results page
- Category wise browsing
- Recipe cards
- Recipe details page
- Favorites page
- Add/remove favorite recipes
- Favorites stored in local storage
- Pagination for recipe listings
- Responsive layout for desktop and mobile
- Reusable UI components
- Modular SCSS styling


Setup and Installation:


### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Folder

```bash
cd recipe-finder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open the Project in the Browser

After running the development server, Vite will provide a local URL similar to:

```bash
http://localhost:5173
```

Open this URL in your browser.

---

## Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

Future Improvements:

- Add advanced filters such as category, country, or ingredient
- Add loading skeletons for a smoother user experience
- Add user accounts for cloud-saved favorites
- Add recipe sharing functionality
- Improve accessibility with more ARIA labels and keyboard testing
- Improve visals and spacing further

Author:
Developed by Yasashri Medagedara.