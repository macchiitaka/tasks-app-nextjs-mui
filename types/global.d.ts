declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'test' | 'development' | 'production'
  }
}
