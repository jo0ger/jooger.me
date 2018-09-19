declare interface Window {
  particlesJS: (...arg: any[]) => void
}

declare namespace NodeJS {
    interface Process {
        server: boolean
    }
}
