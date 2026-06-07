# Evidence Loop Capability

## Purpose

The V3 evidence loop is the project's first operational evidence-driven quality loop. It captures UI behavior as evidence, diagnoses failures, and produces evolution candidates for the project's knowledge, rules, and skills.

## ADDED Requirements

### Requirement: Evidence Record Generation

The system SHALL provide a documented evidence capture workflow that produces structured records for at least one V2 surface route per major version.

#### Scenario: Task List Evidence Captured

- GIVEN the project's V2 surface is closed (21 routes implemented)
- WHEN the first MCP exploration session is run against `/task/list/all`
- THEN a session record, 4 route snapshots (loaded/loading/empty/error), 4 component discoveries, 3 interaction traces, and 1 evidence index are produced
- AND each record uses the existing evidence templates
- AND each record has cross-references to relevant e2e tests

#### Scenario: Evidence Templates Reused

- GIVEN the project has evidence templates at `docs/08-frontend-agent/evidence/`
- WHEN a new evidence record is created
- THEN it follows one of the template structures
- AND it includes the metadata block, context block, content block, reproduction steps, and validation checklist

### Requirement: E2E Asset Registry

The system SHALL maintain a formal registry of e2e spec files with smoke vs regression classification.

#### Scenario: Spec Files Cataloged

- GIVEN a major version's e2e test suite is complete
- WHEN the e2e asset registry is populated
- THEN every spec file is listed with: route(s) covered, test count, classification (smoke or regression), priority, and last-run status
- AND coverage summary shows: smoke count, regression count, total route coverage %

#### Scenario: Promotion Criteria Tracked

- GIVEN the regression-test-contract defines a promotion path from smoke to stable
- WHEN a spec is reviewed for promotion
- THEN the smoke-promotion-candidates.md file lists: run count, selector stability, added coverage, failure diagnosis path
- AND the decision (promote or keep-as-smoke) is recorded

### Requirement: Drift Diagnosis Workflow

The system SHALL provide a documented workflow for diagnosing UI failures, classifying them, and producing evolution candidates.

#### Scenario: Failure Diagnosed

- GIVEN a UI failure has occurred (e.g., the V2.10 sidebar hotfix)
- WHEN the failure-diagnosis workflow is run
- THEN a failure-diagnosis record is produced with: symptom, expected, actual, frequency, evidence, root cause analysis, classification, impact, recommended action, evolution candidate
- AND the record cross-references the relevant e2e tests, knowledge map entries, and evolution queue entries

#### Scenario: Drift Classified

- GIVEN a failure has multiple possible causes
- WHEN the diagnosis is performed
- THEN the hypotheses table lists: hypothesis, confidence (0-1), supporting evidence
- AND a confirmed cause is identified
- AND the drift class is one of: expected product change, UI drift, selector drift, test design flaw, environment failure, runtime bug, unknown

### Requirement: Evolution Candidate Pipeline

The system SHALL maintain three evolution queues (knowledge, rule, skill) with documented acceptance criteria and a decision-record workflow.

#### Scenario: Candidate Added

- GIVEN an evidence record or failure diagnosis identifies a recurring pattern
- WHEN the evolution candidate pipeline is invoked
- THEN a candidate is added to the appropriate queue with: id, candidate, evidence references, priority, status
- AND the candidate is processed through the queue's process steps

#### Scenario: Rule Accepted

- GIVEN a rule candidate has been validated (no conflicts, works in practice)
- WHEN the decision is "accept"
- THEN the rule text is documented
- AND the decision rationale is recorded
- AND the rule's enforcement mechanism is described (manual review now, ESLint rule in future)

#### Scenario: Skill Promotion Deferred

- GIVEN a skill candidate has not met the "captured at least 3 times" criterion
- WHEN the decision is "defer"
- THEN the candidate remains in the queue with status "pending"
- AND the deferral reason is documented
- AND the promotion criteria are restated in the deferral record

### Requirement: Knowledge Map Maintenance

The system SHALL maintain 5 knowledge maps documenting the current V* surface state, kept in sync with code changes.

#### Scenario: Knowledge Map Exists

- GIVEN a major version's surface is stable
- WHEN the knowledge map maintenance workflow runs
- THEN all 5 maps are populated: route-map, component-map, project-map, state-flow-map, api-contract-map
- AND each map has a "Last Updated" date matching the most recent surface change
- AND each map cross-references at least one e2e test per documented entity

#### Scenario: Knowledge Map Goes Stale

- GIVEN the project's surface changes (e.g., a new route is added)
- WHEN the next major version begins
- THEN a rule requires the knowledge maps to be updated as part of that major version's scope
- AND a `Last Updated` mismatch is flagged in the major version's release notes
