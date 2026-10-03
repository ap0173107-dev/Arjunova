import { useEffect } from 'react'

// Sets a unique page title + meta description + canonical URL per route,
// and optionally injects JSON-LD structured data. Lightweight — no extra
// npm package needed, since we're not server-rendering anyway.
export default function Seo({ title, description, path, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Arjunova` : 'Arjunova — Learn. Innovate. Excel.'
    document.title = fullTitle

    setMeta('description', description)

    const canonicalUrl = `https://arjunova.com${path || ''}`
    setLink('canonical', canonicalUrl)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonicalUrl, 'property')

    let scriptTag
    if (jsonLd) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.text = JSON.stringify(jsonLd)
      document.head.appendChild(scriptTag)
    }

    return () => {
      if (scriptTag) document.head.removeChild(scriptTag)
    }
  }, [title, description, path, jsonLd])

  return null
}

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let tag = document.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setLink(rel, href) {
  let tag = document.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}