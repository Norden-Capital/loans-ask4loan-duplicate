export {};

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    // LeadScout embedded loan-application form (app.leadscout.ca)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LeadScout?: any;
  }
}
