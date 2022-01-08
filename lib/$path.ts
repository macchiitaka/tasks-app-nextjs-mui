/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  ssg: {
    $url: (url?: { hash?: string }) => ({ pathname: '/ssg' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath

// prettier-ignore
export const staticPath = {
  favicon_ico: '/favicon.ico'
} as const

// prettier-ignore
export type StaticPath = typeof staticPath
