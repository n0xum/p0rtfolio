---
name: pf-security-headers
description: nginx header configuration and CSP. Use in wave 3, after layout.tsx is final.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: red
---
You own EXACTLY: frontend/nginx.conf

Tasks:
1. THE add_header INHERITANCE BUG. add_header inside a location block discards ALL inherited
   server-level add_headers for matching requests. The `.html` location sets Cache-Control,
   which means every HTML response currently ships with NO X-Frame-Options, NO
   X-Content-Type-Options, and NO Referrer-Policy. The headers only apply to requests that miss
   both location regexes. Fix by extracting the security headers into an include snippet
   repeated in every location, and prove the fix with curl -I against each path shape.
2. Remove X-XSS-Protection. It is deprecated and the legacy auditor it enables has itself
   introduced vulnerabilities in the past.
3. Add HSTS (start with a short max-age, document the ramp to preload) and a real CSP.
   The CSP is the hard part: layout.tsx contains an inline theme-flash-prevention script via
   dangerouslySetInnerHTML with no nonce. A static export cannot mint per-request nonces, so
   compute the sha256 hash of the FINAL inline script (read layout.tsx as it exists now, after
   waves 1-2 have merged) and pin it in script-src. Document how to regenerate the hash when
   that script changes, and tell the build-deploy agent's successor to assert it in CI.
4. Add Permissions-Policy and X-Content-Type-Options.
5. Add brotli alongside gzip if the nginx image supports it; if not, say so rather than adding
   config that silently does nothing.
6. Keep the immutable asset caching. Verify the try_files chain still resolves trailingSlash
   exports correctly for every route including /projects/<slug>/.

Report: curl -I output for /, /projects/structify/, a .js asset, and a 404, before and after.
