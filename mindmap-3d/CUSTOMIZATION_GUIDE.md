# 🎨 BrainFix - Customization Guide

Adapt BrainFix to your specific troubleshooting domain, branding, and features.

## 🎯 Customization Overview

You can customize:
- **Branding** - Logo, colors, fonts
- **Content** - Knowledge base, issues, solutions
- **Features** - Search filters, modals, panels
- **UI** - Layout, themes, responsive behavior
- **Functionality** - Add features, integrate APIs

## 🏷️ Rebranding

### 1. Change Logo & Title

In `index.html`, find and replace:
```html
<!-- OLD -->
<div class="logo">🧠 BrainFix</div>
<title>BrainFix - Intelligent Troubleshooting Platform</title>

<!-- NEW -->
<div class="logo">🔧 MyTroubleshooter</div>
<title>MyTroubleshooter - Fast Solutions</title>
```

### 2. Change Colors

Edit `:root` variables in `<style>`:
```css
:root {
    --primary: #3b82f6;           /* Main brand color */
    --primary-dark: #1e40af;      /* Darker shade */
    --success: #10b981;           /* Success color */
    --warning: #f59e0b;           /* Warning color */
    --danger: #ef4444;            /* Error color */
    --bg: #0f172a;                /* Background */
    --bg-secondary: #1e293b;      /* Secondary background */
    --text: #f1f5f9;              /* Text color */
    --text-secondary: #cbd5e1;    /* Secondary text */
}
```

### 3. Change Fonts

Replace default font in `body`:
```css
body {
    font-family: 'Your Font', sans-serif;  /* Change this */
}
```

Popular choices:
```css
/* Modern */
font-family: 'Inter', -apple-system, sans-serif;

/* Professional */
font-family: 'Segoe UI', Roboto, sans-serif;

/* Creative */
font-family: 'Poppins', sans-serif;

/* Technical */
font-family: 'IBM Plex Mono', monospace;
```

## 📚 Customize Knowledge Base

### Change Domain Focus

The knowledge base in `brain-search.js` currently maps to neuroscience. Remap to your domain:

#### Example: IT Support

```javascript
'Linux System': {
    keywords: ['server', 'linux', 'system', 'kernel'],
    issues: [
        {
            title: 'SSH Connection Failed',
            symptoms: 'Cannot connect to server via SSH'
        },
        {
            title: 'Disk Space Issue',
            symptoms: 'Server running out of storage space'
        }
    ]
},
'Database': {
    keywords: ['database', 'sql', 'postgres', 'query'],
    issues: [
        {
            title: 'Query Timeout',
            symptoms: 'Database queries running too slow'
        },
        {
            title: 'Connection Pool Exhausted',
            symptoms: 'Cannot connect to database - too many connections'
        }
    ]
},
'Network': {
    keywords: ['network', 'internet', 'dns', 'firewall'],
    issues: [
        {
            title: 'DNS Resolution Failed',
            symptoms: 'Domain names not resolving'
        },
        {
            title: 'Packet Loss',
            symptoms: 'Network connections dropping frequently'
        }
    ]
}
```

#### Example: Health/Medical

```javascript
'Cardiovascular': {
    keywords: ['heart', 'chest', 'cardiac', 'blood', 'pressure'],
    issues: [
        {
            title: 'Elevated Blood Pressure',
            symptoms: 'Blood pressure readings consistently high'
        },
        {
            title: 'Irregular Heartbeat',
            symptoms: 'Heart rhythm feels off or fluttering'
        }
    ]
},
'Respiratory': {
    keywords: ['breathing', 'lungs', 'asthma', 'cough', 'wheeze'],
    issues: [
        {
            title: 'Shortness of Breath',
            symptoms: 'Difficulty breathing during normal activities'
        },
        {
            title: 'Chronic Cough',
            symptoms: 'Persistent cough lasting more than 3 weeks'
        }
    ]
}
```

#### Example: Business Operations

```javascript
'Human Resources': {
    keywords: ['employee', 'hr', 'recruitment', 'payroll', 'benefits'],
    issues: [
        {
            title: 'High Employee Turnover',
            symptoms: 'Staff leaving company more frequently than normal'
        },
        {
            title: 'Recruitment Challenges',
            symptoms: 'Difficulty finding and hiring qualified candidates'
        }
    ]
},
'Finance': {
    keywords: ['budget', 'cash', 'accounting', 'invoice', 'payment'],
    issues: [
        {
            title: 'Cash Flow Problem',
            symptoms: 'Not enough cash on hand for expenses'
        },
        {
            title: 'Invoice Payment Delays',
            symptoms: 'Clients paying invoices late or not at all'
        }
    ]
}
```

