declare interface Window {
  particlesJS: (...arg: any[]) => void
  mozRequestAnimationFrame: (...arg: any[]) => void
  oRequestAnimationFrame: (...arg: any[]) => void
  msRequestAnimationFrame: (...arg: any[]) => void
  mozCancelAnimationFrame: (...arg: any[]) => void
  dataLayer: any[]
  gtag: (...args: any[]) => void
  onNuxtReady: (...args: any[]) => void
  Message: any
}

declare namespace NodeJS {
    interface Process {
        server: boolean
        client: boolean
    }
}
