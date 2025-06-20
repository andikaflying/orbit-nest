# KumiChem™ - AI-Powered Drug Discovery Platform

A modern, responsive React TypeScript application for chemical and drug discovery workflows, featuring AI-assisted analysis and target visualization.

![KumiChem Application](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-blue)

## 🚀 Features

### 🏠 Projects Dashboard

- **Project Management**: View and manage your drug discovery projects
- **Smart Categorization**: Projects organized by tags (Data preparation, Preprocessing, Data)
- **Interactive Cards**: Click any project to view detailed workflow
- **Modern UI**: Clean, scientific interface with hover effects and animations

### 🔬 Workflow Visualization

- **Target Selection**: Choose and analyze protein targets
- **Druggability Analysis**: Comprehensive scoring and key factors
- **Known Modulators**: Interactive data table with compound information
- **Protein Visualization**: 3D structure representation
- **Real-time Updates**: Live data synchronization

### 🤖 AI Assistant

- **Collapsible Sidebar**: Toggle-able AI assistant panel
- **Sample Queries**: Pre-built scientific questions
- **Smart Chat**: Context-aware responses for drug discovery
- **Query Suggestions**: Common scientific workflows

### 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Layout**: Seamless desktop to mobile experience
- **Touch-Friendly**: Mobile-optimized interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router 6
- **Icons**: Lucide React
- **UI Components**: Custom component library with Radix UI primitives
- **Build Tool**: Vite
- **Testing**: Vitest

## 🎨 Design System

### Colors

- **Primary Blues**: `#699BF7`, `#4A7AF1`, `#C7D1F8`
- **Neutrals**: `#F2F2F5`, `#F8F8FA`, `#CDCFD2`, `#808DAD`, `#5E6983`
- **Status Colors**:
  - Yellow: `#E8BF1A` (Data preparation)
  - Green: `#5FC680` (Data)
  - Orange: `#E6962E` (Preprocessing)

### Typography

- **Headers**: Konkhmer Sleokchher (Scientific branding)
- **Body Text**: Red Hat Display (Clean, readable)
- **UI Elements**: Poppins (Modern interface)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kumichem-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to see the application

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── Header.tsx          # Main navigation header
│   ├── ProjectCard.tsx     # Project display cards
│   ├── AIAssistant.tsx     # AI chat sidebar
│   └── ProjectContextMenu.tsx # Right-click menus
├── pages/
│   ├── ProjectsDashboard.tsx   # Main projects view
│   ├── WorkflowVisualization.tsx # Target analysis view
│   └── NotFound.tsx            # 404 page
├── lib/
│   └── utils.ts            # Utility functions
└── hooks/                  # Custom React hooks
```

## 🧭 Navigation

### Main Routes

- `/` - Projects Dashboard (default)
- `/projects` - Projects Dashboard (alias)
- `/workflow` - Workflow Visualization & Target Selection

### Interactive Elements

- **Logo**: Returns to projects dashboard
- **Home Button**: Navigate to projects dashboard
- **Workflow Community**: Opens workflow visualization
- **Project Cards**: Click to view detailed workflow
- **Create New Project**: Start new workflow
- **AI Assistant Toggle**: Show/hide AI sidebar

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run test suite
- `npm run format.fix` - Format code with Prettier

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React + TypeScript
- **Prettier**: Automatic code formatting
- **Tailwind**: Utility-first CSS

## 🎯 Key Components

### ProjectCard

- Interactive project tiles with hover effects
- Context menu for rename/duplicate/delete
- Tag-based categorization with color coding
- Click navigation to workflow view

### AIAssistant

- Collapsible sidebar design
- Sample query suggestions
- Real-time chat interface
- Scientific workflow integration

### WorkflowVisualization

- Target protein selection
- Druggability scoring
- Known modulators data table
- Interactive protein visualization

## 🚀 Deployment

The application is built with Vite and can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your git repository
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload build files to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Verify Node.js version is 18+
4. Try clearing browser cache
5. Restart the development server

---

**KumiChem™** - Advancing drug discovery through AI-powered molecular analysis and visualization.