### Expand Knowledge Base

Add more regions and issues:

```javascript
initializeKnowledgeBase() {
    return {
        // ... existing entries ...
        
        'New Domain Area': {
            keywords: ['keyword1', 'keyword2', 'keyword3'],
            issues: [
                {
                    title: 'Problem Title',
                    symptoms: 'What this problem looks like'
                },
                {
                    title: 'Another Problem',
                    symptoms: 'Different symptoms'
                }
            ]
        }
    };
}
```

### Update Solutions Content

Edit `openSolution()` function to show custom solution steps:

```javascript
function openSolution(region, issueIndex) {
    const guides = brainSearch.knowledgeBase[region];
    if (!guides || !guides.issues[issueIndex]) return;

    const issue = guides.issues[issueIndex];
    document.getElementById('solutionTitle').textContent = issue.title;
    document.getElementById('solutionBody').innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <strong style="color: var(--primary);">Category:</strong> ${region}
        </div>
        <div style="margin-bottom: 1.5rem;">
            <strong style="color: var(--primary);">Problem:</strong><br>
            ${issue.symptoms}
        </div>
        <div>
            <strong style="color: var(--primary);">Solution Steps:</strong>
            <div class="solution-step">1. Your custom step 1</div>
            <div class="solution-step">2. Your custom step 2</div>
            <div class="solution-step">3. Your custom step 3</div>
        </div>
    `;

    document.getElementById('solutionModal').classList.add('active');
}
```

## 🔍 Customize Search

### Add Search Filters

```javascript
// Add category filter
<div style="margin-top: 1rem;">
    <select id="categoryFilter">
        <option value="">All Categories</option>
        <option value="critical">Critical Issues</option>
        <option value="common">Common Issues</option>
        <option value="enterprise">Enterprise Only</option>
    </select>
</div>

// Filter in search results
function searchBrain(query) {
    const category = document.getElementById('categoryFilter').value;
    // Filter by category...
}
```

### Add Advanced Search

```html
<div class="advanced-search" style="margin-top: 1rem; display: none;">
    <input type="text" placeholder="Exact phrase...">
    <input type="text" placeholder="Related topics...">
    <button>Search</button>
</div>

<script>
document.getElementById('advancedToggle').addEventListener('click', () => {
    const adv = document.querySelector('.advanced-search');
    adv.style.display = adv.style.display === 'none' ? 'block' : 'none';
});
</script>
```

## 🎨 Customize UI/UX

### Change Brain Size

```javascript
// In initializeBrain()
brainSearch = new BrainSearch('#heroBrain', {
    nodeSize: 5,              // Change this (1-20)
    nodeTextHeight: 3,        // Label size
    linkOpacity: 0.2,         // Connection visibility
    chargeStrength: -250,     // Node spacing
    linkDistance: 80          // Link length
});
```

### Customize Info Panel

Position and style in CSS:

```css
.info-panel {
    position: absolute;
    top: 20px;               /* Change position */
    right: 20px;
    width: 300px;            /* Change width */
    /* ... */
}
```

### Add Custom Panels/Modals

```html
<div class="modal" id="myCustomModal">
    <div class="modal-content">
        <h2>Custom Content</h2>
        <p>Your content here</p>
        <button onclick="closeCustomModal()">Close</button>
    </div>
</div>

<script>
function openCustomModal() {
    document.getElementById('myCustomModal').classList.add('active');
}

function closeCustomModal() {
    document.getElementById('myCustomModal').classList.remove('active');
}
</script>
```

## 🔧 Add Features

### Feature: User Preferences

```javascript
// Save user preferences
function savePreference(key, value) {
    localStorage.setItem('pref_' + key, JSON.stringify(value));
}

// Load preferences
function getPreference(key, defaultValue) {
    const saved = localStorage.getItem('pref_' + key);
    return saved ? JSON.parse(saved) : defaultValue;
}

// Use it
const theme = getPreference('theme', 'dark');
const language = getPreference('language', 'en');
```

### Feature: Search History

```javascript
// Track searches
function trackSearch(query) {
    let history = getPreference('searchHistory', []);
    history.unshift({ query, timestamp: Date.now() });
    history = history.slice(0, 20); // Keep last 20
    savePreference('searchHistory', history);
}

