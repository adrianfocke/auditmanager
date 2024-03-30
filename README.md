# Auditmanager

A NextJS application that aims to automatically fill template files. Imagine opening a .DOCX file with a pre-defined template that is able to fill all it's fields automatically, from entities stored in a DB/external service. No need to copy+paste stuff into the file, it's all done magically, thanks to this application. 

For more info, check the detailed section.

## Get Started

Inside the project folder open a terminal and execute the following code to install it's dependencies and run the dev server:

```
npm install
npm run dev
```

Prepare the project for a deployment (with Vercel). Just add some environment variables:

```
NEXT_PUBLIC_TINA_URL=http://localhost:4001/graphql (or in production the tinacms url)
NEXT_PUBLIC_TINA_TOKEN=<your value here>
NEXT_PUBLIC_TINA_CLIENT_ID=<your value here>

NEXT_PUBLIC_SUPABASE_URL=<your value here>
NEXT_PUBLIC_SUPABASE_KEY=<your value here>
```

More info here: [Going to Production with Tina Cloud](https://tina.io/docs/tina-cloud/overview/) and [Supabase Storage Quickstart](https://supabase.com/docs/guides/storage/quickstart)

## Used Libraries

Please consider a donation! Besides NextJS, this project leverages the following open source libraries:

- [tinacms](https://github.com/tinacms/tinacms): Visual editing and database
- [docxjs](https://github.com/dolanmiu/docx) Patching .docx files
- [mammoth](https://github.com/mwilliamson/mammoth.js): Converting .docx files to html
- [t3env](https://github.com/t3-oss/t3-env): For env checking