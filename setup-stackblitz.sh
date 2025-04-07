
#!/bin/bash

# Create project structure
mkdir -p src/components/ui
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/pages
mkdir -p src/utils

# Install core dependencies
npm install react-router-dom @tanstack/react-query lucide-react shadcn/ui tailwindcss-animate class-variance-authority clsx

# Configure Tailwind
npx tailwindcss init -p

# Optional: Copy configuration files
# Assumes you have these files ready to copy
cp ../your-project/vite.config.ts vite.config.ts
cp ../your-project/tailwind.config.ts tailwind.config.ts
cp ../your-project/tsconfig.json tsconfig.json

echo "StackBlitz setup complete!"
