import { useState } from 'react';
import {
  Typography,
  Space,
  Select,
  Button,
  Card,
  Alert,
  Skeleton,
  Empty,
  Tag,
} from 'antd';
import { SaveOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { editorNodes, editorEdges, type EditorNode } from '../data/workflow-mock-data';

const { Title, Text } = Typography;

type Scenario = 'loaded' | 'loading' | 'empty' | 'error';

const NODE_COLORS: Record<EditorNode['type'], string> = {
  trigger: '#52c41a',
  process: '#1677ff',
  condition: '#fa8c16',
  output: '#722ed1',
};

const NODE_WIDTH = 160;
const NODE_HEIGHT = 64;

function getNodeCenter(node: EditorNode) {
  return {
    x: node.x + NODE_WIDTH / 2,
    y: node.y + NODE_HEIGHT / 2,
  };
}

function EditorLoading() {
  return (
    <div data-testid="workflow-editor-loading">
      <Skeleton active paragraph={{ rows: 2 }} />
      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <Skeleton.Input active style={{ width: 200, height: 400 }} />
        <Skeleton.Input active block style={{ height: 400 }} />
      </div>
    </div>
  );
}

function EditorError({ onRetry }: { onRetry: () => void }) {
  return (
    <div data-testid="workflow-editor-error">
      <Alert
        type="error"
        message="Workflow editor failed to load"
        description="An unexpected error occurred while loading the editor. Please try again."
        showIcon
        action={
          <a onClick={onRetry} data-testid="workflow-editor-error-retry-link">
            Retry
          </a>
        }
      />
    </div>
  );
}

function NodePalette() {
  const paletteNodes: { type: EditorNode['type']; label: string }[] = [
    { type: 'trigger', label: 'Trigger' },
    { type: 'process', label: 'Process' },
    { type: 'condition', label: 'Condition' },
    { type: 'output', label: 'Output' },
  ];

  return (
    <div data-testid="workflow-node-palette" style={{ width: 200, flexShrink: 0 }}>
      <Text strong style={{ display: 'block', marginBottom: 12 }}>
        Node Palette
      </Text>
      <Space direction="vertical" style={{ width: '100%' }}>
        {paletteNodes.map((node) => (
          <Card
            key={node.type}
            size="small"
            hoverable
            style={{ borderLeft: `4px solid ${NODE_COLORS[node.type]}` }}
          >
            <Tag color={NODE_COLORS[node.type]} style={{ margin: 0 }}>
              {node.label}
            </Tag>
          </Card>
        ))}
      </Space>
    </div>
  );
}

function EditorCanvas({ nodes, edges }: { nodes: EditorNode[]; edges: typeof editorEdges }) {
  return (
    <div
      data-testid="workflow-editor-canvas"
      style={{
        flex: 1,
        position: 'relative',
        background: '#fafafa',
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        minHeight: 500,
        overflow: 'hidden',
      }}
    >
      {/* SVG overlay for edges */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;
          const from = getNodeCenter(sourceNode);
          const to = getNodeCenter(targetNode);
          return (
            <line
              key={edge.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#8c8c8c"
              strokeWidth={2}
              markerEnd="url(#arrowhead)"
            />
          );
        })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#8c8c8c" />
          </marker>
        </defs>
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          data-testid={`workflow-node-${node.id}`}
          style={{
            position: 'absolute',
            left: node.x,
            top: node.y,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            border: `2px solid ${NODE_COLORS[node.type]}`,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          <Space direction="vertical" align="center" size={0}>
            <Tag
              color={NODE_COLORS[node.type]}
              style={{ margin: 0, fontSize: 10, lineHeight: '16px' }}
            >
              {node.type.toUpperCase()}
            </Tag>
            <Text strong style={{ fontSize: 12 }}>
              {node.label}
            </Text>
          </Space>
        </div>
      ))}
    </div>
  );
}

export function WorkflowEditorPage() {
  const [scenario, setScenario] = useState<Scenario>('loaded');

  const nodes = scenario === 'empty' ? [] : editorNodes;
  const edges = scenario === 'empty' ? [] : editorEdges;

  const scenarioSelector = (
    <Space style={{ marginBottom: 16 }}>
      <Text>Scenario:</Text>
      <Select
        value={scenario}
        onChange={setScenario}
        options={[
          { value: 'loaded', label: 'Loaded' },
          { value: 'loading', label: 'Loading' },
          { value: 'empty', label: 'Empty' },
          { value: 'error', label: 'Error' },
        ]}
        data-testid="workflow-editor-scenario-select"
      />
    </Space>
  );

  if (scenario === 'loading') {
    return (
      <div data-testid="workflow-editor-page">
        <Title level={2}>Workflow Editor</Title>
        {scenarioSelector}
        <EditorLoading />
      </div>
    );
  }

  if (scenario === 'error') {
    return (
      <div data-testid="workflow-editor-page">
        <Title level={2}>Workflow Editor</Title>
        {scenarioSelector}
        <EditorError onRetry={() => setScenario('loaded')} />
      </div>
    );
  }

  return (
    <div data-testid="workflow-editor-page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Workflow Editor
        </Title>
        <Space>
          <Button icon={<SaveOutlined />} type="primary" data-testid="workflow-editor-save">
            Save
          </Button>
          <Button icon={<PlayCircleOutlined />} data-testid="workflow-editor-run">
            Run
          </Button>
        </Space>
      </div>

      {scenarioSelector}

      {nodes.length === 0 ? (
        <Empty description="No nodes in this workflow" />
      ) : (
        <div style={{ display: 'flex', gap: 16 }}>
          <NodePalette />
          <EditorCanvas nodes={nodes} edges={edges} />
        </div>
      )}
    </div>
  );
}
