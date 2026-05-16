# Flutter Architecture for Math Buddy Backend

This directory contains a lightweight Flutter integration blueprint for the Python backend.

## Architecture

- The Python backend exposes REST endpoints at `http://localhost:5000` using route paths under `/api`.
- Flutter should use a single `MathBuddyApiClient` service class to centralize requests:
  - `POST /api/parse-textbook`
  - `POST /api/teach`
  - `POST /api/extract-notes`
  - `POST /api/generate-mcq`
  - `POST /api/start-assessment`
  - `GET /api/assessment-status/{id}`
  - `GET /api/stats`

## Recommended integration

1. Add `http` as a dependency in `pubspec.yaml`.
2. Create a service layer in Dart that sends JSON payloads to the backend.
3. Keep UI logic separate from backend state by using provider, riverpod, or bloc.
4. Use the backend's status endpoint to power progress bars and long-running evaluation jobs.

## Usage Example

Use `backend/flutter/lib/backend_client.dart` as the starting point for HTTP integration.
