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

declare interface HTMLElement {
  mozRequestFullScreen: (...arg: any[]) => void
  msRequestFullscreen: (...arg: any[]) => void
}

declare interface Document {
  mozCancelFullScreen: (...arg: any[]) => void
  msExitFullscreen: (...arg: any[]) => void
  mozFullScreenElement: null | Element
  msFullscreenElement: null | Element
}

declare namespace NodeJS {
    interface Process {
        server: boolean
        client: boolean
    }
}
