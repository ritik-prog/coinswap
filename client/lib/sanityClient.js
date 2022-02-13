import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'zger3nsl',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skLZOsUMp4o1nsx93UGt46JNyKMbX3g2dGyL2WvnYWIW80ubkzSVWl8YoVar4pvPDlvw8FfiIZrKJJKKSYY4s8ZPzwZdD6R2LRkDOdxeJ6iHkGSySLKw96v1ff5B0JRaENGBJxE4deZ1HpJiYfD2ZnJCd1jpyzLUIyZbSQhjPhQAQdhXRcN7',
  useCdn: false,
})
