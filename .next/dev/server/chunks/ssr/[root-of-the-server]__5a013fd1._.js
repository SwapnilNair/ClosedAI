module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/app/blog/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "getBlogPosts",
    ()=>getBlogPosts
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
function parseFrontmatter(fileContent) {
    let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    let match = frontmatterRegex.exec(fileContent);
    let frontMatterBlock = match[1];
    let content = fileContent.replace(frontmatterRegex, '').trim();
    let frontMatterLines = frontMatterBlock.trim().split('\n');
    let metadata = {};
    frontMatterLines.forEach((line)=>{
        let [key, ...valueArr] = line.split(': ');
        let value = valueArr.join(': ').trim();
        value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
        metadata[key.trim()] = value;
    });
    return {
        metadata: metadata,
        content
    };
}
function getMDXFiles(dir) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(dir).filter((file)=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(file) === '.mdx');
}
function readMDXFile(filePath) {
    let rawContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
    return parseFrontmatter(rawContent);
}
function getMDXData(dir) {
    let mdxFiles = getMDXFiles(dir);
    return mdxFiles.map((file)=>{
        let { metadata, content } = readMDXFile(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, file));
        let slug = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(file, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(file));
        return {
            metadata,
            slug,
            content
        };
    });
}
function getBlogPosts() {
    return getMDXData(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'app', 'blog', 'posts'));
}
function formatDate(date, includeRelative = false) {
    let currentDate = new Date();
    if (!date.includes('T')) {
        date = `${date}T00:00:00`;
    }
    let targetDate = new Date(date);
    let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    let daysAgo = currentDate.getDate() - targetDate.getDate();
    let formattedDate = '';
    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`;
    } else {
        formattedDate = 'Today';
    }
    let fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    if (!includeRelative) {
        return fullDate;
    }
    return `${fullDate} (${formattedDate})`;
}
}),
"[project]/app/sitemap.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseUrl",
    ()=>baseUrl,
    "default",
    ()=>sitemap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$blog$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/blog/utils.ts [app-rsc] (ecmascript)");
;
const baseUrl = 'https://portfolio-blog-starter.vercel.app';
async function sitemap() {
    let blogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$blog$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBlogPosts"])().map((post)=>({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.metadata.publishedAt
        }));
    let routes = [
        '',
        '/blog'
    ].map((route)=>({
            url: `${baseUrl}${route}`,
            lastModified: new Date().toISOString().split('T')[0]
        }));
    return [
        ...routes,
        ...blogs
    ];
}
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$sans$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/sans.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GeistSans$3e$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistsans_d5a4f12f.js [app-rsc] (ecmascript) <export default as GeistSans>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$mono$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/mono.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GeistMono$3e$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistmono_157ca88a.js [app-rsc] (ecmascript) <export default as GeistMono>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vercel/analytics/dist/react/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$speed$2d$insights$2f$dist$2f$next$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$sitemap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/sitemap.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const metadata = {
    metadataBase: new URL(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$sitemap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseUrl"]),
    title: {
        default: 'Swapnil | Software Engineer',
        template: '%s | Swapnil'
    },
    description: 'Software engineer passionate about building innovative web applications.',
    openGraph: {
        title: 'Swapnil | Software Engineer',
        description: 'Software engineer passionate about building innovative web applications.',
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$sitemap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseUrl"],
        siteName: 'Swapnil Portfolio',
        locale: 'en_US',
        type: 'website'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    }
};
const cx = (...classes)=>classes.filter(Boolean).join(' ');
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        className: cx(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GeistSans$3e$__["GeistSans"].variable, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__GeistMono$3e$__["GeistMono"].variable),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: "antialiased",
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Analytics"], {}, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$speed$2d$insights$2f$dist$2f$next$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SpeedInsights"], {}, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/layout.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/geist/dist/geistsans_d5a4f12f.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geistsans_d5a4f12f-module__Ur3q_a__className",
  "variable": "geistsans_d5a4f12f-module__Ur3q_a__variable",
});
}),
"[project]/node_modules/geist/dist/geistsans_d5a4f12f.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistsans_d5a4f12f.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'GeistSans', 'GeistSans Fallback'"
    }
};
if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/node_modules/geist/dist/sans.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistsans_d5a4f12f.js [app-rsc] (ecmascript)");
;
;
}),
"[project]/node_modules/geist/dist/geistsans_d5a4f12f.js [app-rsc] (ecmascript) <export default as GeistSans>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeistSans",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistsans_d5a4f12f$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistsans_d5a4f12f.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/geist/dist/geistmono_157ca88a.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geistmono_157ca88a-module__iaM1Ya__className",
  "variable": "geistmono_157ca88a-module__iaM1Ya__variable",
});
}),
"[project]/node_modules/geist/dist/geistmono_157ca88a.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistmono_157ca88a.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'GeistMono', ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace"
    }
};
if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/node_modules/geist/dist/mono.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistmono_157ca88a.js [app-rsc] (ecmascript)");
;
;
}),
"[project]/node_modules/geist/dist/geistmono_157ca88a.js [app-rsc] (ecmascript) <export default as GeistMono>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeistMono",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistmono_157ca88a$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistmono_157ca88a.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/@vercel/analytics/dist/react/index.mjs [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Analytics",
    ()=>Analytics,
    "track",
    ()=>track
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Analytics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Analytics() from the server but Analytics is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@vercel/analytics/dist/react/index.mjs <module evaluation>", "Analytics");
const track = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call track() from the server but track is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@vercel/analytics/dist/react/index.mjs <module evaluation>", "track");
}),
"[project]/node_modules/@vercel/analytics/dist/react/index.mjs [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Analytics",
    ()=>Analytics,
    "track",
    ()=>track
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Analytics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Analytics() from the server but Analytics is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@vercel/analytics/dist/react/index.mjs", "Analytics");
const track = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call track() from the server but track is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@vercel/analytics/dist/react/index.mjs", "track");
}),
"[project]/node_modules/@vercel/analytics/dist/react/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@vercel/analytics/dist/react/index.mjs [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/@vercel/analytics/dist/react/index.mjs [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$analytics$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SpeedInsights",
    ()=>SpeedInsights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SpeedInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SpeedInsights() from the server but SpeedInsights is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs <module evaluation>", "SpeedInsights");
}),
"[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SpeedInsights",
    ()=>SpeedInsights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SpeedInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SpeedInsights() from the server but SpeedInsights is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs", "SpeedInsights");
}),
"[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$speed$2d$insights$2f$dist$2f$next$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$speed$2d$insights$2f$dist$2f$next$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/node_modules/@vercel/speed-insights/dist/next/index.mjs [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$speed$2d$insights$2f$dist$2f$next$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a013fd1._.js.map