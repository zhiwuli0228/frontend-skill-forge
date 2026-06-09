export interface SkillItem {
  id: string;
  name: string;
  description: string;
  category: 'text' | 'image' | 'data' | 'tool';
  version: string;
  status: 'active' | 'inactive' | 'draft';
  icon: string; // Ant Design icon name
  author: string;
  downloads: number;
  tags: string[];
  actionRoute?: string; // optional route for launching the skill's functionality
}

export interface SkillVersion {
  version: string;
  date: string;
  changes: string;
  status: 'current' | 'previous' | 'deprecated';
}

export interface SkillConfig {
  skillId: string;
  connection: { endpoint: string; apiKey: string; timeout: number };
  parameters: Record<string, unknown>;
  permissions: string[];
}

export const skills: SkillItem[] = [
  // Text category (5)
  { id: 's1', name: 'Text Summarizer', description: 'Generates concise summaries from long-form text documents using extractive and abstractive techniques.', category: 'text', version: '2.1.0', status: 'active', icon: 'FileTextOutlined', author: 'AI Labs', downloads: 12450, tags: ['nlp', 'summary', 'text'] },
  { id: 's2', name: 'Sentiment Analyzer', description: 'Analyzes text sentiment and returns positive, negative, or neutral scores with confidence levels.', category: 'text', version: '1.3.2', status: 'active', icon: 'SmileOutlined', author: 'NLP Corp', downloads: 8920, tags: ['sentiment', 'analysis', 'nlp'] },
  { id: 's3', name: 'Grammar Checker', description: 'Detects and corrects grammatical errors, spelling mistakes, and style issues in written content.', category: 'text', version: '3.0.1', status: 'active', icon: 'CheckSquareOutlined', author: 'WriteTools', downloads: 15300, tags: ['grammar', 'spelling', 'writing'] },
  { id: 's4', name: 'Language Translator', description: 'Translates text between 50+ languages with context-aware accuracy and tone preservation.', category: 'text', version: '1.0.0', status: 'draft', icon: 'GlobalOutlined', author: 'TranslateAI', downloads: 3200, tags: ['translation', 'multilingual', 'i18n'] },
  { id: 's5', name: 'Keyword Extractor', description: 'Extracts relevant keywords and key phrases from documents for indexing and tagging.', category: 'text', version: '1.5.0', status: 'inactive', icon: 'TagsOutlined', author: 'DataMiner', downloads: 5670, tags: ['keywords', 'extraction', 'nlp'] },

  // Image category (5)
  { id: 's6', name: 'Image Generator', description: 'Creates photorealistic images from text prompts using diffusion-based generative models.', category: 'image', version: '4.2.0', status: 'active', icon: 'PictureOutlined', author: 'VisionAI', downloads: 22100, tags: ['generation', 'diffusion', 'creative'] },
  { id: 's7', name: 'Background Remover', description: 'Automatically removes backgrounds from images and replaces them with transparent or custom backgrounds.', category: 'image', version: '2.0.3', status: 'active', icon: 'BgColorsOutlined', author: 'PhotoTools', downloads: 18700, tags: ['background', 'removal', 'editing'] },
  { id: 's8', name: 'Object Detector', description: 'Detects and labels objects in images with bounding boxes and confidence scores.', category: 'image', version: '3.1.0', status: 'active', icon: 'EyeOutlined', author: 'VisionAI', downloads: 11200, tags: ['detection', 'computer-vision', 'objects'] },
  { id: 's9', name: 'Image Upscaler', description: 'Upscales low-resolution images to higher resolutions while preserving detail and sharpness.', category: 'image', version: '1.2.0', status: 'inactive', icon: 'ZoomInOutlined', author: 'EnhanceAI', downloads: 7800, tags: ['upscale', 'resolution', 'enhancement'] },
  { id: 's10', name: 'Style Transfer', description: 'Applies artistic styles from reference images to target photos using neural style transfer.', category: 'image', version: '0.9.0', status: 'draft', icon: 'HighlightOutlined', author: 'ArtEngine', downloads: 2100, tags: ['style', 'artistic', 'transfer'] },

  // Data category (5)
  { id: 's11', name: 'Data Cleaner', description: 'Automatically cleans messy datasets by handling missing values, duplicates, and inconsistent formats.', category: 'data', version: '2.4.1', status: 'active', icon: 'ClearOutlined', author: 'DataWorks', downloads: 9800, tags: ['cleaning', 'preprocessing', 'etl'] },
  { id: 's12', name: 'CSV Parser', description: 'Parses CSV files with automatic delimiter detection, encoding handling, and schema inference.', category: 'data', version: '1.8.0', status: 'active', icon: 'TableOutlined', author: 'DataWorks', downloads: 14500, tags: ['csv', 'parsing', 'import'] },
  { id: 's13', name: 'Chart Generator', description: 'Generates interactive charts and visualizations from structured data in multiple formats.', category: 'data', version: '3.2.0', status: 'active', icon: 'BarChartOutlined', author: 'VizLab', downloads: 16200, tags: ['charts', 'visualization', 'graphs'] },
  { id: 's14', name: 'Data Validator', description: 'Validates data against configurable schemas and rules, returning detailed error reports.', category: 'data', version: '1.1.0', status: 'draft', icon: 'SafetyOutlined', author: 'QualityAI', downloads: 4300, tags: ['validation', 'schema', 'quality'] },
  { id: 's15', name: 'Statistical Analyzer', description: 'Computes descriptive and inferential statistics with hypothesis testing and regression analysis.', category: 'data', version: '2.0.0', status: 'inactive', icon: 'FundOutlined', author: 'StatsPro', downloads: 6700, tags: ['statistics', 'analysis', 'math'] },

  // Tool category (6)
  { id: 's21', name: 'Task Creator', description: 'Create and manage operational tasks with a guided 4-step wizard: Basic Info, Details, Settings, and Review before submission.', category: 'tool', version: '1.0.0', status: 'active', icon: 'PlusSquareOutlined', author: 'TaskFlow', downloads: 8500, tags: ['task', 'creation', 'workflow', 'form'], actionRoute: '/skill/create-task' },
  { id: 's16', name: 'API Caller', description: 'Makes HTTP requests to external APIs with retry logic, rate limiting, and response caching.', category: 'tool', version: '3.5.0', status: 'active', icon: 'ApiOutlined', author: 'DevTools', downloads: 19400, tags: ['api', 'http', 'integration'] },
  { id: 's17', name: 'Web Scraper', description: 'Extracts structured data from web pages with CSS selector support and pagination handling.', category: 'tool', version: '2.3.0', status: 'active', icon: 'CloudOutlined', author: 'ScrapeAI', downloads: 13600, tags: ['scraping', 'web', 'extraction'] },
  { id: 's18', name: 'Code Executor', description: 'Safely executes code snippets in sandboxed environments with language support for Python, JS, and more.', category: 'tool', version: '1.6.0', status: 'active', icon: 'CodeOutlined', author: 'RunBox', downloads: 10900, tags: ['code', 'execution', 'sandbox'] },
  { id: 's19', name: 'File Converter', description: 'Converts files between formats including PDF, DOCX, XLSX, JSON, and CSV with batch support.', category: 'tool', version: '2.1.0', status: 'inactive', icon: 'FileZipOutlined', author: 'ConvertPro', downloads: 8400, tags: ['conversion', 'files', 'formats'] },
  { id: 's20', name: 'Cron Scheduler', description: 'Schedules and manages recurring tasks with cron expressions, timezone support, and failure alerts.', category: 'tool', version: '1.0.0', status: 'draft', icon: 'ClockCircleOutlined', author: 'TaskFlow', downloads: 3100, tags: ['scheduling', 'cron', 'automation'] },
];

export const emptySkills: SkillItem[] = [];

export const skillCategories = ['all', 'text', 'image', 'data', 'tool'] as const;

export const mockVersions: SkillVersion[] = [
  { version: '2.1.0', date: '2026-05-20', changes: 'Added multi-document summarization support and improved accuracy by 15%.', status: 'current' },
  { version: '2.0.0', date: '2026-03-10', changes: 'Migrated to new summarization engine with abstractive mode.', status: 'previous' },
  { version: '1.5.0', date: '2025-11-15', changes: 'Added language detection and auto-language selection.', status: 'previous' },
  { version: '1.2.0', date: '2025-07-01', changes: 'Performance improvements and reduced latency by 40%.', status: 'deprecated' },
  { version: '1.0.0', date: '2025-03-01', changes: 'Initial release with basic extractive summarization.', status: 'deprecated' },
];

export const mockConfig: SkillConfig = {
  skillId: 's1',
  connection: { endpoint: 'https://api.ailabs.io/v2/summarizer', apiKey: 'sk-****-****-****', timeout: 30000 },
  parameters: { maxSentences: 5, language: 'auto', mode: 'abstractive' },
  permissions: ['read:documents', 'write:summaries', 'access:models'],
};
