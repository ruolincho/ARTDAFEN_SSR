export default defineEventHandler((event) => {
    const reqUrl = getRequestURL(event)
    const path = reqUrl.pathname

    if (path.startsWith('/news/')) {
        const newPath = path.replace(/^\/news\//, '/magazine/')
        return sendRedirect(event, newPath + reqUrl.search, 301)
    }

    if (path === '/news') {
        return sendRedirect(event, '/magazine' + reqUrl.search, 301)
    }

    if (path.startsWith('/news-detail/')) {
        const newPath = path.replace(/^\/news-detail\//, '/magazine-detail/')
        return sendRedirect(event, newPath + reqUrl.search, 301)
    }

    if (path.startsWith('/blog/')) {
        const newPath = path.replace(/^\/blog\//, '/journal/')
        return sendRedirect(event, newPath + reqUrl.search, 301)
    }

    if (path === '/blog') {
        return sendRedirect(event, '/journal' + reqUrl.search, 301)
    }

    if (path.startsWith('/blog-detail/')) {
        const newPath = path.replace(/^\/blog-detail\//, '/journal-detail/')
        return sendRedirect(event, newPath + reqUrl.search, 301)
    }

    if (path === '/best' || path === '/product') {
        return sendRedirect(event, '/collections', 301)
    }

})