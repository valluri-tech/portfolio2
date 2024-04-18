This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## TODO
1. How to configure AWS profile in terminal
2. Write a script to update S3 and create Invalidation
3. Get the code reviwed
4. Follow good design pattern principles
5. Write tests
6. Fill in skills and where you have used those skills in your experience.
7. Highlight about MDN contributions.

## Bugs
1. Mobile view - visits page needs to handle responsiveness.
   WIP : Mostly done but little remaining.
2. Use context api to send hit only once after visiting home page.
3. Profile visit timestamp in a Human readable way. For example : 18th April,2024 [3:45 pm AEST].
4. UseEffect executing twice - send only one request.
   Done : Fixed using 'useRef'
5. Fix the last page results in pagination.
   Done : Chcking for LastEvaluatedKey in the reponse and disabling.