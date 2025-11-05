# Dynamic Data Table Manager

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.15.15-0081CB?style=for-the-badge&logo=mui)](https://mui.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.3-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)

A powerful data table manager built with Next.js, Redux Toolkit, and Material UI. Features include sorting, filtering, import/export, inline editing, and dynamic column management with a modern, responsive UI.

## 🚀 Live Demo

[View Live Demo](https://dynamic-data-table-manager.vercel.app) (Deploy to see it in action!)

## 📸 Screenshots

### Light Mode
![Light Mode](https://via.placeholder.com/800x400/ffffff/000000?text=Light+Mode+Screenshot)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Dark+Mode+Screenshot)

## Features

### Core Features
- ✅ **Table View** with sorting, searching, and pagination
- ✅ **Dynamic Columns** - Add/remove columns with persistence
- ✅ **Import/Export CSV** with validation and error handling
- ✅ **Inline Editing** - Double-click to edit, batch save/cancel
- ✅ **Enhanced Theme Toggle** - Smooth light/dark mode transitions

### Bonus Features
- ✅ **Row Actions** - Edit and delete with confirmation dialogs
- ✅ **Responsive Design** - Fully responsive on all screen sizes
- ✅ **State Persistence** - Column preferences saved locally
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Floating Action Button** - Quick access to common actions
- ✅ **Animated Counters** - Smooth number transitions
- ✅ **Enhanced UI/UX** - Modern gradients, shadows, and animations
- ✅ **Loading States** - Skeleton loaders and smooth transitions
- ✅ **Custom Hooks** - Reusable theme management

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **Redux Toolkit** for state management
- **Material UI v5** for components
- **TypeScript** for type safety
- **Redux Persist** for state persistence
- **PapaParse** for CSV parsing
- **FileSaver.js** for CSV export

## Getting Started

### Quick Setup
```bash
npm run setup
npm run dev
```

### Manual Setup
1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Try the Features
- Import the included `sample-data.csv` file to see all features in action
- Toggle between light and dark themes
- Try inline editing by double-clicking cells
- Use the floating action button for quick access to features

## Usage

### Managing Data
- **Search**: Use the search bar to filter across all fields
- **Sort**: Click column headers to sort (toggle ASC/DESC)
- **Edit**: Double-click any cell to edit inline
- **Delete**: Use the delete button with confirmation

### Column Management
- Click "Manage Columns" to show/hide columns
- Add new dynamic columns (Department, Location, etc.)
- Column visibility is persisted across sessions

### Import/Export
- **Import**: Upload CSV files with validation
- **Export**: Download current table view as CSV
- Only visible columns are included in exports

### Theme
- Toggle between light and dark themes
- Preference is saved automatically

## CSV Format

When importing, ensure your CSV has these required columns:
- `name` (required)
- `email` (required, must be valid email)
- `age` (required, must be 0-150)
- `role` (required)

Additional columns will be added dynamically.

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Main page component
│   └── providers.tsx   # Redux and theme providers
├── components/          # React components
│   ├── DataTable.tsx   # Main table component
│   ├── TableControls.tsx # Search and action controls
│   ├── ManageColumnsModal.tsx # Column management
│   ├── ImportModal.tsx # CSV import functionality
│   ├── FloatingActions.tsx # Speed dial actions
│   └── ...
├── store/              # Redux store and slices
│   ├── index.ts        # Store configuration
│   └── tableSlice.ts   # Table state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   └── csvUtils.ts     # CSV parsing and export
├── hooks/              # Custom React hooks
└── sample-data.csv     # Sample data for testing
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (already done!)
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy with default settings

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `out` folder to Netlify

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Node.js.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Material-UI](https://mui.com/) for the beautiful component library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [PapaParse](https://www.papaparse.com/) for CSV parsing

## 📧 Contact

Mohish Padave - [@MohishPadave](https://github.com/MohishPadave)

Project Link: [https://github.com/MohishPadave/Dynamic-Data-Table-Manager](https://github.com/MohishPadave/Dynamic-Data-Table-Manager)

---

⭐ Star this repository if you found it helpful!