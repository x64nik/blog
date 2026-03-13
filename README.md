# 🚀 rushidarunte.com - Personal Tech Blog

<div align="center">

[![Hugo](https://img.shields.io/badge/Hugo-0.157.0-blue?logo=hugo)](https://gohugo.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![Dark Mode](https://img.shields.io/badge/Dark_Mode-Enabled-dark)]()
[![Ritzy Theme](https://img.shields.io/badge/Theme-Ritzy-orange)](https://github.com/jpanchen/hugo-ritzy-theme)

**Personal blog documenting homelab infrastructure, Kubernetes deployments, and DevOps practices**

</div>

---

## 📝 About

Welcome to my personal tech blog where I share knowledge about homelabbing, infrastructure automation, GitOps workflows, and cloud-native technologies. This site is built with Hugo and serves as both a learning journal and resource for others exploring similar technologies.

---

## 🔗 Quick Links

### Featured Posts
| Title | Description | Tags |
|-------|-------------|------|
| [How to start your own homelab](/posts/homelab-basics/) | Getting started with Proxmox and ZFS storage | `homelab` `proxmox` `beginner` |
| [Homelab Infrastructure Overview](/posts/homelab-overview/) | Deep dive into my Dell R720XD setup and K3s cluster | `homelab` `kubernetes` `infrastructure` |
| [ArgoCD Preview Deployments](/posts/argocd-pr-deployments/) | GitOps-based preview environments on EKS | `gitops` `argocd` `kubernetes` `github-actions` |

### Pages
- [About](/about/) - Learn more about me and this blog
- [Contact](/contact/) - Get in touch via GitHub, LinkedIn, or email

---

## 🏗️ Technology Stack

### Infrastructure
| Component | Details |
|-----------|---------|
| **Hypervisor** | Proxmox VE 8.2 with ZFS RAID1 |
| **Server Hardware** | Dell PowerEdge R720XD (Dual Xeon E5-26xx, 128GB RAM) |
| **Container Orchestrator** | K3s HA Cluster (6 nodes) |
| **Networking** | Traefik + Cloudflare Tunnels |

### Development & Operations
| Category | Tools |
|----------|-------|
| **GitOps** | ArgoCD, GitHub Actions |
| **Monitoring** | Prometheus, Grafana, Loki, Dozzle |
| **Databases** | PostgreSQL, MongoDB, Redis, InfluxDB |
| **Infrastructure as Code** | Terraform, Ansible (planned) |

### Blog Platform
| Component | Value |
|-----------|-------|
| **Static Site Generator** | Hugo v0.157.0 |
| **Theme** | Ritzy (modified with dark mode customization) |
| **Styling** | GitHub-style colors (#0d1117 background, #c9d1d9 text) |
| **Font** | Consolas throughout |

---

## 📁 Site Structure

```
blog/
├── content/                    # Site content
│   ├── posts/                  # Blog posts (Hugo content files)
│   │   ├── homelab-basics.md
│   │   ├── homelab-overview.md
│   │   └── argocd-pr-deployments.md
│   ├── _about.md              # About page content
│   └── _contact.md            # Contact page content
├── static/                    # Static assets
│   └── images/                # Blog post images
├── themes/                    # Hugo themes
│   └── ritzy/                 # Modified Ritzy theme
├── layouts/                   # Custom layout templates
├── hugo.toml                  # Site configuration
└── README.md                  # This file
```

---

## 🛠️ Development Setup

### Prerequisites
- Hugo v0.157.0 or higher
- Git (for theme management)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/rushi-darunte/blog.git
cd blog

# Checkout submodules (themes)
git submodule update --init --recursive

# Run Hugo development server
hugo server -D

# Build static site
hugo --minify
```

### Access Locally
- Development: `http://localhost:1313`
- Built site: Open `public/index.html` in browser

---

## ✍️ Adding New Posts

### Creating a Blog Post

1. **Create front matter** in `content/posts/`:
```yaml
---
title: "Your Post Title"
date: 2026-03-13T00:00:00+05:30
draft: false
featured: true
description: "Post description for SEO and social sharing"
tags: ["tag1", "tag2"]
---
```

2. **Write content** in Markdown format below the front matter

3. **Add images** to `static/images/` (if needed)

4. **Preview locally**:
```bash
hugo server -D --renderMemoryMaps
```

5. **Commit and push** to deploy

### Content Guidelines
- Use descriptive titles with clear value proposition
- Write SEO-friendly descriptions (150-160 characters)
- Include code blocks with proper syntax highlighting
- Add relevant tags for categorization
- Mark `featured: true` for posts on homepage

---

## 🎨 Customizations

### Theme Modifications
The Ritzy theme has been customized with:
- GitHub-inspired dark color scheme
- Consolas monospace font family
- Enhanced code block styling
- Custom SEO meta tags (Open Graph, Twitter Cards)

### Configuration (`hugo.toml`)
```toml
baseURL = "https://rushidarunte.com"
languageCode = "en-us"
title = "Rushi Darunte's Blog"
theme = "ritzy"

# Social links configured in [params.social]
# SEO settings in [params.seo]
# Dark mode enabled by default
```

### Adding Custom CSS/JS
Place custom styles in `static/css/` and layouts in `layouts/partials/custom/`

---

## 📊 Site Statistics

| Metric | Value |
|--------|-------|
| **Total Posts** | 3 |
| **Featured Posts** | 2 |
| **Primary Tags** | homelab, kubernetes, gitops, devops |
| **Last Updated** | March 2026 |

---
<div align="center">

**Built with ❤️ using Hugo & Ritzy Theme**

*Last updated: March 13, 2026*

</div>