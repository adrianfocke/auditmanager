# Auditmanager

A NextJS application that aims to automatically fill template files. Imagine opening a .DOCX file with a pre-defined template that is able to fill all it's fields automatically, from entities stored in a DB/external service. No need to copy+paste stuff into the file, it's all done magically, thanks to this application. 

For more info, check the detailed section.

## Get Started

Create a .env file and add required environment variables:

```
TINA_URL="http://localhost:4001/graphql"
```

Inside the project folder open a terminal and execute the following code to install it's dependencies and run the dev server:

```
npm install
npm run dev
```

Optionally, you can prepare the project for a deployment (with Vercel). Just add some environment variables:

```
TINA_CLIENT_ID=<your value here>
TINA_TOKEN=<your value here>
VERCEL_GIT_COMMIT_REF=<your value here>
NEXT_PUBLIC_SUPABASE_URL=<your value here>
NEXT_PUBLIC_SUPABASE_KEY=<your value here>
NEXT_PUBLIC_SUPABASE_CONTENT_TYPE=application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

More info here: [Going to Production with Tina Cloud](https://tina.io/docs/tina-cloud/overview/) and [Deploying to Vercel](https://tina.io/docs/tina-cloud/deployment-options/vercel/)

## Used Libraries

Please consider a donation! Besides NextJS, this project leverages the following open source libraries:

- [tinacms](https://github.com/tinacms/tinacms): Visual editing and database
- [docxjs](https://github.com/dolanmiu/docx) Patching .docx files
- [mammoth](https://github.com/mwilliamson/mammoth.js): Converting .docx files to html