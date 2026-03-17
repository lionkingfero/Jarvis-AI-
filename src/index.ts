// index.ts
// Central export file (connects all modules together)

export { Agent } from './core/agent';
export { LLMService } from './core/LLMService';
export { MemoryService } from './core/memoryservice';
export { TTSService } from './core/TTSService';

export { BaseAdapter } from './adapters/BaseAdapter';
export { MacOSAdapter } from './adapters/MacOSAdapter';

export { BasicOSController } from './types/OSController';
