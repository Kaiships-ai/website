<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Public repo

This repo is public. Never commit paid download links, Polar benefit notes, API keys or webhook secrets. Paid download URLs live in Vercel env (`SCHOOL_DOWNLOAD_URL`, `LIBRARY_DOWNLOAD_URL`); before pushing, `git diff main | grep -E "blob.vercel-storage.com/dl/|whsec_[A-Za-z0-9]|drive.google.com/uc"` must print nothing.
