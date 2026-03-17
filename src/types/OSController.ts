// OSController.ts
// Defines OS-level control actions (future system control)

export interface OSController {
    openApp(appName: string): void;
    closeApp(appName: string): void;
    shutdown(): void;
    restart(): void;
    getSystemInfo(): string;
}

// Optional basic implementation (for testing)
export class BasicOSController implements OSController {
    openApp(appName: string): void {
        console.log(`Opening app: ${appName}`);
    }

    closeApp(appName: string): void {
        console.log(`Closing app: ${appName}`);
    }

    shutdown(): void {
        console.log("System shutting down...");
    }

    restart(): void {
        console.log("System restarting...");
    }

    getSystemInfo(): string {
        return "Basic system info (placeholder)";
    }
}
