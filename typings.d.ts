declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.png'
declare module 'react-grid-layout'
declare module 'loadsh'
declare module 'uuid'
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement
  const url: string
  export default url
}
