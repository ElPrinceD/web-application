// Type definitions for minimatch to suppress TypeScript errors
declare module 'minimatch' {
  export function minimatch(target: string, pattern: string, options?: any): boolean;
  export default minimatch;
}