// Show search history
function showSearchHistory() {
    const history = getPreference('searchHistory', []);
    return history.map(item => item.query);
}
```

### Feature: Favorites

```javascript
// Mark as favorite
function toggleFavorite(nodeId) {
    let favorites = getPreference('favorites', []);
    if (favorites.includes(nodeId)) {
        favorites = favorites.filter(id => id !== nodeId);
    } else {
        favorites.push(nodeId);
    }
    savePreference('favorites', favorites);
}

// Show only favorites
function filterFavorites() {
    const favorites = getPreference('favorites', []);
    brainSearch.graph.nodeColor(node =>
        favorites.includes(node.id) ? '#f59e0b' : '#38bdf8'
    );
}
```

### Feature: Multi-Language Support

```javascript
// Language files
const translations = {
    en: {
        title: 'Intelligent Troubleshooting',
        search: 'Search solutions...',
        signin: 'Sign In'
    },
    es: {
        title: 'Solución Inteligente de Problemas',
        search: 'Buscar soluciones...',
        signin: 'Iniciar Sesión'
    }
};

// Use language
function t(key) {
    const lang = getPreference('language', 'en');
    return translations[lang][key];
}

// Update UI
document.getElementById('title').textContent = t('title');
```

## 🔌 API Integration

### Connect to Backend

```javascript
// Save search to server
async function trackSearchServer(query) {
    await fetch('/api/searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, timestamp: Date.now() })
    });
}

// Fetch knowledge base from server
async function loadKnowledgeBaseFromServer() {
    const response = await fetch('/api/knowledge-base');
    const kb = await response.json();
    brainSearch.knowledgeBase = kb;
}

// Report solution effectiveness
async function rateSolution(issueId, rating) {
    await fetch('/api/solutions/' + issueId + '/rate', {
        method: 'POST',
        body: JSON.stringify({ rating })
    });
}
```

## 📱 Mobile Customization

### Responsive Layout

```css
@media (max-width: 768px) {
    .hero {
        grid-template-columns: 1fr;  /* Stack on mobile */
    }

    .brain-hero {
        display: none;                /* Hide brain on mobile */
    }

    .features-grid {
        grid-template-columns: 1fr;   /* Single column */
    }

    .search-box {
        margin-bottom: 1rem;
    }
}
```

### Mobile-Optimized Brain

```javascript
// Detect mobile
const isMobile = window.innerWidth < 768;

// Adjust for mobile
brainSearch = new BrainSearch('#heroBrain', {
    nodeSize: isMobile ? 3 : 5,
    chargeStrength: isMobile ? -150 : -250,
    velocityDecay: isMobile ? 0.7 : 0.5
});
```

## 🎯 Domain Examples

### Template: Customer Support

Replace brain regions with support categories:
```
- Billing → Common billing questions
- Technical → Technical issues
- Account → Account management
- Shipping → Shipping info
```

### Template: HR Issues

```
- Recruitment
- Onboarding
- Payroll
- Benefits
- Compliance
```

### Template: IT Troubleshooting

```
- Network
- Servers
- Databases
- Security
- Applications
```

### Template: Medical

```
- Symptoms
- Conditions
- Treatments
- Prevention
- Wellness
```

## 🚀 Deployment Customization

### Environment Variables

Create `.env.local`:
```
VITE_API_URL=https://api.example.com
VITE_BRAND_NAME=MyApp
VITE_PRIMARY_COLOR=#3b82f6
```

Load in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const brandName = import.meta.env.VITE_BRAND_NAME;
```

### Different Themes Per Domain

```javascript
const themes = {
    healthcare: { primary: '#10b981', bg: '#f0fdf4' },
    finance: { primary: '#3b82f6', bg: '#eff6ff' },
    tech: { primary: '#8b5cf6', bg: '#faf5ff' }
};

const domain = getDomain();
const theme = themes[domain];

document.documentElement.style.setProperty('--primary', theme.primary);
```

## ✅ Customization Checklist

- [ ] Changed logo and branding
- [ ] Updated color theme
- [ ] Customized knowledge base for your domain
- [ ] Added solution steps relevant to your field
- [ ] Tested search functionality
- [ ] Updated feature descriptions
- [ ] Customized FAQ/help sections
- [ ] Set up analytics tracking
- [ ] Tested on mobile devices
- [ ] Deployed to your hosting

---

**You can customize BrainFix for any domain.** Change the knowledge base and it works for IT support, healthcare, business consulting, customer success, or any troubleshooting need! 🚀
