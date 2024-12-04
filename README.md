# Grow with Lin - Personal Blog

A modern, responsive blog built with Next.js 13+, featuring server components, markdown content, and a beautiful dark theme.

## Features

- 🚀 Built with Next.js 13+ App Router
- 📝 Markdown-based blog posts
- 🔍 Real-time search functionality
- 🏷️ Tag-based filtering
- 🌙 Dark theme with modern UI
- ⚡ Server-side rendering
- 📱 Fully responsive design
- ⏱️ Reading time estimates
- 🎯 SEO optimized

## Tech Stack

- **Framework:** Next.js 13+
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with modern design
- **Content:** Markdown with gray-matter
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-website.git
   cd blog-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
blog-website/
├── content/          # Blog posts in markdown format
│   └── posts/
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # React components
│   └── lib/         # Utility functions
├── public/          # Static assets
└── ...config files
```

## Adding Blog Posts

1. Create a new markdown file in `content/posts/`
2. Add frontmatter with title, description, date, author, and tags
3. Write your content in markdown
4. The post will automatically appear in the blog

Example frontmatter:
```markdown
---
title: "Your Post Title"
description: "Brief description of your post"
date: "2023-12-03"
author: "Your Name"
tags: ["tag1", "tag2"]
---
```

## Features in Detail

- **Search:** Real-time search across all blog posts
- **Tag Filtering:** Filter posts by tags with URL persistence
- **Reading Time:** Automatic calculation based on content length
- **Responsive Design:** Optimized for all screen sizes
- **SEO:** Metadata optimization for better search engine visibility

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js
- Styled with Tailwind CSS
- Icons from Lucide React
