// ── Code-side index types ──

export interface CodeComponent {
  componentName: string;
  sourceFile: string;
  jsxTestIds: string[];
  jsxVisibleTexts: string[];
  jsxAriaLabels: string[];
  eventBindings: EventBinding[];
  stateDeclarations: StateDeclaration[];
  propsReceived: string[];
  imports: ImportInfo[];
}

export interface EventBinding {
  attribute: string; // onClick, onChange, onSubmit, etc.
  handlerName: string; // handleBatchDelete, setFilter, etc.
}

export interface StateDeclaration {
  variableName: string;
  hook: 'useState' | 'useReducer';
  initialValue?: string;
}

export interface ImportInfo {
  name: string;
  source: string; // './TaskTable', 'antd', '../data/taskService'
  isDefault: boolean;
}

export interface CodeIndex {
  generatedAt: string;
  filesScanned: number;
  componentsFound: number;
  components: Record<string, CodeComponent>; // keyed by componentName
}

// ── Browser-side evidence types ──

export interface BrowserElement {
  route: string;
  a11yRole: string;
  visibleText: string;
  testid?: string;
  ariaLabel?: string;
  elementType: string;
  ancestorRoles: string[]; // from landmark down, e.g. ['main', 'table', 'row']
  isInteractive: boolean;
}

export interface RouteElementSnapshot {
  route: string;
  capturedAt: string;
  elements: BrowserElement[];
}

// ── Anchor profile types ──

export interface ProjectAnchorProfile {
  testidCoverage: number;
  textUniqueness: number;
  ariaLabelCoverage: number;
  recommendedPrimary: string;
  recommendedFallback: string;
  minimumConfidence: number;
}

// ── Registry output types ──

export interface StitchedElement {
  // Browser-side
  selector: {
    primary: string;
    strategy: 'testid' | 'role+name' | 'text' | 'aria' | 'component-role';
  };
  a11yRole: string;
  visibleText: string;
  route?: string; // set during stitching

  // Code-side (component-level)
  sourceComponent: string;
  sourceFile: string;
  parentComponent: string;

  // Semantic anchors
  elementTestId?: string;
  boundProp?: string;
  boundState?: string;
  boundHandler?: string;

  // Data flow
  dataFlow: {
    handlerDefinedIn: string;
    stateOwnedBy: string;
    serviceCalls: Array<{
      serviceModule: string;
      methodName: string;
    }>;
  };

  // Meta
  anchorMethod: string;
  confidence: 'high' | 'medium' | 'low';
  lastVerifiedCommit: string;
  staleSince?: string;
}

export interface UnmappedElement {
  route: string;
  selector: string;
  status: 'unmapped';
  reason: 'no-testid-no-unique-text' | 'dynamic-content' | 'out-of-scope' | 'below-confidence-threshold';
  staleSince?: string;
}

export interface StitchReport {
  route: string;
  totalElements: number;
  matched: number;
  highConfidence: number;
  mediumConfidence: number;
  lowConfidence: number;
  unmatched: number;
}

export interface ElementRegistry {
  version: string;
  generatedAt: string;
  projectAnchorProfile: ProjectAnchorProfile;
  routes: Record<string, StitchedElement[]>;
  unmatched: UnmappedElement[];
  stitchReport: Record<string, StitchReport>;
}

// ── Change detection types ──

export interface ModuleRouteMap {
  moduleRoutes: Record<string, string[]>;
  pageFileToRoute: Record<string, string>;
  filePrefixToRoutes: Record<string, string[]>;
}

export interface FileChangeResult {
  changedFiles: string[];
  affectedRoutes: string[];
  affectedModules: string[];
  isShellChange: boolean;
  isGlobalChange: boolean;
}
