# V1 Development Issues

Status: Archived with V1 closure

Date: 2026-06-07

## Purpose

Record the main problems and friction points encountered while delivering V1 so they can influence V2 planning instead of being rediscovered.

## Issue 1: Contract vs Tooling Reality Gap

Description:

The intended SuperSpec and Superpower governance model was initially more ambitious than what the current OpenSpec runtime could reliably enforce by itself.

Observed impact:

- schema-level intent needed additional repository-local documentation and contracts
- runtime evidence had to be collected explicitly before activation-style claims could be trusted
- some behavior had to be modeled as governed convention rather than as hard tool enforcement

## Issue 2: Placeholder Baselines Delayed Trust

Description:

Several directories and files existed early only as skeletons or `Draft` placeholders.

Observed impact:

- document existence could easily be mistaken for readiness
- more gate records were needed to prove that a stage was actually closed
- version-state review required repeated distinction between placeholder structure and accepted baseline

## Issue 3: Documentation Traceability Overhead

Description:

As V1 accumulated multiple minor versions, keeping links, status fields, and authoritative entry points synchronized became a nontrivial maintenance task.

Observed impact:

- path mistakes and stale status statements appeared during iteration
- aggregate understanding depended on careful ledger maintenance
- release closure required extra normalization work

## Issue 4: No-Code Scope Protected Quality but Deferred Product Proof

Description:

The deliberate no-business-code boundary kept V1 focused, but it also meant V1 could not prove the full workflow against meaningful frontend implementation changes.

Observed impact:

- the control plane became stronger
- the actual first code-bearing validation challenge was deferred into the next major version
- pending scope questions survived even after V1 was accepted

## Issue 5: Verification Breadth Was Still Narrow

Description:

The repository-level verification remained limited to build checks, schema checks, and a single smoke E2E path.

Observed impact:

- control-plane confidence improved
- realistic frontend workflow confidence did not yet improve at the same pace
- V2 still needs broader execution evidence before the framework can be considered mature
