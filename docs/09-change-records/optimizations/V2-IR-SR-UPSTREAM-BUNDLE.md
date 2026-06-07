# V2 IR-SR Upstream Bundle

Status: Recorded

Date: 2026-06-07

## Optimization

Treat IR and SR as one upstream planning bundle, with the downstream spec or
change execution starting only after SR is accepted.

## Why This Helps

- Keeps the intent and the concrete baseline close together.
- Reduces handoff churn between "what do we want" and "what exactly will be
  built".
- Makes downstream implementation packets thinner because they can point back
  to one accepted planning bundle.

## Operational Rule

1. write IR as the intent and risk frame
2. review, disposition, and close IR
3. write SR from the accepted IR
4. review, disposition, and close SR
5. start the downstream spec/change execution from the accepted SR

## Boundary

This changes how planning work is grouped. It does not remove any review,
disposition, closure, verification, or acceptance gate after SR.
